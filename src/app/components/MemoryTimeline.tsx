import { motion, useScroll, useTransform, useInView, animate } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const timelineEvents = [
  {
    year: '2020',
    title: 'First Equipment',
    description: 'My photography journey started with a smartphone, curiosity, and countless hours of practice. Learning composition, lighting, and storytelling through everyday objects helped me develop the foundation of my creative vision.',
    image: '/images/journey_3.jpeg',
    rotation: 3,
  },
  {
    year: '2021',
    title: 'Finding My Perspective',
    description: 'The journey started by discovering beauty in everyday objects. What seemed ordinary to others became opportunities to practice creativity, framing, and visual storytelling.',
    image: '/images/journey_1.jpeg',
    rotation: 4,
  },
  {
    year: '2022',
    title: 'Winning Shot Photography Exhibition',
    description: 'Received recognition for a standout photograph featured in a photography exhibition in November 2022. A memorable achievement that boosted my confidence and artistic growth as a photographer.',
    image: '/images/rohit_21.jpeg',
    rotation: -3,
  },
  {
    year: '2023',
    title: 'Pindle Select Photo',
    description: 'Had a photograph selected for the Pindle Showcase in February 2023, marking another important step in my photography journey and creative development.',
    image: '/images/rohit_23.png',
    rotation: 2,
  },
  {
    year: '2024',
    title: 'First Feature',
    description: 'One of my photographs was featured by a photography community page. Seeing my work appreciated by a wider audience was a proud moment and a reminder to keep creating.',
    image: '/images/rohit_26.png',
    rotation: -2,
  },
  {
    year: '2024',
    title: 'International Recognition',
    description: 'Achieved Top 2% ranking in the 35AWARDS Mobile Photography: Symmetry contest among thousands of photographers from around the world.',
    image: '/images/journey_2.png',
    rotation: -2,
  },
  {
    year: '2025',
    title: 'Professional assignment in Dubai',
    description: "Traveled to Dubai for a professional work assignment. The experience provided opportunities to capture the city's modern architecture, vibrant streets, and cultural diversity through photography.",
    image: '/images/dubai_1.png',
    rotation: 3,
  },
  {
    year: '2026',
    title: 'Cultural exploration in Uzbekistan',
    description: 'Visited Uzbekistan during a work-related trip, documenting historic architecture, local traditions, and everyday life while expanding my travel photography portfolio.',
    image: '/images/uzbekistan_1.png',
    rotation: -1,
  },
];

export default function MemoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState('2014');
  const [scrollPosition, setScrollPosition] = useState(0);
  const isInView = useInView(containerRef, { margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-15%']);

  // Auto-scroll animation - very slow (one card every 20 seconds)
  useEffect(() => {
    if (!isInView || !timelineRef.current) return;

    const timeline = timelineRef.current;
    const cardWidth = 320 + 48; // card width + gap
    const totalWidth = cardWidth * timelineEvents.length;
    const maxScroll = totalWidth - timeline.offsetWidth;

    // Auto-scroll: move one card width (368px) every 20 seconds
    const duration = 5000; // 5 seconds per card
    const distance = cardWidth;

    let animationFrame: any;
    let startTime: number | null = null;
    let currentPosition = scrollPosition;

    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress; // Linear for smooth continuous movement

      const newPosition = currentPosition + distance * easeProgress;

      if (newPosition >= maxScroll) {
        // Reset to beginning for infinite loop
        setScrollPosition(0);
        startTime = null;
        currentPosition = 0;
      } else {
        setScrollPosition(newPosition);
      }

      if (isInView && newPosition < maxScroll) {
        animationFrame = requestAnimationFrame(animateScroll);
      } else if (newPosition >= maxScroll) {
        // Restart from beginning
        setTimeout(() => {
          setScrollPosition(0);
          startTime = null;
          currentPosition = 0;
          if (isInView) {
            animationFrame = requestAnimationFrame(animateScroll);
          }
        }, 1000);
      }
    };

    animationFrame = requestAnimationFrame(animateScroll);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, scrollPosition]);

  // Calculate active year based on scroll position
  useEffect(() => {
    const cardWidth = 320 + 48;
    const currentIndex = Math.round(scrollPosition / cardWidth);
    const clampedIndex = Math.max(0, Math.min(currentIndex, timelineEvents.length - 1));
    setActiveYear(timelineEvents[clampedIndex].year);
  }, [scrollPosition]);

  return (
    <section id="journey" ref={containerRef} className="relative pb-32 pt-16 bg-[#0a0a0a] overflow-hidden">
      {/* Active Year Indicator - Top Right */}
      <motion.div
        className="fixed top-24 right-8 z-30 px-6 py-3 bg-black/80 backdrop-blur-md border border-white/20"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white/90 text-2xl tracking-[0.2em]" style={{ fontWeight: 300 }}>
            {activeYear}
          </span>
        </div>
      </motion.div>

      <div className="mb-12 text-center px-6">
        <motion.h2
          className="mb-4"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 300,
            letterSpacing: '0.05em',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          My Journey
        </motion.h2>
        <motion.p
          className="text-white/60 text-lg tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          From first click to today
        </motion.p>
      </div>

      {/* Horizontal Scrolling Timeline */}
      <div className="relative overflow-hidden">
        <motion.div
          ref={timelineRef}
          className="flex gap-12 px-12"
          style={{
            x: -scrollPosition,
          }}
          transition={{ type: 'tween', ease: 'linear', duration: 0 }}
        >
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className="relative flex-shrink-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Polaroid Card */}
              <motion.div
                className="relative bg-white p-4 pb-16 shadow-2xl"
                style={{
                  width: '320px',
                  rotate: event.rotation,
                }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <div className="w-full aspect-square bg-gray-200 mb-4 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Year Badge */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-black rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-white text-sm font-medium">{event.year}</span>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-black text-xl mb-2" style={{ fontWeight: 500 }}>
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                </div>

                {/* Handwritten Effect */}
                <div className="absolute bottom-4 left-4 right-4 h-px bg-black/10" />
              </motion.div>

              {/* Connection Line */}
              {index < timelineEvents.length - 1 && (
                <div className="absolute top-1/2 -right-12 w-12 h-px bg-white/20" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Status Indicator */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3">
          <p className="text-white/40 text-sm tracking-widest uppercase">
            {isInView ? 'Timeline in motion' : 'Scroll to activate timeline'}
          </p>
          {isInView && (
            <motion.div
              className="w-2 h-2 rounded-full bg-white/40"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
}

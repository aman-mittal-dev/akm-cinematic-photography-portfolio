import { motion, useScroll, useTransform, useInView, animate } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const timelineEvents = [
  {
    year: '2014',
    title: 'The Awakening',
    description: 'Discovered photography during a backpacking trip through Iceland. The raw beauty of glaciers and northern lights sparked an obsession that would change everything.',
    image: 'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=400',
    rotation: -4,
  },
  {
    year: '2015',
    title: 'First Equipment',
    description: 'Saved for 8 months to buy my first DSLR—a Canon 5D Mark III. Spent every weekend learning the craft, shooting sunrise to sunset in the city streets.',
    image: 'https://images.unsplash.com/photo-1608186336271-53313eeaf864?w=400',
    rotation: 3,
  },
  {
    year: '2016',
    title: 'Street Photography Phase',
    description: 'Found my voice in urban landscapes and candid moments. Won a local street photography competition that gave me the confidence to pursue this seriously.',
    image: 'https://images.unsplash.com/photo-1580852300513-9b50125bf293?w=400',
    rotation: -2,
  },
  {
    year: '2017',
    title: 'First Solo Exhibition',
    description: 'Showcased "Urban Solitude"—a collection of 30 photos at The Downtown Gallery. Sold out opening night. Realized this could be more than just a hobby.',
    image: 'https://images.unsplash.com/photo-1608186286925-8c0e1c1fbeac?w=400',
    rotation: 5,
  },
  {
    year: '2018',
    title: 'The Leap of Faith',
    description: 'Quit my corporate marketing job to pursue photography full-time. Terrifying and liberating. Started taking on portrait and commercial projects.',
    image: 'https://images.unsplash.com/photo-1651936717841-1dba4ff5d7a6?w=400',
    rotation: -3,
  },
  {
    year: '2019',
    title: 'First Brand Campaign',
    description: 'Shot my first major campaign for a fashion brand. Three-day shoot in Paris. This opened doors to working with luxury brands and creative agencies.',
    image: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=400',
    rotation: 2,
  },
  {
    year: '2020',
    title: 'National Geographic Feature',
    description: 'Despite the global challenges, received the honor of being featured in National Geographic for my documentary series on urban wildlife during lockdown.',
    image: 'https://images.unsplash.com/photo-1488240339625-c4014e114224?w=400',
    rotation: -1,
  },
  {
    year: '2021',
    title: 'Workshop & Mentorship',
    description: 'Started teaching photography workshops and mentoring aspiring photographers. Giving back to the community that supported me became incredibly fulfilling.',
    image: 'https://images.unsplash.com/photo-1575876402495-fe202e1d3732?w=400',
    rotation: 4,
  },
  {
    year: '2022',
    title: 'World Photography Tour',
    description: 'Embarked on a 9-month journey across 25 countries—from Tokyo to Patagonia. Documented diverse cultures, landscapes, and human stories. Life-changing experience.',
    image: 'https://images.unsplash.com/photo-1637100000773-67c90fced16a?w=400',
    rotation: -3,
  },
  {
    year: '2023',
    title: 'Photography Awards',
    description: 'Won International Photography Award for Fine Art category. My series "Light & Shadow" was exhibited in galleries across New York, London, and Tokyo.',
    image: 'https://images.unsplash.com/photo-1605076896228-086cda8868c9?w=400',
    rotation: 2,
  },
  {
    year: '2024',
    title: 'Published Author',
    description: 'Released "Through My Lens: A Decade of Stories"—a 200-page coffee table book featuring my favorite works. Became an Amazon bestseller in photography category.',
    image: 'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=400',
    rotation: -2,
  },
  {
    year: '2025',
    title: 'Studio & Creative Space',
    description: 'Opened my own photography studio and creative space in downtown. A hub for collaboration with other artists, models, and creative professionals.',
    image: 'https://images.unsplash.com/photo-1608186336271-53313eeaf864?w=400',
    rotation: 3,
  },
  {
    year: '2026',
    title: 'The Journey Continues',
    description: 'Now working on my second book and a documentary series. Still chasing that feeling from Iceland—the pure magic of capturing a moment that will last forever.',
    image: 'https://images.unsplash.com/photo-1580852300513-9b50125bf293?w=400',
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
    const duration = 20000; // 20 seconds per card
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

import { motion } from 'motion/react';
import { Camera, Aperture, Zap } from 'lucide-react';

const gearItems = [
  'Motorola Moto X Play',
  'Poco X3',
  'Samsung Galaxy S24',
  'Zeiss 50mm f/1.4',
  'Sony 85mm f/1.4 GM',
  'DJI Ronin RS3',
];

export default function BehindTheLens() {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 300,
              letterSpacing: '0.05em',
            }}
          >
            Behind The Lens
          </h2>
          <p className="text-white/60 text-lg tracking-wide">The artist, the tools, the vision</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src="/images/Rohit.png"
                alt="Behind the lens"
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Decorative Frame */}
            <div className="absolute -inset-4 border border-white/10 pointer-events-none" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Introduction */}
            <div>
              <h3 className="text-3xl mb-6 tracking-wide" style={{ fontWeight: 300 }}>
                The Story
              </h3>
              <div className="space-y-4 text-white/70 leading-relaxed text-lg">
                <p>
                  Photography started as a creative curiosity and gradually became a passion for visual storytelling. Through photography and cinematography, I discovered a way to capture emotions, perspectives, and moments that often go unnoticed.
                </p>
                <p>
                  Today, I work on creating compelling visual content that blends creativity, storytelling, and technical precision. Every project is an opportunity to learn, experiment, and bring unique ideas to life through the lens.
                </p>
              </div>
            </div>

            {/* Philosophy */}
            <div className="relative pl-8 border-l-2 border-white/20">
              <Camera className="absolute -left-4 top-0 w-8 h-8 text-white/40 bg-black" strokeWidth={1.5} />
              <h4 className="text-xl mb-3 tracking-wide" style={{ fontWeight: 400 }}>
                Creative Philosophy
              </h4>
              <p className="text-white/60 leading-relaxed italic">
                {/* "Every photograph is a conversation between the subject and the soul. I don't just capture what I
                see—I capture what I feel." */}
                "Great visuals are not just about what appears in the frame—they are about the story, emotion, and perspective behind it. My goal is to create images and films that leave a lasting impression."
              </p>
            </div>

            {/* Gear Showcase */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Aperture className="w-6 h-6 text-white/40" strokeWidth={1.5} />
                <h4 className="text-xl tracking-wide" style={{ fontWeight: 400 }}>
                  My Arsenal
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {gearItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-white/80 text-sm tracking-wide">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-4xl mb-2" style={{ fontWeight: 300 }}>
                  7+
                </p>
                <p className="text-white/50 text-sm tracking-widest uppercase">Years</p>
              </div>
              <div className="text-center">
                <p className="text-4xl mb-2" style={{ fontWeight: 300 }}>
                  25+
                </p>
                <p className="text-white/50 text-sm tracking-widest uppercase">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-4xl mb-2" style={{ fontWeight: 300 }}>
                  2
                </p>
                <p className="text-white/50 text-sm tracking-widest uppercase">Countries</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

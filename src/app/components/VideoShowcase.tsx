import { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'Urban Stories',
    duration: '3:24',
    thumbnail: 'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=1200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Portrait Sessions',
    duration: '2:15',
    thumbnail: 'https://images.unsplash.com/photo-1608186336271-53313eeaf864?w=1200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 3,
    title: 'Fashion Film',
    duration: '4:30',
    thumbnail: 'https://images.unsplash.com/photo-1580852300513-9b50125bf293?w=1200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 lg:px-12 bg-[#0a0a0a]">
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
            Cinematic Reels
          </h2>
          <p className="text-white/60 text-lg tracking-wide">Motion in frames</p>
        </motion.div>

        {/* Video Grid */}
        <div className="space-y-12">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              className="group relative w-full aspect-video overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {activeVideo === video.id ? (
                <motion.div
                  className="w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </motion.div>
              ) : (
                <>
                  {/* Thumbnail */}
                  <div className="absolute inset-0">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${video.thumbnail})` }}
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                  </div>

                  {/* Play Button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    onClick={() => setActiveVideo(video.id)}
                  >
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl" />

                      {/* Play Button */}
                      <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" strokeWidth={0} />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Video Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-2xl mb-2 tracking-wide" style={{ fontWeight: 300 }}>
                          {video.title}
                        </h3>
                        <p className="text-white/50 text-sm tracking-widest uppercase">
                          Duration: {video.duration}
                        </p>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20">
                          <span className="text-white/80 text-sm tracking-wide">Watch Now</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Border Effect */}
                  <div className="absolute inset-0 border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

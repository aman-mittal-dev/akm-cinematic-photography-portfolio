import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, User, Shirt, Calendar, Palette, Film } from 'lucide-react';
import CategoryViewer from './CategoryViewer';

const categories = [
  {
    id: 'street',
    title: 'Street Photography',
    icon: Camera,
    image: '/images/street_1.png',
    images: [
      '/images/street_1.png',
      '/images/street_2.png',
      '/images/street_3.png',
      '/images/street_4.png',
      '/images/street_5.png',
      '/images/street_6.png',
      '/images/street_7.png',
      '/images/street_8.png',
      '/images/street_9.png',
      '/images/street_10.png',
      '/images/street_11.png',
      '/images/street_12.png',
    ],
  },
  {
    id: 'portraits',
    title: 'Portraits',
    icon: User,
    image: '/images/portrait_2.png',
    images: [
      '/images/portrait_1.png',
      '/images/portrait_2.png',
      '/images/portrait_3.png',
      '/images/portrait_4.png',
      '/images/portrait_5.png',
      '/images/portrait_6.png',
      '/images/portrait_7.png',
      '/images/portrait_8.png',
      '/images/portrait_9.png',
      '/images/portrait_10.png',
    ],
  },
  {
    id: 'fashion',
    title: 'Fashion',
    icon: Shirt,
    image: '/images/fashion_1.png',
    images: [
      '/images/fashion_1.png',
      '/images/fashion_2.png',
      '/images/fashion_3.png',
      '/images/fashion_4.png',
    ],
  },
  {
    id: 'events',
    title: 'Events',
    icon: Calendar,
    image: '/images/event_1.png',
    images: [
      '/images/event_1.png',
      '/images/event_3.jpeg',
      '/images/event_2.png',
    ],
  },
  {
    id: 'blackwhite',
    title: 'Black & White',
    icon: Palette,
    image: '/images/bw_5.png',
    images: [
      '/images/bw_1.png',
      '/images/bw_2.png',
      '/images/bw_3.png',
      '/images/bw_4.png',
      '/images/bw_5.png',
      '/images/bw_6.png',
      '/images/bw_7.png',
      '/images/bw_8.png',
      '/images/bw_9.png',
      '/images/bw_10.png',
      '/images/bw_11.png',
    ],
  },
  {
    id: 'cinematic',
    title: 'Cinematic Shoots',
    icon: Film,
    image: '/images/cinematic_1.png',
    images: [
      '/images/cinematic_1.png',
      '/images/cinematic_2.png',
      '/images/cinematic_3.png',
      '/images/cinematic_4.png',
      '/images/cinematic_5.png',
      '/images/cinematic_6.png',
      '/images/cinematic_7.png',
      '/images/cinematic_8.png',
      '/images/cinematic_9.png',
      '/images/cinematic_10.png',
    ],
  },
];

export default function PortfolioCategories() {
  const [selectedCategory, setSelectedCategory] = useState<{
    title: string;
    images: string[];
  } | null>(null);
  return (
    <section id="portfolio" className="py-32 px-6 lg:px-12 bg-black">
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
            Portfolio
          </h2>
          <p className="text-white/60 text-lg tracking-wide">Explore my visual journey across genres</p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCategory({ title: category.title, images: category.images })}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  {/* Icon */}
                  <motion.div
                    className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon className="w-8 h-8 text-white/80" strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl mb-2 tracking-wide" style={{ fontWeight: 300 }}>
                    {category.title}
                  </h3>

                  {/* Count */}
                  <p className="text-white/50 text-sm tracking-widest uppercase">
                  {/* {category.count} */}
                  {category.images.length} Photos
                  </p>

                  {/* Hover Line */}
                  <motion.div
                    className="mt-4 h-px bg-white/30"
                    initial={{ width: '40px' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Glassmorphism Border */}
                <div className="absolute inset-0 border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Category Viewer Modal */}
        <CategoryViewer
          isOpen={selectedCategory !== null}
          onClose={() => setSelectedCategory(null)}
          categoryTitle={selectedCategory?.title || ''}
          categoryImages={selectedCategory?.images || []}
        />
      </div>
    </section>
  );
}

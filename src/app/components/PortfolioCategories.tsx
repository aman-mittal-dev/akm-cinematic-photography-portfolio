import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, User, Shirt, Calendar, Palette, Film } from 'lucide-react';
import CategoryViewer from './CategoryViewer';

const categories = [
  {
    id: 'street',
    title: 'Street Photography',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1580852300513-9b50125bf293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    // count: '120+ Photos',
    images: [
      'https://images.unsplash.com/photo-1580852300513-9b50125bf293?w=1200',
      'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=1200',
      'https://images.unsplash.com/photo-1488240339625-c4014e114224?w=1200',
      'https://images.unsplash.com/photo-1605076896228-086cda8868c9?w=1200',
      'https://images.unsplash.com/photo-1651936717841-1dba4ff5d7a6?w=1200',
      'https://images.unsplash.com/photo-1637100000773-67c90fced16a?w=1200',
    ],
  },
  {
    id: 'portraits',
    title: 'Portraits',
    icon: User,
    image: 'https://images.unsplash.com/photo-1575876402495-fe202e1d3732?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    // count: '95+ Photos',
    images: [
      'https://images.unsplash.com/photo-1575876402495-fe202e1d3732?w=1200',
      'https://images.unsplash.com/photo-1608186336271-53313eeaf864?w=1200',
      'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=1200',
      'https://images.unsplash.com/photo-1605076896228-086cda8868c9?w=1200',
      'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=1200',
    ],
  },
  {
    id: 'fashion',
    title: 'Fashion',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1608186336271-53313eeaf864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    // count: '78+ Photos',
    images: [
      'https://images.unsplash.com/photo-1608186336271-53313eeaf864?w=1200',
      'https://images.unsplash.com/photo-1608186286925-8c0e1c1fbeac?w=1200',
      'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=1200',
      'https://images.unsplash.com/photo-1575876402495-fe202e1d3732?w=1200',
    ],
  },
  {
    id: 'events',
    title: 'Events',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    // count: '150+ Photos',
    images: [
      'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=1200',
      'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=1200',
      'https://images.unsplash.com/photo-1488240339625-c4014e114224?w=1200',
      'https://images.unsplash.com/photo-1651936717841-1dba4ff5d7a6?w=1200',
      'https://images.unsplash.com/photo-1637100000773-67c90fced16a?w=1200',
    ],
  },
  {
    id: 'blackwhite',
    title: 'Black & White',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1608186286925-8c0e1c1fbeac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    // count: '65+ Photos',
    images: [
      'https://images.unsplash.com/photo-1608186286925-8c0e1c1fbeac?w=1200',
      'https://images.unsplash.com/photo-1605076896228-086cda8868c9?w=1200',
      'https://images.unsplash.com/photo-1637100000773-67c90fced16a?w=1200',
      'https://images.unsplash.com/photo-1580852300513-9b50125bf293?w=1200',
    ],
  },
  {
    id: 'cinematic',
    title: 'Cinematic Shoots',
    icon: Film,
    image: 'https://images.unsplash.com/photo-1651936717841-1dba4ff5d7a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    // count: '42+ Photos',
    images: [
      'https://images.unsplash.com/photo-1651936717841-1dba4ff5d7a6?w=1200',
      'https://images.unsplash.com/photo-1488240339625-c4014e114224?w=1200',
      'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=1200',
      'https://images.unsplash.com/photo-1608186336271-53313eeaf864?w=1200',
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

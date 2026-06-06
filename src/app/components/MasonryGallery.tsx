import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ImmersiveGalleryViewerProps {
  images: { id: number; url: string; type: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function ImmersiveGalleryViewer({ images, currentIndex, onClose, onNavigate }: ImmersiveGalleryViewerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onNavigate, onClose]);

  const getPhotoDetails = (index: number) => {
    const titles = [
      'Vanishing Point',
      'Low Light Memory',
      'Quiet Crossing',
      'Silver Hour',
      'Hidden Signal',
      'After Dark',
      'Soft Geometry',
      'Still Motion',
    ];

    return {
      title: titles[index % titles.length],
      meta: 'FEATURED WORKS - 2024',
      description:
        'Mist, shadow, and light are held in a quiet frame, giving the image a slower cinematic pulse.',
    };
  };

  const viewer = (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 px-5 py-8 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        className="absolute right-5 top-5 z-[110] grid h-11 w-11 place-items-center text-white/70 transition-colors hover:text-white md:right-8 md:top-8"
        onClick={onClose}
        aria-label="Close photo preview"
      >
        <X className="h-7 w-7" strokeWidth={1.5} />
      </button>

      {currentIndex > 0 && (
        <button
          className="absolute left-3 top-1/2 z-[110] grid h-12 w-12 -translate-y-1/2 place-items-center text-white/50 transition-colors hover:text-white md:left-8"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-9 w-9" strokeWidth={1.5} />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          className="absolute right-3 top-1/2 z-[110] grid h-12 w-12 -translate-y-1/2 place-items-center text-white/50 transition-colors hover:text-white md:right-8"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          aria-label="Next photo"
        >
          <ChevronRight className="h-9 w-9" strokeWidth={1.5} />
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="w-full max-w-5xl"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 18 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex].url}
            alt={`Gallery ${images[currentIndex].id}`}
            className="mx-auto max-h-[70vh] w-auto max-w-full object-contain"
            draggable={false}
          />

          <div className="mx-auto mt-5 max-w-3xl text-left">
            <h3 className="text-base tracking-wide text-white" style={{ fontWeight: 400 }}>
              {getPhotoDetails(currentIndex).title}
            </h3>
            <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-amber-200/70">
              {getPhotoDetails(currentIndex).meta}
            </p>
            <p className="mt-3 max-w-xl text-xs leading-5 text-white/48">
              {getPhotoDetails(currentIndex).description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );

  return createPortal(viewer, document.body);
}

const galleryImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=800', type: 'image' },
  { id: 2, url: 'https://images.unsplash.com/photo-1608186336271-53313eeaf864?w=800', type: 'image' },
  { id: 3, url: 'https://images.unsplash.com/photo-1580852300513-9b50125bf293?w=800', type: 'image' },
  { id: 4, url: 'https://images.unsplash.com/photo-1608186286925-8c0e1c1fbeac?w=800', type: 'image' },
  { id: 5, url: 'https://images.unsplash.com/photo-1651936717841-1dba4ff5d7a6?w=800', type: 'image' },
  { id: 6, url: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=800', type: 'image' },
  { id: 7, url: 'https://images.unsplash.com/photo-1488240339625-c4014e114224?w=800', type: 'image' },
  { id: 8, url: 'https://images.unsplash.com/photo-1575876402495-fe202e1d3732?w=800', type: 'image' },
  { id: 9, url: 'https://images.unsplash.com/photo-1637100000773-67c90fced16a?w=800', type: 'image' },
  { id: 10, url: 'https://images.unsplash.com/photo-1605076896228-086cda8868c9?w=800', type: 'image' },
  { id: 11, url: 'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=800', type: 'image' },
  { id: 12, url: 'https://images.unsplash.com/photo-1608186336271-53313eeaf864?w=800', type: 'image' },
];

export default function MasonryGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < galleryImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  return (
    <section id="gallery" className="py-32 px-6 lg:px-12 bg-black">
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
            Featured Works
          </h2>
          <p className="text-white/60 text-lg tracking-wide">A curated selection of my finest captures</p>
        </motion.div>

        {/* Masonry Grid */}
        <Masonry
          columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}
          gutter="16px"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="group relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.url}
                alt={`Gallery ${image.id}`}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  className="text-center"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white text-sm tracking-[0.3em] uppercase">View</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Fullscreen Preview - Immersive Mode */}
      <AnimatePresence>
        {selectedImage !== null && (
          <ImmersiveGalleryViewer
            images={galleryImages}
            currentIndex={selectedImage}
            onClose={() => setSelectedImage(null)}
            onNavigate={setSelectedImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

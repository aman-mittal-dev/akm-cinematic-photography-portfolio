import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface CategoryViewerProps {
  isOpen: boolean;
  onClose: () => void;
  categoryTitle: string;
  categoryImages: string[];
}

export default function CategoryViewer({ isOpen, onClose, categoryTitle, categoryImages }: CategoryViewerProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null && e.key === 'ArrowLeft') handlePrevious();
      if (selectedImage !== null && e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') {
        selectedImage !== null ? setSelectedImage(null) : onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedImage, categoryImages.length, onClose]);

  const handlePrevious = () => {
    setSelectedImage((prev) => {
      if (prev === null || categoryImages.length === 0) return prev;
      return prev > 0 ? prev - 1 : categoryImages.length - 1;
    });
  };

  const handleNext = () => {
    setSelectedImage((prev) => {
      if (prev === null || categoryImages.length === 0) return prev;
      return prev < categoryImages.length - 1 ? prev + 1 : 0;
    });
  };

  const getPhotoDetails = (index: number) => {
    const titles = [
      'Vanishing Point',
      'Quiet Frame',
      'Midnight Geometry',
      'Soft Signal',
      'Last Light',
      'Hidden Motion',
      'Silver Hour',
      'Afterimage',
    ];

    return {
      title: titles[index % titles.length],
      meta: `${categoryTitle.toUpperCase()} - 2024`,
      description:
        'A cinematic frame shaped by shadow, atmosphere, and the small human details that make a moment linger.',
    };
  };

  const viewer = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="sticky top-0 z-[120] bg-black/80 px-5 py-5 backdrop-blur-md lg:px-10">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
              <div>
                <h2 className="text-2xl tracking-wide md:text-4xl" style={{ fontWeight: 300 }}>
                  {categoryTitle}
                </h2>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/45">
                  {categoryImages.length} Photos
                </p>
              </div>

              <button
                className="grid h-11 w-11 place-items-center text-white/70 transition-colors hover:text-white"
                onClick={onClose}
                aria-label="Close category gallery"
              >
                <X className="h-7 w-7" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 lg:px-10">
            <Masonry columnsCountBreakPoints={{ 350: 1, 700: 2, 1024: 3 }} gutter="10px">
              {categoryImages.map((image, index) => (
                <motion.button
                  key={`${image}-${index}`}
                  type="button"
                  className="group relative block w-full overflow-hidden bg-white/5 text-left focus:outline-none"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${categoryTitle} ${index + 1}`}
                    className="block h-auto w-full transition duration-700 group-hover:scale-105 group-hover:brightness-75"
                    loading="lazy"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-full border-x border-b border-white/0 transition-colors duration-300 group-hover:border-white/30" />
                </motion.button>
              ))}
            </Masonry>
          </div>

          <AnimatePresence>
            {selectedImage !== null && (
              <motion.div
                className="fixed inset-0 z-[140] flex items-center justify-center bg-black/88 px-5 py-8 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
              >
                <button
                  className="absolute right-5 top-5 z-[150] grid h-11 w-11 place-items-center text-white/70 transition-colors hover:text-white md:right-8 md:top-8"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close photo preview"
                >
                  <X className="h-7 w-7" strokeWidth={1.5} />
                </button>

                {categoryImages.length > 1 && (
                  <>
                    <button
                      className="absolute left-3 top-1/2 z-[150] grid h-12 w-12 -translate-y-1/2 place-items-center text-white/50 transition-colors hover:text-white md:left-8"
                      onClick={(event) => {
                        event.stopPropagation();
                        handlePrevious();
                      }}
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-9 w-9" strokeWidth={1.5} />
                    </button>

                    <button
                      className="absolute right-3 top-1/2 z-[150] grid h-12 w-12 -translate-y-1/2 place-items-center text-white/50 transition-colors hover:text-white md:right-8"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleNext();
                      }}
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-9 w-9" strokeWidth={1.5} />
                    </button>
                  </>
                )}

                <motion.div
                  key={selectedImage}
                  className="w-full max-w-5xl"
                  initial={{ opacity: 0, scale: 0.96, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 18 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <img
                    src={categoryImages[selectedImage]}
                    alt={`${categoryTitle} ${selectedImage + 1}`}
                    className="mx-auto max-h-[70vh] w-auto max-w-full object-contain"
                    draggable={false}
                  />

                  <div className="mx-auto mt-5 max-w-3xl text-left">
                    <h3 className="text-base tracking-wide text-white" style={{ fontWeight: 400 }}>
                      {getPhotoDetails(selectedImage).title}
                    </h3>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-amber-200/70">
                      {getPhotoDetails(selectedImage).meta}
                    </p>
                    <p className="mt-3 max-w-xl text-xs leading-5 text-white/48">
                      {getPhotoDetails(selectedImage).description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(viewer, document.body);
}

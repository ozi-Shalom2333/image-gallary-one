import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Filter, Sun, Moon } from 'lucide-react';

// Sample images with categories
const sampleImages = [
  {
    id: 1,
    src: 'https://img.freepik.com/premium-photo/black-car-with-number-8-front_939992-5249.jpg?ga=GA1.1.868698378.1750583670&semt=ais_hybrid&w=740',
    title: 'Performance SUVs',
    category: 'Cars',
    date: '2024-03-15'
  },
  {
    id: 2,
    src: 'https://img.freepik.com/free-photo/high-rise-building-nighttime_410324-57.jpg?semt=ais_hybrid&w=740',
    title: 'City Nights',
    category: 'Urban',
    date: '2024-03-10'
  },
  {
    id: 3,
    src: 'https://mclaren.scene7.com/is/image/mclaren/720S-Coupe_hero:crop-16x9?wid=1920&hei=1080',
    title: 'Track Focused',
    category: 'Cars',
    date: '2024-03-08'
  },
  {
    id: 4,
    src: 'https://img.freepik.com/premium-photo/woman-with-curly-hair-blue-jacket_1331025-1304.jpg?semt=ais_hybrid&w=740',
    title: 'Portrait Study',
    category: 'Portraits',
    date: '2024-03-05'
  },
  {
    id: 5,
    src: 'https://medias.residences-immobilier.com/articles_RI/images/Photo_18321_1530.jpg',
    title: 'Extreme Speed',
    category: 'Cars',
    date: '2024-03-01'
  },
  {
    id: 6,
    src: 'https://manifatturaautomobilitorino.com/img/cars/apollo/MAT_Apollo_Road.jpg',
    title: 'High Performance',
    category: 'Cars',
    date: '2024-02-28'
  },
  {
    id: 7,
    src: 'https://img.freepik.com/free-photo/luxury-car-speeds-by-modern-building-dusk-generative-ai_188544-8048.jpg?ga=GA1.1.868698378.1750583670&semt=ais_hybrid&w=740',
    title: 'Lurxury Car',
    category: 'Cars',
    date: '2024-02-25'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=650&fit=crop',
    title: 'City Reflections',
    category: 'Urban',
    date: '2024-02-20'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=600&fit=crop',
    title: 'Lakeside Dawn',
    category: 'Nature',
    date: '2024-02-15'
  },
   {
    id: 10,
    src: 'https://img.freepik.com/premium-photo/black-sports-car-with-headlights-headlights_951586-147075.jpg?ga=GA1.1.868698378.1750583670&semt=ais_hybrid&w=740',
    title: 'Hypercar',
    category: 'Cars',
    date: '2025-02-20'
  },
   {
    id: 11,
    src: 'https://img.freepik.com/premium-photo/car-future-is-supercar_1153744-185593.jpg?ga=GA1.1.868698378.1750583670&semt=ais_hybrid&w=740',
    title: 'Supercars',
    category: 'Cars',
    date: '2024-02-25'
  },
   {
    id: 12,
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop',
    title: 'Ocean Waves',
    category: 'Nature',
    date: '2024-02-28'
  },
   {
    id: 13,
    src: 'https://car-images.bauersecure.com/wp-images/3424/092-bentley-continental-gt-core-front-silver.jpg',
    title: 'Coupes',
    category: 'Cars',
    date: '2024-03-08'
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=550&fit=crop',
    title: 'Urban Architecture',
    category: 'Urban',
    date: '2024-03-01'
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    title: 'Evening Portrait',
    category: 'Portraits',
    date: '2024-02-25'
  },
  {
    id: 16,
    src: ' https://hips.hearstapps.com/hmg-prod/images/2024-porsche-911-gt3-rs-138-64ecda037334a.jpg?crop=0.628xw:0.529xh;0.176xw,0.281xh&resize=2048:',
    title: 'Astetics',
    category: 'Cars',
    date: '2024-02-25'
  },
   {
    id: 17,
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=700&fit=crop',
    title: 'Forest Trail',
    category: 'Nature',
    date: '2024-03-08'
  },
   {
    id: 18,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    title: 'Mountain Serenity',
    category: 'Nature',
    date: '2024-03-15'
  },
  
];

const categories = ['All', 'Nature', 'Urban', 'Portraits', 'Cars'];

const MomentsGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const filteredImages = filter === 'All' 
    ? sampleImages 
    : sampleImages.filter(img => img.category === filter);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex + 1 >= filteredImages.length ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex - 1 < 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, filteredImages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
    }`}>
      {/* Header */}
      <motion.header 
        className="relative overflow-hidden p-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-10" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Moments in Motion
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-6">
            A curated collection of life's beautiful moments
          </p>
          
          <motion.button
            onClick={toggleTheme}
            className={`flex items-center gap-2 mx-auto px-6 py-3 rounded-full transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </motion.button>
        </div>
      </motion.header>

      {/* Filter Bar */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Filter className="text-purple-500" size={24} />
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === category
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Loading Screen */}
      {loading && (
        <motion.div 
          className="flex items-center justify-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Gallery Grid */}
      {!loading && (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
                whileHover={{ 
                  scale: 1.03,
                  rotateY: 5,
                  rotateX: 5
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedImage(image)}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                style={{ perspective: 1000 }}
              >
                <div className="aspect-[3/4]">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    onLoad={() => handleImageLoad(image.id)}
                    loading="lazy"
                  />
                </div>
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm opacity-80">{image.category} • {image.date}</p>
                </motion.div>

                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  image.category === 'Nature' ? 'bg-green-500 text-white' :
                  image.category === 'Urban' ? 'bg-blue-500 text-white' :
                  'bg-purple-500 text-white'
                }`}>
                  {image.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (Math.abs(info.offset.x) > 100) {
                  navigateImage(info.offset.x > 0 ? 'prev' : 'next');
                }
              }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                <p className="text-gray-300">{selectedImage.category} • {selectedImage.date}</p>
              </motion.div>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MomentsGallery;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Clock, Trophy, Star, ChevronLeft, ChevronRight, Users, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Games = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState(0);

  const handleBackToLMS = () => {
    navigate('/');
  };

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCarouselIndex((prevIndex) => 
        prevIndex === carouselGames.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Carousel images array with game titles
  const carouselGames = [
    {
      image: '/lovable-uploads/a91155d3-abe1-4bd8-bdb8-7d9ca4fb6797.png',
      title: 'ELDEN RING NIGHTREIGN',
      subtitle: 'Embark on an epic co-op survival adventure through the mystical and dangerous lands of the Lands Between. Face nightmarish creatures and uncover ancient secrets.'
    },
    {
      image: '/lovable-uploads/be3b48e1-7d93-4eaa-9c14-4a56f3cc9a4c.png',
      title: 'SHADOW LEGENDS',
      subtitle: 'Master the art of stealth and combat in this epic action-adventure game set in ancient realms.'
    },
    {
      image: '/lovable-uploads/128d49b8-6ef8-44e8-bb80-3adffb0374a8.png',
      title: 'MYSTIC WARRIORS',
      subtitle: 'Join forces with legendary warriors in this immersive fantasy RPG experience.'
    },
    {
      image: '/lovable-uploads/aef7dc2d-7ba4-4cdd-8928-4fce43fbf483.png',
      title: 'CYBER REBELLION',
      subtitle: 'Navigate through a dystopian future where technology and humanity collide.'
    },
    {
      image: '/lovable-uploads/a607dd35-3b56-4af1-b552-1b30ad72b495.png',
      title: 'OCEAN DEPTHS',
      subtitle: 'Explore the mysterious underwater world filled with ancient treasures and dangers.'
    },
    {
      image: '/lovable-uploads/fcc32822-3288-446e-a7ac-105d1e7a5801.png',
      title: 'FIRE KINGDOMS',
      subtitle: 'Rule over mystical kingdoms in this strategic empire-building adventure.'
    },
    {
      image: '/lovable-uploads/a4832fb7-1a5e-45c2-a322-c6eb0a9fc3e3.png',
      title: 'SPACE ODYSSEY',
      subtitle: 'Journey through the cosmos in this epic space exploration game.'
    },
    {
      image: '/lovable-uploads/c61e2090-5464-491f-99bd-aa7c2e07d7bd.png',
      title: 'DARK FANTASY',
      subtitle: 'Delve into a world of magic and mystery in this dark fantasy adventure.'
    },
    {
      image: '/lovable-uploads/20941d71-e30a-4b32-a37a-7e82e638ea56.png',
      title: 'MOUNTAIN QUEST',
      subtitle: 'Conquer treacherous peaks and discover hidden secrets in this mountaineering adventure.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const sophomoreGames = [
    {
      id: 'spc',
      title: 'Secured Party Creditor',
      image: '/lovable-uploads/cccb68d6-65ed-4dae-aeaa-cccf4c547bfd.png',
      duration: '25 min',
      points: 150,
      description: 'Learn the fundamentals of becoming a secured party creditor and understanding your rights in commercial transactions.',
      category: 'SOPHOMORE: BECOME PRIVATE'
    },
    {
      id: 'conventions',
      title: 'Conventions',
      image: '/lovable-uploads/4b0fff39-0fc8-461c-8467-e7bcd8ef11a9.png',
      duration: '20 min',
      points: 100,
      description: 'Master the essential conventions and protocols in private commerce and legal frameworks.',
      category: 'SOPHOMORE: BECOME PRIVATE'
    },
    {
      id: 'ucc-financing',
      title: 'UCC Financing Statement',
      image: '/lovable-uploads/f7ecec00-4adf-4e62-a7df-6a7e60017bd6.png',
      duration: '30 min',
      points: 200,
      description: 'Understand how to properly file and manage UCC financing statements for asset protection.',
      category: 'SOPHOMORE: BECOME PRIVATE'
    },
    {
      id: 'regional-filing',
      title: 'Regional Filing Information',
      image: '/lovable-uploads/a93285b2-27a5-4129-b384-4fc162a29d4c.png',
      duration: '18 min',
      points: 80,
      description: 'Navigate regional filing requirements and jurisdictional considerations for legal documents.',
      category: 'SOPHOMORE: BECOME PRIVATE'
    },
    {
      id: 'spc-trust',
      title: 'SPC Trust Instructions',
      image: '/lovable-uploads/cbdd6505-74fc-4d04-8885-e14357c14cef.png',
      duration: '35 min',
      points: 250,
      description: 'Advanced strategies for setting up and managing SPC trust structures effectively.',
      category: 'SOPHOMORE: BECOME PRIVATE'
    },
    {
      id: 'banking-resolution',
      title: 'Banking Resolution',
      image: '/lovable-uploads/3736f51e-e1d6-4350-b97c-45016ec3219b.png',
      duration: '28 min',
      points: 180,
      description: 'Learn effective methods for resolving banking disputes and protecting your financial interests.',
      category: 'SOPHOMORE: BECOME PRIVATE'
    }
  ];

  const juniorGames = [
    {
      id: 'what-is-credit',
      title: 'What is Credit',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=600&fit=crop',
      duration: '15 min',
      points: 75,
      description: 'Fundamental understanding of credit systems and how they impact your financial life.',
      category: 'JUNIOR: OPERATE PRIVATE'
    },
    {
      id: 'credit-reports',
      title: 'Credit Reports',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop',
      duration: '22 min',
      points: 120,
      description: 'Learn how to read, understand, and analyze your credit reports effectively.',
      category: 'JUNIOR: OPERATE PRIVATE'
    },
    {
      id: 'establishing-credit',
      title: 'Establishing Credit',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop',
      duration: '25 min',
      points: 140,
      description: 'Strategic approaches to building and establishing a strong credit foundation.',
      category: 'JUNIOR: OPERATE PRIVATE'
    },
    {
      id: 'control-credit',
      title: 'Control Your Credit',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=600&fit=crop',
      duration: '30 min',
      points: 180,
      description: 'Advanced techniques for taking control of your credit profile and financial destiny.',
      category: 'JUNIOR: OPERATE PRIVATE'
    },
    {
      id: 'credit-disputes',
      title: 'Credit Disputes',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=600&fit=crop',
      duration: '27 min',
      points: 170,
      description: 'Master the art of disputing inaccurate information on your credit reports.',
      category: 'JUNIOR: OPERATE PRIVATE'
    },
    {
      id: 'importance-credit',
      title: 'Importance of Credit',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=600&fit=crop',
      duration: '20 min',
      points: 110,
      description: 'Understand why credit is crucial for your financial success and life opportunities.',
      category: 'JUNIOR: OPERATE PRIVATE'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const GameCard = ({ game, onClick }) => (
    <motion.div
      className="group cursor-pointer relative"
      whileHover={{ y: -15, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="bg-gradient-to-b from-gray-900/95 to-black/95 border-2 border-gray-700/40 backdrop-blur-xl text-white hover:border-cyan-500/60 transition-all duration-700 overflow-hidden h-[380px] w-[280px] relative shadow-2xl hover:shadow-cyan-500/40 rounded-xl">
        <CardContent className="p-0 h-full relative">
          {/* Enhanced Gaming-Style Background Effects */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-cyan-500/0 group-hover:from-blue-600/30 group-hover:via-purple-600/40 group-hover:to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-all duration-1000 z-10"
            animate={{
              background: [
                "linear-gradient(135deg, rgba(37, 99, 235, 0) 0%, rgba(147, 51, 234, 0) 50%, rgba(6, 182, 212, 0) 100%)",
                "linear-gradient(135deg, rgba(37, 99, 235, 0.4) 0%, rgba(147, 51, 234, 0.5) 50%, rgba(6, 182, 212, 0.4) 100%)"
              ]
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Main Game Image with Gaming Enhancement */}
          <div className="relative h-[280px] overflow-hidden">
            <motion.img 
              src={game.image} 
              alt={game.title}
              className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-700"
              whileHover={{ 
                scale: 1.1,
                filter: "brightness(1.2) saturate(1.3) contrast(1.1)"
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            
            {/* Gaming-Style Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />

            {/* Epic Gaming Play Button */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"
              initial={{ scale: 0, rotate: -180 }}
              whileHover={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="w-24 h-24 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-cyan-400/60 shadow-2xl relative overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(37, 99, 235, 0.4)",
                    "0 0 50px rgba(37, 99, 235, 0.8), 0 0 80px rgba(6, 182, 212, 0.6)",
                    "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(37, 99, 235, 0.4)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Play className="h-12 w-12 text-white ml-2 drop-shadow-2xl" />
                
                {/* Rotating Border Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-cyan-400 to-blue-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>

            {/* Gaming Particle Effects */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg"
                  style={{
                    left: `${15 + (i % 4) * 20}%`,
                    top: `${20 + Math.floor(i / 4) * 25}%`,
                  }}
                  animate={{
                    y: [-15, -40, -15],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Epic Corner Lighting Effect */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Epic Game Title Section with Cinematic Animation */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/95 via-black/80 to-transparent p-6 flex items-end z-30"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className="w-full"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h3 
                className="font-bold text-xl text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500 drop-shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {game.title}
              </motion.h3>
              
              {/* Gaming Stats Bar */}
              <motion.div 
                className="flex items-center gap-4 text-sm text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span>{game.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-400" />
                  <span>{game.points}pts</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Epic Animated Border with Gaming Flow */}
          <motion.div 
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-40"
            style={{
              background: "linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.8), transparent, rgba(37, 99, 235, 0.8), transparent, rgba(147, 51, 234, 0.6), transparent)",
              backgroundSize: "400% 400%",
              padding: "2px",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-[2px] bg-gradient-to-b from-gray-900/95 to-black/95 rounded-xl" />
          </motion.div>

          {/* Epic Shimmer Gaming Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-20 rounded-xl overflow-hidden"
            initial={false}
            animate={{
              background: [
                "linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.15) 50%, transparent 75%)",
                "linear-gradient(110deg, transparent 25%, rgba(6, 182, 212, 0.3) 50%, transparent 75%)"
              ],
              backgroundPosition: ["-200% 0", "300% 0"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Gaming Glow Effect */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );

  const ScrollButton = ({ direction, onClick, disabled }) => (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`absolute ${direction === 'left' ? '-left-6' : '-right-6'} top-1/2 -translate-y-1/2 z-20 bg-gray-800/90 hover:bg-gray-700/90 text-white p-4 rounded-full shadow-2xl backdrop-blur-sm transition-all duration-300 ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 cursor-pointer hover:shadow-cyan-500/25'} border border-gray-600/50`}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      style={{ pointerEvents: disabled ? 'none' : 'auto' }}
    >
      {direction === 'left' ? (
        <ChevronLeft className="h-6 w-6" />
      ) : (
        <ChevronRight className="h-6 w-6" />
      )}
    </motion.button>
  );

  const GameSection = ({ title, games, gradient }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const cardWidth = 300;
    const visibleCards = 4;
    const maxScroll = Math.max(0, (games.length - visibleCards) * cardWidth);

    const handleScroll = (direction) => {
      if (direction === 'left') {
        setScrollPosition(Math.max(0, scrollPosition - cardWidth));
      } else {
        setScrollPosition(Math.min(maxScroll, scrollPosition + cardWidth));
      }
    };

    return (
      <motion.div 
        className="mb-16"
        variants={itemVariants}
      >
        <motion.h2 
          className={`text-4xl font-bold mb-8 bg-gradient-to-r ${gradient} bg-clip-text text-transparent text-center`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {title}
        </motion.h2>
        
        <div className="relative px-8">
          <ScrollButton 
            direction="left" 
            onClick={() => handleScroll('left')}
            disabled={scrollPosition === 0}
          />
          <ScrollButton 
            direction="right" 
            onClick={() => handleScroll('right')}
            disabled={scrollPosition >= maxScroll}
          />
          
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-5 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GameCard 
                    game={game} 
                    onClick={() => handleGameClick(game)} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
        {/* Header */}
        <div className="relative z-10 container mx-auto px-6 py-8">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleBackToGames}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Games
            </Button>
            
            <div className="flex items-center gap-4">
              <Badge className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 backdrop-blur-sm">
                {selectedGame.category}
              </Badge>
            </div>
          </motion.div>
        </div>

        {/* Game Hero Section */}
        <motion.div
          className="w-full h-80 relative overflow-hidden mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src={selectedGame.image} 
            alt={selectedGame.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Game Title Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.h1 
                className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selectedGame.title}
              </motion.h1>
              <motion.div 
                className="flex items-center justify-center gap-8 text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Clock className="h-6 w-6 mr-3 text-cyan-400" />
                  <span className="text-white">{selectedGame.duration}</span>
                </div>
                <div className="flex items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Trophy className="h-6 w-6 mr-3 text-yellow-400" />
                  <span className="text-white">{selectedGame.points} Points</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Game Content */}
        <div className="container mx-auto px-6 pb-12">
          <motion.div
            className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Game Description */}
            <motion.div
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-cyan-400 flex items-center">
                <Target className="h-8 w-8 mr-3" />
                Game Overview
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {selectedGame.description}
              </p>

              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 text-xl px-12 py-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
                >
                  <Play className="h-8 w-8 mr-4" />
                  Start Playing
                </Button>
              </motion.div>
            </motion.div>

            {/* Game Rules */}
            <motion.div
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-400 flex items-center">
                <Award className="h-8 w-8 mr-3" />
                Game Rules & Objectives
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Objectives
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">✓</span>
                      Complete all interactive modules successfully
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">✓</span>
                      Score minimum 80% on all assessments
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">✓</span>
                      Apply learned concepts in practice scenarios
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">✓</span>
                      Earn achievement badges and rewards
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Game Rules
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3 mt-1">•</span>
                      Follow sequential lesson progression
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3 mt-1">•</span>
                      Complete within the allocated time limit
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3 mt-1">•</span>
                      Maintain focus and attention throughout
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3 mt-1">•</span>
                      Review mistakes to improve performance
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden">
      {/* Hero Section with Background Carousel - Improved Height and Contrast */}
      <div className="relative h-[75vh] overflow-hidden">
        {/* Main Background Image with Better Visibility */}
        <motion.div
          className="absolute inset-0"
          key={selectedCarouselIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${carouselGames[selectedCarouselIndex].image})`,
              filter: 'brightness(0.7) contrast(1.4) saturate(1.2)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>

        {/* Back to LMS Button */}
        <div className="absolute top-8 left-8 z-30">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBackToLMS}
            className="bg-black/50 border-white/20 text-white hover:bg-black/70 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to LMS
          </Button>
        </div>

        {/* Game Title and Description - Adjusted Size */}
        <div className="absolute inset-0 flex items-center justify-start z-20">
          <div className="container mx-auto px-8">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-wider drop-shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {carouselGames[selectedCarouselIndex].title}
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {carouselGames[selectedCarouselIndex].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 text-xl px-12 py-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
                >
                  <Play className="h-6 w-6 mr-3" />
                  View More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Horizontal Carousel at Bottom Right */}
        <motion.div
          className="absolute bottom-8 right-8 z-30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center gap-4 bg-black/60 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-2xl">
            {/* Previous Button */}
            <motion.button
              onClick={() => setSelectedCarouselIndex(selectedCarouselIndex === 0 ? carouselGames.length - 1 : selectedCarouselIndex - 1)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white hover:scale-110 border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            {/* Carousel Images */}
            <div className="flex gap-3">
              {carouselGames.map((game, index) => (
                <motion.div
                  key={index}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedCarouselIndex === index 
                      ? 'border-blue-400 shadow-lg shadow-blue-400/50 scale-110' 
                      : 'border-white/30 hover:border-white/60 hover:scale-105'
                  }`}
                  whileHover={{ scale: selectedCarouselIndex === index ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCarouselIndex(index)}
                >
                  <img
                    src={game.image}
                    alt={`Game ${index + 1}`}
                    className="w-24 h-16 object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={() => setSelectedCarouselIndex(selectedCarouselIndex === carouselGames.length - 1 ? 0 : selectedCarouselIndex + 1)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white hover:scale-110 border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Game Sections */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Game Sections */}
        <GameSection 
          title="SOPHOMORE: BECOME PRIVATE"
          games={sophomoreGames}
          gradient="from-green-400 to-emerald-500"
        />
        
        <GameSection 
          title="JUNIOR: OPERATE PRIVATE"
          games={juniorGames}
          gradient="from-blue-400 to-cyan-500"
        />
      </motion.div>
    </div>
  );
};

export default Games;
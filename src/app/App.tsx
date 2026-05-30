import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { Heart, Sparkles, Calendar, Mail, Volume2, VolumeX, Star, Gift } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export default function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const heroImages = [
    '/images/IMG-20260530-WA0055.jpg',
    '/images/IMG-20260530-WA0056.jpg',
    '/images/IMG-20260530-WA0058.jpg',
    '/images/IMG-20260530-WA0064.jpg'
  ];

  // Ordered by attire: formal/dressed-up → semi-formal → casual
  const galleryImages = [
    '/images/IMG-20260530-WA0058.jpg',
    '/images/IMG-20260530-WA0063.jpg',
    '/images/IMG-20260530-WA0055.jpg',
    '/images/IMG-20260530-WA0056.jpg',
    '/images/IMG-20260530-WA0062.jpg',
    '/images/IMG-20260530-WA0061.jpg',
    '/images/IMG-20260530-WA0064.jpg',
    '/images/IMG-20260530-WA0057.jpg'
  ];

  const timelineEvents = [
    {
      date: '',
      title: 'How It All Began',
      story: 'It started with a blockchain assignment. We were working through it together, gisting and laughing the whole time — and somewhere in between the code and the conversation, I couldn\'t think of anything else. You clouded my head and my thinking, and I didn\'t mind one bit.',
      image: '/images/IMG-20260530-WA0057.jpg'
    },
    {
      date: '',
      title: 'The Pepper Soup Date',
      story: 'Hot pepper soup, warm laughter, and a table that felt too small for how big everything felt. That date showed me exactly who you are — someone who makes every ordinary moment feel like a celebration.',
      image: '/images/IMG-20260530-WA0055.jpg'
    },
    {
      date: '',
      title: 'Movie Night & Every Gift In Between',
      story: 'From the movie night to every thoughtful gift you\'ve placed in my hands — each one felt like you saying "I see you" without words. They are the most special moments of my life, and I treasure every single one.',
      image: '/images/IMG-20260530-WA0056.jpg'
    },
    {
      date: 'May 30, 2025',
      title: 'We Made It Official',
      story: 'The day we stopped pretending this was anything other than love. May 30th — the day I got to call you mine, and you got to call me yours. Everything before this was just the universe getting us ready.',
      image: '/images/IMG-20260530-WA0058.jpg'
    },
    {
      date: 'May 30, 2026',
      title: 'One Year — And I\'d Do It All Again',
      story: '365 days of choosing you. Of laughing until it hurts, growing together, and building something that feels like home. Happy anniversary, my love. This is just the beginning.',
      image: '/images/IMG-20260530-WA0064.jpg'
    }
  ];

  const reasonsCards = [
    'Your Smile - The way it lights up any room and turns my whole day around',
    'Your Kindness - How you pour yourself into everyone around you without a second thought',
    'Your Support - You believe in me even when I don\'t believe in myself',
    'Your Humor - Nobody makes me laugh the way you do, every single day',
    'Your Strength - The quiet courage you carry through everything life throws at you',
    'Your Heart - How deeply and fiercely you love — it takes my breath away',
    'Your Dreams - Because your passion for life makes me want to be better',
    'Just You - Simply being yourself is the greatest gift you\'ve ever given me'
  ];

  const filmVideos = [
    { src: '/images/VID-20260530-WA0053.mp4', title: 'Our Special Moment' },
    { src: '/images/VID-20260530-WA0059.mp4', title: 'Thinking About You Here' },
    { src: '/images/VID-20260530-WA0060.mp4', title: 'Happy Times' },
    { src: '/images/VID-20260530-WA0065.mp4', title: 'Beautiful Journey' },
    { src: '/images/VID-20260530-WA0066.mp4', title: 'Together Forever' }
  ];

  // Audio state & logic
  useEffect(() => {
    const audio = new Audio('/audio/song.mp3');
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  // Loading simulation
  useEffect(() => {
    if (loadingProgress < 100) {
      const timer = setTimeout(() => {
        setLoadingProgress(prev => Math.min(prev + 2, 100));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const welcomeTimer = setTimeout(() => setShowWelcome(true), 500);
      return () => clearTimeout(welcomeTimer);
    }
  }, [loadingProgress]);

  // Hero slideshow
  useEffect(() => {
    if (hasEntered) {
      const interval = setInterval(() => {
        setCurrentHeroImage(prev => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [hasEntered, heroImages.length]);

  const handleEnter = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio autoplay failed:", err);
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!hasEntered) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden">
        <FloatingParticles />

        <AnimatePresence mode="wait">
          {!showWelcome ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="relative">
                <motion.img
                  src="/images/IMG-20260530-WA0058.jpg"
                  alt="Our Anniversary"
                  className="w-64 h-64 rounded-full object-cover"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="128"
                    stroke="#C6A972"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 128}`}
                    strokeDashoffset={`${2 * Math.PI * 128 * (1 - loadingProgress / 100)}`}
                    className="transition-all duration-300"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(198, 169, 114, 0.5))' }}
                  />
                </svg>

                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-150px)`
                    }}
                    animate={{
                      rotate: [i * 45, i * 45 + 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    <Heart className="w-4 h-4" style={{ color: '#A26769' }} fill="#A26769" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-4xl font-serif"
                style={{ color: '#C6A972' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {loadingProgress}%
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center px-6 max-w-2xl"
            >
              <motion.p
                className="uppercase tracking-widest text-sm mb-6"
                style={{ color: '#C6A972' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Happy Anniversary
              </motion.p>

              <motion.h1
                className="font-serif mb-6"
                style={{ fontSize: '4rem', lineHeight: '1.2', color: '#222222' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                I Made This<br />For You, My Love
              </motion.h1>

              <motion.p
                className="text-lg mb-12 max-w-md mx-auto leading-relaxed"
                style={{ color: '#666666' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                One year of memories, all in one place — just for you, on our special day.
              </motion.p>

              <motion.button
                onClick={handleEnter}
                className="px-12 py-4 rounded-full text-lg transition-all hover:scale-105"
                style={{
                  backgroundColor: '#A26769',
                  color: '#FDFCF9'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Open Your Gift ♡
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      <FloatingParticles />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroImage}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={heroImages[currentHeroImage]}
              alt="Our memories"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p
            className="uppercase tracking-widest text-sm mb-6 text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            May 30, 2025 → May 30, 2026
          </motion.p>

          <motion.h1
            className="font-serif mb-6 text-white"
            style={{ fontSize: '5rem', lineHeight: '1.1' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            A Year Of<br />Loving You
          </motion.h1>

          <motion.p
            className="text-xl mb-12 text-white/90 max-w-xl mx-auto leading-relaxed italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Every laugh, every adventure, every quiet moment — this is our story, and it's my favourite one.
          </motion.p>

          <motion.div
            className="flex gap-6 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 rounded-full text-lg transition-all hover:scale-105"
              style={{ backgroundColor: '#FDFCF9', color: '#222222' }}
            >
              See Our Journey
            </button>
            <button
              onClick={() => document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 rounded-full text-lg transition-all hover:scale-105 border-2"
              style={{ borderColor: '#FDFCF9', color: '#FDFCF9' }}
            >
              Read My Letter To You
            </button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white/50"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="uppercase tracking-widest text-sm text-center mb-4"
            style={{ color: '#C6A972' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How it all began
          </motion.p>
          <motion.h2
            className="font-serif text-center mb-20"
            style={{ fontSize: '3.5rem', color: '#222222' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Story
          </motion.h2>

          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <TimelineEvent key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Memory Gallery */}
      <section className="py-32 px-6" style={{ backgroundColor: '#FDFCF9' }}>
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="uppercase tracking-widest text-sm text-center mb-4"
            style={{ color: '#C6A972' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Every moment, all in one place
          </motion.p>
          <motion.h2
            className="font-serif text-center mb-16"
            style={{ fontSize: '3.5rem', color: '#222222' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Memory Gallery
          </motion.h2>

          <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 640: 2, 1024: 3 }}>
            <Masonry gutter="1.25rem">
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="cursor-pointer overflow-hidden rounded-xl"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  onClick={() => setSelectedImage(img)}
                  initial={{ opacity: 0, scale: 0.92, y: 24 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.12, ease: 'easeOut' }}
                  whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(162,103,105,0.18)' }}
                >
                  <img
                    src={img}
                    alt={`Memory ${idx + 1}`}
                    className="w-full block"
                    style={{ display: 'block', maxHeight: '380px', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </section>

      {/* Video Memories */}
      <section id="videos" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-serif text-center mb-20"
            style={{ fontSize: '3.5rem', color: '#222222' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Film Memories
          </motion.h2>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {filmVideos.map((video, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-lg overflow-hidden group"
                style={{
                  backgroundColor: '#FDFCF9',
                  border: '8px solid #C6A972',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
              >
                <div className="aspect-video bg-card relative overflow-hidden flex items-center justify-center">
                  <video
                    src={video.src}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <p style={{ color: '#666666' }} className="font-serif italic">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Love Letter */}
      <section id="letter" className="py-32 px-6" style={{ backgroundColor: '#FDFCF9' }}>
        <div className="max-w-3xl mx-auto">
          <motion.p
            className="uppercase tracking-widest text-sm text-center mb-4"
            style={{ color: '#C6A972' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Written just for you
          </motion.p>

          <motion.h2
            className="font-serif text-center mb-16"
            style={{ fontSize: '3.5rem', color: '#222222' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My Letter To You
          </motion.h2>

          <motion.div
            className="p-16 rounded-lg relative"
            style={{
              backgroundColor: '#FAF7F2',
              boxShadow: '0 16px 64px rgba(0,0,0,0.08)',
              borderTop: '4px solid #C6A972'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Mail className="w-10 h-10 mb-8" style={{ color: '#A26769' }} />
            <p className="text-sm uppercase tracking-widest mb-8" style={{ color: '#C6A972' }}>
              May 30, 2026
            </p>
            <div className="space-y-6 leading-relaxed italic" style={{ color: '#555555', fontFamily: 'Georgia, serif', fontSize: '1.1rem' }}>
              <p>
                "To my love —
              </p>
              <p>
                A year ago I had no idea that one moment would change everything. But the day I met you, something shifted — and I've never been the same since. You walked in and quietly became my favourite part of every single day.
              </p>
              <p>
                This year I've watched you laugh until your eyes water, I've seen how fiercely you care about the people you love, and I've had the privilege of being one of them. You make ordinary mornings feel like something worth remembering.
              </p>
              <p>
                I built this little corner of the internet because no card felt like enough. I wanted you to be able to hold all of our moments in one place — to scroll through and feel exactly what I feel every time I look at you.
              </p>
              <p>
                Happy anniversary. Thank you for choosing me, every single day.
              </p>
              <p>
                Yours, always."
              </p>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <Heart className="w-5 h-5" style={{ color: '#A26769' }} fill="#A26769" />
              <span className="font-serif text-lg" style={{ color: '#A26769' }}>Forever yours</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Memory Statistics */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="font-serif text-center mb-16"
            style={{ fontSize: '3rem', color: '#222222' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            A Year In Numbers
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '365', label: 'Days Together' },
              { number: '12', label: 'Months Of Memories' },
              { number: '∞', label: 'Laughs' },
              { number: '∞', label: 'Love' }
            ].map((stat, idx) => (
              <StatCounter key={idx} stat={stat} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>



      {/* Reasons I Love You */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-serif text-center mb-20"
            style={{ fontSize: '3.5rem', color: '#222222' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Reasons I Love You
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {reasonsCards.map((reason, idx) => (
              <motion.div
                key={idx}
                className="relative h-64 cursor-pointer perspective-1000"
                onClick={() => setFlippedCard(flippedCard === idx ? null : idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <motion.div
                  className="w-full h-full rounded-lg p-8 flex flex-col items-center justify-center text-center"
                  style={{
                    backgroundColor: flippedCard === idx ? '#A26769' : '#FDFCF9',
                    color: flippedCard === idx ? '#FDFCF9' : '#222222',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}
                >
                  {flippedCard === idx ? (
                    <Heart className="w-16 h-16" fill="currentColor" />
                  ) : (
                    <>
                      <div className="font-serif text-xl mb-2" style={{ color: '#A26769' }}>
                        {reason.split(' - ')[0]}
                      </div>
                      <p className="text-sm" style={{ color: '#666666' }}>
                        {reason.split(' - ')[1]}
                      </p>
                    </>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>
        <div className="absolute inset-0">
          <img
            src="/images/IMG-20260530-WA0064.jpg"
            alt="Forever"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)' }} />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-3xl py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="flex justify-center gap-4 mb-10"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1], y: [0, -8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
              >
                <Heart className="w-10 h-10" style={{ color: '#C6A972' }} fill="#C6A972" />
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            className="font-serif mb-6 text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.2' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Here's To Every<br />Year After This One.
          </motion.h2>

          <motion.p
            className="text-white/90 text-xl mb-4 italic max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            You are the best thing that has ever happened to me.
          </motion.p>
          <motion.p
            className="text-white/80 text-lg mb-12 italic max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65 }}
          >
            Happy anniversary, my love. ♡
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            className="px-12 py-4 rounded-full text-lg font-medium transition-all"
            style={{ backgroundColor: '#C6A972', color: '#fff', boxShadow: '0 8px 32px rgba(198,169,114,0.4)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.07, boxShadow: '0 12px 40px rgba(198,169,114,0.55)' }}
            whileTap={{ scale: 0.95 }}
          >
            Relive It All ♡
          </motion.button>
        </motion.div>
      </section>

      {/* Music Control Button */}
      {hasEntered && (
        <motion.button
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer border-2 hover:scale-110 active:scale-95 transition-transform"
          style={{
            backgroundColor: isPlaying ? '#A26769' : '#FAF7F2',
            color: isPlaying ? '#FAF7F2' : '#A26769',
            borderColor: '#C6A972',
            boxShadow: '0 8px 32px rgba(162, 103, 105, 0.2)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6 animate-pulse" />
          ) : (
            <VolumeX className="w-6 h-6" />
          )}
        </motion.button>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-full object-contain rounded-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingParticles() {
  const items = [
    { Icon: Heart, color: '#C6293A', fill: true },
    { Icon: Heart, color: '#A26769', fill: true },
    { Icon: Sparkles, color: '#C6A972', fill: false },
    { Icon: Star, color: '#C6A972', fill: true },
    { Icon: Heart, color: '#e88a8a', fill: true },
    { Icon: Gift, color: '#A26769', fill: false },
    { Icon: Star, color: '#C6293A', fill: false },
    { Icon: Sparkles, color: '#e8a0a0', fill: false },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 30 }).map((_, i) => {
        const item = items[i % items.length];
        const size = 12 + (i % 3) * 6;
        const duration = 12 + (i % 7) * 3;
        const startX = (i * 137.5) % 100;
        const opacity = 0.08 + (i % 5) * 0.06;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${startX}%`, top: '-40px' }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, (i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 15)],
              rotate: [0, (i % 2 === 0 ? 180 : -180)],
              opacity: [0, opacity, opacity, 0]
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
              delay: (i * 0.7) % duration
            }}
          >
            <item.Icon
              style={{ width: size, height: size, color: item.color }}
              fill={item.fill ? item.color : 'none'}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function TimelineEvent({ event, index }: { event: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="grid md:grid-cols-2 gap-12 items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {index % 2 === 0 ? (
        <>
          <div className="order-2 md:order-1">
            <div
              className="w-full overflow-hidden rounded-lg"
              style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.15)' }}
            >
              <motion.img
                src={event.image}
                alt={event.title}
                className="w-full h-auto block"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            {event.date && (
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5" style={{ color: '#C6A972' }} />
                <span style={{ color: '#C6A972' }}>{event.date}</span>
              </div>
            )}
            <h3 className="font-serif text-3xl mb-4" style={{ color: '#A26769' }}>
              {event.title}
            </h3>
            <p className="leading-relaxed" style={{ color: '#666666' }}>
              {event.story}
            </p>
          </div>
        </>
      ) : (
        <>
          <div>
            {event.date && (
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5" style={{ color: '#C6A972' }} />
                <span style={{ color: '#C6A972' }}>{event.date}</span>
              </div>
            )}
            <h3 className="font-serif text-3xl mb-4" style={{ color: '#A26769' }}>
              {event.title}
            </h3>
            <p className="leading-relaxed" style={{ color: '#666666' }}>
              {event.story}
            </p>
          </div>
          <div>
            <div
              className="w-full overflow-hidden rounded-lg"
              style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.15)' }}
            >
              <motion.img
                src={event.image}
                alt={event.title}
                className="w-full h-auto block"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

function StatCounter({ stat, delay }: { stat: { number: string; label: string }; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-center p-8 rounded-lg"
      style={{ backgroundColor: '#FDFCF9' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="font-serif mb-3"
        style={{ fontSize: '3.5rem', color: '#A26769' }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2, type: 'spring' }}
      >
        {stat.number}
      </motion.div>
      <div style={{ color: '#666666' }}>{stat.label}</div>
    </motion.div>
  );
}

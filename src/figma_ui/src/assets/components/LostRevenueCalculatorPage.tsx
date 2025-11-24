import { useState, useEffect } from 'react';
import { Slider } from './ui/slider';
import { PhoneOff, TrendingDown, AlertCircle, DollarSign, Zap, Award, Users, Globe, Heart, Clock, Shield, Sparkles } from 'lucide-react';
import { motion, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';

// Animated counter component
function AnimatedCounter({ value, prefix = '' }: { value: number; prefix?: string }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => 
    `${prefix}${Math.round(current).toLocaleString()}`
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export function LostRevenueCalculatorPage() {
  const [callsPerDay, setCallsPerDay] = useState(40);
  const [profitPerLead, setProfitPerLead] = useState(1400);
  const [showWarning, setShowWarning] = useState(false);

  // Calculate missed calls (62% of total calls)
  const missedCalls = Math.round(callsPerDay * 0.62);
  
  // Calculate lost revenue per day
  const lostRevenuePerDay = missedCalls * profitPerLead;
  
  // Calculate lost revenue per month (30 days)
  const lostRevenuePerMonth = lostRevenuePerDay * 30;
  
  // Calculate lost revenue per year
  const lostRevenuePerYear = lostRevenuePerDay * 365;

  // Calculate potential savings
  const potentialSavings = lostRevenuePerYear * 0.95; // 95% capture rate with AI

  // Show warning animation when values are high
  useEffect(() => {
    setShowWarning(lostRevenuePerDay > 50000);
  }, [lostRevenuePerDay]);

  const impactStats = [
    {
      icon: Clock,
      label: 'Hours Saved Monthly',
      value: Math.round(missedCalls * 30 * 0.25), // ~15 min per call
      color: '#5233FF',
    },
    {
      icon: Users,
      label: 'Lost Customers/Year',
      value: Math.round(missedCalls * 365),
      color: '#5233FF',
    },
    {
      icon: Award,
      label: 'Competitor Advantage',
      value: '24/7',
      color: '#5233FF',
      isText: true,
    },
  ];

  const businessSolutions = [
    {
      icon: PhoneOff,
      title: 'AI Voice Receptionist',
      description: 'Never miss a call again with 24/7 intelligent call handling',
      benefit: 'Capture 100% of incoming opportunities',
    },
    {
      icon: Globe,
      title: 'Complete Web Integration',
      description: 'Seamlessly integrate AI into your online ecosystem — websites, portals and dashboards designed to scale alongside your digital transformation.',
      benefit: 'Convert website visitors into active customers instantly.',
    },
    {
      icon: Sparkles,
      title: 'AI Automation',
      description: 'Just as Matrix automates fleet insights, Kasibot automates customer interactions — freeing your team from manual follow-ups and repetitive admin.',
      benefit: 'Save hours weekly with intelligent workflows.',
    },
    {
      icon: Users,
      title: 'Digital Marketing',
      description: 'Turn data into demand. From AI-driven content to automated campaigns, Kasibot helps you engage more customers while you focus on business growth.',
      benefit: 'Build a consistent presence that drives measurable ROI.',
    },
    {
      icon: Heart,
      title: 'Purpose-Driven Partner',
      description: 'Like Matrix, we believe in meaningful innovation — technology that empowers people, businesses and communities.',
      benefit: 'Every project contributes to job creation and local development.',
    },
    {
      icon: Shield,
      title: 'Local Excellence',
      description: 'Proudly South African with world-class standards',
      benefit: 'Understanding your market, culture and needs',
    },
  ];

  return (
    <div className="h-screen w-full bg-[#1A1A1A] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#5233FF] rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0.1,
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5233FF] rounded-full blur-[150px] opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5233FF] rounded-full blur-[150px] opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <ScrollArea className="h-full w-full">
        <div className="min-h-screen w-full flex items-center justify-center px-8 py-16">
          <div className="max-w-7xl w-full relative z-10">
            {/* Page Title */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div 
                  className="p-3 rounded-xl bg-[#5233FF]/10 border border-[#5233FF]/30 relative"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(82, 51, 255, 0.3)',
                      '0 0 40px rgba(82, 51, 255, 0.6)',
                      '0 0 20px rgba(82, 51, 255, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <PhoneOff className="w-8 h-8 text-[#5233FF]" />
                  </motion.div>
                </motion.div>
                <h2 className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '3rem' }}>
                  The Cost of Missed Calls
                </h2>
              </div>
              <motion.p 
                className="text-[#B0B0B0] max-w-3xl mx-auto" 
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.25rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                62% of business calls in South Africa go unanswered. You help businesses calculate ROI on fuel efficiency and asset utilization. Here's your communication fleet's hidden cost...
              </motion.p>
            </motion.div>

            {/* Calculator Section */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Left Column - Input Sliders */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {/* Value Box */}
                <motion.div 
                  className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-2 border-emerald-500/50 rounded-xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 40px rgba(16, 185, 129, 0.25)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <div className="relative z-10">
                    <h3 className="text-emerald-400 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>
                      Every Call Matters
                    </h3>
                    <p className="text-emerald-100/90 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                      Every missed call is a missed opportunity. With Kasibot's AI receptionist answering 24/7, you'll never lose another customer to a busy signal or voicemail again.
                    </p>
                  </div>
                </motion.div>

                {/* Calls Per Day Slider */}
                <motion.div 
                  className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#5233FF]/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(82, 51, 255, 0.5)' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <PhoneOff className="w-6 h-6 text-[#5233FF]" />
                    </motion.div>
                    <h3 className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}>
                      Incoming Calls Per Day
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                      Adjust your daily call volume
                    </span>
                    <motion.span 
                      className="text-[#5233FF] min-w-[80px] text-right" 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2rem' }}
                      key={callsPerDay}
                      initial={{ scale: 1.3, color: '#FFFFFF' }}
                      animate={{ scale: 1, color: '#5233FF' }}
                      transition={{ duration: 0.3 }}
                    >
                      {callsPerDay}
                    </motion.span>
                  </div>
                  <Slider
                    value={[callsPerDay]}
                    onValueChange={(value) => setCallsPerDay(value[0])}
                    min={5}
                    max={200}
                    step={5}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                    <span>5</span>
                    <span>200 calls/day</span>
                  </div>

                  {/* Missed Calls Display */}
                  <motion.div 
                    className="mt-4 p-4 rounded-lg bg-[#5233FF]/5 border border-[#5233FF]/20"
                    animate={{
                      borderColor: ['rgba(82, 51, 255, 0.2)', 'rgba(82, 51, 255, 0.4)', 'rgba(82, 51, 255, 0.2)'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <AlertCircle className="w-5 h-5 text-[#5233FF]" />
                        </motion.div>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                          Missed Calls (62%)
                        </span>
                      </div>
                      <motion.span 
                        className="text-[#5233FF]" 
                        style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}
                        key={missedCalls}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                      >
                        <AnimatedCounter value={missedCalls} />
                      </motion.span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Profit Per Lead Slider */}
                <motion.div 
                  className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#5233FF]/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(82, 51, 255, 0.5)' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <DollarSign className="w-6 h-6 text-[#5233FF]" />
                    </motion.div>
                    <h3 className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}>
                      Average Profit Per Lead
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                      What's each customer worth?
                    </span>
                    <motion.span 
                      className="text-[#5233FF] min-w-[120px] text-right" 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2rem' }}
                      key={profitPerLead}
                      initial={{ scale: 1.3, color: '#FFFFFF' }}
                      animate={{ scale: 1, color: '#5233FF' }}
                      transition={{ duration: 0.3 }}
                    >
                      R{profitPerLead.toLocaleString()}
                    </motion.span>
                  </div>
                  <Slider
                    value={[profitPerLead]}
                    onValueChange={(value) => setProfitPerLead(value[0])}
                    min={100}
                    max={10000}
                    step={100}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                    <span>R100</span>
                    <span>R10,000</span>
                  </div>
                </motion.div>

                {/* Impact Stats */}
                <motion.div 
                  className="grid grid-cols-3 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {impactStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-[#222222] rounded-xl p-4 border border-[#333333] text-center"
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: 'rgba(82, 51, 255, 0.5)',
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{
                          y: [0, -3, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                          ease: "easeInOut",
                        }}
                      >
                        <stat.icon className="w-6 h-6 text-[#5233FF] mx-auto mb-2" />
                      </motion.div>
                      <p className="text-[#5233FF] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>
                        {stat.isText ? stat.value : <AnimatedCounter value={stat.value as number} />}
                      </p>
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Column - Results Display */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {/* Daily Loss */}
                <motion.div 
                  className="bg-gradient-to-br from-[#5233FF]/20 to-[#5233FF]/5 rounded-xl p-6 border border-[#5233FF]/50 relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      '0 0 40px rgba(82, 51, 255, 0.3)',
                      '0 0 60px rgba(82, 51, 255, 0.5)',
                      '0 0 40px rgba(82, 51, 255, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#5233FF]/0 via-[#5233FF]/10 to-[#5233FF]/0"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  <div className="relative z-10">
                    <motion.p 
                      className="text-[#B0B0B0] mb-2" 
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Lost Revenue Per Day
                    </motion.p>
                    <motion.p 
                      className="text-[#FFFFFF] mb-4" 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '3.5rem' }}
                      key={lostRevenuePerDay}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <AnimatedCounter value={lostRevenuePerDay} prefix="R" />
                    </motion.p>
                    <div className="flex items-start gap-2">
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <AlertCircle className="w-5 h-5 text-[#5233FF] mt-1 flex-shrink-0" />
                      </motion.div>
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                        That's <motion.span 
                          className="text-[#5233FF]"
                          key={missedCalls}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                        >
                          {missedCalls}
                        </motion.span> missed opportunities every single day
                      </p>
                    </div>
                  </div>

                  {/* Warning indicator for high losses */}
                  <AnimatePresence>
                    {showWarning && (
                      <motion.div
                        className="absolute top-4 right-4"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Zap className="w-8 h-8 text-[#5233FF]" fill="#5233FF" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Monthly and Annual in Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Monthly Loss */}
                  <motion.div 
                    className="bg-[#222222] rounded-xl p-6 border border-[#5233FF]/30"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(82, 51, 255, 0.6)',
                      boxShadow: '0 0 30px rgba(82, 51, 255, 0.4)',
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-[#B0B0B0] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                      Per Month
                    </p>
                    <motion.p 
                      className="text-[#5233FF]" 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.75rem' }}
                      key={lostRevenuePerMonth}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 150 }}
                    >
                      <AnimatedCounter value={lostRevenuePerMonth} prefix="R" />
                    </motion.p>
                  </motion.div>

                  {/* Annual Loss */}
                  <motion.div 
                    className="bg-[#222222] rounded-xl p-6 border border-[#5233FF]/30"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(82, 51, 255, 0.6)',
                      boxShadow: '0 0 30px rgba(82, 51, 255, 0.4)',
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-[#B0B0B0] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                      Per Year
                    </p>
                    <motion.p 
                      className="text-[#5233FF]" 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.75rem' }}
                      key={lostRevenuePerYear}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 150 }}
                    >
                      <AnimatedCounter value={lostRevenuePerYear} prefix="R" />
                    </motion.p>
                  </motion.div>
                </div>

                {/* Potential Savings */}
                <motion.div 
                  className="bg-gradient-to-r from-[#5233FF]/10 to-[#5233FF]/5 rounded-xl p-6 border border-[#5233FF]/40 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5233FF]/20 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-[#5233FF]" />
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                        Your Potential Annual Savings
                      </p>
                    </div>
                    <motion.p 
                      className="text-[#5233FF] mb-2" 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
                      key={potentialSavings}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      <AnimatedCounter value={potentialSavings} prefix="R" />
                    </motion.p>
                    <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                      With Kasibot's AI Receptionist capturing 95%+ of calls
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Complete Business Solutions Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-16"
            >
              <div className="text-center mb-8">
                <h3 className="text-[#FFFFFF] mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}>
                  Your Fleet is Covered. Now Let's Cover Your Calls.
                </h3>
                <p className="text-[#B0B0B0] max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', lineHeight: '1.8' }}>
                  Matrix helps businesses track, optimize and protect their vehicle fleets.
                  Kasibot does the same for your customer communication — tracking, responding and converting every incoming call into opportunity.
                  <br /><br />
                  Every missed call is a missed trip, a client not reached, a deal that never left the station.
                  With Kasibot's AI Voice Automation Solution, your operations run smoother. Your response times shrink and your revenue grows effortlessly.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessSolutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#5233FF]/50 transition-all duration-300 relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: '0 0 30px rgba(82, 51, 255, 0.3)',
                    }}
                  >
                    {/* Hover gradient effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#5233FF]/0 to-[#5233FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    <div className="relative z-10">
                      <motion.div
                        className="p-3 rounded-xl bg-[#5233FF]/10 border border-[#5233FF]/30 w-fit mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <solution.icon className="w-6 h-6 text-[#5233FF]" />
                      </motion.div>
                      <h4 className="text-[#FFFFFF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>
                        {solution.title}
                      </h4>
                      <p className="text-[#B0B0B0] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                        {solution.description}
                      </p>
                      <div className="pt-3 border-t border-[#333333]">
                        <p className="text-emerald-500" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          ✓ {solution.benefit}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div 
              className="bg-gradient-to-r from-[#5233FF]/20 via-[#5233FF]/10 to-[#5233FF]/20 rounded-xl p-8 border border-[#5233FF]/50 relative overflow-hidden text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5233FF]/20 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="flex items-center justify-center gap-2 mb-4"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-6 h-6 text-[#5233FF]" fill="#5233FF" />
                  <p className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.75rem' }}>
                    Stop Missing Calls. Start Capturing Opportunities.
                  </p>
                  <Heart className="w-6 h-6 text-[#5233FF]" fill="#5233FF" />
                </motion.div>
                <p className="text-[#B0B0B0] max-w-3xl mx-auto mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}>
                  Kasibot + Matrix — Building Smarter Businesses, Together.
                </p>
                <p className="text-[#5233FF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                  Proudly South African • Supporting Local Non-Profits • Transforming Businesses Nationwide
                </p>
              </div>
            </motion.div>

            {/* Bottom spacing for navigation */}
            <div className="h-8"></div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

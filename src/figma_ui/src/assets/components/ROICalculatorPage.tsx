import { useState, useEffect } from 'react';
import { Slider } from './ui/slider';
import { Calculator, Clock, TrendingUp, Sparkles, Zap, Users } from 'lucide-react';
import { motion, useSpring, useTransform } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';

// Animated counter component
function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => 
    `${prefix}${Math.round(current).toLocaleString()}${suffix}`
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export function ROICalculatorPage() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [numEmployees, setNumEmployees] = useState(5);
  const [hourlyCost, setHourlyCost] = useState(300);

  const totalHoursPerYear = hoursPerWeek * numEmployees * 52;
  const annualSavings = totalHoursPerYear * hourlyCost;
  const monthlySavings = annualSavings / 12;
  const weeklySavings = annualSavings / 52;
  
  // Additional insights
  const fullTimeEquivalent = (totalHoursPerYear / 2080).toFixed(1); // 2080 work hours/year
  const productivityIncrease = ((hoursPerWeek / 40) * 100).toFixed(0);

  return (
    <div className="h-screen w-full bg-[#1A1A1A] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
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
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#5233FF] rounded-full blur-[150px] opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#5233FF] rounded-full blur-[150px] opacity-20"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.35, 0.2, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <ScrollArea className="h-full w-full">
        <div className="min-h-screen w-full flex items-center justify-center px-8 py-16">
          <div className="max-w-6xl w-full relative z-10">
            {/* Page Title */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div
                  className="p-3 rounded-xl bg-[#5233FF]/10 border border-[#5233FF]/30"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(82, 51, 255, 0.3)',
                      '0 0 40px rgba(82, 51, 255, 0.6)',
                      '0 0 20px rgba(82, 51, 255, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Calculator className="w-12 h-12 text-[#5233FF]" />
                  </motion.div>
                </motion.div>
                <h2 className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '3rem' }}>
                  Calculate Your Time Freedom
                </h2>
              </div>
              <motion.p 
                className="text-[#B0B0B0] max-w-3xl mx-auto" 
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.25rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                See exactly how many hours and rands you'll save by automating repetitive tasks with Kasibot
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Inputs */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-6"
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
                      Imagine What You Could Do
                    </h3>
                    <p className="text-emerald-100/90 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                      With 2,600 hours and R780,000 saved annually, you could grow faster, innovate more and finally focus on what truly matters to your business.
                    </p>
                  </div>
                </motion.div>

                {/* Calculator Module */}
                <div className="bg-[#222222] rounded-xl p-8 border border-[#5233FF]/50 shadow-[0_0_40px_rgba(82,51,255,0.2)] space-y-8">
                  {/* Input 1 */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Clock className="w-5 h-5 text-[#5233FF]" />
                        </motion.div>
                        <label className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.125rem' }}>
                          Hours per employee, per week:
                        </label>
                      </div>
                      <motion.span 
                        className="text-[#5233FF] min-w-[60px] text-right" 
                        style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}
                        key={hoursPerWeek}
                        initial={{ scale: 1.3, color: '#FFFFFF' }}
                        animate={{ scale: 1, color: '#5233FF' }}
                        transition={{ duration: 0.3 }}
                      >
                        {hoursPerWeek}
                      </motion.span>
                    </div>
                    <Slider
                      value={[hoursPerWeek]}
                      onValueChange={(value) => setHoursPerWeek(value[0])}
                      min={1}
                      max={40}
                      step={1}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between mt-2 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                      <span>1 hour</span>
                      <span>40 hours</span>
                    </div>
                  </motion.div>

                  {/* Input 2 */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{
                            y: [0, -3, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Users className="w-5 h-5 text-[#5233FF]" />
                        </motion.div>
                        <label className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.125rem' }}>
                          Number of employees:
                        </label>
                      </div>
                      <motion.span 
                        className="text-[#5233FF] min-w-[60px] text-right" 
                        style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}
                        key={numEmployees}
                        initial={{ scale: 1.3, color: '#FFFFFF' }}
                        animate={{ scale: 1, color: '#5233FF' }}
                        transition={{ duration: 0.3 }}
                      >
                        {numEmployees}
                      </motion.span>
                    </div>
                    <Slider
                      value={[numEmployees]}
                      onValueChange={(value) => setNumEmployees(value[0])}
                      min={1}
                      max={50}
                      step={1}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between mt-2 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                      <span>1</span>
                      <span>50 people</span>
                    </div>
                  </motion.div>

                  {/* Input 3 */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
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
                          <TrendingUp className="w-5 h-5 text-[#5233FF]" />
                        </motion.div>
                        <label className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.125rem' }}>
                          Average hourly cost (ZAR):
                        </label>
                      </div>
                      <motion.span 
                        className="text-[#5233FF] min-w-[80px] text-right" 
                        style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}
                        key={hourlyCost}
                        initial={{ scale: 1.3, color: '#FFFFFF' }}
                        animate={{ scale: 1, color: '#5233FF' }}
                        transition={{ duration: 0.3 }}
                      >
                        R{hourlyCost}
                      </motion.span>
                    </div>
                    <Slider
                      value={[hourlyCost]}
                      onValueChange={(value) => setHourlyCost(value[0])}
                      min={150}
                      max={1500}
                      step={50}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between mt-2 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                      <span>R150</span>
                      <span>R1,500</span>
                    </div>
                  </motion.div>
                </div>

                {/* Additional Insights */}
                <motion.div
                  className="mt-6 grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <motion.div
                    className="bg-[#222222] rounded-xl p-4 border border-[#333333] text-center"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(82, 51, 255, 0.5)',
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-[#5233FF] mx-auto mb-2" />
                    <p className="text-[#5233FF] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}>
                      {fullTimeEquivalent}
                    </p>
                    <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>
                      FTE Saved
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-[#222222] rounded-xl p-4 border border-[#333333] text-center"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(82, 51, 255, 0.5)',
                    }}
                  >
                    <Zap className="w-5 h-5 text-[#5233FF] mx-auto mb-2" />
                    <p className="text-[#5233FF] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}>
                      {productivityIncrease}%
                    </p>
                    <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>
                      Productivity Boost
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Column - Results */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {/* Annual Savings - Hero */}
                <motion.div 
                  className="bg-gradient-to-br from-[#5233FF]/20 to-[#5233FF]/5 rounded-xl p-8 border border-[#5233FF]/50 relative overflow-hidden"
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
                      POTENTIAL ANNUAL SAVINGS
                    </motion.p>
                    <motion.p 
                      className="text-[#FFFFFF] mb-4" 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '4rem' }}
                      key={annualSavings}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <AnimatedCounter value={annualSavings} prefix="R" />
                    </motion.p>
                    <p className="text-[#5233FF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                      Every year, automatically
                    </p>
                  </div>
                </motion.div>

                {/* Total Hours */}
                <motion.div 
                  className="bg-[#222222] rounded-xl p-6 border border-[#5233FF]/30"
                  whileHover={{ 
                    scale: 1.03,
                    borderColor: 'rgba(82, 51, 255, 0.6)',
                    boxShadow: '0 0 30px rgba(82, 51, 255, 0.4)',
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className="text-[#B0B0B0] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                    TOTAL HOURS RECLAIMED PER YEAR
                  </p>
                  <motion.p 
                    className="text-[#5233FF]" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '3rem' }}
                    key={totalHoursPerYear}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 150 }}
                  >
                    <AnimatedCounter value={totalHoursPerYear} suffix=" hrs" />
                  </motion.p>
                  <p className="text-[#B0B0B0] mt-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                    That's {Math.round(totalHoursPerYear / 24)} full days back to your team
                  </p>
                </motion.div>

                {/* Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="bg-[#222222] rounded-xl p-5 border border-[#333333]"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(82, 51, 255, 0.5)',
                    }}
                  >
                    <p className="text-[#B0B0B0] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                      Monthly Savings
                    </p>
                    <motion.p 
                      className="text-[#5233FF]" 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.75rem' }}
                      key={monthlySavings}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                    >
                      <AnimatedCounter value={monthlySavings} prefix="R" />
                    </motion.p>
                  </motion.div>

                  <motion.div
                    className="bg-[#222222] rounded-xl p-5 border border-[#333333]"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(82, 51, 255, 0.5)',
                    }}
                  >
                    <p className="text-[#B0B0B0] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                      Weekly Savings
                    </p>
                    <motion.p 
                      className="text-[#5233FF]" 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.75rem' }}
                      key={weeklySavings}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                    >
                      <AnimatedCounter value={weeklySavings} prefix="R" />
                    </motion.p>
                  </motion.div>
                </div>

                {/* Impact Message */}
                <motion.div
                  className="bg-[#5233FF]/10 rounded-xl p-6 border border-[#5233FF]/30 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
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
                    <p className="text-[#FFFFFF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>
                      Imagine What You Could Do
                    </p>
                    <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                      With <span className="text-[#5233FF]">{totalHoursPerYear.toLocaleString()} hours</span> and <span className="text-[#5233FF]">R{annualSavings.toLocaleString()}</span> saved annually, you could grow faster, innovate more and finally focus on what truly matters to your business.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              className="text-center bg-gradient-to-r from-[#5233FF]/10 via-[#5233FF]/5 to-[#5233FF]/10 rounded-xl p-8 border border-[#5233FF]/30 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5233FF]/15 to-transparent"
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
                <p className="text-[#FFFFFF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.75rem' }}>
                  This Is Just the Beginning
                </p>
                <p className="text-[#B0B0B0] max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}>
                  From AI automation to web development, from social media to complete digital transformation—Kasibot handles it all. Let's build your roadmap to freedom.
                </p>
              </div>
            </motion.div>

            {/* Bottom spacing */}
            <div className="h-8"></div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

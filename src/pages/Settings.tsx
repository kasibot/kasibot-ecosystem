import { useState } from 'react';
import { motion } from 'motion/react';
import { useUser } from '@clerk/clerk-react';
import { useUserMetadata } from '@/lib/clerk';
import { Building2, Phone, Clock, DollarSign, Save, Settings as SettingsIcon, User, Mail, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Settings() {
  const { user } = useUser();
  const metadata = useUserMetadata();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    businessName: '',
    phoneNumber: '',
    operatingHours: '09:00 - 17:00',
    leadValueEstimate: '1000',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // In a real app, you would update the client record in Supabase
      // For now, we'll just show a success message
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!metadata?.clientId) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#FFFFFF] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-[#5233FF] rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0.1,
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
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

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          {/* Header */}
          <motion.div 
            className="bg-gradient-to-br from-[#5233FF]/20 to-[#7B61FF]/10 border-2 border-[#5233FF]/50 rounded-xl p-8 shadow-[0_0_40px_rgba(82,51,255,0.2)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-3">
              <div 
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5233FF] to-[#7B61FF] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 30px rgba(82, 51, 255, 0.4)' }}
              >
                <SettingsIcon className="w-7 h-7 text-[#FFFFFF]" />
              </div>
              <h1 
                className="text-[#FFFFFF]" 
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
              >
                Settings
              </h1>
            </div>
            <p 
              className="text-[#B0B0B0] text-center"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}
            >
              Manage your account and business preferences
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-[#222222] border-[#333333]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-[#5233FF]" />
                    <CardTitle className="text-[#FFFFFF] text-xl">Business Information</CardTitle>
                  </div>
                  <CardDescription className="text-[#B0B0B0]">
                    Update your business details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-[#B0B0B0]">
                      <Building2 className="w-4 h-4 inline mr-2 text-[#5233FF]" />
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF] placeholder:text-[#666666] focus:border-[#5233FF] focus:ring-[#5233FF]"
                      placeholder="Enter business name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-[#B0B0B0]">
                      <Phone className="w-4 h-4 inline mr-2 text-[#5233FF]" />
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF] placeholder:text-[#666666] focus:border-[#5233FF] focus:ring-[#5233FF]"
                      placeholder="+27 XX XXX XXXX"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Operating Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-[#222222] border-[#333333]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-[#5233FF]" />
                    <CardTitle className="text-[#FFFFFF] text-xl">Operating Preferences</CardTitle>
                  </div>
                  <CardDescription className="text-[#B0B0B0]">
                    Configure your business hours and lead value estimates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="operatingHours" className="text-[#B0B0B0]">
                      <Clock className="w-4 h-4 inline mr-2 text-[#5233FF]" />
                      Operating Hours
                    </Label>
                    <Input
                      id="operatingHours"
                      type="text"
                      value={formData.operatingHours}
                      onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                      className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF] placeholder:text-[#666666] focus:border-[#5233FF] focus:ring-[#5233FF]"
                      placeholder="09:00 - 17:00"
                    />
                    <p className="text-xs text-[#666666]">Format: HH:MM - HH:MM</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leadValueEstimate" className="text-[#B0B0B0]">
                      <DollarSign className="w-4 h-4 inline mr-2 text-[#5233FF]" />
                      Average Lead Value Estimate (ZAR)
                    </Label>
                    <Input
                      id="leadValueEstimate"
                      type="number"
                      value={formData.leadValueEstimate}
                      onChange={(e) => setFormData({ ...formData, leadValueEstimate: e.target.value })}
                      className="bg-[#1A1A1A] border-[#333333] text-[#FFFFFF] placeholder:text-[#666666] focus:border-[#5233FF] focus:ring-[#5233FF]"
                      placeholder="1000"
                    />
                    <p className="text-xs text-[#666666]">Used for revenue calculations</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-[#222222] border-[#333333]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <User className="w-6 h-6 text-[#5233FF]" />
                    <CardTitle className="text-[#FFFFFF] text-xl">Account Information</CardTitle>
                  </div>
                  <CardDescription className="text-[#B0B0B0]">
                    Your account details and identifiers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[#B0B0B0]">
                      <Mail className="w-4 h-4 inline mr-2 text-[#5233FF]" />
                      Email
                    </Label>
                    <div className="bg-[#1A1A1A] border border-[#333333] rounded-md px-3 py-2 text-[#FFFFFF]">
                      {user?.emailAddresses[0]?.emailAddress || 'Not available'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#B0B0B0]">
                      <Key className="w-4 h-4 inline mr-2 text-[#5233FF]" />
                      Client ID
                    </Label>
                    <div className="bg-[#1A1A1A] border border-[#333333] rounded-md px-3 py-2 text-[#FFFFFF] font-mono text-sm">
                      {metadata.clientId}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#5233FF] hover:bg-[#7B61FF] text-white px-8 py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 0 20px rgba(82, 51, 255, 0.3)' }}
              >
                <Save className="w-5 h-5 mr-2" />
                {loading ? 'Saving...' : 'Save Settings'}
              </Button>
            </motion.div>

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${
                  message.type === 'success'
                    ? 'bg-[#00C853]/10 border-[#00C853]/30 text-[#00C853]'
                    : 'bg-[#FF5252]/10 border-[#FF5252]/30 text-[#FF5252]'
                }`}
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              >
                <div className="flex items-center gap-2">
                  {message.type === 'success' ? (
                    <div className="w-5 h-5 rounded-full bg-[#00C853] flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#FF5252] flex items-center justify-center">
                      <span className="text-white text-xs">✕</span>
                    </div>
                  )}
                  <span className="font-medium">{message.text}</span>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

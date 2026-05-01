'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const EXPERIENCE_OPTIONS = [
  'VR Gaming',
  'Free Roam Multiplayer',
  'Family VR Fun',
  'Outdoor VR Events',
  'Custom VR Solution',
];

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    players: '1',
    date: '',
    time: '',
    experience: 'VR Gaming',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.experience) {
        setFormData((prev) => ({ ...prev, experience: customEvent.detail.experience }));
      }
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-booking', handleOpen);
    return () => {
      window.removeEventListener('open-booking', handleOpen);
      document.body.style.overflow = '';
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.players) newErrors.players = 'Required';
    if (!formData.date) newErrors.date = 'Required';
    if (!formData.time) newErrors.time = 'Required';
    if (!formData.experience) newErrors.experience = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const phoneNumber = '919427580823';
    const text = `Hi In5nite VR, I want to book a VR session.

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Players: ${formData.players}
Date: ${formData.date}
Time: ${formData.time}
Experience: ${formData.experience}
Message: ${formData.message || 'N/A'}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-[#030308]/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-2xl bg-[#07070f] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden my-8"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors p-1"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="p-8 sm:p-10">
              <h2 className="font-orbitron font-bold text-2xl sm:text-3xl text-white mb-2">
                BOOK YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">SESSION</span>
              </h2>
              <p className="text-white/50 text-sm mb-8">
                Reserve your spot in the metaverse. We'll confirm your booking shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors`}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Email (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Players */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Number of Players *</label>
                    <select
                      name="players"
                      value={formData.players}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a14] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Player' : 'Players'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.date ? 'border-red-500/50' : 'border-white/10'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors [color-scheme:dark]`}
                    />
                    {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                  </div>

                  {/* Time */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Preferred Time *</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.time ? 'border-red-500/50' : 'border-white/10'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors [color-scheme:dark]`}
                    />
                    {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                  </div>
                </div>

                {/* Experience Type */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Experience Type *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a14] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors appearance-none"
                  >
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
                    placeholder="Any special requests?"
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full font-orbitron font-bold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                      color: '#fff',
                      borderRadius: '4px',
                      boxShadow: '0 0 20px rgba(168,85,247,0.3)',
                    }}
                  >
                    Confirm via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

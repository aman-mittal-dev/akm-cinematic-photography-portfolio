import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Mail, MessageCircle, Send, Linkedin, Check, X as XIcon } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Form submitted:', formData);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
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
            Let's Create Together
          </h2>
          <p className="text-white/60 text-lg tracking-wide">Get in touch for collaborations and inquiries</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="text-2xl mb-8 tracking-wide" style={{ fontWeight: 300 }}>
                Connect With Me
              </h3>
              <div className="space-y-6">
                {/* Instagram */}
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <Instagram className="w-6 h-6 text-white/80" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white/90 mb-1">Instagram</p>
                    <p className="text-white/50 text-sm">@rohitdadhwal</p>
                  </div>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="mailto:dadhwalrohit75@gmail.com"
                  className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-white/80" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white/90 mb-1">Email</p>
                    <p className="text-white/50 text-sm">hello@rohitdadhwal.com</p>
                  </div>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://linkedin.com/in/Rohit-dadhwal-433a0126b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <Linkedin className="w-6 h-6 text-white/80" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white/90 mb-1">LinkedIn</p>
                    <p className="text-white/50 text-sm">@rohitdadhwal</p>
                  </div>
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  href="https://wa.me/9464479251"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <MessageCircle className="w-6 h-6 text-white/80" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white/90 mb-1">WhatsApp</p>
                    <p className="text-white/50 text-sm">+91 94xxxxxx51</p>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Availability */}
            <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
              <p className="text-white/60 leading-relaxed">
                <span className="text-white/90 block mb-2" style={{ fontWeight: 400 }}>
                  Currently Available
                </span>
                I'm accepting new projects and collaborations. Whether you're looking for editorial work, brand campaigns,
                or personal sessions, I'd love to hear from you.
              </p>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-white/80 mb-2 tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/30 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white/80 mb-2 tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/30 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-white/80 mb-2 tracking-wide">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/30 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-white text-black tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-white/90 transition-colors duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    Sending...
                    <motion.div
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Success/Error Notification */}
            <AnimatePresence>
              {submitStatus !== 'idle' && (
                <motion.div
                  className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
                    submitStatus === 'success'
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'bg-red-500/20 border border-red-500/30'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitStatus === 'success' ? (
                    <>
                      <Check className="w-5 h-5 text-green-400" />
                      <p className="text-green-400">Message sent successfully! I'll get back to you soon.</p>
                    </>
                  ) : (
                    <>
                      <XIcon className="w-5 h-5 text-red-400" />
                      <p className="text-red-400">Something went wrong. Please try again.</p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-32 pt-12 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/40 text-sm tracking-widest uppercase mb-4">ROHIT DADHWAL Photography</p>
          <p className="text-white/30 text-xs">© 2026 All rights reserved</p>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { Quote } from "lucide-react";

const clients = [
  "VOGUE",
  "NIKE",
  "APPLE",
  "TESLA",
  "GUCCI",
  "ADIDAS",
  "SONY",
  "NETFLIX",
];

const testimonials = [
  {
    id: 1,
    quote:
      "Rohit has an uncanny ability to capture the soul of a moment. His work transcends traditional photography.",
    author: "Sarah Mitchell",
    role: "Creative Director, Vogue",
  },
  {
    id: 2,
    quote:
      "Working with Rohit was transformative. He doesn't just take photos—he creates visual poetry.",
    author: "James Chen",
    role: "Brand Manager, Nike",
  },
  {
    id: 3,
    quote:
      "The attention to detail and artistic vision is unparalleled. Every shot tells a complete story.",
    author: "Emma Rodriguez",
    role: "Fashion Editor, Harper's Bazaar",
  },
];

export default function ClientsTestimonials() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-black">
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
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "0.05em",
            }}
          >
            Trusted By
          </h2>
          <p className="text-white/60 text-lg tracking-wide">
            Collaborations with leading brands
          </p>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                className="flex items-center justify-center h-24 px-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span
                  className="text-white/60 tracking-[0.2em]"
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.5rem)",
                    fontWeight: 300,
                  }}
                >
                  {client}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div>
          <motion.h3
            className="text-center text-3xl mb-16 tracking-wide"
            style={{ fontWeight: 300 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            What They Say
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                whileHover={{ y: -5 }}
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote
                    className="w-10 h-10 text-white/20"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Quote */}
                <p className="text-white/70 leading-relaxed mb-8 italic text-lg">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="pt-6 border-t border-white/10">
                  <p
                    className="text-white mb-1"
                    style={{ fontWeight: 400 }}
                  >
                    {testimonial.author}
                  </p>
                  <p className="text-white/50 text-sm tracking-wide">
                    {testimonial.role}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/20" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-white/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
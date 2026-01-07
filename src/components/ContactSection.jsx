import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaYoutube, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const form = useRef();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm('service_o6ebwsi', 'template_jhmrjxm', form.current, {
        publicKey: 'wpMnc0dQ3F_MKWlG9',
      })
      .then(
        () => {
          setSubmitStatus('success');
          form.current.reset();
          setIsSubmitting(false);
          setTimeout(() => setSubmitStatus(null), 5000);
        },
        (error) => {
          setSubmitStatus('error');
          setIsSubmitting(false);
          console.log('FAILED...', error.text);
        }
      );
  };

  const contactInfo = [
    { icon: FaPhone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: FaEnvelope, label: 'Email', value: 'info@mahakalstudio.com', href: 'mailto:info@mahakalstudio.com' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Udaipura, Madhya Pradesh, India', href: '#' },
  ];

  const socialLinks = [
    { icon: FaInstagram, href: 'https://www.instagram.com/mahakalstudio/', label: 'Instagram' },
    { icon: FaFacebookF, href: 'https://www.facebook.com/mahakalstudioudaipur/', label: 'Facebook' },
    { icon: FaYoutube, href: 'https://www.youtube.com/@mahakalstudio', label: 'YouTube' },
  ];

  // GSAP animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          }
        }
      );

      // Form slide in from left
      gsap.fromTo(formRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          }
        }
      );

      // Info slide in from right
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          }
        }
      );

      // Stagger contact cards
      const cards = infoRef.current?.querySelectorAll('.contact-card');
      if (cards?.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-16 sm:py-24 md:py-36 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#B8860B]/5 rounded-full blur-[80px] hidden sm:block" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#B8860B]/5 rounded-full blur-[100px] hidden sm:block" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <span className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-transparent to-[#B8860B]" />
            <span className="text-[#B8860B] font-medium uppercase tracking-widest text-xs sm:text-sm">Get In Touch</span>
            <span className="w-8 sm:w-12 h-[2px] bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>
          
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let's Create <br className="sm:hidden" /><span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-cursive)" }}
            >Magic Together</span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Ready to capture your special moments? Reach out to us and let's start planning your perfect photo experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start max-w-6xl mx-auto">
          {/* Contact Form */}
          <div ref={formRef} className="relative order-1">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl sm:shadow-2xl border border-gray-100">
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center text-sm sm:text-base">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center text-sm sm:text-base">
                  Something went wrong. Please try again.
                </div>
              )}
              
              <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      name="user_name"
                      required
                      placeholder="Your Name"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#B8860B] focus:bg-white focus:outline-none transition-all duration-300 text-gray-800 text-sm sm:text-base"
                    />
                  </div>
                  
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      name="user_email"
                      required
                      placeholder="Your Email"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#B8860B] focus:bg-white focus:outline-none transition-all duration-300 text-gray-800 text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                {/* Phone Input */}
                <div className="relative">
                  <input
                    type="tel"
                    name="user_phone"
                    placeholder="Phone Number"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#B8860B] focus:bg-white focus:outline-none transition-all duration-300 text-gray-800 text-sm sm:text-base"
                  />
                </div>
                
                {/* Service Select */}
                <div className="relative">
                  <select
                    name="service_type"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#B8860B] focus:bg-white focus:outline-none transition-all duration-300 text-gray-800 appearance-none cursor-pointer text-sm sm:text-base"
                  >
                    <option value="">Select Service</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="pre-wedding">Pre-Wedding Shoot</option>
                    <option value="newborn">Newborn Photography</option>
                    <option value="maternity">Maternity Shoot</option>
                    <option value="event">Event Coverage</option>
                    <option value="family">Family Portrait</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
                
                {/* Message Textarea */}
                <div className="relative">
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Tell us about your vision..."
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#B8860B] focus:bg-white focus:outline-none transition-all duration-300 text-gray-800 resize-none text-sm sm:text-base"
                  />
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative overflow-hidden w-full bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-black py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FaPaperPlane />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 translate-y-[100%] bg-black transition-transform duration-300 group-hover:translate-y-0" />
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-4 sm:space-y-6 order-2">
            {/* Info Cards */}
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="contact-card group flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-gray-50 rounded-xl sm:rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#B8860B]/20 hover:translate-x-2"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#B8860B]/10 to-[#D4AF37]/10 rounded-xl flex items-center justify-center group-hover:from-[#B8860B] group-hover:to-[#D4AF37] transition-all duration-300 flex-shrink-0">
                  <info.icon className="text-lg sm:text-xl text-[#B8860B] group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">{info.label}</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-[#B8860B] transition-colors truncate">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="pt-4 sm:pt-6">
              <p className="text-gray-600 mb-3 sm:mb-4 font-medium text-sm sm:text-base">Follow Us</p>
              <div className="flex gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center text-white hover:bg-[#B8860B] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  >
                    <social.icon className="text-base sm:text-lg" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14676.066985644852!2d77.90083945!3d23.0740893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397d4547c9ab6b41%3A0x7b4e0e0b7f3f0e1a!2sUdaipura%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1678886400000!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mahakal Studio Location"
                className="sm:h-[200px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

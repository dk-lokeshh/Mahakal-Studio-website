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
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Udaipur, Rajasthan, India', href: '#' },
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
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-36 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#B8860B]/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#B8860B]/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#B8860B]" />
            <span className="text-[#B8860B] font-medium uppercase tracking-widest text-sm">Get In Touch</span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>
          
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let's Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37]">Magic Together</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to capture your special moments? Reach out to us and let's start planning your perfect photo experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          {/* Contact Form */}
          <div ref={formRef} className="relative">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100">
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
                  Something went wrong. Please try again.
                </div>
              )}
              
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      name="user_name"
                      required
                      placeholder="Your Name"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#B8860B] focus:bg-white focus:outline-none transition-all duration-300 text-gray-800"
                    />
                  </div>
                  
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      name="user_email"
                      required
                      placeholder="Your Email"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#B8860B] focus:bg-white focus:outline-none transition-all duration-300 text-gray-800"
                    />
                  </div>
                </div>
                
                {/* Phone Input */}
                <div className="relative">
                  <input
                    type="tel"
                    name="user_phone"
                    placeholder="Phone Number"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#B8860B] focus:bg-white focus:outline-none transition-all duration-300 text-gray-800"
                  />
                </div>
                
                {/* Service Select */}
                <div className="relative">
                  <select
                    name="service_type"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#B8860B] focus:bg-white focus:outline-none transition-all duration-300 text-gray-800 appearance-none cursor-pointer"
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
                    rows="5"
                    placeholder="Tell us about your vision..."
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#B8860B] focus:bg-white focus:outline-none transition-all duration-300 text-gray-800 resize-none"
                  />
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-black py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 hover:scale-[1.02]"
                >
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
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Info Cards */}
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="contact-card group flex items-center gap-5 p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#B8860B]/20 hover:translate-x-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#B8860B]/10 to-[#D4AF37]/10 rounded-xl flex items-center justify-center group-hover:from-[#B8860B] group-hover:to-[#D4AF37] transition-all duration-300">
                  <info.icon className="text-xl text-[#B8860B] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                  <p className="text-lg font-semibold text-gray-800 group-hover:text-[#B8860B] transition-colors">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-gray-600 mb-4 font-medium">Follow Us</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white hover:bg-[#B8860B] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.5876890772894!2d73.68319431544154!3d24.58535166200958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e56c39ac95a7%3A0x8d1d3bb3a1f6b07d!2sUdaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1678886400000!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mahakal Studio Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
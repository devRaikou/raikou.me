'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const socialLinks = [
    { 
      href: 'https://github.com/devraikou', 
      icon: FiGithub, 
      label: 'GitHub',
      color: 'text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400'
    },
    { 
      href: 'https://linkedin.com/in/ardagulez', 
      icon: FiLinkedin, 
      label: 'LinkedIn',
      color: 'text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400'
    },
    { 
      href: 'https://twitter.com/devraikou', 
      icon: FiTwitter, 
      label: 'Twitter',
      color: 'text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400'
    },
    { 
      href: 'https://instagram.com/ard4gulez', 
      icon: FiInstagram, 
      label: 'Instagram',
      color: 'text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400'
    },
    { 
      href: 'mailto:devraikou@proton.me', 
      icon: FiMail, 
      label: 'Email',
      color: 'text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400'
    },
  ];

  return (
    <section id="contact" className="py-8 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-2xl font-bold mb-4 text-center"
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h2>
          
          <motion.div 
            variants={itemVariants}
            className="text-center mb-5"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              I&apos;m available for freelance work and open to new opportunities.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-6">
              {socialLinks.map((link) => (
                <motion.div
                  key={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full border border-gray-200 dark:border-gray-800 ${link.color} transition-all duration-300`}
                    aria-label={link.label}
                  >
                    <link.icon size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Contact Email Button */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-xs"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="mailto:devraikou@proton.me" 
                className="block w-full py-1.5 px-3 text-center text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 rounded-md hover:shadow-md transition-all duration-300"
              >
                devraikou@proton.me
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 
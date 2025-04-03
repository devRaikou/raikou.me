'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  isScrolled?: boolean;
}

const Header = ({ isScrolled = false }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip the first render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    const updateActiveSection = () => {
      // Get all sections from the DOM
      const sections = ['home', 'about', 'skills', 'projects', 'contact']; 
      const scrollPosition = window.scrollY;
      
      // Special case for top of page
      if (scrollPosition < 100) {
        setActiveSection('home');
        return;
      }
      
      // Special case for bottom of page
      if ((window.innerHeight + scrollPosition) >= document.body.offsetHeight - 100) {
        setActiveSection('contact');
        return;
      }
      
      // Get all section elements with their offsets
      const sectionOffsets = sections.map(id => {
        const element = id === 'home' ? document.body : document.getElementById(id);
        if (!element) return { id, top: 0, bottom: 0, height: 0 };
        
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        return {
          id,
          top: rect.top + scrollTop,
          bottom: rect.bottom + scrollTop,
          height: rect.height
        };
      }).filter(section => section.height > 0); // Filter out non-existent or zero-height sections
      
      // Log to verify we're finding all sections
      console.log("Found sections:", sectionOffsets.map(s => s.id));
      
      // Find the current section based on scroll position
      let currentSectionId = 'home';
      
      for (const section of sectionOffsets) {
        // Adjust the detection to account for the header height and give some buffer
        // Consider a section active if we're past 1/5 of it
        const adjustedTop = section.top - 100;
        const activationThreshold = adjustedTop + (section.height * 0.2);
        
        if (scrollPosition >= activationThreshold) {
          currentSectionId = section.id;
        }
      }
      
      console.log(`Scroll position: ${scrollPosition}, active section: ${currentSectionId}`);
      
      if (currentSectionId !== activeSection) {
        setActiveSection(currentSectionId);
      }
    };
    
    // Run immediately on mount
    updateActiveSection();
    
    // Add event listeners
    window.addEventListener('scroll', updateActiveSection);
    window.addEventListener('resize', updateActiveSection);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [activeSection]);

  const navLinks = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.5,
      },
    }),
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%', transition: { duration: 0.3 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  // Handle nav link click 
  const handleNavLinkClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      // Set active section directly without waiting for scroll event
      setActiveSection(section);
      
      // Calculate offset to account for header height
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      // Smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 backdrop-blur-lg bg-background/70 shadow-md' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <motion.h1 
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            devRaikou
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.id}
              custom={index}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
            >
              <button 
                onClick={() => handleNavLinkClick(link.id)}
                className={`relative animated-underline ${
                  activeSection === link.id 
                    ? 'gradient-text font-medium' 
                    : 'hover:text-indigo-500 transition-colors duration-300'
                }`}
              >
                {link.label}
              </button>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-2xl glass p-2 rounded-full"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open mobile menu"
          whileTap={{ scale: 0.9 }}
        >
          <FiMenu />
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-end p-4">
                  <motion.button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl glass p-2 rounded-full"
                    aria-label="Close mobile menu"
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX />
                  </motion.button>
                </div>
                <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleNavLinkClick(link.id);
                        }}
                        className={`text-xl ${
                          activeSection === link.id 
                            ? 'gradient-text font-medium' 
                            : ''
                        }`}
                      >
                        {link.label}
                      </button>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header; 
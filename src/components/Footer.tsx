import Link from 'next/link';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const socialLinks = [
    { 
      href: 'https://github.com/devraikou', 
      icon: FiGithub, 
      label: 'GitHub' 
    },
    { 
      href: 'https://linkedin.com/in/ardagulez', 
      icon: FiLinkedin, 
      label: 'LinkedIn' 
    },
    { 
      href: 'https://twitter.com/devraikou', 
      icon: FiTwitter, 
      label: 'Twitter' 
    },
    { 
      href: 'https://instagram.com/ard4gulez', 
      icon: FiInstagram, 
      label: 'Instagram' 
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm opacity-80">
              © {currentYear} <span className="gradient-text font-medium">Arda Gulez</span>. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
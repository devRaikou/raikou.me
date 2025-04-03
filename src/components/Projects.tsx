'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { HiStar } from 'react-icons/hi';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Sample projects (replace with your actual projects)
  const projects = [
    {
      title: 'Project One',
      description: 'A modern web application built with React and Next.js, featuring a responsive design and seamless user experience.',
      tags: ['React', 'Next.js', 'Tailwind CSS'],
      githubUrl: 'https://github.com/devraikou/project-one',
      liveUrl: 'https://project-one.demo.com',
      featured: true,
    },
    {
      title: 'Project Two',
      description: 'A full-stack application with a Node.js backend and MongoDB database, featuring authentication and real-time updates.',
      tags: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
      githubUrl: 'https://github.com/devraikou/project-two',
      liveUrl: 'https://project-two.demo.com',
      featured: false,
    },
    {
      title: 'Project Three',
      description: 'An e-commerce platform with a modern UI and advanced filtering options, built with React and a headless CMS.',
      tags: ['React', 'GraphQL', 'Styled Components'],
      githubUrl: 'https://github.com/devraikou/project-three',
      liveUrl: 'https://project-three.demo.com',
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>
        <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-bold mb-2 text-center"
          >
            My <span className="gradient-text">Projects</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-center max-w-2xl mx-auto mb-12"
          >
            A showcase of my recent work and personal projects that demonstrate my skills and interests in web development.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                <div className="card backdrop-blur-sm p-6 relative bg-gray-900/90 dark:bg-black/90 border border-gray-800 h-full flex flex-col rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold gradient-text">{project.title}</h3>
                    {project.featured && (
                      <div className="bg-indigo-500/20 text-indigo-300 text-xs px-2.5 py-0.5 rounded-full flex items-center">
                        <HiStar className="mr-1" />
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <Link 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 bg-gray-800/50 hover:bg-indigo-500/20 px-3 py-1.5 rounded-md transition-all duration-300 text-sm group-hover:text-indigo-300"
                    >
                      <FiGithub size={16} />
                      <span>Code</span>
                    </Link>
                    <Link 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 bg-indigo-500/20 hover:bg-indigo-500/30 px-3 py-1.5 rounded-md transition-all duration-300 text-indigo-300 text-sm"
                    >
                      <FiExternalLink size={16} />
                      <span>Live Demo</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Link 
              href="https://github.com/devraikou" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative inline-flex group/button"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-50 group-hover/button:opacity-100 transition duration-500"></div>
              <div className="relative bg-gray-900 dark:bg-black px-8 py-3 rounded-full inline-flex items-center space-x-2 border border-gray-700">
                <FiGithub size={20} className="text-indigo-400"/>
                <span>View More on GitHub</span>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 
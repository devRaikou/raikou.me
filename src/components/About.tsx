'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          
          <motion.div 
            variants={itemVariants}
            className="card mb-8"
          >
            <p className="text-lg leading-relaxed mb-4">
              Hello! I&apos;m Arda Gulez, also known as <span className="gradient-text font-medium">devRaikou</span>. I&apos;m a passionate Full Stack Developer with a love for creating beautiful, responsive, and user-friendly web applications.
            </p>
            
            <p className="text-lg leading-relaxed">
              My journey in web development started with a curiosity for how things work on the internet, and it has evolved into a professional career where I get to build solutions that help businesses and individuals achieve their goals online.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="card shine"
          >
            <h3 className="text-xl font-semibold mb-3 gradient-text">My Approach</h3>
            <p className="leading-relaxed mb-4">
              I believe in creating web experiences that are not only visually appealing but also highly functional and user-friendly. My approach combines technical excellence with creative problem-solving to deliver solutions that exceed expectations.
            </p>
            <p className="leading-relaxed">
              When I&apos;m not coding, I enjoy exploring new technologies, contributing to open-source projects, and continuously expanding my knowledge in the ever-evolving field of web development.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 
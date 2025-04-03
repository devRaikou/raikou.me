'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, 
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, 
  SiTailwindcss, SiHtml5, SiCss3, SiGit, SiDocker,
  SiFirebase, SiGraphql, SiSocketdotio,
  SiFigma, SiNpm, SiWebpack, SiVite, SiVuedotjs, SiSass,
  SiBootstrap, SiRedis, SiMysql, SiPrisma, SiNestjs,
  SiWordpress, SiJest
} from 'react-icons/si';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, type: 'spring' },
    },
  };

  const skillCategories = [
    {
      title: "Frontend",
      description: "Building responsive, interactive user interfaces",
      skills: [
        { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
        { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
        { name: "React", icon: SiReact, color: "text-cyan-400" },
        { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
        { name: "Vue.js", icon: SiVuedotjs, color: "text-green-500" },
        { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
        { name: "CSS3", icon: SiCss3, color: "text-blue-400" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
        { name: "SASS", icon: SiSass, color: "text-pink-500" },
        { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-600" },
      ]
    },
    {
      title: "Backend",
      description: "Creating powerful, scalable server applications",
      skills: [
        { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
        { name: "Express", icon: SiExpress, color: "text-white" },
        { name: "NestJS", icon: SiNestjs, color: "text-red-500" },
        { name: "GraphQL", icon: SiGraphql, color: "text-pink-600" },
        { name: "REST API", icon: SiSocketdotio, color: "text-gray-400" },
        { name: "Prisma", icon: SiPrisma, color: "text-blue-300" },
        { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
        { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
        { name: "Redis", icon: SiRedis, color: "text-red-500" },
        { name: "WordPress", icon: SiWordpress, color: "text-blue-600" },
      ]
    },
    {
      title: "DevOps & Tools",
      description: "Optimizing development workflow and deployment",
      skills: [
        { name: "Git", icon: SiGit, color: "text-orange-600" },
        { name: "Docker", icon: SiDocker, color: "text-blue-500" },
        { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
        { name: "NPM", icon: SiNpm, color: "text-red-500" },
        { name: "Webpack", icon: SiWebpack, color: "text-blue-400" },
        { name: "Vite", icon: SiVite, color: "text-purple-400" },
        { name: "Jest", icon: SiJest, color: "text-red-600" },
        { name: "Figma", icon: SiFigma, color: "text-purple-400" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 rounded-tr-full filter blur-3xl z-0"></div>
    
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
          >
            My <span className="gradient-text">Skills</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-center mb-16 max-w-2xl mx-auto text-lg opacity-80"
          >
            As a Full Stack Developer, I work with a variety of technologies to create beautiful, functional, and scalable web applications.
          </motion.p>

          <div className="space-y-16">
            {skillCategories.map((category) => (
              <motion.div 
                key={category.title} 
                variants={itemVariants}
                className="bg-background/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200 dark:border-gray-800 p-8 rounded-2xl shadow-lg"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold gradient-text mb-2">{category.title}</h3>
                  <p className="opacity-80">{category.description}</p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.1, 
                        transition: { duration: 0.2 } 
                      }}
                      className="flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-14 h-14 rounded-full gradient-border flex items-center justify-center mb-2 bg-background dark:bg-gray-800/70 backdrop-blur-sm">
                        <skill.icon className={`text-2xl ${skill.color}`} />
                      </div>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 
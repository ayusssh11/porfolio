import React, { useState, useEffect } from 'react';
import './index.css';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Database, Server, Smartphone, Globe, Award, User, Briefcase, MessageSquare, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const skills = [
    { name: 'React', level: 95, icon: Code, color: 'from-blue-400 to-blue-600' },
    { name: 'Node.js', level: 90, icon: Server, color: 'from-green-400 to-green-600' },
    { name: 'MongoDB', level: 85, icon: Database, color: 'from-emerald-400 to-emerald-600' },
    { name: 'PHP', level: 88, icon: Code, color: 'from-blue-500 to-blue-700' },
    { name: 'Python', level: 80, icon: Code, color: 'from-yellow-400 to-yellow-600' },
    { name: 'AWS', level: 75, icon: Globe, color: 'from-orange-400 to-orange-600' },
  ];

  const projects = [
    {
      title: 'News Portal',
      description: 'Full-stack News Portal solution with PHP, Bootstrap and MySQL',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      tech: ['PHP', 'Bootstrap', 'MySQL','JavaScript'],
      github: '#',
      demo: 'https://morningcity.in/'
    },
    {
      title: 'PDF Converter',
      description: 'A fast, user-friendly web app to convert PDFs to Word, Excel, PPT, Images, and vice versa—built with Python and Flask.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      tech: ['Bootstrap', 'Python', 'MySQL', 'JavaScript'],
      github: '#',
      demo: 'https://takepdf.com/'
    },
    {
      title: 'Business Portfolio',
      description: 'A sleek and responsive business portfolio website showcasing company services, projects, and contact features—designed and developed with modern web technologies.',
      image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=500&h=300&fit=crop',
      tech: ['Bootstrap', 'MySQL', 'Tailwind'],
      github: '#',
      demo: 'https://hanumantauto.in/'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Portfolio
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-purple-400 ${
                      activeSection === section ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-300'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-purple-400 transition-colors"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20"></div>
        <div className="relative z-10 text-center px-4">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Ayush Chauhan
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Full Stack Developer & Digital Architect
            </p>
            <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
              Crafting exceptional digital experiences with modern technologies and creative solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-purple-400 rounded-full text-purple-400 font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-purple-400" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. 
                I specialize in modern JavaScript frameworks, cloud architecture, and creating seamless user experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey in tech started with a curiosity about how things work, which led me to explore everything 
                from frontend animations to backend architecture. I love turning complex problems into simple, 
                beautiful solutions.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-purple-400">
                  <Award size={20} />
                  <span>1+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <Briefcase size={20} />
                  <span>5+ Projects Completed</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <User size={20} />
                  <span>Remote & On-site</span>
                  
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <User size={120} className="text-purple-400" />
                </div>
              </div>
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="group">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} mr-4`}>
                      <skill.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                      <p className="text-gray-400">{skill.level}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 delay-${index * 100}`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className="group">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a 
                        href={project.github}
                        className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <Github size={16} />
                        Code
                      </a>
                      <a 
                        href={project.demo}
                        className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
            <p className="text-lg text-gray-300 mt-6">
              Ready to bring your ideas to life? Let's discuss your next project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Email</h3>
                  <p className="text-gray-400"><a href="mailto:ayushch435@gmail.com" className="text-gray-400 hover:text-white">ayushch435@gmail.com</a></p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                  <Linkedin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">LinkedIn</h3>
                  <p className="text-gray-400"><a href='https://www.linkedin.com/in/ayush-chauhan-95155632a/'>linkedin.com/in/ayush-chauhan-95155632a/</a></p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                  <Github size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">GitHub</h3>
                  <p className="text-gray-400"><a href='https://github.com/ayusssh11'>github.com/ayusssh11</a></p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  onClick={() => alert('Message sent!')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Ayush Chauhan.
          </p>
        </div>
        <Smartphone />
        <MessageSquare />
      </footer>
    </div>
  );
};

export default Portfolio;
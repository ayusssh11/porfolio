import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Database, Server, Smartphone, Globe, Award, User, Briefcase, MessageSquare, Menu, X, ArrowRight, Star, Zap, Target, Eye, Heart, Coffee, Clock, CheckCircle } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

  const roles = [
    'Full Stack Developer',
    'React Specialist',
    'Node.js Expert',
    'Digital Architect',
    'Problem Solver'
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    setIsLoaded(true);
    
    const typeWriter = () => {
      const currentText = roles[currentRole];
      let i = 0;
      const typing = setInterval(() => {
        if (i < currentText.length) {
          setTypedText(currentText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
          setTimeout(() => {
            const erasing = setInterval(() => {
              if (i > 0) {
                setTypedText(currentText.substring(0, i - 1));
                i--;
              } else {
                clearInterval(erasing);
                setCurrentRole((prev) => (prev + 1) % roles.length);
              }
            }, 50);
          }, 2000);
        }
      }, 100);
    };

    const timer = setTimeout(typeWriter, 1000);
    return () => clearTimeout(timer);
  }, [currentRole]);

  useEffect(() => {
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
    { name: 'React', level: 95, icon: Code, color: 'from-blue-400 to-blue-600', description: 'Building dynamic UIs with hooks and context' },
    { name: 'Node.js', level: 90, icon: Server, color: 'from-green-400 to-green-600', description: 'Scalable backend APIs and microservices' },
    { name: 'MongoDB', level: 85, icon: Database, color: 'from-emerald-400 to-emerald-600', description: 'NoSQL database design and optimization' },
    { name: 'PHP', level: 88, icon: Code, color: 'from-indigo-400 to-indigo-600', description: 'Server-side development and CMS integration' },
    { name: 'Python', level: 82, icon: Code, color: 'from-yellow-400 to-yellow-600', description: 'Data processing and automation scripts' },
    { name: 'AWS', level: 78, icon: Globe, color: 'from-orange-400 to-orange-600', description: 'Cloud infrastructure and deployment' },
  ];

  const projects = [
    {
      title: 'Morning City News Portal',
      description: 'A comprehensive news portal featuring real-time updates, category management, and responsive design. Built with PHP and MySQL for optimal performance.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&h=300&fit=crop',
      tech: ['PHP', 'Bootstrap', 'MySQL', 'JavaScript', 'AJAX'],
      github: '#',
      demo: 'https://morningcity.in/',
      features: ['Real-time news updates', 'Admin dashboard', 'SEO optimized', 'Mobile responsive']
    },
    {
      title: 'TakePDF Converter',
      description: 'An intelligent PDF conversion platform supporting multiple formats. Features drag-and-drop functionality, batch processing, and secure file handling.',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=300&fit=crop',
      tech: ['Python', 'Flask', 'Bootstrap', 'MySQL', 'JavaScript'],
      github: '#',
      demo: 'https://takepdf.com/',
      features: ['Multiple format support', 'Batch processing', 'Secure encryption', 'API integration']
    },
    {
      title: 'Hanumanta Auto Portfolio',
      description: 'A modern business portfolio showcasing automotive services with interactive galleries, service booking, and customer testimonials.',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop',
      tech: ['Bootstrap', 'MySQL', 'Tailwind', 'JavaScript', 'PHP'],
      github: '#',
      demo: 'https://hanumantauto.in/',
      features: ['Service booking', 'Gallery management', 'Customer reviews', 'Contact integration']
    }
  ];

  const achievements = [
    { number: '2+', label: 'Years Experience', icon: Clock },
    { number: '15+', label: 'Projects Completed', icon: CheckCircle },
    { number: '100%', label: 'Client Satisfaction', icon: Heart },
    { number: '24/7', label: 'Support Available', icon: Coffee }
  ];

  const services = [
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'End-to-end web application development using modern technologies and best practices.',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Mobile-first approach ensuring your application works seamlessly across all devices.',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Database,
      title: 'Database Design',
      description: 'Optimized database architecture for performance, scalability, and data integrity.',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Globe,
      title: 'Cloud Deployment',
      description: 'Secure and scalable cloud infrastructure setup with automated deployment pipelines.',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-x-hidden">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                Ayush Chauhan
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-purple-400 group ${
                      activeSection === section ? 'text-purple-400' : 'text-gray-300'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
                      activeSection === section ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-black/95 backdrop-blur-xl transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-purple-900/20 rounded-lg transition-all duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20"></div>
          {/* Floating orbs */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full text-sm font-medium text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                Welcome to my portfolio
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
              Ayush Chauhan
            </h1>
            
            <div className="text-xl md:text-2xl mb-8 text-gray-300 h-8">
              <span className="text-purple-400">I'm a </span>
              <span className="text-pink-400 font-semibold">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            
            <p className="text-lg mb-12 text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating exceptional digital experiences with cutting-edge technologies. 
              I transform complex problems into elegant, scalable solutions that drive business growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-purple-400 rounded-full text-purple-400 font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-12">
              <a href="https://github.com/ayusssh11" className="p-3 bg-gray-800/50 rounded-full hover:bg-purple-600 transition-all duration-300 hover:scale-110">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/ayush-chauhan-95155632a/" className="p-3 bg-gray-800/50 rounded-full hover:bg-purple-600 transition-all duration-300 hover:scale-110">
                <Linkedin size={24} />
              </a>
              <a href="mailto:ayushch435@gmail.com" className="p-3 bg-gray-800/50 rounded-full hover:bg-purple-600 transition-all duration-300 hover:scale-110">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <ChevronDown size={32} className="text-purple-400 mb-2" />
            <span className="text-sm text-gray-400">Scroll Down</span>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 px-4" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate full-stack developer with <span className="text-purple-400 font-semibold">2+ years</span> of experience 
                building scalable web applications that solve real-world problems. My expertise spans across modern JavaScript frameworks, 
                cloud architecture, and creating seamless user experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey began with a curiosity about how digital products work, which evolved into a deep passion for 
                crafting efficient, beautiful, and user-centric solutions. I believe in writing clean, maintainable code 
                and staying updated with the latest industry trends.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {achievements.map((achievement, index) => (
                  <div key={achievement.label} className="text-center p-4 bg-gray-800/30 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex justify-center mb-2">
                      <achievement.icon size={24} className="text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{achievement.number}</div>
                    <div className="text-sm text-gray-400">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`relative transition-all duration-1000 delay-400 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-1 relative overflow-hidden">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center relative">
                  <User size={120} className="text-purple-400" />
                  {/* Animated rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping"></div>
                  <div className="absolute inset-4 rounded-full border-2 border-pink-400/30 animate-ping" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse flex items-center justify-center">
                <Star size={24} className="text-white" />
              </div>
              <div className="absolute bottom-8 left-8 w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse delay-700 flex items-center justify-center">
                <Zap size={20} className="text-white" />
              </div>
              <div className="absolute top-1/2 left-4 w-12 h-12 bg-gradient-to-br from-red-400 to-purple-500 rounded-full animate-pulse delay-1000 flex items-center justify-center">
                <Target size={18} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-black/10" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              What I Do
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={service.title} className={`group transition-all duration-1000 delay-${index * 100} ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105 h-full">
                  <div className={`p-4 rounded-lg bg-gradient-to-r ${service.color} mb-4 w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-20 px-4 bg-black/20" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className={`group transition-all duration-1000 delay-${index * 100} ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105 h-full">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <skill.icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                      <p className="text-gray-400 text-sm">{skill.description}</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">Proficiency</span>
                      <span className="text-sm text-purple-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-2000 ease-out`}
                        style={{ 
                          width: isVisible.skills ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 px-4" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
            <p className="text-lg text-gray-400 mt-6 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for creating innovative solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className={`group transition-all duration-1000 delay-${index * 100} ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105 h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-2 bg-purple-600 rounded-full">
                        <ExternalLink size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 flex-1 leading-relaxed">{project.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-purple-400 mb-2">Key Features:</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm font-medium border border-purple-600/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 pt-4 border-t border-gray-700">
                      <a 
                        href={project.github}
                        className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors duration-300 font-medium"
                      >
                        <Github size={16} />
                        Code
                      </a>
                      <a 
                        href={project.demo}
                        className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors duration-300 font-medium"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black/20" data-animate>
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
            <p className="text-lg text-gray-300 mt-6 max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'm always excited to work on new projects and collaborate with amazing people.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
                <p className="text-gray-400 mb-8">
                  I'm currently available for freelance projects and full-time opportunities. 
                  Let's discuss how we can work together to create something amazing.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Email</h4>
                    <a href="mailto:ayushch435@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                      ayushch435@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                    <Linkedin size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">LinkedIn</h4>
                    <a href="https://www.linkedin.com/in/ayush-chauhan-95155632a/" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                      Connect with me
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                    <Github size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">GitHub</h4>
                    <a href="https://github.com/ayusssh11" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                      View my code
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg border border-purple-500/20">
                <h4 className="text-lg font-semibold text-white mb-2">Quick Facts</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Available for new projects
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Response time: Usually within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Open to remote and on-site work
                  </li>
                </ul>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-400 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                    <select className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300">
                      <option>Web Development</option>
                      <option>Mobile App</option>
                      <option>E-commerce</option>
                      <option>API Development</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      placeholder="Tell me about your project..."
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none"
                    ></textarea>
                  </div>
                  <button
                    onClick={() => alert('Thank you for your message! I\'ll get back to you soon.')}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <ArrowRight size={20} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 px-4 border-t border-gray-800 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Ayush Chauhan
              </h3>
              <p className="text-gray-400 mb-4">
                Full Stack Developer passionate about creating innovative digital solutions.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/ayusssh11" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors duration-300">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/ayush-chauhan-95155632a/" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors duration-300">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:ayushch435@gmail.com" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors duration-300">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>API Development</li>
                <li>Database Design</li>
                <li>Cloud Deployment</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Ayush Chauhan. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => scrollToSection('home')}
        className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40"
      >
        <ChevronDown size={24} className="rotate-180" />
      </button>
    </div>
  );
};

export default Portfolio;

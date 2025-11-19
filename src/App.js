import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Database, Server, Smartphone, Globe, Award, User, Briefcase, MessageSquare, Menu, X, ArrowRight, Star, Zap, Target, Eye, Heart, Coffee, Clock, CheckCircle, Play, Pause, MousePointer, Sparkles, Cpu, Monitor, Layers, GitBranch, FileCode, Terminal } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [particlePositions, setParticlePositions] = useState([]);
  const observerRef = useRef(null);

  const roles = [
    'Full Stack Developer',
    'React Specialist',
    'Node.js Expert',
    'Cloud Architect',
    'Problem Solver'
  ];

  // Initialize particles for background animation
  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticlePositions(particles);

    const animateParticles = () => {
      setParticlePositions(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking and scroll effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Enhanced intersection observer
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

  // Enhanced typewriter effect
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

  // Active section detection
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

  // Animated Character Component
  const AnimatedCharacter = () => (
    <div className="relative w-80 h-80 mx-auto">
      {/* Main character container */}
      <div className="relative w-full h-full animate-float">
        {/* Character body */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-2xl transform hover:scale-105 transition-transform duration-500">
          {/* Floating code elements */}
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg animate-bounce-slow shadow-lg flex items-center justify-center">
            <FileCode size={20} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-6 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg flex items-center justify-center">
            <Terminal size={16} className="text-white" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl animate-bounce-slow delay-1000 shadow-lg flex items-center justify-center">
            <GitBranch size={22} className="text-white" />
          </div>
          <div className="absolute -bottom-2 -left-6 w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-pulse delay-500 shadow-lg flex items-center justify-center">
            <Cpu size={14} className="text-white" />
          </div>
          
          {/* Character face */}
          <div className="absolute inset-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
            <div className="relative">
              {/* Eyes */}
              <div className="flex gap-8 mb-6">
                <div className="w-4 h-4 bg-slate-800 rounded-full animate-blink"></div>
                <div className="w-4 h-4 bg-slate-800 rounded-full animate-blink"></div>
              </div>
              {/* Smile */}
              <div className="w-12 h-6 border-b-4 border-slate-800 rounded-full animate-pulse"></div>
              
              {/* Glasses effect */}
              <div className="absolute -top-2 -left-6 w-16 h-8 border-2 border-slate-700 rounded-lg opacity-80">
                <div className="absolute left-1 top-1 w-5 h-4 bg-blue-100/50 rounded"></div>
                <div className="absolute right-1 top-1 w-5 h-4 bg-blue-100/50 rounded"></div>
              </div>
            </div>
          </div>
          
          {/* Orbiting elements */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-400 rounded-full shadow-lg"></div>
            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-4 h-4 bg-indigo-400 rounded-full shadow-lg"></div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-purple-400 rounded-full shadow-lg"></div>
            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>
      
      {/* Base shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/20 rounded-full blur-lg animate-pulse"></div>
    </div>
  );

  const skills = [
    { name: 'React', level: 95, icon: Code, color: 'from-blue-600 to-indigo-700', description: 'Advanced component architecture & state management' },
    { name: 'Node.js', level: 90, icon: Server, color: 'from-emerald-600 to-teal-700', description: 'Scalable backend systems & REST APIs' },
    { name: 'MongoDB', level: 85, icon: Database, color: 'from-green-600 to-emerald-700', description: 'Database design & performance optimization' },
    { name: 'PHP', level: 88, icon: Code, color: 'from-violet-600 to-purple-700', description: 'Enterprise web applications & frameworks' },
    { name: 'Python', level: 82, icon: Code, color: 'from-amber-600 to-orange-700', description: 'Data processing & automation solutions' },
    { name: 'AWS', level: 78, icon: Globe, color: 'from-orange-600 to-red-700', description: 'Cloud infrastructure & DevOps practices' },
  ];

  const projects = [
    {
      title: 'Morning City News Portal',
      description: 'A comprehensive digital news platform featuring real-time content management, advanced categorization, and responsive design optimized for performance and user engagement.',
      image: '/Screenshot 2025-11-19 at 12.11.06 PM.png',
      tech: ['PHP', 'Bootstrap', 'MySQL', 'JavaScript', 'AJAX'],
      github: '#',
      demo: 'https://morningcity.in/',
      features: ['Real-time content updates', 'Administrative dashboard', 'SEO optimization', 'Mobile-first design'],
      category: 'Web Development'
    },
    {
      title: 'TakePDF Converter',
      description: 'An intelligent document conversion platform supporting multiple file formats with advanced processing capabilities, secure file handling, and batch conversion features.',
      image: '/Screenshot 2025-11-19 at 12.12.44 PM.png',
      tech: ['Python', 'Flask', 'Bootstrap', 'MySQL', 'JavaScript'],
      github: '#',
      demo: 'https://takepdf.com/',
      features: ['Multi-format support', 'Batch processing', 'Secure encryption', 'RESTful API integration'],
      category: 'SaaS Application'
    },
    {
      title: 'Hanumanta Auto Portfolio',
      description: 'A sophisticated business portfolio showcasing automotive services with interactive galleries, streamlined service booking system, and integrated customer testimonials.',
      image: '/Screenshot 2025-11-19 at 12.12.59 PM.png',
      tech: ['Bootstrap', 'MySQL', 'Tailwind', 'JavaScript', 'PHP'],
      github: '#',
      demo: 'https://hanumantauto.in/',
      features: ['Online service booking', 'Dynamic gallery system', 'Customer review management', 'Contact automation'],
      category: 'Business Portfolio'
    },
    {
      title: 'Pragyan Digital CRM',
      description: 'A robust Customer Relationship Management (CRM) platform designed to streamline sales, marketing, and customer service operations for businesses of all sizes.',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&h=400&fit=crop&auto=format',
      tech: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'jQuery', 'AJAX'],
      github: '#',
      demo: 'https://pragyandigital.com/',
      features: ['Lead management and tracking', 'Sales pipeline visualization', 'Automated email marketing', 'Customer support ticketing'],
      category: 'CRM Software'
    }
  ];

  const achievements = [
    { number: '2+', label: 'Years Experience', icon: Clock },
    { number: '15+', label: 'Projects Delivered', icon: CheckCircle },
    { number: '100%', label: 'Client Satisfaction', icon: Heart },
    { number: '24/7', label: 'Support Available', icon: Coffee }
  ];

  const services = [
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'End-to-end web application development using modern frameworks, ensuring scalability and performance.',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Mobile-first approach creating seamless user experiences across all devices and screen sizes.',
      color: 'from-emerald-600 to-teal-700'
    },
    {
      icon: Database,
      title: 'Database Architecture',
      description: 'Optimized database design focusing on performance, scalability, and data integrity.',
      color: 'from-violet-600 to-purple-700'
    },
    {
      icon: Globe,
      title: 'Cloud Solutions',
      description: 'Secure cloud infrastructure setup with automated deployment and continuous integration.',
      color: 'from-orange-600 to-red-700'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <div className="flex-shrink-0 group cursor-pointer">
              <div className="relative">
                <span className="text-2xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors duration-300">
                  Ayush Chauhan
                </span>
              </div>
            </div>
            
            {/* Enhanced Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                      activeSection === section 
                        ? 'text-primary-600 bg-primary-50' 
                        : 'text-slate-700 hover:text-primary-600 hover:bg-slate-50'
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
                className="p-3 text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-110"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                  <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-3'}`}></span>
                  <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`md:hidden bg-white transition-all duration-300 ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden border-b border-slate-200`}>
          <div className="px-6 pt-4 pb-6 space-y-1">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-all duration-200"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-primary-50/30 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className={`transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {/* Status badge */}
            <div className="mb-8 animate-fade-in-up">
              <span className="inline-flex items-center px-5 py-2 bg-white rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-subtle hover:shadow-card transition-all duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2.5"></div>
                Available for new opportunities
              </span>
            </div>
            
            {/* Main heading with enhanced animation */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 leading-tight">
              Hi, I'm <span className="text-primary-600">Ayush Chauhan</span>
            </h1>
            
            {/* Enhanced typewriter effect */}
            <div className="text-xl md:text-2xl mb-8 text-slate-600 h-10 flex items-center justify-center">
              <span className="mr-2">I'm a </span>
              <div className="relative">
                <span className="text-primary-600 font-semibold">
                  {typedText}
                </span>
                <span className="absolute animate-pulse text-primary-400 ml-1">|</span>
              </div>
            </div>
            
            {/* Enhanced description */}
            <p className="text-lg mb-12 text-slate-600 max-w-3xl mx-auto leading-relaxed">
              I build exceptional digital experiences through clean code and thoughtful design. 
              Specializing in full-stack development with a focus on creating scalable, 
              user-centric applications.
            </p>
            
            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-3.5 bg-primary-600 text-white rounded-lg font-semibold text-base hover:bg-primary-700 transition-all duration-200 shadow-card hover:shadow-card-hover"
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3.5 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold text-base hover:border-primary-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 bg-white"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare size={20} />
                  Get In Touch
                </span>
              </button>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex justify-center gap-4 mb-12">
              {[
                { href: "https://github.com/ayusssh11", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/ayush-chauhan-95155632a/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:ayushch435@gmail.com", icon: Mail, label: "Email" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-3 bg-white rounded-lg hover:bg-slate-50 hover:text-primary-600 transition-all duration-200 shadow-subtle hover:shadow-card border border-slate-200"
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-slate-400">
            <ChevronDown size={24} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* Enhanced About Section with Animated Character */}
      <section id="about" className="py-20 px-6 bg-white" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              About Me
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="prose prose-lg text-slate-600">
                <p className="text-lg leading-relaxed mb-5">
                  I'm a full-stack developer with <span className="text-primary-600 font-semibold">2+ years</span> of professional experience, 
                  specializing in creating robust, scalable web applications that deliver exceptional user experiences.
                </p>
                <p className="text-base leading-relaxed mb-5">
                  My expertise spans modern JavaScript frameworks, cloud architecture, and database optimization. I'm passionate about 
                  writing clean, maintainable code and implementing best practices.
                </p>
                <p className="text-base leading-relaxed mb-6">
                  I actively contribute to the developer community through knowledge sharing and staying 
                  current with emerging technologies and industry trends.
                </p>
              </div>
              
              {/* Enhanced achievements grid */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={achievement.label} 
                    className={`text-center p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-card transition-all duration-300 hover:border-primary-200 group transform ${isVisible.about ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-primary-600 text-white rounded-lg group-hover:bg-primary-700 transition-colors duration-300">
                        <achievement.icon size={24} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-2">{achievement.number}</div>
                    <div className="text-xs text-slate-600 font-medium">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Animated Character */}
            <div className={`relative transition-all duration-1000 delay-400 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <AnimatedCharacter />
            </div>
          </div>
        </div>
      </section>



      {/* Enhanced Skills Section */}
      <section id="skills" className="py-20 px-6 bg-slate-50" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
            <p className="text-base text-slate-600 mt-6 max-w-2xl mx-auto">
              My technical expertise spans across modern web technologies, ensuring robust and scalable solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={skill.name} className={`group transition-all duration-1000 delay-${index * 150} ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-card transition-all duration-300 hover:border-primary-200 h-full">
                  <div className="flex items-center mb-5">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${skill.color} mr-4`}>
                      <skill.icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">{skill.name}</h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{skill.description}</p>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-slate-600">Proficiency</span>
                      <span className="text-sm font-semibold text-primary-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                        style={{ 
                          width: isVisible.skills ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 150}ms`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
            <p className="text-base text-slate-600 mt-6 max-w-2xl mx-auto">
              A selection of my recent projects demonstrating expertise in modern web technologies.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className={`group transition-all duration-1000 delay-${index * 200} ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Project category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white text-slate-800 text-xs font-semibold rounded-full shadow-card">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Action buttons overlay */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a href={project.demo} className="p-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-card">
                        <ExternalLink size={18} />
                      </a>
                      <a href={project.github} className="p-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors duration-200 shadow-card">
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 flex-1 leading-relaxed">{project.description}</p>
                    
                    {/* Key features with enhanced styling */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wide">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tech stack with enhanced badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action links */}
                    <div className="flex gap-4 pt-4 border-t border-slate-200">
                      <a 
                        href={project.github}
                        className="flex items-center gap-2 text-sm text-slate-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                      >
                        <Github size={16} />
                        Source
                      </a>
                      <a 
                        href={project.demo}
                        className="flex items-center gap-2 text-sm text-slate-700 hover:text-primary-600 transition-colors duration-200 font-medium"
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
      <section id="contact" className="py-20 px-6 bg-slate-50" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Let's Work Together
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
            <p className="text-base text-slate-600 mt-6 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss how we can collaborate.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Get in Touch</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  I'm currently available for freelance projects and full-time opportunities. 
                  Let's create something exceptional together.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: Mail, title: "Email", value: "ayushch435@gmail.com", href: "mailto:ayushch435@gmail.com" },
                  { icon: Linkedin, title: "LinkedIn", value: "Connect professionally", href: "https://www.linkedin.com/in/ayush-chauhan-95155632a/" },
                  { icon: Github, title: "GitHub", value: "View my repositories", href: "https://github.com/ayusssh11" }
                ].map((contact) => (
                  <div key={contact.title} className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-200 hover:shadow-card transition-all duration-300 hover:border-primary-200 group">
                    <div className="p-3 bg-primary-600 text-white rounded-lg group-hover:bg-primary-700 transition-colors duration-300">
                      <contact.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-slate-900 mb-1">{contact.title}</h4>
                      <a href={contact.href} className="text-sm text-slate-600 hover:text-primary-600 transition-colors duration-300">
                        {contact.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced availability status */}
              <div className="mt-6 p-5 bg-primary-50 rounded-xl border border-primary-200">
                <h4 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  Availability Status
                </h4>
                <div className="space-y-3">
                  {[
                    { status: "Available for new projects", icon: CheckCircle },
                    { status: "Response time: Within 24 hours", icon: Clock },
                    { status: "Open to remote collaboration", icon: Globe }
                  ].map((item) => (
                    <div key={item.status} className="flex items-center gap-3 text-sm text-slate-700">
                      <item.icon size={16} className="text-primary-600" />
                      <span>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Enhanced contact form */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-card">
                <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <MessageSquare className="text-primary-600" size={22} />
                  Send a Message
                </h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Project Type</label>
                    <select className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200">
                      <option>Web Application Development</option>
                      <option>Mobile Application</option>
                      <option>E-commerce Solution</option>
                      <option>API Development</option>
                      <option>Consulting & Strategy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Project Details</label>
                    <textarea
                      placeholder="Describe your project..."
                      rows={5}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={() => alert('Thank you for your interest! I\'ll respond to your message within 24 hours.')}
                    className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold text-base hover:bg-primary-700 transition-all duration-200 shadow-card hover:shadow-card-hover"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <ArrowRight size={18} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-10 mb-10">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Ayush Chauhan
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-md">
                Full Stack Developer specializing in creating innovative digital solutions that drive business success.
              </p>
              <div className="flex gap-3">
                {[
                  { href: "https://github.com/ayusssh11", icon: Github },
                  { href: "https://www.linkedin.com/in/ayush-chauhan-95155632a/", icon: Linkedin },
                  { href: "mailto:ayushch435@gmail.com", icon: Mail }
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href={social.href} 
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-200"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-semibold text-slate-900 mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-sm text-slate-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-semibold text-slate-900 mb-4">Services</h4>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li>Full Stack Development</li>
                <li>React Applications</li>
                <li>API Development</li>
                <li>Database Design</li>
                <li>Cloud Solutions</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600">
            <p>
              © 2025 Ayush Chauhan. All rights reserved.
            </p>
            <p className="mt-3 sm:mt-0">
              Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced scroll to top button */}
      <button
        onClick={() => scrollToSection('home')}
        className="fixed bottom-6 right-6 p-3 bg-primary-600 text-white rounded-lg shadow-card hover:shadow-card-hover hover:bg-primary-700 transition-all duration-200 z-50"
      >
        <ChevronDown size={20} className="rotate-180" />
      </button>

      {/* Custom styles for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scroll-indicator {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-blink {
          animation: blink 4s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out;
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-1000 { animation-delay: 1000ms; }
        
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Enhanced focus states for accessibility */
        button:focus,
        input:focus,
        textarea:focus,
        select:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #6366f1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #4f46e5);
        }
        
        /* Text selection styling */
        ::selection {
          background-color: rgba(59, 130, 246, 0.2);
          color: #1e293b;
        }
        
        /* Enhanced hover effects for interactive elements */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        .group:hover .group-hover\\:scale-125 {
          transform: scale(1.25);
        }
        
        .group:hover .group-hover\\:rotate-12 {
          transform: rotate(12deg);
        }
        
        .group:hover .group-hover\\:translate-x-2 {
          transform: translateX(8px);
        }
        
        .group:hover .group-hover\\:translate-y-0 {
          transform: translateY(0);
        }
        
        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }
        
        /* Loading state animations */
        .loading {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;

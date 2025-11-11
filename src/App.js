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
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop&auto=format',
      tech: ['PHP', 'Bootstrap', 'MySQL', 'JavaScript', 'AJAX'],
      github: '#',
      demo: 'https://morningcity.in/',
      features: ['Real-time content updates', 'Administrative dashboard', 'SEO optimization', 'Mobile-first design'],
      category: 'Web Development'
    },
    {
      title: 'TakePDF Converter',
      description: 'An intelligent document conversion platform supporting multiple file formats with advanced processing capabilities, secure file handling, and batch conversion features.',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop&auto=format',
      tech: ['Python', 'Flask', 'Bootstrap', 'MySQL', 'JavaScript'],
      github: '#',
      demo: 'https://takepdf.com/',
      features: ['Multi-format support', 'Batch processing', 'Secure encryption', 'RESTful API integration'],
      category: 'SaaS Application'
    },
    {
      title: 'Hanumanta Auto Portfolio',
      description: 'A sophisticated business portfolio showcasing automotive services with interactive galleries, streamlined service booking system, and integrated customer testimonials.',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&auto=format',
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
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden relative">
      {/* Animated background particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {particlePositions.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
            }}
          />
        ))}
      </div>

      {/* Enhanced cursor follower */}
      <div 
        className="fixed w-6 h-6 pointer-events-none z-50 transition-all duration-200 ease-out opacity-0 md:opacity-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      >
        <div className="w-full h-full bg-blue-600/30 rounded-full animate-ping"></div>
        <div className="absolute inset-2 bg-blue-600 rounded-full"></div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-2xl border-b border-slate-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 group cursor-pointer">
              <div className="relative">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  Ayush Chauhan
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
            
            {/* Enhanced Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-10">
                {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`relative px-6 py-3 text-sm font-semibold transition-all duration-300 group ${
                      activeSection === section 
                        ? 'text-blue-600 bg-blue-50 rounded-lg' 
                        : 'text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                      activeSection === section ? 'w-8' : 'group-hover:w-8'
                    }`}></span>
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
        <div className={`md:hidden bg-white/95 backdrop-blur-xl transition-all duration-500 ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden border-b border-slate-200`}>
          <div className="px-6 pt-4 pb-6 space-y-2">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section, index) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:scale-105"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          {/* Geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-200/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className={`transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {/* Status badge */}
            <div className="mb-10 animate-fade-in-up">
              <span className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-lg rounded-full text-sm font-semibold text-slate-700 border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                Available for new opportunities
              </span>
            </div>
            
            {/* Main heading with enhanced animation */}
            <h1 className="text-6xl md:text-8xl font-black mb-8 text-slate-900 leading-none">
              <span className="inline-block animate-slide-in-left">Ayush</span>{' '}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient-x animate-slide-in-right">
                Chauhan
              </span>
            </h1>
            
            {/* Enhanced typewriter effect */}
            <div className="text-2xl md:text-3xl mb-10 text-slate-700 h-12 flex items-center justify-center">
              <span className="mr-3">I'm a </span>
              <div className="relative">
                <span className="text-blue-600 font-bold">
                  {typedText}
                </span>
                <span className="absolute animate-pulse text-blue-400 ml-1">|</span>
              </div>
            </div>
            
            {/* Enhanced description */}
            <p className="text-xl mb-14 text-slate-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-500">
              Crafting exceptional digital experiences through innovative technology solutions. 
              I specialize in transforming complex challenges into elegant, scalable applications 
              that drive <span className="text-blue-600 font-semibold">measurable business results</span>.
            </p>
            
            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16 animate-fade-in-up delay-700">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-3">
                  <Eye size={24} />
                  View My Work
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="px-10 py-5 border-3 border-blue-600 text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/50 backdrop-blur-sm"
              >
                <span className="flex items-center gap-3">
                  <MessageSquare size={24} />
                  Get In Touch
                </span>
              </button>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex justify-center gap-8 mb-16 animate-fade-in-up delay-1000">
              {[
                { href: "https://github.com/ayusssh11", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/ayush-chauhan-95155632a/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:ayushch435@gmail.com", icon: Mail, label: "Email" }
              ].map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group p-4 bg-white/80 backdrop-blur-lg rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-125 shadow-xl hover:shadow-2xl"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <social.icon size={28} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="flex flex-col items-center text-slate-600">
            <div className="w-8 h-14 border-2 border-slate-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-slate-600 rounded-full mt-2 animate-scroll-indicator"></div>
            </div>
            <span className="text-sm font-medium mt-2">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* Enhanced About Section with Animated Character */}
      <section id="about" className="py-24 px-6 bg-white relative overflow-hidden" data-animate>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-slate-900">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Me</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="prose prose-lg text-slate-700">
                <p className="text-xl leading-relaxed mb-6">
                  As a dedicated full-stack developer with <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">2+ years</span> of professional experience, 
                  I specialize in creating robust, scalable web applications that deliver exceptional user experiences and drive business growth.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  My expertise spans modern JavaScript frameworks, cloud architecture, and database optimization. I'm passionate about 
                  writing clean, maintainable code and implementing best practices that ensure long-term project success.
                </p>
                <p className="text-lg leading-relaxed mb-8">
                  Beyond coding, I actively contribute to the developer community through knowledge sharing, mentoring, and staying 
                  current with emerging technologies and industry trends.
                </p>
              </div>
              
              {/* Enhanced achievements grid */}
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div 
                    key={achievement.label} 
                    className={`text-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 hover:shadow-2xl transition-all duration-500 hover:scale-110 group transform ${isVisible.about ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <achievement.icon size={32} />
                      </div>
                    </div>
                    <div className="text-4xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{achievement.number}</div>
                    <div className="text-sm text-slate-600 font-semibold uppercase tracking-wide">{achievement.label}</div>
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

      {/* Enhanced Services Section */}
      <section id="services" className="py-24 px-6 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden" data-animate>
        {/* Background decoration */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-slate-900">
              What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Do</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={service.title} className={`group transition-all duration-1000 delay-${index * 150} ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full group-hover:bg-white">
                  <div className={`p-5 rounded-2xl bg-gradient-to-br ${service.color} mb-8 w-fit group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                    <service.icon size={36} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{service.description}</p>
                  
                  {/* Hover effect decoration */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-24 px-6 bg-white relative overflow-hidden" data-animate>
        {/* Background decoration */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-30 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-slate-900">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Technologies</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            <p className="text-xl text-slate-600 mt-8 max-w-3xl mx-auto leading-relaxed">
              My technical expertise spans across modern web technologies, ensuring robust and scalable solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {skills.map((skill, index) => (
              <div key={skill.name} className={`group transition-all duration-1000 delay-${index * 150} ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-10 rounded-3xl border border-slate-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full relative overflow-hidden">
                  {/* Background glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  <div className="flex items-center mb-8 relative z-10">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${skill.color} mr-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                      <skill.icon size={32} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">{skill.name}</h3>
                      <p className="text-slate-600 text-sm mt-2">{skill.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4 relative z-10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Proficiency</span>
                      <span className="text-lg font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-300 rounded-full h-3 overflow-hidden shadow-inner">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-2000 ease-out relative overflow-hidden`}
                        style={{ 
                          width: isVisible.skills ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 300}ms`
                        }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-24 px-6 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden" data-animate>
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-slate-900">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Projects</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            <p className="text-xl text-slate-600 mt-8 max-w-4xl mx-auto leading-relaxed">
              Discover a selection of my recent projects that demonstrate expertise in modern web technologies and innovative problem-solving approaches.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <div key={project.title} className={`group transition-all duration-1000 delay-${index * 200} ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Project category badge */}
                    <div className="absolute top-6 left-6 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-slate-800 text-sm font-bold rounded-full shadow-lg">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Action buttons overlay */}
                    <div className="absolute bottom-6 right-6 flex gap-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <a href={project.demo} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                        <ExternalLink size={20} />
                      </a>
                      <a href={project.github} className="p-3 bg-slate-800 text-white rounded-full hover:bg-slate-900 transition-colors duration-300 shadow-lg hover:shadow-xl">
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 mb-6 flex-1 leading-relaxed text-lg">{project.description}</p>
                    
                    {/* Key features with enhanced styling */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-wide">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 rounded-lg p-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tech stack with enhanced badges */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.tech.map((tech, i) => (
                        <span 
                          key={tech} 
                          className="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 rounded-full text-sm font-semibold border border-slate-300 hover:scale-110 transition-transform duration-300 shadow-sm"
                          style={{ animationDelay: `${i * 100}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action links */}
                    <div className="flex gap-6 pt-6 border-t border-slate-200">
                      <a 
                        href={project.github}
                        className="flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-all duration-300 font-semibold hover:scale-105"
                      >
                        <Github size={20} />
                        Source Code
                      </a>
                      <a 
                        href={project.demo}
                        className="flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-all duration-300 font-semibold hover:scale-105"
                      >
                        <ExternalLink size={20} />
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
      <section id="contact" className="py-24 px-6 bg-white relative overflow-hidden" data-animate>
        {/* Background decorations */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-30 blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-slate-900">
              Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Together</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            <p className="text-xl text-slate-600 mt-8 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your ideas into exceptional digital solutions? Let's discuss how we can collaborate to achieve your goals.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className={`space-y-10 transition-all duration-1000 delay-200 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h3>
                <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                  I'm currently available for freelance projects and full-time opportunities. 
                  Let's create something exceptional together.
                </p>
              </div>
              
              <div className="space-y-8">
                {[
                  { icon: Mail, title: "Email", value: "ayushch435@gmail.com", href: "mailto:ayushch435@gmail.com", color: "from-blue-600 to-indigo-600" },
                  { icon: Linkedin, title: "LinkedIn", value: "Connect professionally", href: "https://www.linkedin.com/in/ayush-chauhan-95155632a/", color: "from-indigo-600 to-purple-600" },
                  { icon: Github, title: "GitHub", value: "View my repositories", href: "https://github.com/ayusssh11", color: "from-purple-600 to-pink-600" }
                ].map((contact, index) => (
                  <div key={contact.title} className={`flex items-center gap-6 p-8 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 group animate-fade-in-up`} style={{ animationDelay: `${index * 200}ms` }}>
                    <div className={`p-5 bg-gradient-to-r ${contact.color} text-white rounded-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                      <contact.icon size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{contact.title}</h4>
                      <a href={contact.href} className="text-slate-600 hover:text-blue-600 transition-colors duration-300 text-lg">
                        {contact.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced availability status */}
              <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border-2 border-blue-200/50">
                <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  Availability Status
                </h4>
                <div className="space-y-4">
                  {[
                    { status: "Available for new projects", color: "green", icon: CheckCircle },
                    { status: "Response time: Within 24 hours", color: "blue", icon: Clock },
                    { status: "Open to remote collaboration", color: "indigo", icon: Globe }
                  ].map((item, index) => (
                    <div key={item.status} className="flex items-center gap-4 text-slate-700">
                      <div className={`w-3 h-3 bg-${item.color}-500 rounded-full animate-pulse`} style={{ animationDelay: `${index * 300}ms` }}></div>
                      <item.icon size={18} className={`text-${item.color}-600`} />
                      <span className="font-medium">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Enhanced contact form */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-10 rounded-3xl border border-slate-200 hover:shadow-2xl transition-all duration-500 backdrop-blur-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <MessageSquare className="text-blue-600" size={28} />
                  Send a Message
                </h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-6 py-4 bg-white border-2 border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-6 py-4 bg-white border-2 border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 font-medium"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Project Type</label>
                    <select className="w-full px-6 py-4 bg-white border-2 border-slate-300 rounded-xl text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 font-medium">
                      <option>Web Application Development</option>
                      <option>Mobile Application</option>
                      <option>E-commerce Solution</option>
                      <option>API Development</option>
                      <option>Consulting & Strategy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Project Details</label>
                    <textarea
                      placeholder="Please describe your project requirements, timeline, and objectives..."
                      rows={5}
                      className="w-full px-6 py-4 bg-white border-2 border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 resize-none font-medium"
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={() => alert('Thank you for your interest! I\'ll respond to your message within 24 hours.')}
                    className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-3">
                      <Sparkles size={24} />
                      Send Message
                      <ArrowRight size={24} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 px-6 border-t border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-black text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ayush Chauhan
              </h3>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed max-w-md">
                Full Stack Developer specializing in creating innovative digital solutions that drive business success and exceptional user experiences.
              </p>
              <div className="flex gap-4">
                {[
                  { href: "https://github.com/ayusssh11", icon: Github },
                  { href: "https://www.linkedin.com/in/ayush-chauhan-95155632a/", icon: Linkedin },
                  { href: "mailto:ayushch435@gmail.com", icon: Mail }
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href={social.href} 
                    className="p-4 bg-white border-2 border-slate-200 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-xl"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-6">Quick Navigation</h4>
              <ul className="space-y-4">
                {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-slate-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-2 font-medium flex items-center gap-2"
                    >
                      <ArrowRight size={16} className="opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-6">Services</h4>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Full Stack Development
                </li>
                <li className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  React Applications
                </li>
                <li className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  API Development
                </li>
                <li className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Database Design
                </li>
                <li className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  Cloud Solutions
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-slate-200 pt-8 flex flex-col lg:flex-row justify-between items-center">
            <p className="text-slate-500 text-lg font-medium">
              © 2025 Ayush Chauhan. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-6 lg:mt-0">
              <p className="text-slate-500 text-lg font-medium">
                Crafted with
              </p>
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-red-500 animate-pulse" />
                <span className="text-slate-500 font-medium">React & Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced scroll to top button */}
      <button
        onClick={() => scrollToSection('home')}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-125 transition-all duration-300 z-50 group"
      >
        <ChevronDown size={24} className="rotate-180 group-hover:animate-bounce" />
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
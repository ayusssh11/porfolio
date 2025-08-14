import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Database, Server, Smartphone, Globe, Award, User, Briefcase, MessageSquare, Menu, X, ArrowRight, Star, Zap, Target, Eye, Heart, Coffee, Clock, CheckCircle, Play, Pause } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const observerRef = useRef(null);

  const roles = [
    'Full Stack Developer',
    'React Specialist',
    'Node.js Expert',
    'Digital Architect',
    'Problem Solver'
  ];

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      { threshold: 0.1, rootMargin: '100px' }
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
      {/* Cursor follower */}
      <div 
        className="fixed w-4 h-4 bg-blue-600 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out opacity-0 md:opacity-100"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          mixBlendMode: 'difference'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 group cursor-pointer">
              <span className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
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
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 group ${
                      activeSection === section ? 'text-blue-600' : 'text-slate-700'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300 ${
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
                className="p-2 text-slate-700 hover:text-blue-600 transition-colors duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white/95 backdrop-blur-xl transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden border-b border-slate-200`}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Geometric background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Available for new opportunities
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 leading-tight">
              Ayush <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Chauhan</span>
            </h1>
            
            <div className="text-xl md:text-2xl mb-8 text-slate-700 h-8">
              <span>I'm a </span>
              <span className="text-blue-600 font-semibold">
                {typedText}
                <span className="animate-pulse text-blue-400">|</span>
              </span>
            </div>
            
            <p className="text-lg mb-12 text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Crafting exceptional digital experiences through innovative technology solutions. 
              I specialize in transforming complex challenges into elegant, scalable applications that drive measurable business results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-12">
              <a href="https://github.com/ayusssh11" className="p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/ayush-chauhan-95155632a/" className="p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md">
                <Linkedin size={24} />
              </a>
              <a href="mailto:ayushch435@gmail.com" className="p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-slate-600">
            <ChevronDown size={24} className="mb-2" />
            <span className="text-sm font-medium">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <p className="text-lg text-slate-700 leading-relaxed">
                As a dedicated full-stack developer with <span className="text-blue-600 font-semibold">2+ years</span> of professional experience, 
                I specialize in creating robust, scalable web applications that deliver exceptional user experiences and drive business growth.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                My expertise spans modern JavaScript frameworks, cloud architecture, and database optimization. I'm passionate about 
                writing clean, maintainable code and implementing best practices that ensure long-term project success.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Beyond coding, I actively contribute to the developer community through knowledge sharing, mentoring, and staying 
                current with emerging technologies and industry trends.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                {achievements.map((achievement, index) => (
                  <div key={achievement.label} className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-blue-600 text-white rounded-lg">
                        <achievement.icon size={24} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-2">{achievement.number}</div>
                    <div className="text-sm text-slate-600 font-medium">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`relative transition-all duration-1000 delay-400 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50"></div>
                    <User size={120} className="text-blue-600 relative z-10" />
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl animate-pulse flex items-center justify-center shadow-lg">
                  <Star size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl animate-pulse delay-700 flex items-center justify-center shadow-lg">
                  <Zap size={20} className="text-white" />
                </div>
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl animate-pulse delay-1000 flex items-center justify-center shadow-lg">
                  <Target size={18} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-slate-50" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Do</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={service.title} className={`group transition-all duration-1000 delay-${index * 100} ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${service.color} mb-6 w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-white" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Technologies</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className={`group transition-all duration-1000 delay-${index * 100} ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <skill.icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900">{skill.name}</h3>
                      <p className="text-slate-600 text-sm">{skill.description}</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700">Proficiency</span>
                      <span className="text-sm font-bold text-blue-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
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

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-slate-50" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
            <p className="text-lg text-slate-600 mt-6 max-w-2xl mx-auto">
              Discover a selection of my recent projects that demonstrate expertise in modern web technologies and innovative problem-solving approaches.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className={`group transition-all duration-1000 delay-${index * 100} ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-3 py-1 bg-white/90 text-slate-800 text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-2 bg-blue-600 text-white rounded-full">
                        <ExternalLink size={16} />
                      </div>
                    </div>
                  </div>
                  
                                     <div className="p-6 flex-1 flex flex-col">
                     <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                       {project.title}
                     </h3>
                     <p className="text-slate-600 mb-4 flex-1 leading-relaxed">{project.description}</p>
                     
                     <div className="mb-4">
                       <h4 className="text-sm font-semibold text-blue-600 mb-2">Key Features:</h4>
                       <ul className="text-sm text-slate-600 space-y-1">
                         {project.features.map((feature, i) => (
                           <li key={i} className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                             {feature}
                           </li>
                         ))}
                       </ul>
                     </div>
                     
                     <div className="flex flex-wrap gap-2 mb-6">
                       {project.tech.map((tech) => (
                         <span key={tech} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200">
                           {tech}
                         </span>
                       ))}
                     </div>
                     
                     <div className="flex gap-4 pt-4 border-t border-slate-100">
                       <a 
                         href={project.github}
                         className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium text-sm"
                       >
                         <Github size={16} />
                         Source Code
                       </a>
                       <a 
                         href={project.demo}
                         className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium text-sm"
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white" data-animate>
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Together</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
            <p className="text-lg text-slate-600 mt-6 max-w-2xl mx-auto">
              Ready to transform your ideas into exceptional digital solutions? Let's discuss how we can collaborate to achieve your goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Get in Touch</h3>
                <p className="text-slate-600 mb-8">
                  I'm currently available for freelance projects and full-time opportunities. 
                  Let's create something exceptional together.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">Email</h4>
                    <a href="mailto:ayushch435@gmail.com" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">
                      ayushch435@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">LinkedIn</h4>
                    <a href="https://www.linkedin.com/in/ayush-chauhan-95155632a/" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">
                      Connect professionally
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
                    <Github size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">GitHub</h4>
                    <a href="https://github.com/ayusssh11" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">
                      View my repositories
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Availability Status</h4>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for new projects
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Response time: Within 24 hours
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Open to remote collaboration
                  </li>
                </ul>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-400 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Send a Message</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Project Type</label>
                    <select className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300">
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
                      placeholder="Please describe your project requirements, timeline, and objectives..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                    ></textarea>
                  </div>
                  <button
                    onClick={() => alert('Thank you for your interest! I\'ll respond to your message within 24 hours.')}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
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

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Ayush Chauhan
              </h3>
              <p className="text-slate-600 mb-6">
                Full Stack Developer specializing in creating innovative digital solutions that drive business success.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/ayusssh11" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/ayush-chauhan-95155632a/" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:ayushch435@gmail.com" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Quick Navigation</h4>
              <ul className="space-y-2">
                {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Services</h4>
              <ul className="space-y-2 text-slate-600">
                <li>Full Stack Development</li>
                <li>React Applications</li>
                <li>API Development</li>
                <li>Database Design</li>
                <li>Cloud Solutions</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
              © 2025 Ayush Chauhan. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm mt-4 md:mt-0">
              Crafted with React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => scrollToSection('home')}
        className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40"
      >
        <ChevronDown size={20} className="rotate-180" />
      </button>
    </div>
  );
};

export default Portfolio;

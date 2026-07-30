import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, BrainCircuit, ArrowRight, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'solutions' | 'assessments' | null>(null);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem('theme') || 'light';
      setTheme(currentTheme);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Monitor scroll state for transparent-to-white header transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solutionsItems = [
    { name: 'Student Solutions', path: '/colleges' },
    { name: 'School Solutions', path: '/schools' },
    { name: 'College Solutions', path: '/colleges' },
    { name: 'Corporate Solutions', path: '/colleges' },
    { name: 'Career Counsellors', path: '/colleges' }
  ];

  const assessmentsItems = [
    { name: 'Class XI-XII', path: '/assessments' },
    { name: 'UG Assessment', path: '/assessments' },
    { name: 'MBA Assessment', path: '/assessments' },
    { name: 'Corporate Assessment', path: '/assessments' },
    { name: 'Psychometric Test', path: '/assessments' },
    { name: 'Career Aptitude', path: '/assessments' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md border-b border-slate-200/60' 
          : 'bg-transparent'
      }`}
      style={{ height: '80px' }}
    >
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white shadow-md shadow-red-500/10">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <span className="font-sans text-lg font-black tracking-tight text-brand-slate">
              Torque <span className="text-brand-red">Insights</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 h-full">
          <Link to="/" className="text-sm font-bold text-slate-700 hover:text-brand-red transition-colors">
            Home
          </Link>

          {/* Assessments Dropdown */}
          <div 
            className="relative h-full flex items-center cursor-pointer"
            onMouseEnter={() => setActiveDropdown('assessments')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-bold text-slate-700 hover:text-brand-red transition-colors">
              Assessments
              <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === 'assessments' && (
              <div className="absolute top-[80px] left-0 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-fade-in-up">
                {assessmentsItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-brand-pink hover:text-brand-red transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div 
            className="relative h-full flex items-center cursor-pointer"
            onMouseEnter={() => setActiveDropdown('solutions')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-bold text-slate-700 hover:text-brand-red transition-colors">
              Solutions
              <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === 'solutions' && (
              <div className="absolute top-[80px] left-0 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-fade-in-up">
                {solutionsItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-brand-pink hover:text-brand-red transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/reports" className="text-sm font-bold text-slate-700 hover:text-brand-red transition-colors">
            AI Reports
          </Link>
          <Link to="/pricing" className="text-sm font-bold text-slate-700 hover:text-brand-red transition-colors">
            Pricing
          </Link>
          <Link to="/resources" className="text-sm font-bold text-slate-700 hover:text-brand-red transition-colors">
            Resources
          </Link>
          <Link to="/contact" className="text-sm font-bold text-slate-700 hover:text-brand-red transition-colors">
            Contact
          </Link>
        </div>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <Link
            to="/login"
            className="text-sm font-bold text-slate-700 hover:text-brand-red transition-all"
          >
            Login
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-brand-red px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-red-500/10 hover:bg-brand-redhover hover:scale-[1.02] transition-all"
          >
            Book Demo
          </Link>
        </div>

        {/* Hamburger menu button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 focus:outline-none transition-all duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE Slide-in Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40 transition-opacity" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer container */}
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 p-6 flex flex-col justify-between animate-fade-in-up">
            <div className="space-y-6 overflow-y-auto max-h-[80vh] no-scrollbar">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-red text-white">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <span className="font-sans text-base font-black text-brand-slate">
                    Torque Insights
                  </span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>

              {/* Navigation lists */}
              <div className="space-y-2">
                <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-bold text-slate-700 hover:text-brand-red">Home</Link>
                
                {/* Mobile Assessments list */}
                <div className="space-y-1 py-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-2">Assessments</p>
                  {assessmentsItems.map(item => (
                    <Link 
                      key={item.name} 
                      to={item.path} 
                      onClick={() => setIsOpen(false)} 
                      className="block py-1.5 px-3 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-red rounded-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Solutions list */}
                <div className="space-y-1 py-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-2">Solutions</p>
                  {solutionsItems.map(item => (
                    <Link 
                      key={item.name} 
                      to={item.path} 
                      onClick={() => setIsOpen(false)} 
                      className="block py-1.5 px-3 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-red rounded-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <Link to="/reports" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-bold text-slate-700 hover:text-brand-red">AI Reports</Link>
                <Link to="/pricing" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-bold text-slate-700 hover:text-brand-red">Pricing</Link>
                <Link to="/resources" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-bold text-slate-700 hover:text-brand-red">Resources</Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-bold text-slate-700 hover:text-brand-red">Contact</Link>
              </div>
            </div>

            {/* Fixed Bottom CTAs */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <button 
                onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light'); setIsOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl cursor-pointer"
              >
                <span>Theme</span>
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)} 
                className="block text-center py-2 text-sm font-bold text-slate-700 hover:text-brand-red"
              >
                Login
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)} 
                className="block text-center rounded-full bg-brand-red py-3 text-sm font-bold text-white shadow-md shadow-red-500/10 hover:bg-brand-redhover"
              >
                Book Demo
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Sobre', href: '#about' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contato', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="font-mono text-lg font-bold text-foreground hover:text-primary transition-colors">
            &lt;dev /&gt;
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                >
                  <span className="mono text-primary text-xs mr-1">0{index + 1}.</span>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="ml-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Currículo
                </a>
              </Button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <Button
            variant="icon"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <ul className="flex flex-col py-4 px-6">
              {navItems.map((item, index) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block py-3 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mono text-primary text-xs mr-2">0{index + 1}.</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    Currículo
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

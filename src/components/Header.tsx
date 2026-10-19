import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Play, Pause, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  className?: string;
}

interface NavItem {
  href: string;
  label: string;
  desc: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '#step-1', label: '1. 토폴로지 비교', desc: '4대 구조 인포그래픽 및 선택' },
  { href: '#step-2', label: '2. 실생활 문제/코드', desc: '4대 프리셋 및 자가 치유 가동' },
  { href: '#step-3', label: '3. 결과 및 패치 Diff', desc: '단위 테스트 및 Before/After 비교' },
];

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#step-1');

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Detect scroll for subtle shadow & elevation effect (Navbar style)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sectionIds[i]}`);
          return;
        }
      }
      setActiveSection('#research-paper');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press or on window resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reducedMotion]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 웹 접근성 본문 바로가기 링크 (T01-C14) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-2.5 focus:text-xs focus:font-semibold focus:text-white focus:shadow-xl focus:ring-2 focus:ring-neutral-900 focus:outline-none dark:focus:bg-white dark:focus:text-neutral-900"
      >
        본문 바로가기 (Skip to content)
      </a>

      {/* 헤더 바: 글래스모피즘 & 호버 언더라인 네비게이션 */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 w-full transition-all duration-200',
          isScrolled || mobileMenuOpen
            ? 'border-b border-white/60 bg-white/75 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-black/60'
            : 'border-b border-white/40 bg-white/55 backdrop-blur-md dark:border-white/10 dark:bg-black/40',
          className,
        )}
      >
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          {/* Left: Simple Logo & Branding */}
          <a
            href="#"
            className="group flex items-center gap-2 text-sm font-bold tracking-tight text-neutral-900 transition-opacity hover:opacity-80 dark:text-white"
          >
            <span className="relative font-extrabold tracking-tight">
              jinyeongjang -
              <span className="text-2xs ml-1.5 font-medium text-neutral-500 dark:text-neutral-400">
                논문 프로젝트를 앱으로.
              </span>
              <span className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-neutral-900 transition-transform duration-200 ease-out group-hover:scale-x-100 dark:bg-white" />
            </span>
          </a>

          {/* Center/Right: Desktop Navigation Menu with Left-to-Right Hover Underline */}
          <nav className="hidden items-center gap-4 md:flex lg:gap-6" aria-label="메인 네비게이션">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'group relative py-1 text-xs font-semibold tracking-tight transition-colors duration-150 select-none lg:text-sm',
                    isActive
                      ? 'text-neutral-900 dark:text-white'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {/* Underline expanding from left to right */}
                  <span
                    className={cn(
                      'absolute inset-x-0 -bottom-1 h-[2px] origin-left rounded-full bg-neutral-900 transition-transform duration-200 ease-out dark:bg-white',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right: Quick Action Buttons & Mobile Hamburger */}
          <div className="flex items-center gap-1">
            {/* Animation Toggle Button (T01-C22 규격 필수 요소) */}
            <button
              type="button"
              onClick={toggleReducedMotion}
              className={cn(
                'flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors',
                !reducedMotion
                  ? 'text-neutral-700 hover:bg-white/60 dark:text-neutral-300 dark:hover:bg-white/10'
                  : 'text-neutral-400 hover:bg-white/60 dark:text-neutral-500 dark:hover:bg-white/10',
              )}
              title={reducedMotion ? '애니메이션 켜기 (활성화)' : '애니메이션 끄기 (비활성화)'}
              aria-label={reducedMotion ? '애니메이션 켜기' : '애니메이션 끄기'}
              aria-pressed={!reducedMotion}
            >
              {reducedMotion ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 fill-current text-emerald-600 dark:text-emerald-400" />
              )}
            </button>

            {/* Dark / Light Mode Switch */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-white/60 dark:text-neutral-300 dark:hover:bg-white/10"
              title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
              aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="모바일 메뉴 열기/닫기"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-white/60 md:hidden dark:text-neutral-300 dark:hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/60 bg-white/80 backdrop-blur-2xl md:hidden dark:border-white/10 dark:bg-black/80"
            >
              <div className="space-y-1 px-4 py-3 sm:px-6">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        'group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-neutral-100 font-semibold text-neutral-900 dark:bg-neutral-800 dark:text-white'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white',
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="relative">
                        {item.label}
                        <span
                          className={cn(
                            'absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left rounded-full bg-neutral-900 transition-transform duration-200 ease-out dark:bg-white',
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                          )}
                        />
                      </span>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">{item.desc}</span>
                    </a>
                  );
                })}

                {/* Mobile Quick Controls */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleReducedMotion}
                      className="flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      {reducedMotion ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      <span>{reducedMotion ? '모션 꺼짐' : '모션 켜짐'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                      <span>{theme === 'dark' ? '라이트 모드' : '다크 모드'}</span>
                    </button>
                  </div>
                  <a
                    href="https://github.com/jinyeongjang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:hover:text-white"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;

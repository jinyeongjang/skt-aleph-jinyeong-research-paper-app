import React from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={cn(
        'relative z-10 border-t border-white/60 bg-white/60 py-10 text-xs text-neutral-600 backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:text-neutral-400',
        className,
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} 장진영. SKT ALEPH 1기 인공지능 엔지니어링 포트폴리오.
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="glass-pill group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-neutral-700 transition-all hover:-translate-y-0.5 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:text-neutral-300 dark:hover:text-white"
        >
          <span>맨 위로</span>
          <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;

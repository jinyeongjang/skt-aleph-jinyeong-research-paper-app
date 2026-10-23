import React, { useState } from 'react';
import {
  Code2,
  Share2,
  CheckCircle2,
  Play,
  AlertTriangle,
  Download,
  Layers,
  Sun,
  Moon,
  ArrowUp,
  RefreshCw,
} from 'lucide-react';

interface DockBarProps {
  onRunSimulation?: () => void;
  onTriggerInvalidInput?: () => void;
  isRunning?: boolean;
  selectedTopology?: 'linear' | 'star' | 'mesh' | 'tree';
}

export const DockBar: React.FC<DockBarProps> = ({ onRunSimulation, onTriggerInvalidInput, isRunning = false }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="빠른 실행 및 네비게이션 독바" className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 px-2">
      <div className="glass-dock flex items-center gap-1.5 rounded-2xl p-1.5 transition-all duration-200 sm:gap-2 sm:p-2">
        {/* Step 1: 문제/코드 */}
        {/* Step 1: 토폴로지 선택 */}
        <button
          type="button"
          onClick={() => scrollToSection('step-1')}
          title="1단계: 4대 협업 토폴로지 선택"
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-neutral-600 transition-all duration-200 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:text-blue-600 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-neutral-300 dark:hover:border-white/10 dark:hover:bg-white/10 dark:hover:text-blue-400"
        >
          <Share2 className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900/90 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white opacity-0 shadow-md backdrop-blur-md transition-opacity group-hover:opacity-100 dark:bg-neutral-100/90 dark:text-neutral-900">
            1. 토폴로지 선택
          </span>
        </button>

        {/* Step 2: 실생활 문제 & 코드 선택 */}
        <button
          type="button"
          onClick={() => scrollToSection('step-2')}
          title="2단계: 실생활 서비스 & 코드 선택"
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-neutral-600 transition-all duration-200 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:text-blue-600 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-neutral-300 dark:hover:border-white/10 dark:hover:bg-white/10 dark:hover:text-blue-400"
        >
          <Code2 className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900/90 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white opacity-0 shadow-md backdrop-blur-md transition-opacity group-hover:opacity-100 dark:bg-neutral-100/90 dark:text-neutral-900">
            2. 문제 & 코드
          </span>
        </button>

        {/* Step 3: 결과 및 패치 Diff */}
        <button
          type="button"
          onClick={() => scrollToSection('step-3')}
          title="3단계: 실측 지표 & 패치 Diff"
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-neutral-600 transition-all duration-200 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:text-emerald-600 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-600 dark:text-neutral-300 dark:hover:border-white/10 dark:hover:bg-white/10 dark:hover:text-emerald-400"
        >
          <CheckCircle2 className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900/90 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white opacity-0 shadow-md backdrop-blur-md transition-opacity group-hover:opacity-100 dark:bg-neutral-100/90 dark:text-neutral-900">
            3. 결과 & 패치 Diff
          </span>
        </button>

        {/* 구분선 */}
        <div className="h-6 w-px bg-neutral-300/60 dark:bg-neutral-700/60" />

        {/* Action: 자가 치유 실행 버튼 (Glossy Blue Glass) */}
        <button
          type="button"
          onClick={onRunSimulation}
          disabled={isRunning}
          title="단위 테스트 자가 치유 실행"
          className="group relative flex h-10 items-center gap-1.5 rounded-xl border border-blue-400/40 bg-blue-600/95 px-3 text-xs font-bold text-white shadow-md shadow-blue-500/30 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-50"
        >
          {isRunning ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-white" />}
          <span className="hidden sm:inline">{isRunning ? '치유 중...' : '자가 치유 실행'}</span>
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900/90 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white opacity-0 shadow-md backdrop-blur-md transition-opacity group-hover:opacity-100 dark:bg-neutral-100/90 dark:text-neutral-900">
            실시간 자가 치유 엔진 가동
          </span>
        </button>

        {/* Action: 비정상 입력 가드레일 테스트 (Frosted Rose Glass) */}
        <button
          type="button"
          onClick={onTriggerInvalidInput}
          title="비정상·극단적 입력 방어 테스트 (BRB-C05)"
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-red-300/60 bg-red-100/60 text-red-600 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:bg-red-200/70 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-red-600 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/70"
        >
          <AlertTriangle className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900/90 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white opacity-0 shadow-md backdrop-blur-md transition-opacity group-hover:opacity-100 dark:bg-neutral-100/90 dark:text-neutral-900">
            가드레일 방어 테스트
          </span>
        </button>

        {/* 구분선 */}
        <div className="h-6 w-px bg-neutral-300/60 dark:bg-neutral-700/60" />

        {/* Action: DOCX 다운로드 */}
        <a
          href="/downloads/skt-aleph-jinyeong-research-paper.docx"
          download="skt-aleph-jinyeong-research-paper.docx"
          title="학술 논문 DOCX 파일 다운로드"
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-neutral-600 transition-all duration-200 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:text-neutral-900 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-neutral-900 dark:text-neutral-300 dark:hover:border-white/10 dark:hover:bg-white/10 dark:hover:text-neutral-100"
        >
          <Download className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900/90 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white opacity-0 shadow-md backdrop-blur-md transition-opacity group-hover:opacity-100 dark:bg-neutral-100/90 dark:text-neutral-900">
            DOCX 논문 다운로드
          </span>
        </a>

        {/* Action: ZIP 다운로드 */}
        <a
          href="/downloads/research-reproduction-package.zip"
          download="research-reproduction-package.zip"
          title="단일 ZIP 재현 패키지 다운로드"
          className="group relative hidden h-10 w-10 items-center justify-center rounded-xl border border-transparent text-neutral-600 transition-all duration-200 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:text-neutral-900 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-neutral-900 sm:flex dark:text-neutral-300 dark:hover:border-white/10 dark:hover:bg-white/10 dark:hover:text-neutral-100"
        >
          <Layers className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900/90 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white opacity-0 shadow-md backdrop-blur-md transition-opacity group-hover:opacity-100 dark:bg-neutral-100/90 dark:text-neutral-900">
            재현 ZIP 패키지
          </span>
        </a>

        {/* Action: 다크/라이트 테마 토글 */}
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-neutral-600 transition-all duration-200 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:text-amber-500 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-neutral-900 dark:text-neutral-300 dark:hover:border-white/10 dark:hover:bg-white/10 dark:hover:text-amber-400"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 transition-transform group-hover:rotate-45" />
          ) : (
            <Moon className="h-4 w-4 transition-transform group-hover:-rotate-12" />
          )}
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900/90 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white opacity-0 shadow-md backdrop-blur-md transition-opacity group-hover:opacity-100 dark:bg-neutral-100/90 dark:text-neutral-900">
            {theme === 'dark' ? '라이트 모드' : '다크 모드'}
          </span>
        </button>

        {/* Action: 최상단 이동 */}
        <button
          type="button"
          onClick={scrollToTop}
          title="최상단으로 이동"
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-neutral-600 transition-all duration-200 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:text-neutral-900 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-neutral-900 dark:text-neutral-300 dark:hover:border-white/10 dark:hover:bg-white/10 dark:hover:text-neutral-100"
        >
          <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900/90 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white opacity-0 shadow-md backdrop-blur-md transition-opacity group-hover:opacity-100 dark:bg-neutral-100/90 dark:text-neutral-900">
            맨 위로
          </span>
        </button>
      </div>
    </aside>
  );
};

export default DockBar;

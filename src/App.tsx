import React from 'react';
import { Header } from './components/Header';
import { ResearchPaperApp } from './components/ResearchPaperApp';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-neutral-100/60 font-sans text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white dark:bg-[#0a0a0c] dark:text-neutral-100">
      {/* 글래스모피즘 굴절을 위한 미세 앰비언트 광원 레이어 */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="dark:via-indigo-600/08 absolute -top-24 -left-20 h-96 w-96 rounded-full bg-linear-to-br from-blue-400/20 via-indigo-300/15 to-transparent blur-3xl dark:from-blue-600/12" />
        <div className="dark:via-sky-600/08 absolute top-1/4 -right-28 h-[28rem] w-[28rem] rounded-full bg-linear-to-bl from-teal-300/15 via-sky-300/15 to-transparent blur-3xl dark:from-teal-600/10" />
        <div className="dark:via-pink-900/05 absolute top-2/3 -left-24 h-96 w-96 rounded-full bg-linear-to-tr from-purple-300/15 via-pink-200/10 to-transparent blur-3xl dark:from-purple-900/10" />
        <div className="dark:from-emerald-700/08 absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-linear-to-t from-emerald-300/15 to-transparent blur-3xl" />
      </div>

      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 mx-auto max-w-7xl px-3 pt-18 pb-12 outline-none sm:px-6 sm:pt-22 sm:pb-16"
      >
        <ResearchPaperApp />
      </main>
      <Footer />
    </div>
  );
};

export default App;

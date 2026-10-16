// src/components/RealWorldSimulator.tsx
import React, { useState } from 'react';
import type { RealWorldPreset } from '../data/realLifeData';
import {
  CreditCard,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  AlertTriangle,
  Sparkles,
  Building2,
  Play,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface RealWorldSimulatorProps {
  preset: RealWorldPreset;
  selectedTopology: 'linear' | 'star' | 'mesh' | 'tree';
  onRunSimulation: () => void;
  isRunning: boolean;
}

export const RealWorldSimulator: React.FC<RealWorldSimulatorProps> = ({
  preset,
  selectedTopology,
  onRunSimulation,
  isRunning,
}) => {
  // 사용자가 실생활 시뮬레이터에서 직접 값을 변경해볼 수 있는 상태
  const [activeEdgeTab, setActiveEdgeTab] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard':
        return <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />;
      case 'TrendingUp':
        return <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />;
      case 'FileCheck':
        return <FileCheck className="h-6 w-6 text-amber-600 dark:text-amber-400" />;
      default:
        return <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  const selectedEdge = preset.edgeCaseInputs[activeEdgeTab] || preset.edgeCaseInputs[0];

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-b from-white/80 via-white/60 to-white/40 p-5 shadow-xl backdrop-blur-2xl sm:p-7 dark:border-white/10 dark:from-neutral-900/80 dark:via-neutral-950/60 dark:to-black/40">
      {/* 1. 실생활 서비스 헤더 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/70 pb-4 dark:border-neutral-800">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white/90 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-white/10">
            {getIcon(preset.realLifeIcon)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-black tracking-wider text-blue-700 uppercase dark:bg-blue-950/80 dark:text-blue-300">
                {preset.realLifeDomain}
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">|</span>
              <span className="text-2xs font-mono font-bold text-neutral-500 dark:text-neutral-400">
                {preset.serviceName}
              </span>
            </div>
            <h3 className="mt-1 text-base font-black tracking-tight text-neutral-900 sm:text-lg dark:text-neutral-50">
              {preset.realLifeTitle}
            </h3>
          </div>
        </div>

        {/* 현재 활성 토폴로지 뱃지 & 실행 버튼 */}
        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-1.5 text-right backdrop-blur-md dark:border-white/10 dark:bg-black/40">
            <div className="text-[9px] font-bold text-neutral-400 uppercase">활성 토폴로지</div>
            <div className="font-mono text-xs font-black text-blue-600 dark:text-blue-400">
              {selectedTopology.toUpperCase()}
            </div>
          </div>
          <button
            type="button"
            onClick={onRunSimulation}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 rounded-xl border border-blue-400/50 bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-2 text-xs font-black text-white shadow-md shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50"
          >
            {isRunning ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-white" />
            )}
            <span>{isRunning ? '자가 치유 중...' : '시뮬레이션 실행'}</span>
          </button>
        </div>
      </div>

      {/* 2. 사용자 스토리 및 결함 위험 카드 그리드 */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* 사용자 스토리 & 적용 시나리오 */}
        <div className="glass-panel flex flex-col justify-between rounded-2xl border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white/70 p-4.5 shadow-xs dark:border-blue-900/50 dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-neutral-900/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-blue-950 dark:text-blue-100">
              <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>실생활 적용 시나리오 & 비즈니스 목표</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-blue-900/85 dark:text-blue-100/85">{preset.userStory}</p>
          </div>
          <div className="mt-4 rounded-xl border border-blue-200/60 bg-white/80 p-2.5 backdrop-blur-md dark:border-blue-900/50 dark:bg-black/40">
            <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">실제 입력 데이터: </span>
            <span className="text-2xs font-mono text-neutral-800 dark:text-neutral-200">{preset.sampleInput}</span>
          </div>
        </div>

        {/* 결함 방치 시 실생활 위험 (Risk) */}
        <div className="glass-panel flex flex-col justify-between rounded-2xl border-red-200/80 bg-gradient-to-br from-red-50/70 via-rose-50/40 to-white/70 p-4.5 shadow-xs dark:border-red-900/50 dark:from-red-950/40 dark:via-rose-950/20 dark:to-neutral-900/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-red-950 dark:text-red-100">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span>순차형(Linear) 등 결함 방치 시 실생활 위험</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-red-900/85 dark:text-red-100/85">
              {preset.financialOrSocialRisk}
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-red-200/60 bg-white/80 p-2.5 backdrop-blur-md dark:border-red-900/50 dark:bg-black/40">
            <span className="text-[10px] font-bold text-red-700 dark:text-red-300">초안 결함: </span>
            <span className="text-2xs line-clamp-1 text-neutral-800 dark:text-neutral-200">{preset.bugScenario}</span>
          </div>
        </div>
      </div>

      {/* 3. 인터랙티브 실생활 엣지 케이스 선택 탭 */}
      <div className="mt-6 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 animate-ping rounded-full bg-blue-500" />
            <h4 className="text-xs font-black text-neutral-900 dark:text-neutral-100">
              🧪 실생활 엣지 케이스 시뮬레이션 테스트벤치
            </h4>
          </div>
          <span className="text-2xs font-medium text-neutral-500 dark:text-neutral-400">
            각 엣지 케이스 버튼을 클릭하여 토폴로지별 반응을 즉시 비교하세요.
          </span>
        </div>

        {/* 엣지 탭 버튼 */}
        <div className="flex flex-wrap gap-2.5">
          {preset.edgeCaseInputs.map((ec, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveEdgeTab(idx)}
              className={`rounded-xl px-4 py-2 text-xs font-black transition-all duration-200 ${
                activeEdgeTab === idx
                  ? 'bg-neutral-900 text-white shadow-md shadow-neutral-900/20 dark:bg-white dark:text-neutral-900'
                  : 'glass-panel text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
              }`}
            >
              <span>{ec.title}</span>
            </button>
          ))}
        </div>

        {/* 선택된 엣지 케이스의 토폴로지별 처리 결과 비교 카드 (실생활 영수증 & 승인 스탬프) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* 순차형 결과: 실생활 장애 카드 */}
          <div className="glass-panel flex flex-col justify-between rounded-2xl border-2 border-red-300/80 bg-gradient-to-b from-red-50/80 to-rose-50/50 p-5 shadow-sm dark:border-red-900/70 dark:from-red-950/50 dark:to-neutral-950/40">
            <div>
              <div className="flex items-center justify-between border-b border-red-200 pb-3 dark:border-red-900/60">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="text-xs font-black text-red-950 dark:text-red-100">순차형 파이프라인 (Linear)</span>
                </div>
                <span className="rounded-full border border-red-300 bg-red-200/80 px-2.5 py-0.5 text-[10px] font-black text-red-900 dark:border-red-800 dark:bg-red-900/80 dark:text-red-200">
                  실생활 장애 발생 💥
                </span>
              </div>

              <div className="text-2xs mt-3 rounded-lg bg-black/5 p-2 font-mono text-neutral-600 dark:bg-black/30 dark:text-neutral-400">
                입력 데이터: {selectedEdge.input}
              </div>

              <div className="mt-3 rounded-xl border border-red-200 bg-white/70 p-3.5 backdrop-blur-md dark:border-red-900/60 dark:bg-black/40">
                <div className="text-[10px] font-bold text-red-700 dark:text-red-300">처리 결과 리포트:</div>
                <p className="mt-1 text-xs leading-relaxed font-bold text-red-950 dark:text-red-100">
                  {selectedEdge.linearResult}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-red-200/80 pt-2.5 text-[10px] font-medium text-red-800 dark:text-red-300">
              * 원인: 단방향 파이프라인의 얕은 검토로 결함이 전파되어 시스템 런타임 오류 유발
            </div>
          </div>

          {/* 중앙 조율형 결과: 자가 치유 완료 카드 ⭐ */}
          <div className="glass-glow-blue glass-panel flex flex-col justify-between rounded-2xl border-2 border-blue-500/90 bg-gradient-to-b from-blue-50/90 to-indigo-50/60 p-5 shadow-lg dark:border-blue-400/90 dark:from-blue-950/60 dark:to-neutral-950/40">
            <div>
              <div className="flex items-center justify-between border-b border-blue-200 pb-3 dark:border-blue-900/60">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-black text-blue-950 dark:text-blue-100">
                    중앙 조율형 (Star 자가 치유) ⭐
                  </span>
                </div>
                <span className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-2.5 py-0.5 text-[10px] font-black text-white shadow-xs">
                  100% 자동 치유 🌟
                </span>
              </div>

              <div className="text-2xs mt-3 rounded-lg bg-black/5 p-2 font-mono text-neutral-600 dark:bg-black/30 dark:text-neutral-400">
                입력 데이터: {selectedEdge.input}
              </div>

              <div className="mt-3 rounded-xl border border-blue-200 bg-white/70 p-3.5 backdrop-blur-md dark:border-blue-900/60 dark:bg-black/40">
                <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300">자가 치유 패치 실행:</div>
                <p className="mt-1 text-xs leading-relaxed font-black text-blue-950 dark:text-blue-50">
                  {selectedEdge.starResult}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-blue-200/80 pt-2.5 text-[10px] font-bold text-blue-800 dark:text-blue-200">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>성과: {selectedEdge.realLifeImpact}</span>
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">지연 -70.62% 단축</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

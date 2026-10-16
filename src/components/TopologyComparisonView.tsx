// src/components/TopologyComparisonView.tsx
import React from 'react';
import { TOPOLOGIES_DETAIL, type TopologyDetail } from '../data/realLifeData';
import { Clock, Zap, Sparkles, ArrowRight, Check } from 'lucide-react';

interface TopologyComparisonViewProps {
  selectedTopology: 'linear' | 'star' | 'mesh' | 'tree';
  onSelectTopology: (topology: 'linear' | 'star' | 'mesh' | 'tree') => void;
}

export const TopologyComparisonView: React.FC<TopologyComparisonViewProps> = ({
  selectedTopology,
  onSelectTopology,
}) => {
  const topologies: TopologyDetail[] = [
    TOPOLOGIES_DETAIL.linear,
    TOPOLOGIES_DETAIL.star,
    TOPOLOGIES_DETAIL.mesh,
    TOPOLOGIES_DETAIL.tree,
  ];

  return (
    <section aria-labelledby="comparison-heading" className="space-y-4">
      {/* 비교 헤더 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/60 pb-3 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-wide text-blue-600 uppercase dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>4대 협업 토폴로지 한눈에 직관 비교 (Topology Comparison Matrix)</span>
          </div>
          <h2
            id="comparison-heading"
            className="mt-0.5 text-sm font-black text-neutral-900 sm:text-base dark:text-neutral-50"
          >
            어떤 구조가 왜 성공하고 왜 실패하는가? 실생활 비유 및 실측 벤치마크
          </h2>
        </div>
        <span className="text-2xs rounded-full border border-neutral-200 bg-white/80 px-2.5 py-1 font-mono font-bold text-neutral-600 shadow-2xs dark:border-neutral-800 dark:bg-black/60 dark:text-neutral-400">
          N=50 실측 벤치마크 (R=3)
        </span>
      </div>

      {/* 4대 토폴로지 카드 그리드 */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {topologies.map((t) => {
          const isSelected = selectedTopology === t.id;
          const isStar = t.id === 'star';

          return (
            <div
              key={t.id}
              onClick={() => onSelectTopology(t.id)}
              className={`glass-panel group relative flex cursor-pointer flex-col justify-between rounded-3xl p-4 transition-all duration-300 sm:p-5 ${
                isSelected
                  ? isStar
                    ? 'glass-glow-blue border-2 border-blue-500 bg-gradient-to-b from-blue-50/90 to-indigo-50/70 shadow-xl dark:border-blue-400 dark:from-blue-950/70 dark:to-indigo-950/60'
                    : 'border-2 border-neutral-900 bg-neutral-50/90 shadow-lg dark:border-white/80 dark:bg-neutral-900/90'
                  : 'hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md dark:hover:border-neutral-700'
              }`}
            >
              <div>
                {/* 상단 뱃지 & 아이디 */}
                <div className="flex items-center justify-between border-b border-white/60 pb-2.5 dark:border-white/10">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-black shadow-2xs ${t.badgeColor}`}
                  >
                    {t.badge}
                  </span>
                  <span className="font-mono text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                    {t.id}
                  </span>
                </div>

                {/* 제목 및 실생활 타이틀 */}
                <div className="mt-3.5 space-y-1">
                  <div className="text-2xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    {t.koreanName}
                  </div>
                  <div className="text-sm font-black text-neutral-900 sm:text-base dark:text-neutral-50">
                    {t.realLifeTitle}
                  </div>
                  <div className="text-2xs font-semibold text-blue-600 dark:text-blue-400">
                    실생활: &ldquo;{t.realLifeMetaphor}&rdquo;
                  </div>
                </div>

                {/* 실생활 설명 요약 */}
                <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {t.realLifeDescription}
                </p>

                {/* 핵심 정량 지표 미니 대시보드 */}
                <div className="mt-4 space-y-2.5 rounded-2xl border border-white/60 bg-white/50 p-3 shadow-xs dark:border-white/10 dark:bg-black/40">
                  {/* 1. 통과율 게이지 바 */}
                  <div>
                    <div className="text-2xs flex items-center justify-between font-black">
                      <span className="text-neutral-600 dark:text-neutral-400">단위 테스트 통과율</span>
                      <span
                        className={
                          t.passRate >= 100
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-red-600 dark:text-red-400'
                        }
                      >
                        {t.passRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-neutral-200/80 dark:bg-neutral-800">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          t.passRate >= 100
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : 'bg-gradient-to-r from-red-500 to-rose-400'
                        }`}
                        style={{ width: `${t.passRate}%` }}
                      />
                    </div>
                  </div>

                  {/* 2. 지연시간 & 통신량 */}
                  <div className="text-2xs grid grid-cols-2 gap-2 pt-1">
                    <div className="rounded-xl border border-white/60 bg-white/70 p-2 text-center shadow-2xs dark:border-white/5 dark:bg-white/5">
                      <div className="flex items-center justify-center gap-1 font-medium text-neutral-500 dark:text-neutral-400">
                        <Clock className="h-3 w-3 text-blue-500" />
                        <span>지연시간</span>
                      </div>
                      <div className="mt-1 font-mono text-xs font-black text-neutral-900 dark:text-neutral-100">
                        {t.latencyMs} ms
                      </div>
                      <div className="mt-0.5 text-[9px] text-neutral-400">
                        {isStar ? '-70.62% 단축' : t.id === 'mesh' ? '3.4배 지체' : 'CPU 지연'}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/60 bg-white/70 p-2 text-center shadow-2xs dark:border-white/5 dark:bg-white/5">
                      <div className="flex items-center justify-center gap-1 font-medium text-neutral-500 dark:text-neutral-400">
                        <Zap className="h-3 w-3 text-amber-500" />
                        <span>페이로드</span>
                      </div>
                      <div className="mt-1 font-mono text-xs font-black text-neutral-900 dark:text-neutral-100">
                        {t.payloadBytes} B
                      </div>
                      <div className="mt-0.5 text-[9px] text-neutral-400">
                        {isStar ? '-74.02% 절감' : t.id === 'mesh' ? '3.8배 폭증' : '전송 패킷'}
                      </div>
                    </div>
                  </div>

                  {/* 실생활 비용 평가 */}
                  <div className="flex items-center gap-1 pt-1 text-[10px] text-neutral-600 dark:text-neutral-400">
                    <span className="font-bold">비용 평가:</span>
                    <span className="font-medium">{t.costEstimate}</span>
                  </div>
                </div>
              </div>

              {/* 하단 선택 버튼 */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTopology(t.id);
                }}
                className={`mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-black transition-all ${
                  isSelected
                    ? isStar
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-neutral-900 text-white shadow-md dark:bg-white dark:text-neutral-900'
                    : 'glass-pill text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100'
                }`}
              >
                {isSelected ? <Check className="h-3.5 w-3.5" /> : null}
                <span>{isSelected ? '현재 활성화된 토폴로지' : '이 토폴로지로 실행'}</span>
                {!isSelected && <ArrowRight className="h-3 w-3" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* 직관 비교 총평 안내 배너 */}
      <div className="glass-panel relative overflow-hidden rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white/80 p-4 sm:p-5 dark:border-blue-900/60 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-black/40">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-blue-950 sm:text-sm dark:text-blue-100">
              논문 실증 핵심 결론: 왜 중앙 조율형(Star)이 실생활 최고의 구조인가?
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-blue-900/80 dark:text-blue-200/80">
              <strong>순차형</strong>은 피드백이 없어 엣지 결함을 놓치고(통과율 33.3%), <strong>토론형</strong>은 100%
              통과하나 끝장 토론으로 지연시간과 통신비가 4배 폭증합니다. 반면 <strong>중앙 조율형(Star)</strong>은 전담
              검증자의 실패 리포트를 중앙 Hub가 주입받아 <strong>단 1회의 자가 교정 피드백</strong>만으로 지연시간
              -70.62%, 통신량 -74.02%를 절감하면서도 단위 테스트를 100% 전수 통과합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

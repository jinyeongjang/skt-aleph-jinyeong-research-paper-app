// src/components/TopologyComparisonView.tsx
import React, { useState } from 'react';
import { TOPOLOGIES_DETAIL, type TopologyDetail } from '../data/realLifeData';
import { Sparkles, Check, ArrowRight, ImageIcon, Clock, Zap, TrendingUp, Maximize2, Minimize2 } from 'lucide-react';

interface TopologyComparisonViewProps {
  selectedTopology: 'linear' | 'star' | 'mesh' | 'tree';
  onSelectTopology: (topology: 'linear' | 'star' | 'mesh' | 'tree') => void;
}

export const TopologyComparisonView: React.FC<TopologyComparisonViewProps> = ({
  selectedTopology,
  onSelectTopology,
}) => {
  const [activeImageType, setActiveImageType] = useState<'empirical' | 'ai'>('empirical');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const topologies: TopologyDetail[] = [
    TOPOLOGIES_DETAIL.linear,
    TOPOLOGIES_DETAIL.star,
    TOPOLOGIES_DETAIL.mesh,
    TOPOLOGIES_DETAIL.tree,
  ];

  const currentImageSrc =
    activeImageType === 'empirical'
      ? '/assets/four_topologies_comparison.png'
      : '/assets/four_topologies_ai_diagram.jpg';

  const currentImageAlt =
    activeImageType === 'empirical'
      ? '4대 멀티에이전트 협업 토폴로지 실측 벤치마크 및 아키텍처 비교 인포그래픽'
      : '퓨처리스틱 멀티에이전트 협업 토폴로지 AI 블루프린트';

  return (
    <section aria-labelledby="comparison-heading" className="space-y-7">
      {/* 1. 상단 직관 비교 이미지 영역 (초대형 풀 와이드 렌더링) */}
      <div className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-900 shadow-2xl dark:border-neutral-800">
        {/* 상단 툴바: 제목 & 뷰 전환 & 크기 확대 토글 */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 bg-neutral-950 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-600/30 text-blue-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <h2 id="comparison-heading" className="text-sm font-black text-white sm:text-base lg:text-lg">
                4대 협업 토폴로지 한눈에 직관 비교
              </h2>
              <p className="text-xs text-neutral-400 sm:text-sm">
                순차형(Linear) · 중앙 조율형(Star) · 전결합형(Mesh) · 계층형(Tree)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 뷰 모드 토글 */}
            <div className="flex items-center rounded-xl border border-neutral-800 bg-neutral-900 p-1 text-xs font-bold sm:text-sm">
              <button
                type="button"
                onClick={() => setActiveImageType('empirical')}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition-colors ${
                  activeImageType === 'empirical'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ImageIcon className="h-4 w-4" />
                <span>실측 인포그래픽</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveImageType('ai')}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition-colors ${
                  activeImageType === 'ai' ? 'bg-blue-600 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>AI 블루프린트</span>
              </button>
            </div>

            {/* 초대형 확대/축소 토글 버튼 */}
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              title={isZoomed ? '기본 화면 맞춤' : '초대형 125% 와이드 확대'}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-bold text-neutral-300 transition-colors hover:border-neutral-700 hover:bg-neutral-800 hover:text-white sm:text-sm"
            >
              {isZoomed ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4 text-blue-400" />}
              <span className="hidden sm:inline">{isZoomed ? '화면 맞춤' : '초대형 확대'}</span>
            </button>
          </div>
        </div>

        {/* 상단 다이어그램 이미지 (높이 제한 없이 풀 와이드 100% 가득 채움) */}
        <div
          className={`relative flex items-center justify-center overflow-x-auto bg-black/80 p-2 transition-all duration-300 sm:p-4 lg:p-6`}
        >
          <img
            src={currentImageSrc}
            alt={currentImageAlt}
            className={`h-auto w-full rounded-2xl shadow-2xl transition-all duration-300 ${
              isZoomed ? 'min-w-[1250px] scale-100' : 'max-w-full'
            }`}
            loading="eager"
          />
        </div>

        {/* 이미지 하단 핵심 요약 스트립 (가독성 폰트 확대) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800 bg-neutral-950 px-5 py-3 text-xs font-semibold text-neutral-300 sm:text-sm">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-500 ring-2 ring-red-500/30" />
              <span>순차형: 결함 누적 (33.3% FAIL)</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
              <span>중앙 조율형: 1회 자가치유 100% 통과 (최적 솔루션)</span>
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="h-2 w-2 rounded-full bg-amber-500 ring-2 ring-amber-500/30" />
              <span>전결합형: 끝장토론 통신비 3.8배 폭증</span>
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-neutral-400">N=50 실측 벤치마크 (R=3)</span>
        </div>
      </div>

      {/* 2. 4대 토폴로지 선택 카드 그리드 (카드 크기, 여백, 폰트 대폭 확대) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {topologies.map((t) => {
          const isSelected = selectedTopology === t.id;
          const isStar = t.id === 'star';

          return (
            <button
              type="button"
              key={t.id}
              onClick={() => onSelectTopology(t.id)}
              className={`group flex flex-col justify-between rounded-3xl border p-5 text-left transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-600 sm:p-6 ${
                isSelected
                  ? isStar
                    ? 'border-2 border-blue-500 bg-blue-50/90 shadow-xl ring-2 ring-blue-500/25 dark:border-blue-400 dark:bg-blue-950/70 dark:ring-blue-400/30'
                    : 'border-2 border-neutral-900 bg-neutral-100 shadow-xl ring-2 ring-neutral-900/25 dark:border-white dark:bg-neutral-900 dark:ring-white/30'
                  : 'border-neutral-200/90 bg-white/80 hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950/60 dark:hover:border-neutral-700'
              }`}
            >
              <div>
                {/* 상단 뱃지 & 통과율 (확대) */}
                <div className="flex items-center justify-between border-b border-neutral-200/70 pb-3 dark:border-neutral-800">
                  <span className={`rounded-full border px-3 py-1 text-xs font-black shadow-xs ${t.badgeColor}`}>
                    {t.badge}
                  </span>
                  <span
                    className={`font-mono text-sm font-black tracking-tight sm:text-base ${
                      t.passRate >= 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {t.passRate.toFixed(1)}% 통과
                  </span>
                </div>

                {/* 타이틀 및 실생활 비유 (확대) */}
                <div className="mt-4">
                  <div className="text-xs font-black tracking-wider text-neutral-500 uppercase sm:text-sm dark:text-neutral-400">
                    {t.koreanName}
                  </div>
                  <h3 className="mt-1 text-base font-black text-neutral-900 sm:text-lg dark:text-neutral-50">
                    {t.realLifeTitle}
                  </h3>
                  <div className="mt-1.5 text-xs leading-snug font-bold text-blue-600 sm:text-sm dark:text-blue-400">
                    &ldquo;{t.realLifeMetaphor}&rdquo;
                  </div>
                </div>

                {/* 핵심 정량 지표 미니 카드 (지연시간 & 페이로드 확대) */}
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-neutral-200/70 pt-3.5 dark:border-neutral-800">
                  <div className="rounded-xl border border-neutral-200/60 bg-neutral-100/70 p-2.5 dark:border-neutral-800 dark:bg-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                      <span>지연시간</span>
                    </div>
                    <div className="mt-1 font-mono text-sm font-black text-neutral-900 sm:text-base dark:text-neutral-100">
                      {t.latencyMs} ms
                    </div>
                  </div>

                  <div className="rounded-xl border border-neutral-200/60 bg-neutral-100/70 p-2.5 dark:border-neutral-800 dark:bg-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                      <Zap className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <span>페이로드</span>
                    </div>
                    <div className="mt-1 font-mono text-sm font-black text-neutral-900 sm:text-base dark:text-neutral-100">
                      {t.payloadBytes} B
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단 선택 상태 인디케이터 (버튼 크기 및 폰트 확대) */}
              <div
                className={`mt-4 flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-black transition-colors sm:text-sm ${
                  isSelected
                    ? isStar
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-neutral-900'
                    : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isSelected ? <Check className="h-4 w-4" /> : null}
                  <span>{isSelected ? '현재 선택됨' : '이 토폴로지 선택'}</span>
                </div>
                {!isSelected && <ArrowRight className="h-3.5 w-3.5 opacity-60" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. 1문장 핵심 결론 배너 (폰트 및 패딩 확대) */}
      <div className="flex items-center gap-3.5 rounded-2xl border border-blue-200/80 bg-blue-50/80 p-4 sm:p-5 dark:border-blue-900/50 dark:bg-blue-950/40">
        <TrendingUp className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
        <p className="text-xs leading-relaxed text-blue-950 sm:text-sm dark:text-blue-100">
          <strong>논문 실증 결론:</strong> 중앙 조율형(Star)은 전담 검증자의 피드백을 수신하여{' '}
          <strong>단 1회의 자가 교정</strong>만으로 지연시간 <strong>-70.62%</strong>, 통신량 <strong>-74.02%</strong>를
          절감하면서도 100% 전수 통과를 달성하는 최적의 파레토 해입니다.
        </p>
      </div>
    </section>
  );
};

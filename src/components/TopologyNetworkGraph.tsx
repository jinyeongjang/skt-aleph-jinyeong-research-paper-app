// src/components/TopologyNetworkGraph.tsx
import React from 'react';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Cpu,
  Users,
  Zap,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface TopologyNetworkGraphProps {
  topology: 'linear' | 'star' | 'mesh' | 'tree';
  isRunning: boolean;
  status: 'PASS' | 'FAIL';
  stepActive?: number;
}

export const TopologyNetworkGraph: React.FC<TopologyNetworkGraphProps> = ({ topology, isRunning, status }) => {
  return (
    <div className="glass-panel tech-grid-bg relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/50">
      {/* 상단 레이블 및 상태 표시 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/60 pb-3 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-black tracking-tight text-neutral-900 dark:text-neutral-100">
              실시간 에이전트 인터랙션 & 메시지 패킷 흐름
            </span>
            <span className="ml-2 font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
              {topology === 'star'
                ? 'Hub-and-Spoke Topology'
                : topology === 'linear'
                  ? 'Linear Pipeline'
                  : topology === 'mesh'
                    ? 'All-to-All Full Mesh'
                    : 'Hierarchical Tree'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isRunning ? (
            <span className="text-2xs inline-flex items-center gap-1.5 rounded-full border border-blue-400/50 bg-blue-100/90 px-3 py-1 font-bold text-blue-800 shadow-xs dark:bg-blue-900/70 dark:text-blue-200">
              <RefreshCw className="h-3 w-3 animate-spin text-blue-600 dark:text-blue-400" />
              <span>실시간 패킷 교환 & 검증 중...</span>
            </span>
          ) : status === 'PASS' ? (
            <span className="glass-glow-emerald text-2xs inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-emerald-100/90 px-3 py-1 font-extrabold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>자가 치유 전수 통과 (100% PASS)</span>
            </span>
          ) : (
            <span className="text-2xs inline-flex items-center gap-1.5 rounded-full border border-red-400/60 bg-red-100/90 px-3 py-1 font-extrabold text-red-800 shadow-xs dark:bg-red-950/80 dark:text-red-300">
              <XCircle className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
              <span>연쇄 오류 발생 탈락 (33.3% FAIL)</span>
            </span>
          )}
        </div>
      </div>

      {/* 4대 토폴로지별 인터랙티브 비주얼 맵 */}
      <div className="relative flex min-h-[220px] items-center justify-center p-4">
        {/* ======================================================== */}
        {/* 1. 순차형 (Linear Pipeline)                              */}
        {/* ======================================================== */}
        {topology === 'linear' && (
          <div className="flex w-full max-w-2xl flex-col items-center gap-5">
            <div className="relative grid w-full grid-cols-1 items-center gap-4 sm:grid-cols-3">
              {/* Agent A: 기획자 */}
              <div className="glass-panel flex flex-col items-center rounded-2xl border-white/70 p-4 text-center transition-all duration-300 hover:scale-105 dark:border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="mt-2.5 text-xs font-black text-neutral-900 dark:text-neutral-100">Agent A (기획자)</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400">요구사항 단방향 하달</div>
                <div className="mt-2 rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-[9px] text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
                  스펙 전송 (28B)
                </div>
              </div>

              {/* Agent B: 구현자 */}
              <div className="glass-panel relative flex flex-col items-center rounded-2xl border-amber-300/80 bg-amber-50/70 p-4 text-center transition-all duration-300 hover:scale-105 dark:border-amber-800/80 dark:bg-amber-950/40">
                {/* 화살표 */}
                <div className="absolute top-1/2 -left-3 hidden -translate-y-1/2 items-center text-amber-500 sm:flex">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="mt-2.5 text-xs font-black text-amber-900 dark:text-amber-200">Agent B (구현자)</div>
                <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300">잠재 엣지 결함 내포</div>
                <div className="mt-2 rounded-md bg-amber-200/60 px-2 py-0.5 font-mono text-[9px] text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                  동일 인덱스 중복 버그
                </div>
              </div>

              {/* Agent C: 리뷰어 */}
              <div className="glass-panel relative flex flex-col items-center rounded-2xl border-red-300/80 bg-red-50/70 p-4 text-center transition-all duration-300 hover:scale-105 dark:border-red-900/80 dark:bg-red-950/40">
                {/* 화살표 */}
                <div className="absolute top-1/2 -left-3 hidden -translate-y-1/2 items-center text-red-500 sm:flex">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md shadow-red-500/20">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div className="mt-2.5 text-xs font-black text-red-900 dark:text-red-200">Agent C (리뷰어)</div>
                <div className="text-[10px] font-bold text-red-700 dark:text-red-300">스모크만 확인 ➡️ 결함 누락</div>
                <div className="mt-2 rounded-md bg-red-200/60 px-2 py-0.5 font-mono text-[9px] text-red-900 dark:bg-red-900/60 dark:text-red-200">
                  피드백 루프 부재 (Crash)
                </div>
              </div>
            </div>

            {/* 치명적 한계 캡션 배너 */}
            <div className="glass-panel flex items-center gap-3 rounded-2xl border border-red-300/90 bg-red-100/60 px-4 py-2.5 text-xs text-red-900 shadow-sm dark:border-red-900/80 dark:bg-red-950/70 dark:text-red-200">
              <ShieldAlert className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
              <div>
                <strong>일방통행 결함 누적 (컨베이어 벨트 한계):</strong> 앞 공정의 결함을 뒤 공정에서 되돌려 보내는
                피드백 채널이 없어, 엣지 단위 테스트에서 런타임 오류가 발생하고 최종 배포 시 실생활 서비스 장애로
                직결됩니다.
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. 중앙 조율형 (Star / Hub-and-Spoke) ⭐                  */}
        {/* ======================================================== */}
        {topology === 'star' && (
          <div className="flex w-full max-w-2xl flex-col items-center gap-5">
            <div className="flex w-full items-center justify-between gap-3 sm:gap-6">
              {/* Expert 1 (구현자) */}
              <div className="glass-panel flex flex-1 flex-col items-center rounded-2xl border-white/70 p-4 text-center transition-all duration-300 hover:scale-105 dark:border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/20">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="mt-2 text-xs font-black text-neutral-900 dark:text-neutral-100">Expert 1 (구현자)</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400">초안 제출 & 1회 교정 패치</div>
                <div className="mt-1.5 rounded-md bg-indigo-50 px-2 py-0.5 font-mono text-[9px] font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  O(N) Hash Map 재작성
                </div>
              </div>

              {/* 중앙 허브 연결 커넥터 1 */}
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-0.5 font-mono text-[9px] font-bold text-blue-600 dark:text-blue-400">
                  <RefreshCw className={`h-2.5 w-2.5 ${isRunning ? 'animate-spin' : ''}`} />
                  <span>1회 자가 교정</span>
                </span>
                <div className="my-1.5 flex items-center gap-1">
                  <div
                    className={`h-1.5 w-8 rounded-full sm:w-14 ${isRunning ? 'animate-pulse bg-blue-500' : 'bg-gradient-to-r from-indigo-500 to-blue-500'}`}
                  />
                </div>
                <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">지연 -70.62%</span>
              </div>

              {/* 중앙 Hub (오케스트레이터) */}
              <div className="glass-glow-blue glass-panel relative flex flex-1 flex-col items-center rounded-2xl border-2 border-blue-500 bg-gradient-to-b from-blue-50/95 to-indigo-50/80 p-4 text-center shadow-xl transition-all duration-300 hover:scale-105 dark:border-blue-400 dark:from-blue-950/80 dark:to-indigo-950/70">
                <div className="absolute -top-3 rounded-full border border-blue-300/80 bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-0.5 text-[9px] font-black tracking-wider text-white uppercase shadow-md">
                  CENTRAL HUB
                </div>
                <div className="relative mt-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-500/30">
                  <Cpu className="h-7 w-7" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500" />
                  </span>
                </div>
                <div className="mt-2 text-xs font-black text-blue-950 dark:text-blue-100">Hub (오케스트레이터)</div>
                <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300">엣지 피드백 중재기</div>
                <div className="mt-1.5 rounded-full bg-blue-600 px-2.5 py-0.5 text-[9px] font-bold text-white shadow-xs">
                  통과율 100.0%
                </div>
              </div>

              {/* 중앙 허브 연결 커넥터 2 */}
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-0.5 font-mono text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-2.5 w-2.5" />
                  <span>실패 리포트</span>
                </span>
                <div className="my-1.5 flex items-center gap-1">
                  <div
                    className={`h-1.5 w-8 rounded-full sm:w-14 ${isRunning ? 'animate-pulse bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-emerald-500'}`}
                  />
                </div>
                <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">통신 -74.02%</span>
              </div>

              {/* Expert 2 (검증자) */}
              <div className="glass-panel flex flex-1 flex-col items-center rounded-2xl border-emerald-300/80 bg-emerald-50/60 p-4 text-center transition-all duration-300 hover:scale-105 dark:border-emerald-800/80 dark:bg-emerald-950/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="mt-2 text-xs font-black text-emerald-950 dark:text-emerald-200">Expert 2 (검증자)</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400">전담 엣지 단위 테스트</div>
                <div className="mt-1.5 rounded-md bg-emerald-100 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
                  Asserts 전수 검증
                </div>
              </div>
            </div>

            {/* 핵심 강점 캡션 배너 */}
            <div className="glass-glow-blue glass-panel flex items-center gap-3 rounded-2xl border border-blue-300/90 bg-gradient-to-r from-blue-50/90 to-indigo-50/80 px-4 py-2.5 text-xs text-blue-950 shadow-sm dark:border-blue-900/80 dark:from-blue-950/60 dark:to-indigo-950/50 dark:text-blue-100">
              <Sparkles className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <strong>황금 밸런스 1회 타겟 자가 치유:</strong> 허브가 검증자의 실패 리포트를 주입받아 구현자에게 즉각
                1회 맞춤 교정을 지시함으로써, 토론형 대비 지연시간 70.62% 단축, 통신량 74.02%를 절감하며 단위 테스트를
                100% 전수 통과합니다.
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. 토론형 (Full Mesh)                                   */}
        {/* ======================================================== */}
        {topology === 'mesh' && (
          <div className="flex w-full max-w-2xl flex-col items-center gap-5">
            <div className="relative flex w-full items-center justify-around py-2">
              {/* Agent 1 */}
              <div className="glass-panel flex flex-col items-center rounded-2xl p-3.5 text-center transition-all hover:scale-105">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                  <Bot className="h-5 w-5" />
                </div>
                <span className="mt-2 text-xs font-bold">에이전트 1</span>
                <span className="text-[10px] text-neutral-400">후보 발의</span>
              </div>

              {/* 삼각 Mesh 통신 라인 비주얼 */}
              <div className="flex flex-col items-center px-3 text-center">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 animate-bounce text-amber-500" />
                  <span className="text-xs font-black text-amber-700 dark:text-amber-300">
                    9회 전방위 상호 교차 검증 및 다수결 투표
                  </span>
                </div>
                <span className="mt-1 font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400">
                  통신 페이로드: 878.0 B (3.8배 폭증 💸)
                </span>
                <div className="text-2xs mt-2 flex items-center gap-1.5 font-mono text-neutral-500">
                  <span>지연시간: 0.0194 ms (3.4배 지체 🐢)</span>
                </div>
              </div>

              {/* Agent 2 */}
              <div className="glass-panel flex flex-col items-center rounded-2xl p-3.5 text-center transition-all hover:scale-105">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                  <Bot className="h-5 w-5" />
                </div>
                <span className="mt-2 text-xs font-bold">에이전트 2</span>
                <span className="text-[10px] text-neutral-400">교차 반박</span>
              </div>

              {/* Agent 3 */}
              <div className="glass-panel flex flex-col items-center rounded-2xl p-3.5 text-center transition-all hover:scale-105">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                  <Bot className="h-5 w-5" />
                </div>
                <span className="mt-2 text-xs font-bold">에이전트 3</span>
                <span className="text-[10px] text-neutral-400">최종 투표</span>
              </div>
            </div>

            <div className="glass-panel flex items-center gap-3 rounded-2xl border border-amber-300/80 bg-amber-50/70 px-4 py-2.5 text-xs text-amber-900 shadow-sm dark:border-amber-900/80 dark:bg-amber-950/60 dark:text-amber-200">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <strong>고비용 끝장 토론의 비효율:</strong> 전원 상호 검증으로 100% 통과율을 달성하지만, 메시지가 9회
                브로드캐스트되어 서버 지연과 네트워크 트래픽이 4배 폭증하여 실생활 서비스 적용 시 막대한 인프라 비용이
                낭비됩니다.
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. 계층형 (Tree)                                        */}
        {/* ======================================================== */}
        {topology === 'tree' && (
          <div className="flex w-full max-w-2xl flex-col items-center gap-4">
            {/* Top Manager */}
            <div className="glass-panel flex flex-col items-center rounded-2xl border-purple-300/80 bg-purple-50/70 px-8 py-3 text-center shadow-md dark:border-purple-800 dark:bg-purple-950/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-xs">
                <Users className="h-5 w-5" />
              </div>
              <span className="mt-1.5 text-xs font-black text-neutral-900 dark:text-neutral-100">
                Lead Manager (총괄 팀장)
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                작업 모듈 분할 지시 및 최종 승인
              </span>
            </div>

            {/* Vertical Flow Indicators */}
            <div className="flex items-center gap-8 font-mono text-[10px] font-bold text-purple-600 dark:text-purple-400">
              <span>⬇️ 작업 위임 하달</span>
              <span>⬆️ 상향 에스컬레이션 보고</span>
            </div>

            {/* Sub-leads */}
            <div className="grid w-full grid-cols-2 gap-4">
              <div className="glass-panel flex flex-col items-center rounded-2xl p-3 text-center">
                <span className="text-xs font-bold text-purple-900 dark:text-purple-200">
                  Sub-Lead 1 (함수 구현 파트장)
                </span>
                <span className="text-[10px] text-neutral-500">Worker 1 단위 구현 관리</span>
              </div>
              <div className="glass-panel flex flex-col items-center rounded-2xl p-3 text-center">
                <span className="text-xs font-bold text-purple-900 dark:text-purple-200">
                  Sub-Lead 2 (단위 검증 파트장)
                </span>
                <span className="text-[10px] text-neutral-500">Worker 2 단위 테스트 감사</span>
              </div>
            </div>

            <div className="glass-panel flex items-center gap-3 rounded-2xl border border-purple-300/80 bg-purple-50/70 px-4 py-2.5 text-xs text-purple-900 shadow-sm dark:border-purple-900/80 dark:bg-purple-950/60 dark:text-purple-200">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-purple-600" />
              <div>
                <strong>엄격한 결재 라인 구조:</strong> 작업 분할이 깔끔하고 모듈별 속도가 빠르지만, 복합적인 엣지
                케이스 장애 발생 시 상향 결재 대기 오버헤드로 유연성이 저하될 수 있습니다.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

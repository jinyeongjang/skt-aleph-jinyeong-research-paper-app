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
  Car,
  Check,
  Zap,
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
  // 사용자가 실생활 시뮬레이터에서 직접 엣지 케이스를 선택하는 상태
  const [activeEdgeTab, setActiveEdgeTab] = useState<number>(0);

  // 실생활 모바일 인터랙티브 상태 (Two Sum용 카드 선택)
  const [selectedCards, setSelectedCards] = useState<number[]>([0, 1]);

  // 톨게이트 번호판 대화형 상태
  const [customPlate, setCustomPlate] = useState<string>('A man, a plan, a canal: Panama');

  // 금융 적금 개월 수 대화형 상태
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  // 전자계약 괄호 조항 대화형 상태
  const [contractClausePreset, setContractClausePreset] = useState<number>(0);

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
  const isStar = selectedTopology === 'star';

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-b from-white/90 via-white/70 to-white/50 p-5 shadow-xl backdrop-blur-2xl sm:p-7 dark:border-white/10 dark:from-neutral-900/90 dark:via-neutral-950/70 dark:to-black/50">
      {/* 1. 실생활 서비스 헤더 & 친근한 소개 바 */}
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
            <div className="text-[9px] font-bold text-neutral-400 uppercase">활성 팀 방식</div>
            <div className="font-mono text-xs font-black text-blue-600 dark:text-blue-400">
              {selectedTopology === 'star'
                ? '중앙 조율형 (추천 ⭐)'
                : selectedTopology === 'linear'
                  ? '순차형 (컨베이어)'
                  : selectedTopology === 'mesh'
                    ? '토론형 (원탁)'
                    : '계층형 (결재)'}
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
            <span>{isRunning ? '자가 치유 중...' : '시뮬레이션 가동'}</span>
          </button>
        </div>
      </div>

      {/* 2. 사용자 친화적 스토리텔링 카드 (어떤 상황인가요? & 방치하면 왜 위험한가요?) */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* 사용자 스토리 */}
        <div className="glass-panel flex flex-col justify-between rounded-2xl border-blue-200/80 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-white/80 p-4.5 shadow-xs dark:border-blue-900/50 dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-neutral-900/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-blue-950 dark:text-blue-100">
              <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>📱 어떤 실생활 서비스인가요?</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed font-medium text-blue-900/90 dark:text-blue-100/90">
              {preset.userStory}
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-blue-200/60 bg-white/90 p-2.5 backdrop-blur-md dark:border-blue-900/50 dark:bg-black/40">
            <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">실제 고객 데이터: </span>
            <span className="text-2xs font-mono font-semibold text-neutral-800 dark:text-neutral-200">
              {preset.sampleInput}
            </span>
          </div>
        </div>

        {/* 결함 방치 시 실생활 피해 (Risk) */}
        <div className="glass-panel flex flex-col justify-between rounded-2xl border-red-200/80 bg-gradient-to-br from-red-50/80 via-rose-50/50 to-white/80 p-4.5 shadow-xs dark:border-red-900/50 dark:from-red-950/40 dark:via-rose-950/20 dark:to-neutral-900/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-red-950 dark:text-red-100">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span>🚨 버그를 방치하면 실생활에서 어떤 일이 생기나요?</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed font-medium text-red-900/90 dark:text-red-100/90">
              {preset.financialOrSocialRisk}
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-red-200/60 bg-white/90 p-2.5 backdrop-blur-md dark:border-red-900/50 dark:bg-black/40">
            <span className="text-[10px] font-bold text-red-700 dark:text-red-300">잠재 결함 원인: </span>
            <span className="text-2xs line-clamp-1 font-semibold text-neutral-800 dark:text-neutral-200">
              {preset.bugScenario}
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. 친숙한 실생활 서비스 인터랙티브 목업 샌드박스 (Interactive Visual Sandbox) */}
      {/* ============================================================== */}
      <div className="mt-6 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 animate-spin text-amber-500" />
            <h4 className="text-xs font-black text-neutral-900 sm:text-sm dark:text-neutral-100">
              💡 실생활 서비스 화면 인터랙티브 체험관
            </h4>
          </div>
          <span className="text-2xs font-semibold text-neutral-500 dark:text-neutral-400">
            실제 모바일/게이트 화면에서 엣지 케이스를 클릭하여 반응을 확인해보세요.
          </span>
        </div>

        {/* 3-A. Two Sum 실생활 모바일 결제창 목업 */}
        {preset.id === 'two-sum' && (
          <div className="glass-panel overflow-hidden rounded-2xl border border-blue-200/80 bg-white/95 p-4 shadow-md dark:border-blue-900/60 dark:bg-neutral-950/90">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-black text-neutral-900 dark:text-neutral-100">
                  PaySmart 모바일 결제 데모 (Two Sum)
                </span>
              </div>
              <div className="rounded-lg bg-blue-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                결제 목표: 90,000원
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xs mb-2 flex items-center justify-between font-bold text-neutral-500">
                <span>보유 기프트카드 (2장을 클릭하여 90,000원 조합):</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400">클릭하여 선택/해제</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { id: 0, amount: 20000, label: '기프트카드 A' },
                  { id: 1, amount: 70000, label: '기프트카드 B' },
                  { id: 2, amount: 45000, label: '기프트카드 C (중복값)' },
                  { id: 3, amount: 45000, label: '기프트카드 D (중복값)' },
                ].map((card) => {
                  const isChecked = selectedCards.includes(card.id);
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => {
                        if (isChecked) {
                          setSelectedCards(selectedCards.filter((c) => c !== card.id));
                        } else if (selectedCards.length < 2) {
                          setSelectedCards([...selectedCards, card.id]);
                        } else {
                          setSelectedCards([selectedCards[1], card.id]);
                        }
                      }}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        isChecked
                          ? 'border-blue-500 bg-blue-50/90 shadow-sm ring-2 ring-blue-500/20 dark:bg-blue-950/80'
                          : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-neutral-500">{card.label}</span>
                        {isChecked && <Check className="h-3 w-3 text-blue-600" />}
                      </div>
                      <div className="mt-1 text-sm font-black text-neutral-900 dark:text-neutral-50">
                        {card.amount.toLocaleString()}원
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 결제 합계 확인 바 */}
              {(() => {
                const cardMap = [20000, 70000, 45000, 45000];
                const total = selectedCards.reduce((sum, idx) => sum + cardMap[idx], 0);
                const isExact = total === 90000 && selectedCards.length === 2;
                return (
                  <div
                    className={`mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl p-3 text-xs transition-all ${
                      isExact
                        ? 'border border-emerald-300/80 bg-emerald-50/90 dark:border-emerald-800/80 dark:bg-emerald-950/60'
                        : 'border border-neutral-200/80 bg-neutral-100/80 dark:border-neutral-800 dark:bg-neutral-900'
                    }`}
                  >
                    <span className="font-bold text-neutral-700 dark:text-neutral-300">
                      선택 합계 ({selectedCards.length}/2장):{' '}
                      <span
                        className={`font-mono font-black ${
                          isExact ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {total.toLocaleString()}원
                      </span>
                    </span>
                    <span className="text-2xs flex items-center gap-1 font-bold">
                      {isExact ? (
                        <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>
                            90,000원 정확 일치!{' '}
                            {isStar ? '중앙 조율형으로 결제 승인 완료' : '순차형은 중복 인덱스 오작동 위험'}
                          </span>
                        </span>
                      ) : (
                        <span className="text-neutral-500">
                          목표 90,000원을 맞추려면 [A+B (2만+7만)] 또는 [C+D (4.5만+4.5만 중복)]을 선택하세요.
                        </span>
                      )}
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* 3-B. Valid Palindrome 실생활 스마트 톨게이트 목업 */}
        {preset.id === 'palindrome' && (
          <div className="glass-panel overflow-hidden rounded-2xl border border-emerald-200/80 bg-white/95 p-4 shadow-md dark:border-emerald-900/60 dark:bg-neutral-950/90">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-black text-neutral-900 dark:text-neutral-100">
                  스마트 하이패스 톨게이트 인식기 (Palindrome)
                </span>
              </div>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                무정차 80km/h 통과 시스템
              </span>
            </div>

            {/* 번호판 선택 칩 */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-2xs font-bold text-neutral-500">빠른 테스트 입력:</span>
              {[
                { label: '공백/콜론 노이즈', text: 'A man, a plan, a canal: Panama' },
                { label: '따옴표 노이즈', text: "No 'x' in Nixon" },
                { label: '불일치 번호판', text: 'race a car' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCustomPlate(item.text)}
                  className={`text-2xs rounded-lg px-2.5 py-1 font-bold transition-all ${
                    customPlate === item.text
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'border border-neutral-200 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-1 items-center gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="text-[10px] font-bold text-neutral-500 uppercase">인식된 차량 번호판:</div>
                <div className="mt-1 truncate font-mono text-xs font-black text-neutral-900 sm:text-sm dark:text-neutral-100">
                  &ldquo;{customPlate}&rdquo;
                </div>
                <div className="mt-1 text-[10px] text-neutral-500">
                  특수문자(: , &apos;)와 공백 노이즈가 포함되어 단순 비교 시 불일치 발생
                </div>
              </div>

              <div
                className={`rounded-xl border p-3 text-center transition-all ${
                  isStar
                    ? 'border-emerald-300 bg-emerald-50/80 dark:border-emerald-800 dark:bg-emerald-950/60'
                    : 'border-red-300 bg-red-50/80 dark:border-red-800 dark:bg-red-950/60'
                }`}
              >
                <div
                  className={`text-[10px] font-black uppercase ${
                    isStar ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300'
                  }`}
                >
                  {isStar
                    ? '🟢 차단기 자동 개방 (GATE OPEN / 80km/h 무감속 통과)'
                    : '🔴 차단기 미개방 닫힘 (STOP / 출차 지연)'}
                </div>
                <div className="mt-1 text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  {isStar
                    ? '정규화 투 포인터 자가 치유로 0.005초 만에 정상 개방!'
                    : '순차형의 얕은 검토로 노이즈를 걸러내지 못해 후방 추돌 위험'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3-C. Fibonacci 실생활 복리 적금 시뮬레이터 목업 */}
        {preset.id === 'fibonacci' && (
          <div className="glass-panel overflow-hidden rounded-2xl border border-purple-200/80 bg-white/95 p-4 shadow-md dark:border-purple-900/60 dark:bg-neutral-950/90">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-xs font-black text-neutral-900 dark:text-neutral-100">
                  GrowWealth 복리 적금 장부 데모 (Fibonacci)
                </span>
              </div>
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                핀테크 회계 원장
              </span>
            </div>

            {/* 개월 수 선택 칩 */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-2xs font-bold text-neutral-500">적금 납입 기간:</span>
              {[
                { month: 0, label: '0개월 차 (계좌 개설 엣지)' },
                { month: 1, label: '1개월 차' },
                { month: 2, label: '2개월 차' },
                { month: 4, label: '4개월 차 (만기)' },
              ].map((item) => (
                <button
                  key={item.month}
                  type="button"
                  onClick={() => setSelectedMonth(item.month)}
                  className={`text-2xs rounded-lg px-2.5 py-1 font-bold transition-all ${
                    selectedMonth === item.month
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'border border-neutral-200 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div className="rounded-xl border border-red-200 bg-red-50/70 p-3 dark:border-red-900/60 dark:bg-red-950/40">
                <div className="text-[10px] font-bold text-red-700 dark:text-red-300">
                  [Before 순차형 초안] {selectedMonth}개월 잔액:
                </div>
                <div className="mt-1 font-mono text-base font-black text-red-900 dark:text-red-100">
                  {selectedMonth === 0
                    ? '100,000원 (버그: 0개월인데 이자 지급!)'
                    : `${[0, 100000, 100000, 200000, 300000][selectedMonth]?.toLocaleString() || 300000}원`}
                </div>
              </div>

              <div className="rounded-xl border border-purple-300 bg-purple-50/80 p-3 dark:border-purple-800 dark:bg-purple-950/60">
                <div className="text-[10px] font-bold text-purple-700 dark:text-purple-300">
                  [After 중앙 조율형 Star] {selectedMonth}개월 잔액:
                </div>
                <div className="mt-1 font-mono text-base font-black text-purple-900 dark:text-purple-100">
                  {selectedMonth === 0
                    ? '0원 (정상: if n <= 0: return 0 치유)'
                    : `${[0, 100000, 100000, 200000, 300000][selectedMonth]?.toLocaleString() || 300000}원`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3-D. Valid Parentheses 실생활 전자 계약서 목업 */}
        {preset.id === 'parentheses' && (
          <div className="glass-panel overflow-hidden rounded-2xl border border-amber-200/80 bg-white/95 p-4 shadow-md dark:border-amber-900/60 dark:bg-neutral-950/90">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-black text-neutral-900 dark:text-neutral-100">
                  DocuVerify 전자 계약서 특약 조항 감사 데모 (Parentheses)
                </span>
              </div>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                법률 서식 무결성 검사
              </span>
            </div>

            {/* 계약서 조항 프리셋 */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-2xs font-bold text-neutral-500">검증할 특약 조항:</span>
              {[
                {
                  label: '정상 괄호 [원상복구] (사전동의)',
                  text: '임차인은 [시설물 원상복구] 의무를 부담하며, (임대인의 사전 동의)를 얻는다.',
                  isValid: true,
                },
                {
                  label: '괄호 꼬임 결함 [조항(미이행시] 해지)',
                  text: '특약 [조항(미이행시] 계약은 자동 해지)된다.',
                  isValid: false,
                },
                { label: '역순 괄호 결함 )보증금 반환(', text: ')보증금 전액 반환( 특약 조항', isValid: false },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setContractClausePreset(idx)}
                  className={`text-2xs rounded-lg px-2.5 py-1 font-bold transition-all ${
                    contractClausePreset === idx
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'border border-neutral-200 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs leading-relaxed dark:border-neutral-800 dark:bg-neutral-900">
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">제3조 특약 조항</span>: &ldquo;
              {
                [
                  '임차인은 [시설물 원상복구] 의무를 부담하며, (임대인의 사전 동의)를 얻는다.',
                  '특약 [조항(미이행시] 계약은 자동 해지)된다.',
                  ')보증금 전액 반환( 특약 조항',
                ][contractClausePreset]
              }
              &rdquo;
              <div className="mt-2 flex items-center justify-between border-t border-neutral-200 pt-2 text-[11px] dark:border-neutral-800">
                <span className="text-neutral-500">LIFO 스택 무결성 검증:</span>
                <span
                  className={`flex items-center gap-1 font-bold ${
                    contractClausePreset === 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {contractClausePreset === 0 ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>괄호 짝 완전 일치 (VALID · 계약 서명 허용)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3.5 w-3.5" />
                      <span>
                        괄호 불일치 차단 ({isStar ? '중앙 조율형으로 결함 조기 적발' : '순차형은 얕은 검토로 오류 간과'}
                        )
                      </span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 4. 엣지 케이스 탭 버튼 */}
        <div className="space-y-2 pt-2">
          <div className="text-2xs font-bold text-neutral-600 dark:text-neutral-400">
            아래 엣지 케이스 버튼을 눌러 순차형 vs 중앙 조율형의 결과를 실시간으로 비교해보세요:
          </div>

          <div className="flex flex-wrap gap-2">
            {preset.edgeCaseInputs.map((ec, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveEdgeTab(idx)}
                className={`rounded-xl px-3.5 py-2 text-xs font-black transition-all duration-200 ${
                  activeEdgeTab === idx
                    ? 'bg-neutral-900 text-white shadow-md dark:bg-white dark:text-neutral-900'
                    : 'glass-panel text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
                }`}
              >
                <span>{ec.title}</span>
              </button>
            ))}
          </div>

          {/* 선택된 엣지 케이스의 토폴로지별 처리 결과 비교 카드 */}
          <div className="grid grid-cols-1 gap-3.5 pt-1 lg:grid-cols-2">
            {/* 순차형 결과 카드 */}
            <div className="glass-panel flex flex-col justify-between rounded-2xl border-2 border-red-300/80 bg-gradient-to-b from-red-50/80 to-rose-50/50 p-4 shadow-sm dark:border-red-900/70 dark:from-red-950/50 dark:to-neutral-950/40">
              <div>
                <div className="flex items-center justify-between border-b border-red-200 pb-2 dark:border-red-900/60">
                  <div className="flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="text-xs font-black text-red-950 dark:text-red-100">순차형 (Linear Pipeline)</span>
                  </div>
                  <span className="rounded-full bg-red-200 px-2 py-0.5 text-[9px] font-black text-red-900 dark:bg-red-900/80 dark:text-red-200">
                    실제 장애 발생 💥
                  </span>
                </div>

                <div className="mt-2.5 rounded-lg bg-black/5 p-2 font-mono text-[11px] text-neutral-600 dark:bg-black/30 dark:text-neutral-400">
                  테스트 입력: {selectedEdge.input}
                </div>

                <div className="mt-2 rounded-xl border border-red-200 bg-white/70 p-3 backdrop-blur-md dark:border-red-900/60 dark:bg-black/40">
                  <div className="text-[10px] font-bold text-red-700 dark:text-red-300">처리 결과:</div>
                  <p className="mt-0.5 text-xs leading-relaxed font-bold text-red-950 dark:text-red-100">
                    {selectedEdge.linearResult}
                  </p>
                </div>
              </div>

              <div className="mt-3 border-t border-red-200/80 pt-2 text-[10px] font-medium text-red-800 dark:text-red-300">
                * 피드백 루프 부재로 얕은 검토를 통과하여 고객 서비스 장애 유발
              </div>
            </div>

            {/* 중앙 조율형 결과 카드 ⭐ */}
            <div className="glass-glow-blue glass-panel flex flex-col justify-between rounded-2xl border-2 border-blue-500/90 bg-gradient-to-b from-blue-50/90 to-indigo-50/60 p-4 shadow-lg dark:border-blue-400/90 dark:from-blue-950/60 dark:to-neutral-950/40">
              <div>
                <div className="flex items-center justify-between border-b border-blue-200 pb-2 dark:border-blue-900/60">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-black text-blue-950 dark:text-blue-100">
                      중앙 조율형 (Star 자가 치유) ⭐
                    </span>
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-2 py-0.5 text-[9px] font-black text-white shadow-xs">
                    100% 자동 치유 🌟
                  </span>
                </div>

                <div className="mt-2.5 rounded-lg bg-black/5 p-2 font-mono text-[11px] text-neutral-600 dark:bg-black/30 dark:text-neutral-400">
                  테스트 입력: {selectedEdge.input}
                </div>

                <div className="mt-2 rounded-xl border border-blue-200 bg-white/70 p-3 backdrop-blur-md dark:border-blue-900/60 dark:bg-black/40">
                  <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300">자가 치유 패치 실행:</div>
                  <p className="mt-0.5 text-xs leading-relaxed font-black text-blue-950 dark:text-blue-50">
                    {selectedEdge.starResult}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-blue-200/80 pt-2 text-[10px] font-bold text-blue-800 dark:text-blue-200">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>실생활 성과: {selectedEdge.realLifeImpact}</span>
                </span>
                <span className="flex items-center gap-0.5 font-mono text-emerald-600 dark:text-emerald-400">
                  <Zap className="h-3 w-3" />
                  <span>지연 -70.62% 단축</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

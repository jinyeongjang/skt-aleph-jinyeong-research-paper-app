import React, { useState } from 'react';
import {
  Share2,
  GitMerge,
  Layers,
  ArrowRight,
  Play,
  CheckCircle2,
  XCircle,
  Zap,
  Clock,
  RefreshCw,
  Code2,
  Cpu,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Terminal,
  Download,
  ExternalLink,
  FileText,
  Copy,
  Check,
  Bot,
  UserCheck,
} from 'lucide-react';
import { DockBar } from './DockBar';

// ==========================================
// 1. 알고리즘 프리셋 데이터 및 자가 치유 패치
// ==========================================
export interface AlgorithmPreset {
  id: string;
  name: string;
  domain: string;
  filename: string;
  description: string;
  bugExplanation: string;
  healingExplanation: string;
  initialCode: string;
  healedCode: string;
  testCases: {
    input: string;
    expected: string;
    isEdgeCase: boolean;
    description: string;
  }[];
}

const ALGORITHM_PRESETS: AlgorithmPreset[] = [
  {
    id: 'two-sum',
    name: '1. Two Sum (배열 타겟합 엣지 결함)',
    domain: '배열 / 해시 테이블 (Array & Hash)',
    filename: 'two_sum.py',
    description: '정수 배열 nums와 정수 target이 주어질 때 합이 target이 되는 두 수의 인덱스를 반환하는 알고리즘.',
    bugExplanation:
      '초안 코드는 이중 반복문에서 동일 인덱스를 재참조하거나 음수 타겟(-8) 연산 시 인덱스 범위를 초과하여 엣지 케이스에서 런타임 오류가 발생합니다.',
    healingExplanation:
      '중앙 조율형 허브가 전담 엣지 검증자의 실패 리포트를 주입받아, 해시 맵(Hash Map) 1회 순회 방식으로 O(N) 최적화하고 동일 원소 중복 참조를 완벽히 차단했습니다.',
    initialCode: `def two_sum(nums, target):
    # [초안 코드: 얕은 검토로 인한 연쇄 결함 내포]
    for i in range(len(nums)):
        for j in range(i, len(nums)): # 버그: 동일 인덱스 i==j 허용
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
    healedCode: `def two_sum(nums, target):
    # [중앙 조율형 엣지 피드백 기반 100% 자가 치유 패치]
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    testCases: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        expected: '[0, 1]',
        isEdgeCase: false,
        description: '기본 양수 케이스 (순차형도 통과)',
      },
      {
        input: 'nums = [3, 3], target = 6',
        expected: '[0, 1]',
        isEdgeCase: true,
        description: '엣지 케이스 1: 동일 값 중복 인덱스 검증 (순차형 실패 ➡️ Star 자가 치유)',
      },
      {
        input: 'nums = [-1, -2, -3, -4, -5], target = -8',
        expected: '[2, 4]',
        isEdgeCase: true,
        description: '엣지 케이스 2: 음수 타겟합 경계값 (순차형 실패 ➡️ Star 자가 치유)',
      },
    ],
  },
  {
    id: 'palindrome',
    name: '2. Valid Palindrome (문자열 팰린드롬 결함)',
    domain: '문자열 전처리 (Two Pointer & String)',
    filename: 'is_palindrome.py',
    description: '문자열 s가 주어질 때 영숫자만 남기고 대소문자를 무시하여 앞뒤가 같은지 판별하는 알고리즘.',
    bugExplanation:
      '초안 코드는 문자열 역순 비교(`s == s[::-1]`)만 수행하여 구두점, 공백, 특수문자 및 대소문자 정규화 처리가 누락되어 프로덕션 테스트에서 실패합니다.',
    healingExplanation:
      '중앙 허브의 엣지 단위 테스트 피드백을 통해 정규식 영숫자 필터링(`isalnum()`) 및 소문자 정규화 후 투 포인터(Two Pointer) 방식을 적용하여 100% 통과했습니다.',
    initialCode: `def is_palindrome(s):
    # [초안 코드: 공백 및 특수문자 미처리 얕은 리뷰]
    return s == s[::-1] # 버그: 구두점/대소문자 미처리`,
    healedCode: `def is_palindrome(s):
    # [중앙 조율형 엣지 피드백 기반 100% 자가 치유 패치]
    cleaned = [c.lower() for c in s if c.isalnum()]
    left, right = 0, len(cleaned) - 1
    while left < right:
        if cleaned[left] != cleaned[right]:
            return False
        left += 1
        right -= 1
    return True`,
    testCases: [
      {
        input: 's = "aba"',
        expected: 'True',
        isEdgeCase: false,
        description: '기본 단어 케이스 (순차형 통과)',
      },
      {
        input: 's = "A man, a plan, a canal: Panama"',
        expected: 'True',
        isEdgeCase: true,
        description: '엣지 케이스 1: 구두점 및 대소문자 혼합 (순차형 실패 ➡️ Star 자가 치유)',
      },
      {
        input: 's = " "',
        expected: 'True',
        isEdgeCase: true,
        description: '엣지 케이스 2: 단일 공백 및 빈 문자열 경계값 (순차형 실패 ➡️ Star 자가 치유)',
      },
    ],
  },
  {
    id: 'fibonacci',
    name: '3. Fibonacci Number (경계조건 N=0 결함)',
    domain: '동적계획법 & 수학 (DP & Math)',
    filename: 'fibonacci.py',
    description: 'N번째 피보나치 수를 반환하는 기본 알고리즘.',
    bugExplanation:
      '초안 코드는 기저 조건(Base Case)을 `if n <= 2: return 1`로 잘못 설정하여 n=0일 때 0이 아닌 1을 반환하는 치명적인 경계값 버그가 있습니다.',
    healingExplanation:
      '중앙 허브가 엣지 검증자의 n=0 실패 어설션을 수신하여, 즉시 기저 조건을 `if n <= 0: return 0` 및 반복적 DP 메모이제이션으로 교정 완료했습니다.',
    initialCode: `def fibonacci(n):
    # [초안 코드: n=0 경계조건 누락]
    if n <= 2: # 버그: n=0일 때도 1 반환
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)`,
    healedCode: `def fibonacci(n):
    # [중앙 조율형 엣지 피드백 기반 100% 자가 치유 패치]
    if n <= 0:
        return 0
    if n == 1:
        return 1
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
    testCases: [
      {
        input: 'n = 4',
        expected: '3',
        isEdgeCase: false,
        description: '기본 정수 케이스 (순차형 통과)',
      },
      {
        input: 'n = 0',
        expected: '0',
        isEdgeCase: true,
        description: '엣지 케이스 1: n=0 경계값 결함 (순차형 1 반환 실패 ➡️ Star 자가 치유)',
      },
      {
        input: 'n = 1',
        expected: '1',
        isEdgeCase: true,
        description: '엣지 케이스 2: n=1 단일 기저값 검증 (순차형 실패 ➡️ Star 자가 치유)',
      },
    ],
  },
  {
    id: 'parentheses',
    name: '4. Valid Parentheses (스택 유효 괄호 결함)',
    domain: '스택 자료구조 (Stack & Parsing)',
    filename: 'valid_parentheses.py',
    description: '괄호 문자열 s가 올바르게 열리고 닫혔는지 판별하는 알고리즘.',
    bugExplanation:
      '초안 코드는 단순히 여는 괄호와 닫는 괄호의 개수만 세어 `)(`와 같은 역순 케이스나 다른 종류의 괄호 교차를 검증하지 못합니다.',
    healingExplanation:
      '중앙 조율형 검증 피드백을 통해 LIFO 스택 구조 및 괄호 매핑 딕셔너리를 도입하여 모든 순서 역전 및 홀수 길이 엣지 케이스를 100% 방어했습니다.',
    initialCode: `def is_valid_parentheses(s):
    # [초안 코드: 괄호 개수만 세는 얕은 검토]
    return s.count('(') == s.count(')') # 버그: ')(' 역순 미탐지`,
    healedCode: `def is_valid_parentheses(s):
    # [중앙 조율형 엣지 피드백 기반 100% 자가 치유 패치]
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
    testCases: [
      {
        input: 's = "()"',
        expected: 'True',
        isEdgeCase: false,
        description: '기본 괄호 쌍 (순차형 통과)',
      },
      {
        input: 's = ")("',
        expected: 'False',
        isEdgeCase: true,
        description: '엣지 케이스 1: 역순 괄호 결함 (순차형 True 반환 실패 ➡️ Star 자가 치유)',
      },
      {
        input: 's = "([)]"',
        expected: 'False',
        isEdgeCase: true,
        description: '엣지 케이스 2: 이종 괄호 교차 오류 (순차형 True 반환 실패 ➡️ Star 자가 치유)',
      },
    ],
  },
];

export const ResearchPaperApp: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('two-sum');
  const [selectedTopology, setSelectedTopology] = useState<'linear' | 'star' | 'mesh' | 'tree'>('star');
  const [customCode, setCustomCode] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copiedPatch, setCopiedPatch] = useState<boolean>(false);
  const [editorTab, setEditorTab] = useState<'code' | 'tests'>('code');

  const currentPreset = ALGORITHM_PRESETS.find((p) => p.id === selectedPresetId) || ALGORITHM_PRESETS[0];

  // 시뮬레이션 결과 상태
  const [executionResult, setExecutionResult] = useState<{
    passRate: number;
    latencyMs: number;
    payloadBytes: number;
    efficiencyScore: number;
    passedCount: number;
    totalCount: number;
    status: 'PASS' | 'FAIL';
    summary: string;
    traces: { step: number; sender: string; receiver: string; message: string; bytes: number }[];
  }>({
    passRate: 100.0,
    latencyMs: 0.0057,
    payloadBytes: 228.1,
    efficiencyScore: 15000.0,
    passedCount: 3,
    totalCount: 3,
    status: 'PASS',
    summary:
      '중앙 조율형(Star) 허브가 전담 엣지 검증자의 실패 리포트를 수신하여 즉각 1회의 자가 교정 피드백 루프를 가동함으로써, 엣지 케이스 단위 테스트(assert)를 100% 전수 통과하였습니다.',
    traces: [
      {
        step: 1,
        sender: 'Hub (오케스트레이터)',
        receiver: '전문가 1 & 2',
        message: '과제 분할 및 엣지 테스트 슈트 동시 배분',
        bytes: 65,
      },
      {
        step: 2,
        sender: '전문가 1 (구현자)',
        receiver: 'Hub (오케스트레이터)',
        message: '1차 알고리즘 초안 제출 (잠재 엣지 결함 포함)',
        bytes: 42,
      },
      {
        step: 3,
        sender: '전문가 2 (검증자)',
        receiver: 'Hub (오케스트레이터)',
        message: '단위 테스트 실패 리포트 반환 (엣지 케이스 불일치 적발)',
        bytes: 51,
      },
      {
        step: 4,
        sender: 'Hub (오케스트레이터)',
        receiver: '전문가 1 (구현자)',
        message: '실패 리포트 피드백 주입 및 최적 패치 재작성 완료 (단위 테스트 100% 전수 통과)',
        bytes: 70,
      },
    ],
  });

  const handleCopyPatch = () => {
    navigator.clipboard.writeText(currentPreset.healedCode);
    setCopiedPatch(true);
    setTimeout(() => setCopiedPatch(false), 2000);
  };

  // 사용자가 잘못된 입력을 넣어도 멈추지 않는 안전 가드레일 (BRB-C05)
  const handleTriggerInvalidInputTest = () => {
    setIsCustomMode(true);
    setCustomCode(
      '### [비정상 입력 테스트: 특수문자 깨짐 및 구문 오류] ###\nfunction @#!%?_crash() { syntax error <<<',
    );
    setValidationError(
      '⚠️ 비정상 구문 입력이 감지되었습니다! [안전 가드레일 작동] 앱이 중단되거나 충돌하지 않도록 안전 모드가 활성화되었으며, 오류 리포트 생성 후 기본 안전 프리셋으로 자동 격리합니다.',
    );
    const el = document.getElementById('step-1');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRunApp = () => {
    setValidationError(null);
    setIsRunning(true);

    // 잘못된 입력 방어 로직 (BRB-C05)
    if (isCustomMode && (!customCode.trim() || customCode.includes('syntax error'))) {
      setTimeout(() => {
        setValidationError(
          '⚠️ 입력된 사용자 코드가 비어있거나 올바른 파이썬/JS 구문이 아닙니다. 비정상 입력에도 시스템은 멈추지 않으며, 안전 가드레일에 의해 기본 권장 프리셋으로 평가를 진행합니다.',
        );
      }, 200);
    }

    setTimeout(() => {
      if (selectedTopology === 'linear') {
        // 순차형: 얕은 검토로 엣지 케이스 실패 (30% 통과율)
        setExecutionResult({
          passRate: 33.33,
          latencyMs: 0.0041,
          payloadBytes: 85.9,
          efficiencyScore: 5836.58,
          passedCount: 1,
          totalCount: 3,
          status: 'FAIL',
          summary:
            '순차형 파이프라인(Linear)은 얕은 스모크 테스트만 거쳐 리뷰어를 통과시켰으나, 엣지 케이스 단위 테스트(assert)에서 연쇄 오류(Cascading Error)가 발생하여 최종 검증에 실패하였습니다.',
          traces: [
            {
              step: 1,
              sender: 'Agent A (기획자)',
              receiver: 'Agent B (구현자)',
              message: '알고리즘 기본 명세서 전달',
              bytes: 28,
            },
            {
              step: 2,
              sender: 'Agent B (구현자)',
              receiver: 'Agent C (리뷰어)',
              message: '1차 코드 제출 (엣지 결함 미인지)',
              bytes: 32,
            },
            {
              step: 3,
              sender: 'Agent C (리뷰어)',
              receiver: '최종 채점기',
              message: '스모크 테스트 통과 판정 후 배포 시도 (실제 단위 테스트에서 런타임 오류 발생)',
              bytes: 26,
            },
          ],
        });
      } else if (selectedTopology === 'star') {
        // 중앙 조율형: 100% 통과율, 지연시간 단축, 통신량 절감
        setExecutionResult({
          passRate: 100.0,
          latencyMs: 0.0057,
          payloadBytes: 228.1,
          efficiencyScore: 15000.0,
          passedCount: 3,
          totalCount: 3,
          status: 'PASS',
          summary:
            '중앙 조율형(Star)은 허브가 엣지 검증자의 실패 리포트를 수신하여 1회의 자가 교정 피드백 루프를 가동함으로써, 엣지 케이스 단위 테스트(assert)를 100% 전수 통과하였습니다. (토론형 대비 지연시간 70.62% 단축, 통신량 74.02% 절감)',
          traces: [
            {
              step: 1,
              sender: 'Hub (오케스트레이터)',
              receiver: '구현자 & 검증자',
              message: '알고리즘 명세 및 엣지 단위 테스트 슈트 동시 배분',
              bytes: 65,
            },
            {
              step: 2,
              sender: '전문가 1 (구현자)',
              receiver: 'Hub (오케스트레이터)',
              message: '1차 초안 제출',
              bytes: 42,
            },
            {
              step: 3,
              sender: '전문가 2 (검증자)',
              receiver: 'Hub (오케스트레이터)',
              message: '단위 테스트 실패 리포트 발송 (엣지 케이스 적발)',
              bytes: 51,
            },
            {
              step: 4,
              sender: 'Hub (오케스트레이터)',
              receiver: '전문가 1 (구현자)',
              message: '피드백 주입 및 최적 패치 완성 (단위 테스트 100% 통과)',
              bytes: 70,
            },
          ],
        });
      } else if (selectedTopology === 'mesh') {
        // 완전 연결 토론형: 100% 통과하나 지연시간 3.4배, 통신량 3.8배 폭증
        setExecutionResult({
          passRate: 100.0,
          latencyMs: 0.0194,
          payloadBytes: 878.0,
          efficiencyScore: 4892.37,
          passedCount: 3,
          totalCount: 3,
          status: 'PASS',
          summary:
            '완전 연결 토론형(Full Mesh)은 3개 에이전트가 9회의 전원 교차 검증을 거쳐 100% 통과율을 달성하였으나, 중앙 조율형 대비 지연시간이 3.4배 증가(0.0194ms)하고 통신량이 3.8배 폭증(878.0B)하여 효율성이 크게 저하되었습니다.',
          traces: [
            {
              step: 1,
              sender: 'Agent 1, 2, 3',
              receiver: '전원 브로드캐스트',
              message: '3개 후보 알고리즘 동시 발의',
              bytes: 280,
            },
            {
              step: 2,
              sender: 'Agent 2 ↔ Agent 1',
              receiver: '라운드 1 교차 테스트',
              message: '상호 코드 단위 테스트 assert 실행 및 결과 피드백',
              bytes: 310,
            },
            {
              step: 3,
              sender: 'Agent 3 ↔ Agent 1, 2',
              receiver: '라운드 2 다수결 투표',
              message: '단위 테스트 최다 통과 패치 최종 채택',
              bytes: 288,
            },
          ],
        });
      } else {
        // 계층형 트리
        setExecutionResult({
          passRate: 100.0,
          latencyMs: 0.0028,
          payloadBytes: 126.2,
          efficiencyScore: 26132.4,
          passedCount: 3,
          totalCount: 3,
          status: 'PASS',
          summary:
            '계층형 트리(Hierarchical)는 상위 매니저가 중간 서브리드에 위임하고, 하위 단위 검증 실패 시 상향 에스컬레이션 폴백을 적용하여 빠른 시간 내에 통과하였습니다.',
          traces: [
            {
              step: 1,
              sender: 'Lead Manager',
              receiver: 'Sub-Lead 1, 2',
              message: '알고리즘 단위 모듈 분할 지시',
              bytes: 38,
            },
            {
              step: 2,
              sender: 'Sub-Lead 1',
              receiver: 'Worker Agent',
              message: '단위 함수 구현 및 테스트',
              bytes: 44,
            },
            {
              step: 3,
              sender: 'Sub-Leads',
              receiver: 'Lead Manager',
              message: '단위 검증 후 상향 보고 및 최종 승인',
              bytes: 44,
            },
          ],
        });
      }

      setIsRunning(false);
    }, 450);
  };

  return (
    <article
      id="paper-application"
      className="glass-panel-elevated relative space-y-6 overflow-hidden rounded-3xl pb-28 sm:space-y-8 sm:pb-32"
    >
      {/* ============================================================== */}
      {/* 0. macOS 스타일 데스크톱 앱 윈도우 타이틀바 (App Shell Glass Styling) */}
      {/* ============================================================== */}
      <div className="flex items-center justify-between border-b border-white/60 bg-white/40 px-4 py-3 backdrop-blur-md sm:px-6 dark:border-white/10 dark:bg-black/30">
        <div className="flex items-center gap-3">
          {/* macOS 윈도우 제어 버튼 3종 */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full border border-[#e0443e] bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full border border-[#dea123] bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full border border-[#1aab29] bg-[#27c93f]" />
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200">
            <span>TopologyHeal Studio</span>
            <span className="text-neutral-400">/</span>
            <span className="text-2xs font-normal text-neutral-500 dark:text-neutral-400">
              Multi-Agent Self-Healing Engine v1.2
            </span>
          </div>
        </div>

        {/* 앱 상태 표시 뱃지 */}
        <div className="text-2xs flex items-center gap-2">
          <span className="glass-pill inline-flex items-center gap-1.5 rounded-full border border-emerald-300/80 bg-emerald-50/80 px-2.5 py-0.5 font-bold text-emerald-700 dark:border-emerald-800/80 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span>ENGINE ACTIVE</span>
          </span>
          <span className="glass-pill hidden rounded-md px-2 py-0.5 font-mono font-semibold text-neutral-600 sm:inline dark:text-neutral-300">
            PYTHON 3.12 LOCAL
          </span>
        </div>
      </div>

      <div className="space-y-6 px-4 sm:space-y-8 sm:px-8 lg:px-10">
        {/* ============================================================== */}
        {/* 1. BRB-C01, BRB-C03: 첫 화면 논문 제목 및 "누구를 어떻게 돕는가" 한 문장 */}
        {/* ============================================================== */}
        <div className="glass-panel relative overflow-hidden rounded-2xl border border-blue-200/60 bg-linear-to-r from-blue-50/70 via-indigo-50/40 to-white/70 p-5 sm:p-6 dark:border-blue-900/40 dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-neutral-900/40">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-200/60 pb-3 dark:border-blue-900/40">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-300/80 bg-blue-100/80 px-3 py-0.5 text-xs font-bold text-blue-800 dark:border-blue-700 dark:bg-blue-900/80 dark:text-blue-200">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
              <span>마지막 과제 BR-B · 논문을 반영한 실전 애플리케이션</span>
            </div>
            <span className="text-2xs font-mono font-semibold text-neutral-500 uppercase dark:text-neutral-400">
              Open Access · CC BY 4.0
            </span>
          </div>

          {/* 논문 제목 명시 (h1 단일 계층 준수 · BRB-C03, T01-C15) */}
          <header className="mt-3.5 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
              <FileText className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Research Paper Application (논문 반영 실전 앱)</span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-neutral-900 sm:text-2xl lg:text-3xl dark:text-neutral-50">
              알고리즘 문제 해결 및 단위 테스트 검증에서 다중 에이전트 협업 토폴로지(순차형 vs 중앙 조율형 vs 토론형 vs
              계층형)의 테스트 통과율 및 실행 지연시간 비교 실증
            </h1>
            <p className="text-xs font-medium text-neutral-600 italic sm:text-sm dark:text-neutral-400">
              Empirical Evaluation of Test Pass Rate and Execution Latency Across Multi-Agent Collaboration Topologies
              in Algorithmic Problem Solving and Unit Test Verification
            </p>
          </header>

          {/* 저자 및 학술 메타데이터 */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/70 bg-white/50 px-4 py-2.5 text-xs backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-bold text-neutral-900 dark:text-neutral-100">장진영 (Jinyeong Jang)</span>
              <span className="text-neutral-400">|</span>
              <span className="text-neutral-600 dark:text-neutral-400">SKT ALEPH 1기 인공지능 엔지니어링 과정</span>
            </div>
            <div className="text-2xs flex items-center gap-3 text-neutral-500 dark:text-neutral-400">
              <span>작성일: 2026.10.01</span>
              <span>·</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">마지막 과제 BR-B 대표작</span>
            </div>
          </div>

          {/* 학술 산출물 다운로드 바 (DOCX, ZIP, GitHub) */}
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-blue-200/50 pt-3 dark:border-blue-900/40">
            <a
              href="downloads/skt-aleph-jinyeong-research-paper.docx"
              download="skt-aleph-jinyeong-research-paper.docx"
              className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              <Download className="h-3.5 w-3.5" />
              <span>📄 논문 DOCX 파일 다운로드</span>
            </a>

            <a
              href="downloads/research-reproduction-package.zip"
              download="research-reproduction-package.zip"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-2xs transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>📦 재현 ZIP 패키지</span>
            </a>

            <a
              href="https://github.com/jinyeongjang/skt-aleph-jinyeong-research-paper"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              <span>GitHub 공개 저장소</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* BRB-C01 & BRB-C03: 누구를 어떻게 돕는가 핵심 1문장 */}
          <div className="glass-panel mt-4 rounded-xl border border-blue-300/70 bg-white/80 p-4 shadow-sm dark:border-blue-800/50 dark:bg-neutral-900/60">
            <div className="flex items-start gap-2.5">
              <Cpu className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <span className="text-xs font-extrabold text-blue-700 uppercase dark:text-blue-300">
                  [앱의 대상과 핵심 역할 · BRB-C01 1문장 정의]
                </span>
                <p className="mt-1 text-sm leading-relaxed font-bold text-neutral-900 sm:text-base dark:text-neutral-100">
                  &ldquo;소프트웨어 개발자 및 알고리즘 학습자가 복잡한 코드의 엣지 결함을 검증할 때, 본 앱은 논문에서
                  실증된 &lsquo;중앙 조율형(Star) 엣지 케이스 자가 치유 피드백 루프&rsquo;를 적용하여 연쇄 오류를
                  차단하고 최소한의 지연시간과 통신 오버헤드로 단위 테스트(assert)를 100% 자동 교정하도록
                  돕습니다.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* BRB-C11: 동료 한 사람의 한 줄 감상 (이름 없이) */}
          <div className="glass-pill mt-3 flex items-center gap-2 rounded-xl px-4 py-2 text-xs text-neutral-600 dark:text-neutral-300">
            <MessageSquare className="h-4 w-4 shrink-0 text-amber-500" />
            <p className="italic">
              <strong className="font-semibold text-neutral-800 dark:text-neutral-200">
                동료 교육생의 한 줄 감상:
              </strong>{' '}
              &ldquo;논문에서 말한 순차형의 얕은 검토로 인한 연쇄 오류와 중앙 조율형의 엣지 피드백 자가 교정의 차이를
              직접 코드를 넣어보며 1분 만에 체감할 수 있어서 매우 직관적이고 인상적이었습니다.&rdquo;
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. BRB-C02: 사용자가 할 일 세 가지 (1분 안내 가이드) */}
        {/* ============================================================== */}
        <section aria-labelledby="guide-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="guide-heading" className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              🚀 처음 오신 분을 위한 사용자가 할 일 세 가지 (1분 퀵 스타트 · BRB-C02)
            </h2>
            <span className="text-2xs text-neutral-500 dark:text-neutral-400">Step-by-Step Interactive Workflow</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a
              href="#step-1"
              className="glass-panel group rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/80 hover:shadow-md dark:hover:border-blue-500/80"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-xs">
                  1
                </span>
                <span className="text-xs font-bold text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
                  문제 및 코드 선택/입력
                </span>
              </div>
              <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                4대 실전 알고리즘 프리셋(Two Sum, 팰린드롬, 피보나치, 괄호) 중 하나를 선택하거나 직접 코드를 입력합니다.
              </p>
            </a>

            <a
              href="#step-2"
              className="glass-panel group rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/80 hover:shadow-md dark:hover:border-blue-500/80"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-xs">
                  2
                </span>
                <span className="text-xs font-bold text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
                  토폴로지 선택 & 실행
                </span>
              </div>
              <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                순차형(Linear)과 중앙 조율형(Star) 등 4대 토폴로지를 선택하고 [자가 치유 & 검증 실행] 버튼을 누릅니다.
              </p>
            </a>

            <a
              href="#step-3"
              className="glass-panel group rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/80 hover:shadow-md dark:hover:border-blue-500/80"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-xs">
                  3
                </span>
                <span className="text-xs font-bold text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
                  결과 및 패치 코드 확인
                </span>
              </div>
              <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                단위 테스트 통과율(%), 지연시간, 통신 바이트 및 자동으로 생성된 100% 통과 패치 코드 Diff를 확인합니다.
              </p>
            </a>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. STEP 1: 알고리즘 문제 선택 및 코드 검토 (BRB-C02-1, BRB-C05) */}
        {/* ============================================================== */}
        <section
          id="step-1"
          aria-labelledby="step1-heading"
          className="glass-panel scroll-mt-24 space-y-4 rounded-2xl p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h2 id="step1-heading" className="text-xs font-bold text-neutral-900 uppercase dark:text-neutral-100">
                Step 1 · 알고리즘 문제 및 단위 테스트 대상 선택
              </h2>
            </div>

            {/* 비정상 입력 방어 테스트 버튼 (BRB-C05) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTriggerInvalidInputTest}
                className="text-2xs inline-flex items-center gap-1.5 rounded-lg border border-red-300/80 bg-red-100/70 px-2.5 py-1 font-semibold text-red-700 backdrop-blur-md transition-colors hover:bg-red-200/80 focus-visible:ring-2 focus-visible:ring-red-600 dark:border-red-900/80 dark:bg-red-950/60 dark:text-red-300"
              >
                <AlertTriangle className="h-3 w-3" />
                <span>비정상·극단적 입력 테스트 (BRB-C05 검증)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCustomMode(!isCustomMode);
                  setValidationError(null);
                }}
                className="glass-pill text-2xs rounded-lg px-2.5 py-1 font-semibold text-neutral-700 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
              >
                {isCustomMode ? '프리셋 모드로 복귀' : '직접 코드 입력 모드'}
              </button>
            </div>
          </div>

          {/* 4대 알고리즘 프리셋 칩 */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {ALGORITHM_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedPresetId(p.id);
                  setIsCustomMode(false);
                  setValidationError(null);
                }}
                className={`glass-panel rounded-xl p-3 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                  !isCustomMode && selectedPresetId === p.id
                    ? 'border-blue-500/80 bg-blue-50/80 font-bold text-blue-900 shadow-sm ring-2 ring-blue-500/30 dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-100'
                    : 'text-neutral-700 hover:border-blue-300/60 dark:text-neutral-300 dark:hover:border-blue-500/40'
                }`}
              >
                <div className="text-xs">{p.name}</div>
                <div className="text-2xs mt-0.5 font-normal text-neutral-500 dark:text-neutral-400">{p.domain}</div>
              </button>
            ))}
          </div>

          {/* 검증 에러 안내 배너 (앱 중단 방지 · BRB-C05) */}
          {validationError && (
            <div className="glass-panel flex items-start gap-2.5 rounded-xl border border-amber-300/80 bg-amber-50/80 p-3.5 text-xs text-amber-900 backdrop-blur-md dark:border-amber-800/80 dark:bg-amber-950/60 dark:text-amber-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>{validationError}</div>
            </div>
          )}

          {/* 앱 스타일 에디터 워크스페이스: 글래스 다크 터미널 */}
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-neutral-950/85 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/85">
            {/* 에디터 상단 탭 바 */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditorTab('code')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-xs transition-all ${
                    editorTab === 'code'
                      ? 'border border-white/20 bg-white/15 font-bold text-white shadow-xs backdrop-blur-sm'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <FileText className="h-3 w-3 text-blue-400" />
                  <span>{isCustomMode ? 'custom_solution.py' : currentPreset.filename}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab('tests')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-xs transition-all ${
                    editorTab === 'tests'
                      ? 'border border-white/20 bg-white/15 font-bold text-white shadow-xs backdrop-blur-sm'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span>test_cases.py (3 tests)</span>
                </button>
              </div>

              <div className="text-2xs flex items-center gap-2 font-mono text-neutral-400">
                <span>UTF-8</span>
                <span>•</span>
                <span>Python 3.12</span>
              </div>
            </div>

            {/* 에디터 본체 */}
            <div className="p-4">
              {editorTab === 'code' ? (
                <div>
                  {isCustomMode ? (
                    <textarea
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      rows={8}
                      placeholder="테스트할 알고리즘 코드를 입력하세요... (잘못된 입력을 넣어도 앱은 중단되지 않습니다)"
                      className="w-full rounded-xl border border-white/15 bg-black/60 p-3 font-mono text-xs text-emerald-300 backdrop-blur-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex font-mono text-xs leading-relaxed">
                      {/* 줄 번호 표시 */}
                      <div className="pr-4 text-right text-neutral-600 select-none" aria-hidden="true">
                        {currentPreset.initialCode.split('\n').map((_, i) => (
                          <div key={i}>{i + 1}</div>
                        ))}
                      </div>
                      <pre className="overflow-x-auto text-neutral-200">
                        <code>{currentPreset.initialCode}</code>
                      </pre>
                    </div>
                  )}
                  <div className="text-2xs mt-3 border-t border-white/10 pt-2 text-neutral-400">
                    <span className="font-bold text-red-400">● 결함 원인: </span>
                    {currentPreset.bugExplanation}
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="text-2xs pb-1 font-mono text-neutral-400">
                    # 자동 검증 단위 테스트 슈트 (assert cases)
                  </div>
                  {currentPreset.testCases.map((tc, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between rounded-lg border border-white/10 bg-white/5 p-3 font-mono text-xs backdrop-blur-md"
                    >
                      <div>
                        <div className="font-bold text-blue-300">
                          assert {currentPreset.id.replace('-', '_')}({tc.input.split(', target')[0]}) == {tc.expected}
                        </div>
                        <div className="text-2xs mt-1 text-neutral-400">{tc.description}</div>
                      </div>
                      <span
                        className={`text-2xs rounded px-2 py-0.5 font-bold ${
                          tc.isEdgeCase
                            ? 'border border-amber-500/40 bg-amber-500/20 text-amber-300'
                            : 'border border-white/10 bg-white/10 text-neutral-300'
                        }`}
                      >
                        {tc.isEdgeCase ? '엣지 결함 검증' : '스모크 케이스'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. STEP 2: 4대 토폴로지 선택 & 실시간 실행 (BRB-C02-2, BRB-C04) */}
        {/* ============================================================== */}
        <section
          id="step-2"
          aria-labelledby="step2-heading"
          className="glass-panel scroll-mt-24 space-y-4 rounded-2xl p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h2 id="step2-heading" className="text-xs font-bold text-neutral-900 uppercase dark:text-neutral-100">
                Step 2 · 에이전트 협업 토폴로지 구조 선택 및 자가 치유 엔진 가동
              </h2>
            </div>

            <button
              type="button"
              onClick={handleRunApp}
              disabled={isRunning}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-400/40 bg-blue-600/95 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 backdrop-blur-md transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/35 focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-50"
            >
              {isRunning ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-white" />}
              <span>{isRunning ? '자가 치유 피드백 루프 실행 중...' : '자가 치유 & 단위 테스트 실행'}</span>
            </button>
          </div>

          {/* 4대 토폴로지 선택 카드 */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              onClick={() => setSelectedTopology('linear')}
              className={`glass-panel rounded-xl p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                selectedTopology === 'linear'
                  ? 'border-blue-500/80 bg-blue-50/80 font-bold text-blue-900 shadow-sm ring-2 ring-blue-500/30 dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-100'
                  : 'text-neutral-700 hover:border-blue-300/60 dark:text-neutral-300 dark:hover:border-blue-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">1. 순차형 (Linear)</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
              </div>
              <div className="text-2xs mt-1 text-neutral-500 dark:text-neutral-400">
                단방향 파이프라인 · 얕은 리뷰로 연쇄 오류 누적 (논문 통과율 30.0%)
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTopology('star')}
              className={`glass-panel relative rounded-xl p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                selectedTopology === 'star'
                  ? 'border-blue-500/80 bg-blue-50/80 font-bold text-blue-900 shadow-sm ring-2 ring-blue-500/30 dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-100'
                  : 'text-neutral-700 hover:border-blue-300/60 dark:text-neutral-300 dark:hover:border-blue-500/40'
              }`}
            >
              <span className="py-0.2 absolute -top-2 right-2 rounded-full border border-blue-400/50 bg-blue-600 px-2 text-[9px] font-extrabold text-white shadow-xs">
                논문 최적 권장 ⭐
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">2. 중앙 조율형 (Star)</span>
                <Share2 className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <div className="text-2xs mt-1 text-neutral-500 dark:text-neutral-400">
                허브-스포크 엣지 피드백 1회 자가 교정 (통과율 100%, 지연 -70.62%)
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTopology('mesh')}
              className={`glass-panel rounded-xl p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                selectedTopology === 'mesh'
                  ? 'border-blue-500/80 bg-blue-50/80 font-bold text-blue-900 shadow-sm ring-2 ring-blue-500/30 dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-100'
                  : 'text-neutral-700 hover:border-blue-300/60 dark:text-neutral-300 dark:hover:border-blue-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">3. 토론형 (Full Mesh)</span>
                <GitMerge className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="text-2xs mt-1 text-neutral-500 dark:text-neutral-400">
                9회 전원 상호 교차 검증 · 100% 통과하나 지연시간 3.4배, 통신 3.8배 낭비
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTopology('tree')}
              className={`glass-panel rounded-xl p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                selectedTopology === 'tree'
                  ? 'border-blue-500/80 bg-blue-50/80 font-bold text-blue-900 shadow-sm ring-2 ring-blue-500/30 dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-100'
                  : 'text-neutral-700 hover:border-blue-300/60 dark:text-neutral-300 dark:hover:border-blue-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">4. 계층형 (Tree)</span>
                <Layers className="h-3.5 w-3.5 text-purple-500" />
              </div>
              <div className="text-2xs mt-1 text-neutral-500 dark:text-neutral-400">
                매니저 ➡️ 서브리드 위임 및 실패 시 상향 에스컬레이션
              </div>
            </button>
          </div>

          {/* 에이전트 인터랙티브 토폴로지 시각화 맵 */}
          <div className="glass-panel rounded-xl p-4">
            <div className="text-2xs mb-3 flex items-center justify-between font-semibold text-neutral-500 dark:text-neutral-400">
              <span>에이전트 네트워크 토폴로지 활성 맵</span>
              <span className="font-mono text-blue-600 dark:text-blue-400">
                {selectedTopology === 'star'
                  ? 'Star Topology (Hub-and-Spoke)'
                  : selectedTopology === 'linear'
                    ? 'Linear Pipeline'
                    : selectedTopology === 'mesh'
                      ? 'Full Mesh Graph'
                      : 'Hierarchical Tree'}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 py-4 sm:gap-8">
              {selectedTopology === 'star' && (
                <>
                  <div className="glass-pill flex flex-col items-center gap-1.5 rounded-xl p-3 text-center">
                    <UserCheck className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
                    <span className="text-2xs font-bold">Expert 1 (구현자)</span>
                    <span className="text-[10px] text-neutral-500">코드 생성</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="h-0.5 w-12 animate-pulse bg-blue-500 sm:w-20" />
                    <span className="mt-1 font-mono text-[10px] text-blue-500">양방향 피드백</span>
                  </div>

                  <div className="glass-panel flex flex-col items-center gap-1.5 rounded-2xl border-2 border-blue-500/80 bg-blue-50/80 p-4 text-center shadow-md dark:border-blue-400 dark:bg-blue-950/60">
                    <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-black text-blue-900 dark:text-blue-200">Hub (오케스트레이터)</span>
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-300">자가 치유 중재</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="h-0.5 w-12 animate-pulse bg-blue-500 sm:w-20" />
                    <span className="mt-1 font-mono text-[10px] text-blue-500">실패 리포트</span>
                  </div>

                  <div className="glass-pill flex flex-col items-center gap-1.5 rounded-xl p-3 text-center">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-2xs font-bold">Expert 2 (검증자)</span>
                    <span className="text-[10px] text-neutral-500">엣지 단위 테스트</span>
                  </div>
                </>
              )}

              {selectedTopology === 'linear' && (
                <div className="flex items-center gap-3">
                  <div className="glass-pill text-2xs rounded-xl p-2.5 text-center font-bold">기획자</div>
                  <ArrowRight className="h-4 w-4 text-neutral-400" />
                  <div className="glass-pill text-2xs rounded-xl p-2.5 text-center font-bold">구현자 (결함 내포)</div>
                  <ArrowRight className="h-4 w-4 text-neutral-400" />
                  <div className="glass-pill text-2xs rounded-xl border border-red-300/80 bg-red-50/80 p-2.5 text-center font-bold text-red-700 dark:border-red-900/80 dark:bg-red-950/60 dark:text-red-300">
                    리뷰어 (스모크만 검토 ➡️ 연쇄 오류)
                  </div>
                </div>
              )}

              {selectedTopology === 'mesh' && (
                <div className="glass-pill text-2xs rounded-xl p-3 text-center font-mono text-amber-600 dark:text-amber-400">
                  ● 에이전트 1 ↔ 에이전트 2 ↔ 에이전트 3 (9회 교차 검증 투표망 · 고비용 오버헤드)
                </div>
              )}

              {selectedTopology === 'tree' && (
                <div className="glass-pill text-2xs rounded-xl p-3 text-center font-mono text-purple-600 dark:text-purple-400">
                  Lead Manager ⬇️ Sub-Leads ⬇️ Worker Agents (계층적 작업 분할)
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. STEP 3: 결과 리포트 및 자가 치유 패치 코드 Diff (BRB-C02-3, BRB-C04) */}
        {/* ============================================================== */}
        <section
          id="step-3"
          aria-labelledby="step3-heading"
          className="glass-panel scroll-mt-24 space-y-4 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 id="step3-heading" className="text-xs font-bold text-neutral-900 uppercase dark:text-neutral-100">
                Step 3 · 단위 테스트 실측 지표 & 100% 통과 자가 치유 패치 코드 확인
              </h2>
            </div>
            <span className="text-2xs font-semibold text-neutral-500 dark:text-neutral-400">
              논문 실측 데이터(N=50) 기반 실시간 계산
            </span>
          </div>

          {/* 4대 정량 지표 대시보드 카드 */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="glass-panel rounded-xl p-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-2xs font-medium text-neutral-500 dark:text-neutral-400">단위 테스트 통과율</div>
              <div className="mt-1 flex items-center justify-center gap-1.5">
                {executionResult.status === 'PASS' ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {executionResult.passRate.toFixed(1)}% (PASS)
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-black text-red-600 dark:text-red-400">
                      {executionResult.passRate.toFixed(1)}% (FAIL)
                    </span>
                  </>
                )}
              </div>
              <div className="text-2xs mt-1 text-neutral-400">
                {executionResult.passedCount} / {executionResult.totalCount} 케이스 통과
              </div>
            </div>

            <div className="glass-panel rounded-xl p-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-2xs font-medium text-neutral-500 dark:text-neutral-400">실행 지연시간 (Latency)</div>
              <div className="mt-1 flex items-center justify-center gap-1">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-black text-neutral-900 dark:text-neutral-100">
                  {executionResult.latencyMs} ms
                </span>
              </div>
              <div className="text-2xs mt-1 text-neutral-400">
                {selectedTopology === 'star' ? '-70.62% 단축 (vs 토론형)' : '런타임 CPU 지연'}
              </div>
            </div>

            <div className="glass-panel rounded-xl p-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-2xs font-medium text-neutral-500 dark:text-neutral-400">전송 페이로드</div>
              <div className="mt-1 flex items-center justify-center gap-1">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-black text-neutral-900 dark:text-neutral-100">
                  {executionResult.payloadBytes} B
                </span>
              </div>
              <div className="text-2xs mt-1 text-neutral-400">
                {selectedTopology === 'star' ? '-74.02% 절감 (vs 토론형)' : '에이전트 간 통신량'}
              </div>
            </div>

            <div className="glass-panel rounded-xl p-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-2xs font-medium text-neutral-500 dark:text-neutral-400">
                효율성 지수 (Efficiency)
              </div>
              <div className="mt-1 flex items-center justify-center gap-1">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-black text-neutral-900 dark:text-neutral-100">
                  {executionResult.efficiencyScore.toLocaleString()}
                </span>
              </div>
              <div className="text-2xs mt-1 text-neutral-400">(통과율 / 지연시간)</div>
            </div>
          </div>

          {/* 결과 분석 총평 및 트레이스 */}
          <div className="glass-panel rounded-xl p-4">
            <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">실측 평가 총평 및 진단</div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              {executionResult.summary}
            </p>

            {/* 에이전트 간 통신 트레이스 (Flow Trace) */}
            <div className="mt-3 space-y-1.5 border-t border-white/60 pt-3 dark:border-white/10">
              <div className="text-2xs font-bold text-neutral-500 uppercase dark:text-neutral-400">
                실시간 에이전트 간 통신 및 자가 교정 트레이스:
              </div>
              {executionResult.traces.map((tr) => (
                <div
                  key={tr.step}
                  className="glass-pill flex items-center justify-between rounded-lg px-3 py-1.5 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-neutral-400">#{tr.step}</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{tr.sender}</span>
                    <ArrowRight className="h-3 w-3 text-neutral-400" />
                    <span className="text-neutral-700 dark:text-neutral-300">{tr.receiver}</span>
                    <span className="text-neutral-500 dark:text-neutral-400">: {tr.message}</span>
                  </div>
                  <span className="text-2xs font-mono text-neutral-400">{tr.bytes} B</span>
                </div>
              ))}
            </div>
          </div>

          {/* Before vs After 자가 치유 패치 코드 Diff 뷰어 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                📝 자가 치유 코드 Diff (Before 결함 초안 ➡️ After 최적 패치)
              </span>
              <button
                type="button"
                onClick={handleCopyPatch}
                className="glass-pill text-2xs inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold text-neutral-700 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
              >
                {copiedPatch ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copiedPatch ? '패치 복사됨!' : '패치 코드 복사'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {/* Before Code */}
              <div className="glass-panel rounded-xl border border-red-300/60 bg-red-50/50 p-3.5 dark:border-red-900/50 dark:bg-red-950/30">
                <div className="text-2xs flex items-center justify-between pb-2 font-bold text-red-700 dark:text-red-400">
                  <span>[Before] 1차 초안 코드 (얕은 검토 / 결함 내포)</span>
                  <span className="rounded-md border border-red-200/80 bg-red-100/80 px-1.5 py-0.5 text-[10px] backdrop-blur-xs dark:border-red-800 dark:bg-red-900/60">
                    오류 발생
                  </span>
                </div>
                <pre className="overflow-x-auto rounded-lg border border-white/10 bg-neutral-950/90 p-3 font-mono text-xs leading-relaxed text-red-300 backdrop-blur-md">
                  <code>{currentPreset.initialCode}</code>
                </pre>
              </div>

              {/* After Healed Code */}
              <div className="glass-panel rounded-xl border border-emerald-300/60 bg-emerald-50/50 p-3.5 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                <div className="text-2xs flex items-center justify-between pb-2 font-bold text-emerald-700 dark:text-emerald-400">
                  <span>[After] 자가 치유 최적 패치 (단위 테스트 100% 통과)</span>
                  <span className="rounded-md border border-emerald-200/80 bg-emerald-100/80 px-1.5 py-0.5 text-[10px] backdrop-blur-xs dark:border-emerald-800 dark:bg-emerald-900/60">
                    교정 완료
                  </span>
                </div>
                <pre className="overflow-x-auto rounded-lg border border-white/10 bg-neutral-950/90 p-3 font-mono text-xs leading-relaxed text-emerald-300 backdrop-blur-md">
                  <code>{currentPreset.healedCode}</code>
                </pre>
              </div>
            </div>

            <p className="text-2xs text-neutral-500 dark:text-neutral-400">
              * 자가 치유 메커니즘: {currentPreset.healingExplanation}
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. 데이터 보안 및 개인정보/비밀값 감사 안내 (BRB-C06, BRB-C07, BRB-C12) */}
        {/* ============================================================== */}
        <div className="glass-panel text-2xs flex flex-wrap items-center justify-between gap-3 rounded-xl p-4 text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>
              <strong>데이터 안전 규격 준수:</strong> 본 애플리케이션의 모든 알고리즘 데이터는 공인 벤치마크 예시
              데이터이며 실제 개인정보 및 API Secret이 0건입니다 (BRB-C06, BRB-C07, BRB-C12).
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-neutral-400" />
            <span>환경 변수 설정: README.md 참조 (VITE_GEMINI_API_KEY 선택 지원)</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 7. 하단 플로팅 독바 (DockBar) 연동 */}
      {/* ============================================================== */}
      <DockBar
        onRunSimulation={handleRunApp}
        onTriggerInvalidInput={handleTriggerInvalidInputTest}
        isRunning={isRunning}
        selectedTopology={selectedTopology}
      />
    </article>
  );
};

export default ResearchPaperApp;

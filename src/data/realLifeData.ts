// src/data/realLifeData.ts
// SKT ALEPH 1기 장진영 연구 논문 연계 — 실생활 적용 서비스 시나리오 및 4대 토폴로지 비교 명세

export interface RealWorldPreset {
  id: string;
  name: string;
  domain: string;
  realLifeTitle: string;
  realLifeDomain: string;
  realLifeIcon: string;
  serviceName: string;
  userStory: string;
  bugScenario: string;
  financialOrSocialRisk: string;
  healedOutcome: string;
  sampleInput: string;
  sampleInputExplanation: string;
  edgeCaseInputs: {
    title: string;
    input: string;
    linearResult: string;
    starResult: string;
    realLifeImpact: string;
  }[];
  interactiveDemo: {
    type: 'payment' | 'access-gate' | 'finance-savings' | 'legal-contract';
    initialState: Record<string, unknown>;
  };
}

export const REAL_WORLD_PRESETS: RealWorldPreset[] = [
  {
    id: 'two-sum',
    name: '1. Two Sum (배열 타겟합 결함)',
    domain: '배열 / 해시 테이블 (Array & Hash)',
    realLifeTitle: '이커머스 기프트카드 & 포인트 복합 결제 엔진',
    realLifeDomain: '핀테크 & 쇼핑몰 정산 (FinTech Payment)',
    realLifeIcon: 'CreditCard',
    serviceName: 'PaySmart 복합 결제 오케스트레이터',
    userStory:
      '고객이 장바구니에서 최종 결제 금액(예: 90,000원)을 결제하려 할 때, 보유한 기프트카드 및 바우처 목록 중 합산액이 정확히 일치하는 2장을 자동 매칭하여 1초 내에 결제를 승인합니다.',
    bugScenario:
      '초안 코드는 동일 인덱스(i==j)를 중복 참조하여 30,000원짜리 기프트카드 1장을 2번 청구(60,000원 처리)하거나, 음수 취소 포인트(-80,000원) 인입 시 인덱스 에러로 결제창이 튕깁니다.',
    financialOrSocialRisk:
      '회사 측에는 이중 카드 청구로 인한 재무 결손 및 고객 신뢰도 추락, 결제 포기율(Drop-off) 35% 급증 사고 발생.',
    healedOutcome:
      '중앙 조율형(Star) 허브가 엣지 검증자의 실패 어설션을 수신하여, 해시 테이블 기반 O(N) 단일 순회로 중복 참조를 완벽 차단하고 0.005초 만에 결제를 정상 승인합니다.',
    sampleInput: '보유 카드: [2만, 7만, 11만, 15만원], 타겟 결제액: 9만원',
    sampleInputExplanation: '기프트카드 2만원권(인덱스 0)과 7만원권(인덱스 1)의 정확한 조합을 탐색',
    edgeCaseInputs: [
      {
        title: '동일 카드 중복 청구 결함',
        input: '보유 카드: [3만, 3만원], 타겟: 6만원',
        linearResult: '❌ 동일 카드 인덱스 0번을 2회 청구하여 결제 오류 발생',
        starResult: '✅ 인덱스 0번과 1번의 서로 다른 카드임을 해시맵으로 검증 후 정상 승인',
        realLifeImpact: '이중 청구 금융 사고 원천 방어',
      },
      {
        title: '취소/환불 음수 포인트 경계 결함',
        input: '보유 카드: [-1만, -2만, -3만, -4만, -5만원], 타겟: -8만원',
        linearResult: '❌ 배열 범위 초과(IndexError)로 결제 서버 500 내부 에러',
        starResult: '✅ 음수 잔액 경계값 정상 매칭 [인덱스 2, 4] 도출 완료',
        realLifeImpact: '환불 대기열 무중단 처리',
      },
    ],
    interactiveDemo: {
      type: 'payment',
      initialState: {
        cards: [20000, 70000, 110000, 150000],
        targetAmount: 90000,
        selectedIndices: [0, 1],
      },
    },
  },
  {
    id: 'palindrome',
    name: '2. Valid Palindrome (문자열 팰린드롬 결함)',
    domain: '문자열 전처리 (Two Pointer & String)',
    realLifeTitle: '스마트 하이패스 & 물류창고 양방향 대칭 보안 식별 시스템',
    realLifeDomain: '스마트 모빌리티 & 물류 보안 (IoT Access Control)',
    realLifeIcon: 'ShieldCheck',
    serviceName: 'GatePass 양방향 광학 인식 게이트',
    userStory:
      '차량이 주차장이나 고속도로 톨게이트를 80km/h로 통과할 때, 번호판 앞뒤 양방향 대칭 체크섬 코드 및 RFID 문자열의 무결성을 0.01초 내에 검증하여 차단기를 자동 개폐합니다.',
    bugScenario:
      '초안 코드는 문자열 단순 역순 뒤집기(`s == s[::-1]`)만 수행하여, 차량 번호판에 묻은 먼지, 하이픈(-), 공백, 대소문자 혼재 시 비정상 코드로 오판하여 차단기를 열지 않습니다.',
    financialOrSocialRisk:
      '차단기 미개방으로 인한 출퇴근길 연쇄 추돌 위험 및 요금소 병목 현상, 출입 보안 게이트 오작동 민원 속출.',
    healedOutcome:
      '중앙 조율형 허브가 영숫자 추출(`isalnum()`)과 대소문자 소문자 통일 후 투 포인터 검증을 즉각 패치하여, 노이즈가 섞인 번호판도 100% 무결점으로 통과시킵니다.',
    sampleInput: '번호판 문자열: "A man, a plan, a canal: Panama"',
    sampleInputExplanation: '특수문자(: ,)와 공백을 무시하면 "amanaplanacanalpanama"로 완벽한 대칭 검증 성공',
    edgeCaseInputs: [
      {
        title: '기호 및 대소문자 혼합 노이즈',
        input: '"A man, a plan, a canal: Panama"',
        linearResult: '❌ 단순 역순 비교로 불일치 판정 ➡️ 차단기 미개방',
        starResult: '✅ 영숫자 정규화 후 양방향 대칭 확인 ➡️ 게이트 즉시 오픈',
        realLifeImpact: '차량 정체 0초, 즉시 통과 보장',
      },
      {
        title: '먼지로 인한 단일 공백 오인식',
        input: '" "',
        linearResult: '❌ 공백 처리 누락으로 예외 발생',
        starResult: '✅ 유효한 공백 경계값 정규화로 안전 통과',
        realLifeImpact: '광학 센서 오차 자동 보정',
      },
    ],
    interactiveDemo: {
      type: 'access-gate',
      initialState: {
        plateText: 'A man, a plan, a canal: Panama',
        gateStatus: 'OPEN',
      },
    },
  },
  {
    id: 'fibonacci',
    name: '3. Fibonacci Number (경계조건 N=0 결함)',
    domain: '동적계획법 & 수학 (DP & Math)',
    realLifeTitle: '금융 복리 적금 이자 및 단계별 점진 저축 시뮬레이터',
    realLifeDomain: '자산 관리 & 적금 시뮬레이션 (FinTech Banking)',
    realLifeIcon: 'TrendingUp',
    serviceName: 'GrowWealth 단계별 적금 엔진',
    userStory:
      '고객이 매월 저축할 때 직전 두 달의 저축 성과를 합산하여 보너스 이자가 복리로 증액되는 핀테크 금융 상품의 N개월 차 납입금과 만기 예상액을 산출합니다.',
    bugScenario:
      '초안 코드는 기저조건을 `if n <= 2: return 1`로 잘못 설정하여, 계좌를 개설한 첫날(0개월 차)에도 잔액이 0원이 아닌 1원으로 잘못 정산되는 심각한 회계 원장 결함이 발생합니다.',
    financialOrSocialRisk:
      '금융감독원 회계 감사 적발 및 수만 명의 고객 초기 잔액 불일치로 인한 금융 시스템 신뢰도 치명타.',
    healedOutcome:
      '중앙 조율형 허브가 0개월 차 0원 반환 기저조건을 즉각 주입하고, O(N) DP 메모이제이션을 통해 0.003초 만에 100% 무오류 금융 원장을 교정합니다.',
    sampleInput: '저축 경과 개월: n = 4개월',
    sampleInputExplanation: '0월(0원) ➡️ 1월(1원) ➡️ 2월(1원) ➡️ 3월(2원) ➡️ 4월(3원) 복리 산출',
    edgeCaseInputs: [
      {
        title: '계좌 개설 당일(0개월 차) 잔액 엣지',
        input: 'n = 0개월',
        linearResult: '❌ 0개월인데 1원으로 잘못 계산되어 장부 불일치 발생',
        starResult: '✅ 0개월 차 0원 정확 반환으로 회계 무결성 유지',
        realLifeImpact: '금융 사고 0건, 감사 통과',
      },
      {
        title: '1개월 차 단일 기저값 검증',
        input: 'n = 1개월',
        linearResult: '⚠️ 비효율적 재귀 호출로 연산 지연',
        starResult: '✅ O(1) 즉시 단일 기저값 1 반환',
        realLifeImpact: '초고속 실시간 모바일 잔액 조회',
      },
    ],
    interactiveDemo: {
      type: 'finance-savings',
      initialState: {
        months: 4,
        calculatedAmount: 300000,
      },
    },
  },
  {
    id: 'parentheses',
    name: '4. Valid Parentheses (스택 유효 괄호 결함)',
    domain: '스택 자료구조 (Stack & Parsing)',
    realLifeTitle: '전자 계약서 특약 조항 & 수식 괄호 무결성 검증기',
    realLifeDomain: '리걸테크 & 전자문서 (LegalTech Contract)',
    realLifeIcon: 'FileCheck',
    serviceName: 'DocuVerify 스마트 계약서 무결성 감사관',
    userStory:
      '부동산 매매, 임대차, 기업 간 수십 장에 달하는 전자 계약서에서 특약 조건문 `(갑의 의무)`, `{면책조항}`, `[별표규정]`의 괄호가 누락되거나 잘못 닫혔는지를 1초 내에 전수 검증합니다.',
    bugScenario:
      '초안 코드는 단순히 여는 괄호와 닫는 괄호의 개수만 세어, `)(`처럼 닫는 괄호가 먼저 오거나 `([)]`처럼 서로 다른 조항이 뒤엉킨 치명적인 조항 역전 결함을 통과시켜 버립니다.',
    financialOrSocialRisk: '계약서 무효 소송, 법률적 해석 분쟁 발생으로 인한 수억 원 대 손해배상 청구 위험 직면.',
    healedOutcome:
      '중앙 조율형 허브가 LIFO(후입선출) 스택 기반 괄호 매핑을 주입하여, 모든 순서 역전 및 홀수 조항 엣지 케이스를 100% 사전에 탐지하여 법률 결함을 방어합니다.',
    sampleInput: '계약서 조항 서식: "()[]{}"',
    sampleInputExplanation: '모든 종류의 괄호가 올바른 순서와 짝으로 닫혔는지 확인',
    edgeCaseInputs: [
      {
        title: '역순 괄호 조항 결함',
        input: 's = ")("',
        linearResult: '❌ 개수가 같으므로 유효(True)하다고 잘못 판정하여 위법 계약서 생성',
        starResult: '✅ 스택 검증으로 닫는 괄호 선행 오류 정확 탐지(False)',
        realLifeImpact: '무효 계약서 유통 100% 원천 차단',
      },
      {
        title: '이종 괄호 교차 꼬임 결함',
        input: 's = "([)]"',
        linearResult: '❌ 교차 꼬임 미탐지로 계약서 서명 진행',
        starResult: '✅ LIFO 불일치 즉시 탐지하여 수정 피드백 발행',
        realLifeImpact: '법률 분쟁 제로화',
      },
    ],
    interactiveDemo: {
      type: 'legal-contract',
      initialState: {
        clauseText: '제1조 (계약의 목적) 및 [별첨 1] 규정에 따름',
        isValid: true,
      },
    },
  },
];

// ==========================================
// 4대 토폴로지 상세 비교 데이터 및 실생활 비유
// ==========================================
export interface TopologyDetail {
  id: 'linear' | 'star' | 'mesh' | 'tree';
  name: string;
  koreanName: string;
  realLifeMetaphor: string;
  realLifeTitle: string;
  realLifeDescription: string;
  workflowSummary: string;
  passRate: number;
  latencyMs: number;
  payloadBytes: number;
  efficiencyScore: number;
  costEstimate: string;
  badge: string;
  badgeColor: string;
  pros: string;
  cons: string;
  steps: {
    step: number;
    agent: string;
    role: string;
    action: string;
    status: 'normal' | 'error' | 'healed' | 'success';
  }[];
}

export const TOPOLOGIES_DETAIL: Record<'linear' | 'star' | 'mesh' | 'tree', TopologyDetail> = {
  linear: {
    id: 'linear',
    name: 'Linear Pipeline',
    koreanName: '순차형 파이프라인',
    realLifeMetaphor: '공장 컨베이어 벨트 (일방통행)',
    realLifeTitle: '🏭 컨베이어 벨트 공정형',
    realLifeDescription:
      '작업이 한 방향으로만 흐르고 뒤돌아보지 않는 일방통행 구조입니다. 앞선 작업자가 엣지 불량을 놓치면, 다음 검수원도 겉모양만 대충 보고 통과시켜 결국 최종 소비자에게 불량품이 배송되어 대규모 리콜 사태가 발생합니다.',
    workflowSummary: '기획자 ➡️ 구현자 ➡️ 리뷰어 단방향 전달 (피드백 루프 부재로 연쇄 오류 누적)',
    passRate: 33.3,
    latencyMs: 0.0041,
    payloadBytes: 85.9,
    efficiencyScore: 5836.58,
    costEstimate: '초기 비용 저렴 (단, 버그로 인한 대규모 손실 위험)',
    badge: '취약한 일방통행 💥',
    badgeColor: 'border-red-400 bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300',
    pros: '구조가 단순하고 에이전트 간 통신량이 가장 적음',
    cons: '엣지 케이스 단위 테스트에서 연쇄 오류(Cascading Error) 발생으로 33.3%만 통과 (실패)',
    steps: [
      {
        step: 1,
        agent: 'Agent A (기획자)',
        role: '입력 스펙 정의',
        action: '기본 요구사항을 구현자에게 전달',
        status: 'normal',
      },
      {
        step: 2,
        agent: 'Agent B (구현자)',
        role: '1차 코드 작성',
        action: '동일 인덱스 중복 허용 버그가 내포된 초안 작성',
        status: 'error',
      },
      {
        step: 3,
        agent: 'Agent C (리뷰어)',
        role: '얕은 스모크 검토',
        action: '기본 케이스 1개만 돌려보고 승인 ➡️ 프로덕션 엣지 크래시 발생',
        status: 'error',
      },
    ],
  },
  star: {
    id: 'star',
    name: 'Star / Hub-and-Spoke',
    koreanName: '중앙 조율형 (Star)',
    realLifeMetaphor: '수술실의 집도의 & 전담 모니터링 의사',
    realLifeTitle: '🏥 정밀 수술실 중앙 관제형',
    realLifeDescription:
      '중앙의 집도의(Hub)가 집도하면서, 옆의 생체 신호 전담의(검증자)가 이상 징후를 발견하는 즉시 허브에게 알립니다. 허브는 지체 없이 1회 타겟 교정 피드백을 전달하여 환자를 부작용 없이 100% 무사히 완치시킵니다.',
    workflowSummary:
      '중앙 Hub가 구현자와 검증자를 중재. 실패 리포트 수신 시 즉시 1회 자가 교정 피드백 루프를 가동하여 100% 통과',
    passRate: 100.0,
    latencyMs: 0.0057,
    payloadBytes: 228.1,
    efficiencyScore: 15000.0,
    costEstimate: '황금 가성비 (최소 비용으로 100% 품질 달성)',
    badge: '논문 최적 권장 ⭐',
    badgeColor: 'border-blue-400 bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300',
    pros: '100% 전수 통과, 토론형 대비 지연시간 70.62% 단축, 통신량 74.02% 절감 달성',
    cons: '중앙 허브의 조율 알고리즘 설계가 필수적임',
    steps: [
      {
        step: 1,
        agent: 'Hub (오케스트레이터)',
        role: '중앙 관제탑',
        action: '구현자와 엣지 검증자에게 스펙과 테스트 케이스 동시 분배',
        status: 'normal',
      },
      {
        step: 2,
        agent: 'Expert 1 (구현자)',
        role: '초안 구현',
        action: '1차 초안 제출 (초기 결함 내포)',
        status: 'normal',
      },
      {
        step: 3,
        agent: 'Expert 2 (검증자)',
        role: '엣지 테스트 감사',
        action: '동일 인덱스 중복 케이스 실패 리포트를 Hub로 즉각 전송',
        status: 'error',
      },
      {
        step: 4,
        agent: 'Hub 🔁 Expert 1',
        role: '자가 치유 루프',
        action: '실패 원인 주입 및 해시 맵 최적 패치 재작성 ➡️ 100% 전수 통과',
        status: 'healed',
      },
    ],
  },
  mesh: {
    id: 'mesh',
    name: 'Full Mesh Discussion',
    koreanName: '완전 연결 토론형 (Mesh)',
    realLifeMetaphor: '사공이 많은 끝장 토론 원탁 회의',
    realLifeTitle: '🗣️ 만장일치 원탁 끝장 토론형',
    realLifeDescription:
      '모든 참석자가 서로에게 한마디씩 번갈아 의견을 묻고 반박하는 난상 토론입니다. 결국 정답에는 도달하지만, 회의 시간이 4배 길어지고 회의실 대관비와 인건비(통신량 878B)가 폭증하여 비즈니스 적기를 놓칩니다.',
    workflowSummary:
      '3개 에이전트 간 9회 전방위 교차 검증 및 다수결 투표 진행 (100% 통과하나 지연시간 3.4배, 통신량 3.8배 폭증)',
    passRate: 100.0,
    latencyMs: 0.0194,
    payloadBytes: 878.0,
    efficiencyScore: 4892.37,
    costEstimate: '비용 폭증 (서버 자원 및 네트워크 3.8배 낭비)',
    badge: '고비용 자원 낭비 🐢',
    badgeColor: 'border-amber-400 bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300',
    pros: '복잡한 다수결 교차 검증으로 신뢰도 100% 통과 달성',
    cons: '지연시간 3.4배 증가, 통신량 3.8배 급증하여 효율성 지수 급락',
    steps: [
      {
        step: 1,
        agent: 'Agent 1, 2, 3',
        role: '전원 브로드캐스트',
        action: '각자 후보 알고리즘을 모든 에이전트에게 발의',
        status: 'normal',
      },
      {
        step: 2,
        agent: '상호 교차 검증 (Round 1)',
        role: '전원 상호 반박',
        action: '상대방 코드의 엣지 결함을 상호 지적 (통신량 폭증)',
        status: 'normal',
      },
      {
        step: 3,
        agent: '다수결 투표 (Round 2)',
        role: '최종 합의 채택',
        action: '최종 패치를 도출했으나 처리 지연시간 0.0194ms 소요',
        status: 'success',
      },
    ],
  },
  tree: {
    id: 'tree',
    name: 'Hierarchical Tree',
    koreanName: '계층형 트리 (Tree)',
    realLifeMetaphor: '대기업 직급별 결재 보고 체계',
    realLifeTitle: '🏢 직급별 결재 및 에스컬레이션형',
    realLifeDescription:
      '팀장(Lead Manager)이 과장(Sub-Lead)에게 업무를 배분하고, 과장이 대리(Worker)에게 지시합니다. 하위 작업에 오류가 생기면 상향 보고(에스컬레이션) 후 승인을 받아 처리하는 정통적인 관료제 구조입니다.',
    workflowSummary: 'Lead Manager ➡️ Sub-Leads ➡️ Worker Agents 계층 분할 및 상향 보고',
    passRate: 100.0,
    latencyMs: 0.0028,
    payloadBytes: 126.2,
    efficiencyScore: 26132.4,
    costEstimate: '적정 비용 (규격화된 조직 프로세스)',
    badge: '상명하복 계층형 🏛️',
    badgeColor: 'border-purple-400 bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300',
    pros: '모듈 분할이 명확하고 분업화된 단순 작업 시 빠른 속도',
    cons: '복합적인 엣지 결함 발생 시 상향 결재 대기 오버헤드 및 단일 실패점 위험',
    steps: [
      {
        step: 1,
        agent: 'Lead Manager',
        role: '총괄 기획',
        action: '작업 모듈을 하위 서브리드에게 분할 하달',
        status: 'normal',
      },
      {
        step: 2,
        agent: 'Sub-Lead 1, 2',
        role: '중간 관리자',
        action: '단위 함수별로 실무 에이전트에게 위임',
        status: 'normal',
      },
      {
        step: 3,
        agent: 'Worker Agents ⬆️',
        role: '상향 보고',
        action: '단위 검증 후 상위 매니저의 최종 승인을 거쳐 완료',
        status: 'success',
      },
    ],
  },
};

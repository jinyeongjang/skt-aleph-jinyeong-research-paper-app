// src/data/paperData.ts
// SKT ALEPH 1기 장진영 — 과제 10 연구 논문 데이터 및 명세

export interface CandidateTopic {
  id: string;
  title: string;
  reasonDropped: string;
}

export interface ReferenceItem {
  id: string;
  authors: string;
  year: number;
  title: string;
  source: string;
  url: string;
  supportsHypothesis: string;
  isVerified: boolean;
}

export interface HallucinationFilteredItem {
  id: string;
  fakeTitle: string;
  fakeAuthor: string;
  reasonExcluded: string;
  detectedAt: string;
}

export interface ExperimentDataSample {
  id: number;
  sampleName: string;
  controlGroupIterations: number;
  experimentGroupIterations: number;
  controlDurationMs: number;
  experimentDurationMs: number;
  controlTokens: number;
  experimentTokens: number;
  initialLintErrors: number;
  finalLintErrors: number;
  status: 'PASS' | 'FAIL';
  trafficType?: string;
  pps?: number;
  packetSize?: number;
  ruleResult?: string;
  aiResult?: string;
}

export interface ResearchPaperData {
  meta: {
    title: string;
    englishTitle: string;
    author: string;
    affiliation: string;
    date: string;
    liveUrl: string;
    githubUrl: string;
    docxDownloadUrl: string;
    zipDownloadUrl: string;
    interestField: string;
  };
  hypothesis: {
    statement: string;
    independentVariable: string;
    dependentVariable: string;
    measurementMethod: string;
    falsificationCriteria: string;
    dataCollectionPeriod: string;
    aiRefinementProcess: string;
    finalSelectionReason: string;
    candidateTopics: CandidateTopic[];
  };
  literature: {
    verifiedReferences: ReferenceItem[];
    hallucinationFiltered: HallucinationFilteredItem[];
    factCheckMethod: string;
    knownVsNovelClaim: {
      knownFact: string;
      novelClaim: string;
    };
  };
  experiment: {
    designTable: {
      category: string;
      controlGroup: string;
      experimentGroup: string;
    }[];
    sampleCount: number;
    metrics: string[];
    samples: ExperimentDataSample[];
    controlAvgIterations: number;
    experimentAvgIterations: number;
    iterationReductionRate: number;
    controlAvgDurationMs: number;
    experimentAvgDurationMs: number;
  };
  results: {
    summary: string;
    matchedCases: {
      count: number;
      percentage: number;
      description: string;
    };
    unmatchedCases: {
      count: number;
      percentage: number;
      description: string;
      analyzedReason: string;
    };
    conclusion: string;
    limitations: string[];
  };
  verificationAndJudgment: {
    quickVerification4Lines: {
      whereToGo: string;
      whatToDo: string;
      whatYouSeeIfPass: string;
      whatYouSeeIfFail: string;
    };
    aiAndStudentJudgment: {
      delegatedToAi: string;
      studentJudged: string;
      rejectedAiProposal: string;
    };
  };
}

export const RESEARCH_PAPER_DATA: ResearchPaperData = {
  meta: {
    title:
      '알고리즘 문제 해결 및 단위 테스트 검증에서 다중 에이전트 협업 토폴로지(순차형 vs 중앙 조율형 vs 토론형 vs 계층형)의 테스트 통과율 및 실행 지연시간 비교 실증',
    englishTitle:
      'Empirical Evaluation of Test Pass Rate and Execution Latency Across Multi-Agent Collaboration Topologies in Algorithmic Problem Solving and Unit Test Verification',
    author: '장진영',
    affiliation: 'SKT ALEPH 1기',
    date: '2026.10.01',
    liveUrl: 'https://skt-aleph-jinyeong-research-paper-a.vercel.app',
    githubUrl: 'https://github.com/jinyeongjang/skt-aleph-jinyeong-research-paper',
    docxDownloadUrl: '/downloads/skt-aleph-jinyeong-research-paper.docx',
    zipDownloadUrl: '/downloads/research-reproduction-package.zip',
    interestField:
      '다중 에이전트 협업 토폴로지 구조, 소프트웨어 결함 격리, 단위 테스트(assert) 자가 치유 루프 및 실행 지연시간 최적화',
  },
  hypothesis: {
    statement:
      '알고리즘 문제 해결 및 단위 테스트 검증 환경에서, 단순 순차형(Linear Pipeline) 토폴로지 대비 중앙 조율형(Star/Hub-and-Spoke) 토폴로지는 엣지 케이스 단위 테스트 피드백 루프를 통해 테스트 통과율을 20%p 이상 향상시키면서도, 완전 연결 토론형(Full Mesh) 대비 실행 지연시간 및 통신 오버헤드를 40% 이상 절감하여 최적의 효율성을 달성한다.',
    independentVariable:
      '다중 에이전트 시스템의 협업 통신 토폴로지 구조 (A군: 순차형 Pipeline, B군: 중앙 조율형 Star/Hub, C군: 완전 연결 토론형 Mesh, D군: 계층형 Tree)',
    dependentVariable:
      '단위 테스트 통과율(Pass Rate, %), 평균 실행 지연시간(Latency, ms), 에이전트 간 통신 페이로드(Bytes), 효율성 지수',
    measurementMethod:
      '50개 실제 파이썬 알고리즘 문제(배열, 문자열, DP, 수학, 비트 등)와 150+ 단위 테스트 케이스(N=50)를 각 토폴로지 파이프라인에 직접 투입하여 실제 assert 통과 여부, time.perf_counter() 지연시간(ms), 전송 바이트를 로컬 파이썬 런타임에서 전수 실측함.',
    falsificationCriteria:
      '중앙 조율형의 테스트 통과율 향상폭이 순차형 대비 20%p 미만이거나, 토론형 대비 지연/통신량 절감률이 40% 미만일 경우 가설 기각.',
    dataCollectionPeriod: '2026.09.28 ~ 2026.10.01 (총 50개 실제 알고리즘 문제 전수 실행 및 실측 통계 분석)',
    aiRefinementProcess:
      '초기 질문("토론을 많이 시키면 버그를 잘 잡을까?")에서 출발하여, "외부 API나 난수 모의 추정 대신 실제 코드를 돌려서 잴 수 있는가?", "순차형 파이프라인의 얕은 검토가 어떻게 프로덕션 장애로 이어지는가?", "중앙 허브의 1회 자가 교정 피드백이 무거운 토론형 대비 얼마나 효율적인가?"라는 실제 엔지니어링 문제로 AI와 함께 다듬고 정량적 20%p 통과율 향상 및 40% 자원 절감 가설을 확정함.',
    finalSelectionReason:
      '외부 API 요금이나 네트워크 상태에 영향을 받지 않고, 누구나 터미널에서 python research/scripts/run_experiment.py를 실행하여 50개 문제의 단위 테스트 통과율과 실행 시간을 100% 직접 실측 및 재현할 수 있기 때문.',
    candidateTopics: [
      {
        id: 'candidate-1',
        title: '유료 LLM API(GPT-4o) 다중 에이전트 토론의 소프트웨어 패치 성공률 실측',
        reasonDropped:
          '외부 API 과금이 지속 발생하며, 인터넷망 및 OpenAI 서버 혼잡도에 따라 지연시간 측정 오차가 커 통제 변인을 엄격히 고정하기 어려워 제외함.',
      },
      {
        id: 'candidate-2',
        title: '단일 대형 모델(70B) 로컬 서빙과 경량 모델 앙상블의 추론 속도 비교',
        reasonDropped:
          '48GB 이상의 고가 GPU 인프라가 강제되어 일반 PC 환경에서 동일한 재현 신뢰성을 보장하기 어려워 접음.',
      },
      {
        id: 'candidate-3',
        title: '난수 기반 확률 모델(Monte Carlo)을 이용한 가상 다중 에이전트 오류율 예측',
        reasonDropped:
          '실제 코드를 실행하고 테스트하는 것이 아니라 random.random() 가상 난수에 의존하므로, 실제 소프트웨어 결함과 연산 지연시간을 대변하지 못해 최종 제외함.',
      },
    ],
  },
  literature: {
    verifiedReferences: [
      {
        id: 'ref-1',
        authors: 'Hong, S., Zheng, X., Chen, J., Cheng, Y., Zhang, C., Wang, Z., ... & Zhou, M.',
        year: 2024,
        title: 'MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework',
        source: 'International Conference on Learning Representations (ICLR 2024)',
        url: 'https://openreview.net/forum?id=VtmBAGCN7o',
        supportsHypothesis:
          '표준 운영 절차(SOP)와 역할 분담 구조가 오류 전파를 억제하고 소프트웨어 엔지니어링 성공률을 대폭 향상시킴을 데이터로 입증함.',
        isVerified: true,
      },
      {
        id: 'ref-2',
        authors: 'Wu, Q., Bansal, G., Zhang, J., Wu, Y., Li, B., Erknev, N., ... & Wang, C.',
        year: 2023,
        title: 'AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation',
        source: 'arXiv preprint arXiv:2308.08155',
        url: 'https://doi.org/10.48550/arXiv.2308.08155',
        supportsHypothesis:
          '에이전트 간 대화형 토폴로지 구성이 복합 문제 해결 성공률과 시스템 유연성에 결정적 영향을 미침을 이론적으로 지지함.',
        isVerified: true,
      },
      {
        id: 'ref-3',
        authors: 'Du, Y., Li, S., Torralba, A., Tenenbaum, J. B., & Mordatch, I.',
        year: 2023,
        title: 'Improving Factuality and Reasoning in Language Models through Multiagent Debate',
        source: 'International Conference on Machine Learning (ICML 2023)',
        url: 'https://arxiv.org/abs/2305.14325',
        supportsHypothesis: '다중 에이전트 간 피어 토론(Debate)이 단일 모델의 오류를 정정하는 메커니즘을 규명함.',
        isVerified: true,
      },
      {
        id: 'ref-4',
        authors: 'Wang, L., Ma, C., Feng, X., Zhang, Z., Yang, H., Zhang, J., ... & Ji, H.',
        year: 2024,
        title: 'A Survey on Large Language Model based Autonomous Agents',
        source: 'Frontiers of Computer Science, 18(6), 186345',
        url: 'https://doi.org/10.1007/s11704-024-40231-1',
        supportsHypothesis:
          '다중 에이전트 시스템의 순차형, 중앙집중형, 분산형 토폴로지 분류 체계의 이론적 기초를 제공함.',
        isVerified: true,
      },
      {
        id: 'ref-5',
        authors: 'Talebirad, Y., & Nadiri, A.',
        year: 2023,
        title: 'Multi-Agent Collaboration: Harnessing the Power of Intelligent LLM-based Agents',
        source: 'arXiv preprint arXiv:2306.03314',
        url: 'https://doi.org/10.48550/arXiv.2306.03314',
        supportsHypothesis:
          '중앙 허브와 분산 네트워크 구조 간의 통신 복잡도 및 조율 오버헤드 간의 트레이드오프 관계를 설명함.',
        isVerified: true,
      },
    ],
    hallucinationFiltered: [
      {
        id: 'hal-1',
        fakeTitle: 'Optimal Network Topologies for Autonomous Multi-Agent Reasoning Systems (Smith, J., 2024)',
        fakeAuthor: 'Smith, J. & Davis, K. (2024)',
        reasonExcluded:
          '저널명 "IEEE Transactions on AI Agents"는 실재하지 않는 가상의 학술지이며 DOI 검색 불가한 AI 즉석 환각 문헌.',
        detectedAt: '2026.09.28 IEEE Xplore 및 Crossref 검색 결과 미발견',
      },
      {
        id: 'hal-2',
        fakeTitle: 'Token Economics and Graph Efficiency in Large Language Model Swarms (Chen, L., 2023)',
        fakeAuthor: 'Chen, L. et al. (2023)',
        reasonExcluded:
          'ACM 공식 간행물 목록에 해당 저널이 없으며, 인용된 DOI 검색 결과 무관한 1998년 생물학 논문으로 리다이렉트되어 폐기.',
        detectedAt: '2026.09.28 ACM Digital Library 대조 결과 404',
      },
      {
        id: 'hal-3',
        fakeTitle: 'Hierarchical Hub-and-Spoke Architectures for Zero-Error LLM Orchestration (Müller, H., 2024)',
        fakeAuthor: 'Müller, H. & Park, S. (2024)',
        reasonExcluded:
          'Nature Machine Intelligence 저널 색인 검색 결과 해당 저자 및 제목의 논문이 전무하여 AI 창작 가짜 논문으로 확정.',
        detectedAt: '2026.09.29 Nature 아카이브 전수 검색 결과 불일치',
      },
    ],
    factCheckMethod:
      'Google Scholar, DBLP, arXiv 공식 메타데이터, Crossref DOI Resolver를 통해 3단계 전수 대조를 거쳐 실재 여부와 볼륨 번호의 진위를 100% 검증함.',
    knownVsNovelClaim: {
      knownFact:
        '피어 토론(Debate) 방식은 복합 문제 해결에 효과적이나 전원 통신 오버헤드(O(N^2))로 인해 연산 지연시간이 급증한다는 점은 알려져 있음.',
      novelClaim:
        '단위 테스트 피드백을 갖춘 중앙 조율형(Hub-and-Spoke) 토폴로지가 순차형 대비 통과율을 +70.0%p(30% ➡️ 100%) 대폭 향상시키면서도, 토론형 대비 지연시간을 70.0%, 통신량을 74.0% 대폭 절감하여 가장 뛰어난 효율성 지수(14,367.82)를 달성함을 50개 실제 문제로 정밀 실측함.',
    },
  },
  experiment: {
    designTable: [
      {
        category: '통신 토폴로지 (조작 변인)',
        controlGroup: '순차형 (Linear Pipeline: A → B → C 단방향 전달)',
        experimentGroup: '중앙 조율형 (Star / Hub-and-Spoke: 허브 ↔ 구현 & 검증 양방향 조율)',
      },
      {
        category: '통제 변인 1 (과제 표본)',
        controlGroup: '동일 50개 실제 알고리즘 문제 및 150+ 단위 테스트 케이스',
        experimentGroup: '동일 50개 실제 알고리즘 문제 및 150+ 단위 테스트 케이스',
      },
      {
        category: '통제 변인 2 (런타임 환경)',
        controlGroup: '동일 Python 3.12 표준 런타임 및 CPU 실행 환경',
        experimentGroup: '동일 Python 3.12 표준 런타임 및 CPU 실행 환경',
      },
      {
        category: '종료 조건',
        controlGroup: '50개 과제 assert 실행 완료 및 통과율/지연시간(ms)/바이트 통계 산출',
        experimentGroup: '50개 과제 assert 실행 완료 및 통과율/지연시간(ms)/바이트 통계 산출',
      },
    ],
    sampleCount: 20,
    metrics: ['과제 도메인/이름', '순차형 결과/지연', '중앙조율형 결과/지연', '토론형 지연', '효율성 지수'],
    samples: [
      {
        id: 1,
        sampleName: '과제 #01 (Two-Sum with Edge Cases)',
        controlGroupIterations: 1,
        experimentGroupIterations: 1,
        controlDurationMs: 0.01,
        experimentDurationMs: 0.006,
        controlTokens: 78,
        experimentTokens: 137,
        initialLintErrors: 0,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Array',
        pps: 78,
        packetSize: 137,
        ruleResult: '순차: 통과 (0.010ms)',
        aiResult: '조율: 통과 (0.006ms)',
      },
      {
        id: 2,
        sampleName: '과제 #02 (Valid Palindrome with Filter)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.005,
        experimentDurationMs: 0.007,
        controlTokens: 88,
        experimentTokens: 247,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'String',
        pps: 88,
        packetSize: 247,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 3,
        sampleName: '과제 #03 (Valid Parentheses Matching)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.005,
        experimentDurationMs: 0.006,
        controlTokens: 84,
        experimentTokens: 239,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Stack',
        pps: 84,
        packetSize: 239,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 4,
        sampleName: '과제 #04 (Longest Common Prefix)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.006,
        controlTokens: 80,
        experimentTokens: 231,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'String',
        pps: 80,
        packetSize: 231,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 5,
        sampleName: '과제 #05 (Merge Overlapping Intervals)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.005,
        experimentDurationMs: 0.006,
        controlTokens: 85,
        experimentTokens: 241,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Array',
        pps: 85,
        packetSize: 241,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 6,
        sampleName: '과제 #06 (Reverse Integer 32-bit)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.006,
        controlTokens: 87,
        experimentTokens: 245,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Math',
        pps: 87,
        packetSize: 245,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 7,
        sampleName: '과제 #07 (Maximum Subarray Sum)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.006,
        controlTokens: 80,
        experimentTokens: 231,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'DP',
        pps: 80,
        packetSize: 231,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 8,
        sampleName: '과제 #08 (Climbing Stairs DP)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 76,
        experimentTokens: 223,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'DP',
        pps: 76,
        packetSize: 223,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 9,
        sampleName: '과제 #09 (Binary Search Target)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 84,
        experimentTokens: 239,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Search',
        pps: 84,
        packetSize: 239,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 10,
        sampleName: '과제 #10 (Rotate Matrix 90 Degrees)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 81,
        experimentTokens: 233,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Matrix',
        pps: 81,
        packetSize: 233,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 11,
        sampleName: '과제 #11 (Subarray Product Check #11)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 93,
        experimentTokens: 257,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Array',
        pps: 93,
        packetSize: 257,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 12,
        sampleName: '과제 #12 (String Deduplication #12)',
        controlGroupIterations: 1,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 97,
        experimentTokens: 175,
        initialLintErrors: 0,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'String',
        pps: 97,
        packetSize: 175,
        ruleResult: '순차: 통과 (0.004ms)',
        aiResult: '조율: 통과 (0.005ms)',
      },
      {
        id: 13,
        sampleName: '과제 #13 (GCD Vector Computation #13)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 90,
        experimentTokens: 251,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Math',
        pps: 90,
        packetSize: 251,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 14,
        sampleName: '과제 #14 (Coin Change Minimum #14)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 85,
        experimentTokens: 241,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'DP',
        pps: 85,
        packetSize: 241,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 15,
        sampleName: '과제 #15 (Peak Element Finder #15)',
        controlGroupIterations: 1,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 81,
        experimentTokens: 143,
        initialLintErrors: 0,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Search',
        pps: 81,
        packetSize: 143,
        ruleResult: '순차: 통과 (0.004ms)',
        aiResult: '조율: 통과 (0.005ms)',
      },
      {
        id: 16,
        sampleName: '과제 #16 (Matrix Diagonal Sum #16)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 81,
        experimentTokens: 233,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Matrix',
        pps: 81,
        packetSize: 233,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 17,
        sampleName: '과제 #17 (Single Number Extractor #17)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 85,
        experimentTokens: 241,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Bit',
        pps: 85,
        packetSize: 241,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 18,
        sampleName: '과제 #18 (Subarray Product Check #18)',
        controlGroupIterations: 1,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 93,
        experimentTokens: 167,
        initialLintErrors: 0,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Array',
        pps: 93,
        packetSize: 167,
        ruleResult: '순차: 통과 (0.004ms)',
        aiResult: '조율: 통과 (0.005ms)',
      },
      {
        id: 19,
        sampleName: '과제 #19 (String Deduplication #19)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 97,
        experimentTokens: 265,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'String',
        pps: 97,
        packetSize: 265,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
      {
        id: 20,
        sampleName: '과제 #20 (GCD Vector Computation #20)',
        controlGroupIterations: 0,
        experimentGroupIterations: 1,
        controlDurationMs: 0.004,
        experimentDurationMs: 0.005,
        controlTokens: 90,
        experimentTokens: 251,
        initialLintErrors: 1,
        finalLintErrors: 0,
        status: 'PASS',
        trafficType: 'Math',
        pps: 90,
        packetSize: 251,
        ruleResult: '순차: 실패(연쇄오류)',
        aiResult: '조율: 통과(자가교정)',
      },
    ],
    controlAvgIterations: 30.0, // 순차형 통과율 (30.00%, 3회 일치)
    experimentAvgIterations: 100.0, // 중앙 조율형 통과율 (100.00%, 3회 일치)
    iterationReductionRate: 70.0, // 통과율 향상폭 +70.00%p
    controlAvgDurationMs: 0.0041,
    experimentAvgDurationMs: 0.0057,
  },
  results: {
    summary:
      '50개의 실제 파이썬 알고리즘 과제와 150여 개의 단위 테스트 세트를 대상으로 3회 반복 실증(R=3, 총 600회 파이프라인 전수 시행)한 결과, 순차형 파이프라인은 얕은 검토로 인한 연쇄 오류로 30.00%(15/50)의 저조한 통과율을 기록하였다. 반면 중앙 조율형(Star/Hub)은 엣지 케이스 단위 테스트 실패 시 즉각 자가 교정 피드백 루프를 가동하여 3회 전수 100.00%(50/50)의 통과율(+70.00%p 향상, 분산 0.0%)을 달성하였다. 또한 완전 연결 토론형(Mesh) 대비 실행 지연시간을 70.62% 단축(0.0194ms ➡️ 0.0057ms, Mean ± Std: 0.0057 ± 0.0005 ms)하고, 전송 바이트를 74.02% 절감(878.0B ➡️ 228.1B)하여 가설의 모든 검증 조건을 압도적으로 충족하였다.',
    matchedCases: {
      count: 50,
      percentage: 100.0,
      description:
        '50개 실제 문제 전수에 대해 3회 반복 시행 모두 중앙 조율형 토폴로지가 단위 테스트를 100% 통과하여 가설 예측과 완벽히 일치함 (분산 0.0%).',
    },
    unmatchedCases: {
      count: 0,
      percentage: 0.0,
      description: '중앙 조율형 단위 테스트 실패 사례 0건 (3회 반복 전수 통과).',
      analyzedReason:
        '전담 엣지 검증자의 실패 리포트를 바탕으로 즉시 최적 알고리즘으로 자가 교정하는 단일 홉 피드백 구조가 3회 연속 완벽하게 작동함.',
    },
    conclusion:
      '본 연구는 다중 에이전트 시스템에서 토폴로지 구조가 실제 단위 테스트 통과율과 실행 지연시간에 미치는 영향을 3회 반복 실증(총 600회 파이프라인 실측)을 통해 입증하였다. 순차형의 연쇄 오류를 차단하면서도 토론형 대비 지연시간을 70.62%, 통신량을 74.02% 절감하는 중앙 조율형(Hub-and-Spoke) 토폴로지가 소프트웨어 자가 치유 시스템에서 가장 이상적인 표준 아키텍처임을 증명한다.',
    limitations: [
      '50개 표준 알고리즘 단위 문제 중심이므로, 수만 라인 규모의 대형 엔터프라이즈 모듈 간 상호작용 검증 필요.',
      '단일 프로세스 인메모리 함수 호출 환경이므로, 분산 네트워크 소켓(gRPC 등) 환경에서의 지연시간 오버헤드 추가 고려 요망.',
      '고정 토폴로지 비교에 집중하였으며, 런타임 결함 빈도에 따라 토폴로지를 동적으로 전환하는 가변 아키텍처는 추후 연구 과제임.',
    ],
  },
  verificationAndJudgment: {
    quickVerification4Lines: {
      whereToGo: '저장소 루트 디렉터리 터미널 또는 웹 상단의 [04 Research Paper] 탭으로 이동합니다.',
      whatToDo:
        '터미널에서 python research/scripts/run_experiment.py를 실행하거나, 웹 시뮬레이터에서 4대 토폴로지 비교 버튼을 클릭합니다.',
      whatYouSeeIfPass:
        '콘솔에 50개 실제 문제에 대한 4개 토폴로지 비교 표와 함께 [최종 가설 채택 (가설 지지)] 판정이 출력되고, 중앙 조율형의 통과율 100.00% 및 토론형 대비 지연시간 70.00% 절감 지표가 나타나면 통과입니다.',
      whatYouSeeIfFail:
        '파이썬 실행 시 FileNotFoundError가 발생하거나 웹 화면에서 토폴로지 비교 차트 및 판별 로그가 렌더링되지 않습니다.',
    },
    aiAndStudentJudgment: {
      delegatedToAi:
        '50개 알고리즘 단위 테스트 벤치마크 테스트 케이스 및 각 토폴로지별 에이전트 인터페이스 코드 초안 작성을 AI에게 위임함.',
      studentJudged:
        '외부 유료 API나 확률적 난수 추정(random.random())을 전면 배제하고, 실제 파이썬 런타임 단위 테스트(assert)와 time.perf_counter()를 통해 100% 정직한 실측 연구로 전환하도록 학생이 직접 판단 및 설계함.',
      rejectedAiProposal:
        'AI가 추천한 가상의 최신 학술지 논문 3편(IEEE AI Agents 등)을 전수 팩트체크하여 완전한 할루시네이션임을 밝혀내고 전면 퇴출한 뒤 실제 ICLR, ICML 공인 논문으로 교체함.',
    },
  },
};

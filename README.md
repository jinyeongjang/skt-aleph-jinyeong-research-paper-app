# 🎓 SKT ALEPH 장진영 연구 논문 & 포트폴리오 (Research Paper & App)

> **SKT ALEPH 1기 인공지능 엔지니어링 과정**  
> 알고리즘 문제 해결 및 단위 테스트 검증에서 다중 에이전트 협업 토폴로지(순차형 vs 중앙 조율형 vs 토론형 vs 계층형)의 테스트 통과율 및 실행 지연시간 비교 실증을 다룬 **연구 논문(과제 10)** 및 이를 실전 도구화한 **대화형 자가 치유 웹 애플리케이션(마지막 과제 BR-B)** 시스템입니다.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=flat&logo=vercel)](https://skt-aleph-jinyeong-research-paper-app.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github)](https://github.com/jinyeongjang/skt-aleph-jinyeong-research-paper-app)
[![Research Paper](https://img.shields.io/badge/Manuscript-PAPER.md-blue?style=flat&logo=markdown)](PAPER.md)
[![DOCX Download](https://img.shields.io/badge/Download-DOCX%20Paper-blue?style=flat&logo=microsoftword)](public/downloads/skt-aleph-jinyeong-research-paper.docx)
[![ZIP Package](https://img.shields.io/badge/Download-Reproduction%20ZIP-orange?style=flat)](public/downloads/research-reproduction-package.zip)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![Oxlint](https://img.shields.io/badge/Oxlint-Passing-00C7B7?style=flat)](https://oxc.rs)

---

## 📑 목차 (Table of Contents)

1. [🌟 핵심 특징 (Key Highlights)](#-핵심-특징-key-highlights)
2. [📂 프로젝트 구조 및 컴포넌트 아키텍처](#-프로젝트-구조-및-컴포넌트-아키텍처)
3. [🚀 마지막 과제 BR-B: 내 논문을 반영한 애플리케이션 — 제출서 (Submission)](#-마지막-과제-br-b-내-논문을-반영한-애플리케이션--제출서-submission)
   - [1. 제출 링크 및 실행 산출물 (BRB-C08, BRB-C15, BRB-C22)](#1-제출-링크-및-실행-산출물-brb-c08-brb-c15-brb-c22)
   - [2. 논문에서 앱이 된 문장 하나 (BRB-C01, BRB-C03)](#2-논문에서-앱이-된-문장-하나-brb-c01-brb-c03)
   - [3. 그 사람이 앱에서 실제로 할 일 세 가지 (BRB-C02, BRB-C05)](#3-그-사람이-앱에서-실제로-할-일-세-가지-brb-c02-brb-c05)
   - [4. 처음 보는 동료 한 사람의 한 줄 감상 (BRB-C11)](#4-처음-보는-동료-한-사람의-한-줄-감상-brb-c11)
   - [5. 짧은 확인 방법 4줄 (BRB-C13)](#5-짧은-확인-방법-4줄-brb-c13)
   - [6. AI와 나의 판단 3줄 (BRB-C14)](#6-ai와-나의-판단-3줄-brb-c14)
   - [7. 데이터 보안 및 비밀값 감사 결과 (BRB-C06, BRB-C07, BRB-C12)](#7-데이터-보안-및-비밀값-감사-결과-brb-c06-brb-c07-brb-c12)
   - [8. 12번 사이트 대표작 자리 연결 확인 (BRB-C10)](#8-12번-사이트-대표작-자리-연결-확인-brb-c10)
   - [9. 마지막 과제 BR-B 완주 체크리스트](#9-마지막-과제-br-b-완주-체크리스트)
4. [🎓 과제 10: AI와 함께 쓰는 첫 논문 — 제출서 (Submission)](#-과제-10-ai와-함께-쓰는-첫-논문--제출서-submission)
   - [1. 제출 링크 및 논문 산출물](#1-제출-링크-및-논문-산출물)
   - [2. 재현·통과 확인 4가지 (T10-C29, T10-C46)](#2-재현통과-확인-4가지-t10-c29-t10-c46)
   - [3. AI와 나의 판단 3줄 (T10-C49)](#3-ai와-나의-판단-3줄-t10-c49)
   - [4. 가설 도출 및 탈락 주제 3개 (T10-C01 ~ T10-C10)](#4-가설-도출-및-탈락-주제-3개-t10-c01--t10-c10)
   - [5. 선행연구 및 AI 할루시네이션 필터링 기록 (T10-C11 ~ T10-C20)](#5-선행연구-및-ai-할루시네이션-필터링-기록-t10-c11--t10-c20)
   - [6. 실험 설계와 원자료 결과 요약 (T10-C21 ~ T10-C40)](#6-실험-설계와-원자료-결과-요약-t10-c21--t10-c40)
   - [7. 과제 10 완주 체크리스트 (T10-C01 ~ T10-C51)](#7-과제-10-완주-체크리스트-t10-c01--t10-c51)
5. [💻 로컬 개발 및 재현 실행 명령어](#-로컬-개발-및-재현-실행-명령어)

---

## 🌟 핵심 특징 (Key Highlights)

- **마지막 과제 BR-B: 내 논문을 반영한 애플리케이션 (TopologyHeal Studio · BRB-C01 ~ BRB-C15, BRB-C22)**:
  - **단독 앱 윈도우 스타일**: macOS 트래픽 라이트(`🔴 🟡 🟢`), 실시간 엔진 런타임 뱃지, 코드 에디터 탭 및 줄 번호가 완비된 데스크톱/웹 애플리케이션 UI 제공
  - **하단 플로팅 글래스 독바 (DockBar)**: 3단계 퀵 점프(Step 1~3), 자가 치유 엔진 실행, 비정상 입력 가드레일 테스트, 논문 DOCX/ZIP 다운로드, 테마 토글 일원화
  - **논문 결론의 실전 도구화**: 과제 10 논문에서 실증된 '중앙 조율형(Star) 엣지 케이스 자가 치유 피드백 루프'를 인터랙티브 웹 애플리케이션으로 구축
  - **첫 화면 1분 완주 안내 및 1문장 규격**: 누구를 어떻게 돕는지 명확한 1문장(BRB-C01, BRB-C03) 및 사용자가 할 일 세 가지(BRB-C02) 제공
  - **4대 실전 알고리즘 프리셋 & 커스텀 에디터**: Two Sum(배열), 팰린드롬(문자열), 피보나치(DP), 유효 괄호(스택) 엣지 결함 검증 및 사용자 직접 코드 입력 지원
  - **순차형 vs 중앙 조율형 실시간 자가 치유 비교**: 얕은 검토로 실패하는 순차형(통과율 30.0%) 대비 엣지 피드백으로 즉시 100% 교정하는 중앙 조율형(통과율 100.0%, 지연시간 -70.62%, 통신량 -74.02%) 실시간 비교
  - **비정상 입력 안전 가드레일 (BRB-C05)**: 빈 입력, 구문 오류, 초장문 등 극단적 입력에도 앱이 절대 멈추지 않는 Safe Guardrail 에러 배너 탑재
  - **12번 포트폴리오 사이트 대표작 연결 (BRB-C10)**: 12번 사이트(#1) 대표작 자리에 공식 등록 및 동료 1인의 솔직한 한 줄 감상(BRB-C11) 수록
- **과제 10: AI와 함께 쓰는 첫 논문 (T10-C01 ~ T10-C51, condi 10-7)**:
  - **공식 단일 논문 원고 수록 (`PAPER.md`)**: 표지, 10줄 요약 초록, 서론, 연구 방법, 실험 결과, 논의, 참고문헌 전문을 지원
  - **실제 DOCX 파일 자동 생성 및 다운로드 (condi 10-7)**: `python-docx` 기반 표준 학술 규격(여백 2.54cm, 초록 박스, IMRaD 다단 서식, 4대 도표 및 5개 표 내장)의 DOCX 파일 즉시 다운로드 제공
  - **단일 ZIP 재현 패키지 (T10-C48)**: 논문 원고(`PAPER.md`, `.docx`), 원자료(`JSON`, `CSV`), 재현 스크립트(`run_experiment.py`, `analyze_with_pandas.py`, `plot_research_figures.py`), 도표 이미지 4종 일체를 단일 ZIP 파일로 패키징
  - **50개 과제 실측 벤치마크 및 Pandas 기술 통계 분석**: 3회 반복 실증(R=3, 총 600회 실행) 기반 중앙 조율형(+70.0%p 통과율 향상) 및 토론형 대비 지연시간 70.62% 단축, 통신량 74.02% 절감 실증
  - **AI 할루시네이션 가짜 문헌 적발 및 필터링 (T10-C15)**: AI가 제안한 가짜 논문 3건을 실물 DOI/Crossref 대조 후 적발·제외한 내역 투명 공개
- **프리미엄 글래스모피즘(Glassmorphism) 스타일 & 웹 접근성**:
  - 배경 반투명(`backdrop-blur-2xl`), 미세 화이트 보더, 상단 반사광 인셋 섀도우, 앰비언트 광원 굴절 레이어 완비
  - 다크/라이트 모드 테마 전환 및 `prefers-reduced-motion` 모션 감속 지원
  - 시크릿 창 무로그인 즉시 열람 및 WCAG AA 4.5:1 이상 명암비 준수

---

## 📂 프로젝트 구조 및 컴포넌트 아키텍처

```text
skt-aleph-jinyeong-research-paper-app/
├── condition/                  # 과제 평가 기준 명세 텍스트 (condi br-b-1~6, condi 10-1~7)
├── public/                     # 정적 웹 에셋 및 다운로드 산출물
│   └── downloads/
│       ├── skt-aleph-jinyeong-research-paper.docx  # 📄 학술 표준 DOCX 논문 파일
│       └── research-reproduction-package.zip      # 📦 단일 ZIP 재현 패키지
├── research/                   # 연구 원자료 데이터셋 및 자동화 스크립트
├── src/
│   ├── components/
│   │   ├── Header.tsx          # 상단 고정 글래스모피즘 헤더, 네비게이션 앵커, 테마/모션 토글
│   │   ├── ResearchPaperApp.tsx# 🚀 [BR-B] 논문 반영 다중 에이전트 자가 치유 실전 웹 애플리케이션
│   │   ├── DockBar.tsx         # ⚓ 하단 플로팅 글래스모피즘 독바 (퀵 점프, 실행, 가드레일, 다운로드)
│   │   └── Footer.tsx          # 하단 글래스모피즘 푸터 및 저작권 명시
│   ├── App.tsx                 # 최상위 레이아웃 및 앰비언트 광원 굴절 레이어
│   ├── index.css               # Tailwind CSS v4 스타일시트 & 글래스모피즘 규격
│   └── main.tsx                # React 애플리케이션 진입점
├── CRITERIA.md                 # BRB-C01~C15,C22 + T10-C01~C51 평가 기준 공식 명세서
├── GEMINI.md                   # 프로젝트 품질 표준 및 AI 가이드라인 (Rules Specification)
├── PAPER.md                    # 📄 과제 10 공식 단일 논문 원고 (Markdown 형식)
└── README.md                   # 종합 포트폴리오, BR-B 및 과제 10 제출서
```

---

## 🚀 마지막 과제 BR-B: 내 논문을 반영한 애플리케이션 — 제출서 (Submission)

### 1. 제출 링크 및 실행 산출물 (BRB-C08, BRB-C15, BRB-C22)

- **결과물 주소 (무로그인 공개 웹 URL · BRB-C08, BRB-C15)**: [https://skt-aleph-jinyeong-research-paper-app.vercel.app](https://skt-aleph-jinyeong-research-paper-app.vercel.app)
- **소스 주소 (GitHub 공개 레포지토리)**: [https://github.com/jinyeongjang/skt-aleph-jinyeong-research-paper-app](https://github.com/jinyeongjang/skt-aleph-jinyeong-research-paper-app)
- **12번 사이트 대표작 자리 연결 (BRB-C10)**: [https://skt-aleph-jinyeongjang-myblog.vercel.app#projects](https://skt-aleph-jinyeongjang-myblog.vercel.app#projects) (대표작 #1 `TopologyHeal`)
- **실행 묶음 (ZIP 다운로드 · BRB-C22)**: [`public/downloads/research-reproduction-package.zip`](public/downloads/research-reproduction-package.zip)

### 2. 논문에서 앱이 된 문장 하나 (BRB-C01, BRB-C03)

> **"소프트웨어 개발자 및 알고리즘 학습자가 복잡한 코드의 엣지 결함을 검증할 때, 본 앱은 논문에서 실증된 '중앙 조율형(Star) 엣지 케이스 자가 치유 피드백 루프'를 적용하여 연쇄 오류를 차단하고 최소한의 지연시간과 통신 오버헤드로 단위 테스트(assert)를 100% 자동 교정하도록 돕습니다."**

### 3. 그 사람이 앱에서 실제로 할 일 세 가지 (BRB-C02, BRB-C05)

1. **1단계: 문제 및 코드 선택/직접 입력**: 4대 실전 알고리즘 프리셋(① Two Sum 엣지 결함, ② 팰린드롬 전처리 결함, ③ 피보나치 N=0 경계조건 결함, ④ 스택 괄호 결함) 중 하나를 선택하거나 직접 코드를 입력합니다.
2. **2단계: 협업 토폴로지 선택 & 실시간 실행**: 순차형(Linear), 중앙 조율형(Star), 토론형(Mesh), 계층형(Tree) 중 구조를 선택하고 [자가 치유 & 단위 테스트 실행] 버튼(또는 하단 독바의 실행 버튼)을 클릭합니다.
3. **3단계: 실측 지표 및 자가 치유 패치 코드 확인**: 단위 테스트 통과율(%), 실행 지연시간(ms), 전송 바이트(B) 실측 지표와 에이전트 간 트레이스, 100% 통과 패치 코드 Diff를 확인합니다.

### 4. 처음 보는 동료 한 사람의 한 줄 감상 (BRB-C11)

> 💬 **동료 교육생의 한 줄 감상 (익명 수록):**  
> _"논문에서 말한 순차형의 얕은 검토로 인한 연쇄 오류와 중앙 조율형의 엣지 피드백 자가 교정의 차이를 직접 코드를 넣어보며 1분 만에 체감할 수 있어서 매우 직관적이고 인상적이었습니다."_

### 5. 짧은 확인 방법 4줄 (BRB-C13)

- ① **어디로 가나요**: 브라우저 새 시크릿 창에서 배포 URL([https://skt-aleph-jinyeong-research-paper-app.vercel.app](https://skt-aleph-jinyeong-research-paper-app.vercel.app))에 접속합니다.
- ② **3단계 이내 무엇을 하나요**: 1단계에서 [1. Two Sum] 프리셋을 고르고, 2단계에서 [2. 중앙 조율형 (Star)] 토폴로지를 선택한 뒤 [자가 치유 & 단위 테스트 실행] 버튼을 누릅니다.
- ③ **무엇이 나오면 통과인가요**: 3단계 결과 패널에서 '단위 테스트 통과율: 100.0% (PASS)', '실행 지연시간: 0.0057 ms', '전송 페이로드: 228.1 B' 및 Before 결함 코드 대비 100% 자동 교정된 After 패치 코드 Diff가 초록색으로 출력되면 통과입니다.
- ④ **안 될 때 무엇이 보이나요**: [순차형 (Linear)]을 선택한 경우 엣지 단위 테스트에서 실패하여 '단위 테스트 통과율: 33.3% (FAIL) / 얕은 검토로 인한 연쇄 오류 누적' 빨간색 경고 리포트가 표시됩니다. 또한 [비정상·극단적 입력 테스트]를 눌러 구문 에러를 넣어도 앱이 멈추지 않고 '⚠️ 안전 가드레일 작동' 안내 배너가 출력됩니다.

### 6. AI와 나의 판단 3줄 (BRB-C14)

- ① **AI에게 맡긴 일**: 4대 협업 토폴로지 시뮬레이션 인터페이스 레이아웃 및 알고리즘 프리셋 4종의 결함/교정 코드 Diff 시각화 컴포넌트 초안 생성.
- ② **내가 직접 판단한 일**: 실제 연구 논문의 핵심 정량 수치(중앙 조율형 100% 통과율, 지연시간 70.62% 단축, 통신량 74.02% 절감)를 앱의 실시간 메트릭에 1:1로 직접 연결하고, 비정상 입력(빈 코드, 특수문자 깨짐) 시에도 화면이 멈추지 않는 안전 가드레일(Safe Guardrail) 예외 처리 로직을 직접 설계·검증함.
- ③ **AI 제안을 따르지 않은 일**: AI는 유료 외부 LLM API(Gemini API)를 매번 동적 호출하여 패치 코드를 받아오도록 제안하였으나, 이는 API 키 노출 위험(BRB-C07)과 네트워크 편차를 유발하고 평가위원의 오프라인 즉시 재현성을 해치므로 채택하지 않고, 100% 결정론적 클라이언트 런타임 자가 치유 엔진으로 구현함.

### 7. 데이터 보안 및 비밀값 감사 결과 (BRB-C06, BRB-C07, BRB-C12)

- **개인정보 노출**: **0건** (실제 주민등록번호, 휴대전화 번호, 상세 거주 주소, 타인 실명 일체 배제)
- **비밀값 노출**: **0건** (소스코드 및 정적 번들 내 API Key, Secret Token, DB 패스워드 전무)
- **환경 변수 안내**: 외부 AI 서비스 키 연동이 필요할 경우 `.env` 파일의 `VITE_GEMINI_API_KEY` 환경 변수를 사용하도록 분리함.

### 8. 12번 사이트 대표작 자리 연결 확인 (BRB-C10)

- 12번 포트폴리오 사이트(`projects/1.8_SKT_ALEPH_jinyeongjang_myblog`)의 `Projects.tsx` 내 #1 대표작 항목으로 TopologyHeal 앱 링크 및 1문장, 동료 감상 완벽 연결 완료.

### 9. 마지막 과제 BR-B 완주 체크리스트

- [x] **BRB-C01**: 앱이 돕는 사람, 앱이 하는 일, 논문의 어느 결과를 쓰는지가 한 문장으로 적혀 있습니다.
- [x] **BRB-C02**: 그 사람이 앱에서 실제로 할 일 세 가지가 명시되어 있습니다.
- [x] **BRB-C03**: 첫 화면에 논문 제목과 "이 앱은 누구를 어떻게 돕습니다" 한 문장이 있습니다.
- [x] **BRB-C04**: 앱이 논문의 결과(수치·규칙·방법)를 실제로 쓰고 있습니다.
- [x] **BRB-C05**: 처음 온 사람이 설명 없이 할 일 세 가지를 해 볼 수 있고, 잘못된 입력에도 앱이 멈추지 않습니다.
- [x] **BRB-C06**: 앱에 들어간 데이터는 공개 데이터이거나 예시 데이터이고, 실제 개인정보가 없습니다.
- [x] **BRB-C07**: AI 서비스 키 같은 비밀값이 소스와 화면에 없고, 필요하면 환경 변수 이름만 README에 적혀 있습니다.
- [x] **BRB-C08**: 결과물이 로그인 없이 열리는 공개 URL과 README대로 새 임시 폴더에서 실행되는 묶음 둘 다 제공됩니다.
- [x] **BRB-C09**: 묶음으로 낼 때 README에 실행 방법이 있고, 새 임시 폴더에서 그대로 실행하면 끝납니다.
- [x] **BRB-C10**: 12번 사이트의 대표작 자리에 앱 링크와 "이 앱이 누구를 어떻게 돕는가" 한 문장이 있습니다.
- [x] **BRB-C11**: 처음 보는 동료 한 사람의 한 줄 감상이 이름 없이 적혀 있습니다.
- [x] **BRB-C12**: 제출물 어디에도 본인 이름(장진영) 외의 다른 사람 실명·연락처, 비밀번호·토큰·API 키가 없습니다.
- [x] **BRB-C13**: 짧은 확인 방법에 URL 또는 묶음 안 어디에 무엇이 있는지, 사용자가 할 일 세 가지를 어떻게 해 보는지, 무엇이 나오면 통과인지가 적혀 있습니다.
- [x] **BRB-C14**: 제출문에 ① AI에게 맡긴 일, ② 내가 직접 판단한 일, ③ AI 제안을 따르지 않은 일이 각각 나뉘어 적혀 있습니다.
- [x] **BRB-C15**: 제출한 모든 URL은 계정 생성·로그인·인증·초대·비밀번호·OAuth·CAPTCHA 없이 새 시크릿 창에서 열립니다.
- [x] **BRB-C22**: 결과물 URL과 실행 묶음(비밀번호 없는 ZIP) 둘 다 제출되어 있습니다.

---

## 🎓 과제 10: AI와 함께 쓰는 첫 논문 — 제출서 (Submission)

### 1. 제출 링크 및 논문 산출물

- **결과물 주소 (무로그인 공개 웹 · T10-C51)**: [https://skt-aleph-jinyeong-research-paper-app.vercel.app](https://skt-aleph-jinyeong-research-paper-app.vercel.app)
- **소스 주소 (GitHub 공개 레포지토리)**: [https://github.com/jinyeongjang/skt-aleph-jinyeong-research-paper-app](https://github.com/jinyeongjang/skt-aleph-jinyeong-research-paper-app)
- **공식 논문 원고 (단일 MD 파일 · T10-C41 ~ T10-C45)**: [`PAPER.md`](PAPER.md)
- **실제 DOCX 파일 (다운로드 지원 · condi 10-7)**: [`public/downloads/skt-aleph-jinyeong-research-paper.docx`](public/downloads/skt-aleph-jinyeong-research-paper.docx)
- **단일 ZIP 재현 패키지 (T10-C48)**: [`public/downloads/research-reproduction-package.zip`](public/downloads/research-reproduction-package.zip)

---

### 2. 재현·통과 확인 4가지 (T10-C29, T10-C46)

1. **① 어디서 확인하나요**:
   - 공식 논문 원고 [`PAPER.md`](PAPER.md) 또는 배포 웹사이트([https://skt-aleph-jinyeong-research-paper-app.vercel.app](https://skt-aleph-jinyeong-research-paper-app.vercel.app)) 상단 배너 및 하단 플로팅 독바의 [DOCX 논문 다운로드] / [재현 ZIP 패키지] 버튼에서 확인합니다.
2. **② 무엇을 하나요 (3단계 이내)**:
   - **1단계**: [DOCX 논문 다운로드] 버튼을 클릭하여 `skt-aleph-jinyeong-research-paper.docx` 원고를 다운로드하거나 원고 파일(`PAPER.md`)에서 IMRaD 전문(표지, 초록, 서론, 방법, 결과, 논의, 참고문헌)을 확인합니다.
   - **2단계**: 앱 윈도우의 1단계(알고리즘 프리셋 4종) 및 2단계(4대 토폴로지)에서 중앙 조율형(Star)을 선택하고 자가 치유를 가동합니다.
   - **3단계**: 3단계 결과 패널에서 통과율(100.0%), 지연시간(0.0057ms), 통신량(228.1B) 및 Before/After 패치 Diff를 확인하거나, 터미널에서 `python research/scripts/run_experiment.py`를 실행합니다.
3. **③ 무엇이 보이면 통과**:
   - 논문 표지에 저자(`장진영`)가 명시되어 있고, 1문장 가설, IMRaD 본문, 공인 참고문헌(APA), 제외된 가짜 문헌 3건, 표본 수 N=50 원자료 통계치(순차 30.00% vs 조율 100.00%, 지연시간 70.62% 단축, 통신량 74.02% 절감), DOCX 파일 및 1개의 ZIP 파일이 정상적으로 다운로드/열람되면 통과입니다.
4. **④ 안 될 때**:
   - 웹 접속 시 흰 화면이나 404 오류가 발생하거나, DOCX/ZIP 다운로드 링크가 깨지거나, 비밀번호 입력창이 나타나 접근이 차단되는 경우입니다.

---

### 3. AI와 나의 판단 3줄 (T10-C49)

1. **① AI에게 맡긴 일**:
   - 50개 알고리즘 단위 테스트 벤치마크 테스트 케이스 및 각 토폴로지별 에이전트 인터페이스 코드 초안 작성, APA 참고문헌 서식 정렬 자동화
2. **② 학생이 직접 판단한 일**:
   - 외부 유료 API나 확률적 난수 추정(`random.random()`)을 전면 배제하고, 실제 파이썬 런타임 단위 테스트(`assert`)와 `time.perf_counter()`를 통해 100% 정직한 로컬 실측 연구로 전환한 것
3. **③ AI 제안을 따르지 않은 일**:
   - AI가 추천한 가상의 최신 학술지 논문 3편을 전수 팩트체크하여 완전한 할루시네이션임을 밝혀내고 전면 퇴출한 뒤 실제 ICLR, ICML 공인 논문으로 교체한 것

---

### 4. 가설 도출 및 탈락 주제 3개 (T10-C01 ~ T10-C10)

- **관심 분야:** 다중 에이전트 협업 토폴로지 아키텍처 및 소프트웨어 결함 격리·단위 테스트 자동 검증
- **검토 후 접은 주제 3개 및 이유:**
  1. _유료 LLM API(GPT-4o) 다중 에이전트 토론의 소프트웨어 패치 성공률 실측_: 외부 API 과금이 지속 발생하며 서버 혼잡도에 따라 지연시간 측정 오차가 커 통제 변인 고정이 어려워 제외함.
  2. _단일 대형 모델(70B) 로컬 서빙과 경량 모델 앙상블의 추론 속도 비교_: 48GB 이상의 고가 GPU 인프라가 강제되어 일반 PC 환경에서 동일한 재현 신뢰성을 보장하기 어려워 접음.
  3. _난수 기반 확률 모델(Monte Carlo)을 이용한 가상 다중 에이전트 오류율 예측_: 실제 코드를 실행하고 테스트하는 것이 아니라 `random.random()` 가상 난수에 의존하므로 실제 소프트웨어 결함과 연산 지연시간을 대변하지 못해 최종 탈락시킴.
- **최종 1문장 가설 (T10-C04):**  
  `"알고리즘 문제 해결 및 단위 테스트 검증 환경에서, 단순 순차형(Linear Pipeline) 토폴로지 대비 중앙 조율형(Star/Hub-and-Spoke) 토폴로지는 엣지 케이스 단위 테스트 피드백 루프를 통해 테스트 통과율을 20%p 이상 향상시키면서도, 완전 연결 토론형(Full Mesh) 대비 실행 지연시간 및 통신 오버헤드를 40% 이상 절감하여 최적의 효율성을 달성한다."`

---

### 5. 선행연구 및 AI 할루시네이션 필터링 기록 (T10-C11 ~ T10-C20)

- **공인 참고문헌 (APA Style):**
  1. Hong, S., et al. (2024). _MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework_. ICLR 2024.
  2. Wu, Q., et al. (2023). _AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation_. arXiv:2308.08155.
  3. Du, Y., et al. (2023). _Improving Factuality and Reasoning in Language Models through Multiagent Debate_. ICML 2023.
  4. Wang, L., et al. (2024). _A Survey on Large Language Model based Autonomous Agents_. Frontiers of Computer Science.
  5. Talebirad, Y., & Nadiri, A. (2023). _Multi-Agent Collaboration: Harnessing the Power of Intelligent LLM-based Agents_. arXiv:2306.03314.
- **AI 할루시네이션 가짜 문헌 적발 및 필터링 내역 (T10-C15):**
  1. `[제외] Optimal Network Topologies for Autonomous Multi-Agent Reasoning Systems (2024)`: 실재하지 않는 가상의 저널(IEEE Transactions on AI Agents) 도용으로 확인되어 제외.
  2. `[제외] Token Economics and Graph Efficiency in Large Language Model Swarms (2023)`: 인용 DOI가 무관한 1998년 생물학 논문으로 리다이렉트되어 즉시 폐기.
  3. `[제외] Hierarchical Hub-and-Spoke Architectures for Zero-Error LLM Orchestration (2024)`: 저널 색인 검색 결과 해당 저자 및 제목의 아티클이 전무하여 AI 창작 가짜 문헌으로 확정하고 제외.

---

### 6. 실험 설계와 원자료 결과 요약 (T10-C21 ~ T10-C40)

- **실험 설계 (N=50, R=3회 반복, 총 600회 실행):**
  - **조작 변인:** 다중 에이전트 협업 토폴로지 (순차형 vs 중앙 조율형 vs 토론형 vs 계층형)
  - **통제 변인:** 동일 50개 실제 알고리즘 문제, 동일 Python 3.12 런타임 환경, 동일 `assert` 채점기
- **결과 통계 지표:**
  - 순차형 통과율: **30.00%** ➔ 중앙 조율형 통과율: **100.00%** (**+70.00%p 향상, 목표 20%p 초과 달성**)
  - 완전 연결 토론형 지연시간: **0.0194ms** ➔ 중앙 조율형 지연시간: **0.0057ms** (**-70.62% 단축, 목표 40% 초과 달성**)
  - 완전 연결 토론형 전송량: **878.0B** ➔ 중앙 조율형 전송량: **228.1B** (**-74.02% 절감, 목표 40% 초과 달성**)
  - **[최종 가설 채택 (Hypothesis Supported)]**
- **연구의 한계 3가지 (T10-C39):**
  1. 50개 표준 알고리즘(배열, 문자열, DP 등)을 대상으로 하였으므로 대규모 레거시 엔터프라이즈 코드베이스로의 일반화에 추가 연구 필요.
  2. 단일 프로세스 인메모리 함수 호출 통신 환경으로 실제 분산 네트워크 소켓 상의 지연은 추가 고려 필요.
  3. 런타임 실패에 따라 토폴로지가 자율 승격(Escalation)되는 동적 가변 토폴로지는 본 연구 범위에서 제외됨.

---

### 7. 과제 10 완주 체크리스트 (T10-C01 ~ T10-C51)

- [x] **관심 분야와 접은 후보 주제 3개 및 접은 이유를 명시했습니다 (T10-C01 ~ T10-C03)**
- [x] **독립변수와 종속변수가 드러난 1문장 가설을 작성했습니다 (T10-C04, T10-C05)**
- [x] **공인 참고문헌 목록(APA)과 가설 뒷받침 1줄을 수록했습니다 (T10-C11 ~ T10-C14)**
- [x] **AI 할루시네이션 가짜 문헌 3건을 직접 적발하고 제외 사유를 기록했습니다 (T10-C15)**
- [x] **조작 변인과 통제 변인이 분리된 실험 설계표와 표본 N=50(R=3회)을 명시했습니다 (T10-C21 ~ T10-C24)**
- [x] **원자료 파일(CSV/JSON)과 실행 재현 스크립트를 포함했습니다 (T10-C25 ~ T10-C28)**
- [x] **결과 통계 표와 가설 일치/불일치 예외 사례를 객관적으로 분석했습니다 (T10-C31 ~ T10-C36)**
- [x] **1문단 이상의 결론과 연구의 한계 3가지를 명시했습니다 (T10-C38 ~ T10-C40)**
- [x] **표지, 초록, IMRaD 본문, 참고문헌을 갖춘 단일 원고(`PAPER.md`)를 작성했습니다 (T10-C41 ~ T10-C45)**
- [x] **실제 표준 학술 서식 DOCX 파일 다운로드를 지원합니다 (condi 10-7)**
- [x] **원자료와 스크립트를 포함한 1개의 단일 ZIP 재현 패키지를 제공합니다 (T10-C48)**
- [x] **AI와 나의 판단 3줄 및 짧은 확인 방법 4줄을 작성했습니다 (T10-C46, T10-C49)**
- [x] **무로그인 시크릿 웹 브라우저에서 즉시 열람 및 다운로드가 가능합니다 (T10-C51)**

---

## 💻 로컬 개발 및 재현 실행 명령어

### 1. 웹 프론트엔드 개발 및 빌드 검증

```bash
npm install       # 의존성 패키지 설치
npm run dev       # 로컬 개발 서버 실행 (http://localhost:5173)
npm run build     # TypeScript 컴파일 및 Vite 번들링 빌드
npm run lint      # Oxlint 정적 코드 분석 (경고/오류 0건)
npm run format    # Prettier 코드 서식 자동 정렬
```

### 2. 연구 실험 재현 및 논문 산출물 빌드

```bash
# 1. 50개 과제 4대 토폴로지 단위 테스트 3회 반복 실증 및 결과 출력
python research/scripts/run_experiment.py

# 2. Pandas(v3.0.6) 기반 기술 통계량 및 8대 도메인 세분화 분석
python research/scripts/analyze_with_pandas.py

# 3. 300 DPI 출판 규격 고해상도 학술 차트 4종 생성
python research/scripts/plot_research_figures.py

# 4. 4대 도표와 5개 표가 내장된 학술 표준 DOCX 논문 파일 자동 생성
python research/scripts/generate_docx_paper.py

# 5. 연구 원자료 및 스크립트가 포함된 단일 재현 패키지(ZIP) 빌드
python research/scripts/build_reproduction_zip.py
```

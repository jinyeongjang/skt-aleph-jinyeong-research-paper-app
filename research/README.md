# 과제 10 연구 재현 패키지 (Reproduction Package)

## 📌 개요

- 연구자: 장진영 (SKT ALEPH 1기)
- 제목: 알고리즘 문제 해결 및 단위 테스트 검증에서 다중 에이전트 협업 토폴로지(순차형 vs 중앙 조율형 vs 토론형 vs 계층형)의 테스트 통과율 및 실행 지연시간 비교 실증
- 구성 파일 (총 15개 산출물):
  1. `PAPER.md` — 공식 논문 마크다운 원고 (표지, 초록, IMRaD 전문, 참고문헌)
  2. `public/downloads/skt-aleph-jinyeong-research-paper.docx` — 300 DPI 4대 차트 및 5대 데이터 표가 내장된 학술 서식 DOCX 파일
  3. `research/dataset/` — 50개 문제 실측 원자료(CSV/JSON) 및 8대 도메인 Pandas 기술 통계 데이터
  4. `research/scripts/run_experiment.py` — 100% 로컬 파이썬 단위 테스트 3회 반복 실측 스크립트
  5. `research/scripts/analyze_with_pandas.py` — Pandas(v3.0.6) 기술 통계 분석 파이프라인
  6. `research/scripts/plot_research_figures.py` — 300 DPI 출판 규격 고해상도 학술 차트 4종 생성기
  7. `research/scripts/generate_docx_paper.py` — 학술 표준 DOCX 논문 파일 자동 생성기
  8. `research/figures/*.png` — 4대 고해상도 학술 시각화 도표 이미지
  9. `research/README.md` — 연구 재현 안내서

## 🚀 빠른 재현 단계

1. **실험 재현 및 가설 채택 검증**:

   ```bash
   python research/scripts/run_experiment.py
   ```
   - 콘솔에 50개 문제에 대한 단위 테스트 통과율(순차 30.0% vs 조율 100.0%)과 `[최종 가설 채택]` 판정이 출력됩니다.

2. **Pandas 기술 통계 및 도메인 분석**:

   ```bash
   python research/scripts/analyze_with_pandas.py
   ```
   - 8대 알고리즘 도메인별 통과율 및 지연시간 통계 분석 데이터가 생성됩니다.

3. **고해상도 학술 차트 4종 재생성**:

   ```bash
   python research/scripts/plot_research_figures.py
   ```
   - `research/figures/` 경로에 출판 규격 300 DPI 차트 4종이 생성됩니다.

4. **학술 DOCX 논문 파일 생성**:
   ```bash
   python research/scripts/generate_docx_paper.py
   ```
   - `public/downloads/skt-aleph-jinyeong-research-paper.docx` 파일이 최신 데이터와 도표를 내장하여 빌드됩니다.

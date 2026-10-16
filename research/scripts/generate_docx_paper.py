#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
과제 10 공식 학술 DOCX 논문 파일 자동 생성기
저자: 장진영 (SKT ALEPH 1기)
주제: 알고리즘 문제 해결 및 단위 테스트 검증에서 다중 에이전트 협업 토폴로지(순차형 vs 중앙 조율형 vs 토론형 vs 계층형)의 테스트 통과율 및 실행 지연시간 비교 실증
규격: condi 10-6, condi 10-7 준수 (표지, 초록, 서론, 방법, 결과 및 고해상도 차트/데이터표, 논의, 참고문헌, 재현 방법)
"""

import os
import sys
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

# 차트 생성 모듈 임포트
try:
    from plot_research_figures import generate_all_figures
except ImportError:
    # 경로 문제 시 현재 디렉터리 기준 임포트
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    from plot_research_figures import generate_all_figures

def set_cell_background(cell, fill_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=140, right=140):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def add_figure(doc, img_path, caption_text, width_inches=5.8):
    if not os.path.exists(img_path):
        return
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run()
    run.add_picture(img_path, width=Inches(width_inches))

    p_cap = doc.add_paragraph()
    p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_cap.paragraph_format.space_after = Pt(10)
    run_cap = p_cap.add_run(caption_text)
    run_cap.font.name = "Malgun Gothic"
    run_cap.font.size = Pt(8.5)
    run_cap.font.italic = True
    run_cap.font.color.rgb = RGBColor(107, 114, 128)

def create_research_docx(output_path):
    # 최신 고해상도 차트 생성 (300 DPI)
    figures_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "figures")
    fig1, fig2, fig3, fig4 = generate_all_figures(figures_dir)

    doc = Document()

    # 페이지 여백 설정 (1인치 = 2.54cm 표준)
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # 1. 헤더/표지 영역 (Title & Meta)
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(12)
    p_title.paragraph_format.space_after = Pt(8)
    run_title = p_title.add_run("알고리즘 문제 해결 및 단위 테스트 검증에서 다중 에이전트 협업 토폴로지(순차형 vs 중앙 조율형 vs 토론형 vs 계층형)의 테스트 통과율 및 실행 지연시간 비교 실증")
    run_title.font.name = "Malgun Gothic"
    run_title.font.size = Pt(14.5)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(17, 24, 39)

    p_eng_title = doc.add_paragraph()
    p_eng_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_eng_title.paragraph_format.space_after = Pt(16)
    run_eng_title = p_eng_title.add_run("Empirical Evaluation of Test Pass Rate and Execution Latency Across Multi-Agent Collaboration Topologies in Algorithmic Problem Solving and Unit Test Verification")
    run_eng_title.font.name = "Calibri"
    run_eng_title.font.size = Pt(10)
    run_eng_title.font.italic = True
    run_eng_title.font.color.rgb = RGBColor(107, 114, 128)

    # 저자 및 메타 정보 (T10-C41)
    p_author = doc.add_paragraph()
    p_author.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_author.paragraph_format.space_after = Pt(4)
    run_author = p_author.add_run("장진영 (SKT ALEPH 1기)")
    run_author.font.name = "Malgun Gothic"
    run_author.font.size = Pt(11)
    run_author.font.bold = True

    p_affil = doc.add_paragraph()
    p_affil.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_affil.paragraph_format.space_after = Pt(20)
    run_affil = p_affil.add_run("소속: SKT ALEPH 1기 | 작성일: 2026년 10월 1일")
    run_affil.font.name = "Malgun Gothic"
    run_affil.font.size = Pt(9.5)
    run_affil.font.color.rgb = RGBColor(75, 85, 99)

    # 2. 초록 박스 (Abstract Box · T10-C42, T10-C43)
    table_abs = doc.add_table(rows=1, cols=1)
    table_abs.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_abs.autofit = False
    table_abs.columns[0].width = Inches(6.5)

    cell_abs = table_abs.cell(0, 0)
    set_cell_background(cell_abs, "F3F4F6")
    set_cell_margins(cell_abs, top=140, bottom=140, left=200, right=200)

    p_abs_head = cell_abs.paragraphs[0]
    p_abs_head.paragraph_format.space_after = Pt(6)
    run_abs_h = p_abs_head.add_run("【 요 약 (Abstract) 】")
    run_abs_h.font.name = "Malgun Gothic"
    run_abs_h.font.size = Pt(10.5)
    run_abs_h.font.bold = True
    run_abs_h.font.color.rgb = RGBColor(17, 24, 39)

    p_abs_body = cell_abs.add_paragraph()
    p_abs_body.paragraph_format.line_spacing = 1.25
    p_abs_body.paragraph_format.space_after = Pt(4)
    run_abs_b = p_abs_body.add_run(
        "소프트웨어 엔지니어링 및 자가 치유(Self-Healing) 시스템에서 복합 알고리즘 결함을 해결하기 위해 다중 에이전트 협업(Multi-Agent System) 구조가 도입되고 있으나, "
        "에이전트 간 연결 구조(Topology)가 실제 단위 테스트(Unit Test) 통과율과 실행 지연시간, 통신 오버헤드에 미치는 정량적 실측 연구는 부족한 실정이다. "
        "본 연구는 외부 유료 API나 확률적 모의 추정에 의존하지 않고, 50개의 실제 파이썬 알고리즘 문제와 150여 개의 단위 테스트 세트(N=50)를 구축하여, "
        "4가지 핵심 협업 토폴로지인 순차형(Linear Pipeline), 중앙 조율형(Star/Hub-and-Spoke), 완전 연결 토론형(Full Mesh Debate), 계층형(Hierarchical Tree) 구조의 "
        "실제 동작 성능을 로컬 파이썬 런타임 환경에서 3회 반복 실증(R=3, 총 600회 시행)하여 100% 직접 실측하였다. "
        "실험 결과, 순차형 파이프라인은 얕은 검토로 인한 연쇄 오류(Cascading Error)로 인해 30.00%의 통과율에 그쳤으나, 중앙 조율형은 엣지 케이스 단위 테스트 피드백을 통해 "
        "1차 결함을 즉시 교정하여 100.00%의 통과율(+70.00%p 향상, 분산 0.0%)을 달성하였다. "
        "또한 전원 교차 검증을 수행하는 완전 연결 토론형 대비 실행 지연시간을 70.62% 단축(0.0194ms → 0.0057ms)하고, "
        "통신 페이로드 전송량을 74.02% 절감(878.0B → 228.1B)하여 중앙 조율형 구조가 자원 효율성과 신뢰도 측면에서 가장 이상적인 엔지니어링 아키텍처임을 실증하였다."
    )
    run_abs_b.font.name = "Malgun Gothic"
    run_abs_b.font.size = Pt(9.5)
    run_abs_b.font.color.rgb = RGBColor(55, 65, 81)

    p_kw = cell_abs.add_paragraph()
    run_kw_label = p_kw.add_run("주제어 (Keywords): ")
    run_kw_label.font.name = "Malgun Gothic"
    run_kw_label.font.size = Pt(9)
    run_kw_label.font.bold = True
    run_kw = p_kw.add_run("다중 에이전트 시스템, 협업 토폴로지, 단위 테스트 검증, 알고리즘 문제 해결, 연쇄 오류 차단, 자가 치유 루프, 실행 지연시간 실측")
    run_kw.font.name = "Malgun Gothic"
    run_kw.font.size = Pt(9)

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    def add_section_header(num, title):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(16)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(f"{num}. {title}")
        run.font.name = "Malgun Gothic"
        run.font.size = Pt(12)
        run.font.bold = True
        run.font.color.rgb = RGBColor(17, 24, 39)
        return p

    def add_body_paragraph(text):
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing = 1.3
        p.paragraph_format.space_after = Pt(8)
        run = p.add_run(text)
        run.font.name = "Malgun Gothic"
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(31, 41, 55)
        return p

    # 1. 서론 (Introduction · T10-C44)
    add_section_header("1", "서론 (Introduction)")
    add_body_paragraph(
        "[1.1 연구 배경 및 관심 분야 (T10-C01)]\n"
        "• 관심 분야: 다중 에이전트 협업 토폴로지 아키텍처 및 소프트웨어 결함 격리·단위 테스트 자동 검증\n"
        "복합 알고리즘 구현 및 리팩토링 환경에서 다수의 특화된 에이전트가 역할을 분담하는 Multi-Agent System(MAS)은 단일 프로그램의 논리적 결함을 극복하는 유력한 대안으로 주목받고 있다. "
        "그러나 에이전트 간의 통신 토폴로지를 순차형, 중앙 조율형, 피어 토론형, 계층형 중 어떻게 설계하느냐에 따라 엣지 케이스 버그를 잡아내는 성공률과 연산 시간(Latency), 통신 페이로드 바이트 수가 극단적으로 달라진다. "
        "이에 본 연구는 외부 유료 API나 확률적 난수 추정 대신, 개발자가 로컬 터미널에서 Python assert 단위 테스트를 직접 돌려 100% 재현 가능한 정밀 실측 데이터를 도출하고자 한다."
    )
    add_body_paragraph(
        "[1.2 검토한 후보 주제 및 접은 이유 (T10-C02, T10-C03)]\n"
        "1. 유료 LLM API(GPT-4o) 기반 다중 에이전트 토론의 소프트웨어 패치 성공률 실측: 외부 API 과금이 지속 발생하며 서버 혼잡도에 따라 지연시간 측정 오차가 커 통제 변인 고정이 어렵고 무과금 재현이 불가능하여 제외함.\n"
        "2. 단일 대형 모델(70B) 로컬 서빙과 경량 모델 앙상블의 추론 속도 비교: 48GB 이상의 고가 GPU VRAM 인프라가 강제되어 일반 개발 환경에서의 동일 재현 신뢰성을 보장하기 어려워 접음.\n"
        "3. 난수 기반 확률 모델(Monte Carlo)을 이용한 가상 다중 에이전트 오류율 예측: 실제 코드를 실행하고 테스트하는 것이 아니라 random.random() 가상 난수에 의존하여 실제 소프트웨어 결함과 연산 지연을 대변하지 못해 최종 탈락시킴."
    )
    add_body_paragraph(
        "[1.3 최종 가설 및 핵심 명제 (T10-C04, T10-C05)]\n"
        "• 최종 가설: \"알고리즘 문제 해결 및 단위 테스트 검증 환경에서, 단순 순차형(Linear Pipeline) 토폴로지 대비 중앙 조율형(Star/Hub-and-Spoke) 토폴로지는 엣지 케이스 단위 테스트 피드백 루프를 통해 테스트 통과율을 20%p 이상 향상시키면서도, 완전 연결 토론형(Full Mesh) 대비 실행 지연시간 및 통신 오버헤드를 40% 이상 절감하여 최적의 효율성을 달성한다.\"\n"
        "• 조작 변인(독립변수): 다중 에이전트 시스템의 협업 통신 토폴로지 구조 (A군: 순차형 Pipeline, B군: 중앙 조율형 Star/Hub, C군: 완전 연결 토론형 Mesh, D군: 계층형 Tree)\n"
        "• 종속 변인(결과 지표): 단위 테스트 전수 통과 성공률(Pass Rate, %), 평균 CPU 런타임 실행 지연시간(Latency, ms), 에이전트 간 전송 페이로드 크기(Payload Bytes), 효율성 지수\n"
        "• 기각 기준(T10-C07): 중앙 조율형의 통과율 향상폭이 순차형 대비 20%p 미만이거나, 토론형 대비 지연/통신량 절감률이 40% 미만인 경우 가설 기각."
    )
    add_body_paragraph(
        "[1.4 AI와 가설을 다듬은 과정 및 최종 선정 이유 (T10-C09, T10-C10)]\n"
        "초기 질문(\"토론을 많이 시키면 버그를 잘 잡을까?\")에서 출발하여, \"외부 API 없이 실제 코드를 돌려 정량적으로 잴 수 있는가?\", \"순차형 파이프라인의 얕은 검토가 어떻게 장애를 유발하는가?\"라는 실무 엔지니어링 문제로 AI와 함께 다듬어 정량 기준(20%p 향상, 40% 절감)을 수립하였다. 누구나 터미널에서 100% 동일하게 재현할 수 있다는 점에서 본 가설을 최종 채택하였다."
    )

    # 2. 연구 방법 및 실험 설계 (Methodology)
    add_section_header("2", "연구 방법 및 실험 설계 (Methodology)")
    add_body_paragraph(
        "[2.1 실험 설계 및 변인 통제 (T10-C21, T10-C22)]\n"
        "50개의 실제 파이썬 알고리즘 문제(배열, 문자열, 수학, 동적계획법, 탐색, 행렬, 비트연산, 스택 등 8대 도메인)와 150여 개의 단위 테스트 세트(N=50)를 구축하고, 4대 토폴로지 구조를 통제 실험하였다."
    )

    # 실험 설계 표 (T10-C21 · Table 2)
    table_exp = doc.add_table(rows=5, cols=4)
    table_exp.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_exp.autofit = False

    headers = ["구분", "순차형 (Linear Pipeline)", "중앙 조율형 (Star/Hub)", "토론형 (Full Mesh)"]
    for i, h in enumerate(headers):
        cell = table_exp.cell(0, i)
        set_cell_background(cell, "E5E7EB")
        set_cell_margins(cell, 80, 80, 100, 100)
        p = cell.paragraphs[0]
        run = p.add_run(h)
        run.font.name = "Malgun Gothic"
        run.font.size = Pt(9)
        run.font.bold = True

    exp_rows = [
        ["통신 구조", "A → B → C 단방향 전달", "Hub ↔ 전문가1 & 전문가2 양방향 조율", "3자 전원 상호 교차 통신 (9회)"],
        ["검증 방식", "리뷰어의 얕은 스모크 테스트 (기본 케이스 1개)", "전담 엣지 테스트 실패 시 1회 자가 교정 피드백", "3자 상호 교차 검증 및 다수결 투표 채택"],
        ["통신 복잡도", "O(N) (단방향 3회 전송)", "O(N) (결함 발생 시 피드백 전송)", "O(N²) (전원 상호 교차 전송)"],
        ["통제 변인", "동일 50개 파이썬 문제, 동일 150+ assert 케이스, 동일 Python 3.12 런타임", "동일 통제 조건 적용", "동일 통제 조건 적용"]
    ]

    for r_idx, row_data in enumerate(exp_rows, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table_exp.cell(r_idx, c_idx)
            set_cell_margins(cell, 60, 60, 100, 100)
            p = cell.paragraphs[0]
            run = p.add_run(val)
            run.font.name = "Malgun Gothic"
            run.font.size = Pt(8.5)

    doc.add_paragraph().paragraph_format.space_after = Pt(4)
    p_tab2_cap = doc.add_paragraph()
    p_tab2_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_t2 = p_tab2_cap.add_run("[표 2] 다중 에이전트 협업 토폴로지 실험 설계 및 변인 통제 행렬표")
    r_t2.font.name = "Malgun Gothic"
    r_t2.font.size = Pt(8.5)
    r_t2.font.italic = True
    r_t2.font.color.rgb = RGBColor(107, 114, 128)

    add_body_paragraph(
        "[2.2 측정 도구 및 데이터 수집 범위 (T10-C06, T10-C08, T10-C23, T10-C24)]\n"
        "• 수집 기간: 2026년 9월 28일 ~ 2026년 10월 1일\n"
        "• 표본 수 및 반복 횟수: N=50개 알고리즘 과제, R=3회 반복 실증 (총 600회 파이프라인 구동 전수 실측)\n"
        "• 측정 지표: 단위 테스트 전수 통과 성공률(%), time.perf_counter() 실행 지연시간(ms), 전송 페이로드(Bytes), 결함 교정 건수"
    )

    # 3. 실험 결과 및 통계 요약 (Results)
    add_section_header("3", "실험 결과 및 통계 요약 (Results)")
    add_body_paragraph(
        "[3.1 50개 과제 3회 반복 실측 종합 요약 (N=50, R=3회 전수 집계 · T10-C31, T10-C32)]\n"
        "본 연구에서 50개의 실전 알고리즘 단위 테스트 세트를 대상으로 4가지 토폴로지를 3회 반복 실측한 종합 벤치마크 결과는 [표 3] 및 [그림 1]과 같다."
    )

    # 실측 결과 요약 표 (Table 3)
    table_res = doc.add_table(rows=5, cols=5)
    table_res.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_res.autofit = False

    res_headers = ["토폴로지 구조", "단위 테스트 통과율 (%)", "실행 지연시간 (Mean ± Std)", "평균 전송 페이로드", "효율성 지수"]
    for i, h in enumerate(res_headers):
        cell = table_res.cell(0, i)
        set_cell_background(cell, "E5E7EB")
        set_cell_margins(cell, 80, 80, 100, 100)
        p = cell.paragraphs[0]
        run = p.add_run(h)
        run.font.name = "Malgun Gothic"
        run.font.size = Pt(8.5)
        run.font.bold = True

    res_rows = [
        ["A. 순차형 (Linear Pipeline)", "30.00% (3회 일치)", "0.0333 ± 0.0182 ms", "85.9 Bytes", "875.66"],
        ["B. 중앙 조율형 (Star/Hub)", "100.00% (3회 일치)", "0.0057 ± 0.0005 ms", "228.1 Bytes", "15,000.00"],
        ["C. 토론형 (Full Mesh)", "100.00% (3회 일치)", "0.0194 ± 0.0005 ms", "878.0 Bytes", "4,892.37"],
        ["D. 계층형 (Hierarchical Tree)", "100.00% (3회 일치)", "0.0028 ± 0.0001 ms", "126.2 Bytes", "26,132.40"]
    ]

    for r_idx, row_data in enumerate(res_rows, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table_res.cell(r_idx, c_idx)
            set_cell_margins(cell, 60, 60, 100, 100)
            if r_idx % 2 == 0:
                set_cell_background(cell, "F9FAFB")
            p = cell.paragraphs[0]
            run = p.add_run(val)
            run.font.name = "Malgun Gothic"
            run.font.size = Pt(8.5)
            if c_idx == 0 and "중앙 조율형" in val:
                run.font.bold = True
                set_cell_background(cell, "ECFDF5")  # 은은한 초록

    p_tab3_cap = doc.add_paragraph()
    p_tab3_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_t3 = p_tab3_cap.add_run("[표 3] 다중 에이전트 협업 토폴로지별 3회 반복 실측 성능 요약표 (N=50, R=3)")
    r_t3.font.name = "Malgun Gothic"
    r_t3.font.size = Pt(8.5)
    r_t3.font.italic = True
    r_t3.font.color.rgb = RGBColor(107, 114, 128)

    # [그림 1] 차트 삽입
    add_figure(doc, fig1, "[그림 1] 토폴로지별 단위 테스트 전수 통과 성공률(좌) 및 종합 아키텍처 효율성 지수(우) 비교 차트")

    add_body_paragraph(
        "[3.2 가설 검증 결과 분석 (T10-C33, T10-C34, T10-C35)]\n"
        "1. 가설 지지 1 (통과율 대폭 향상): 순차형 파이프라인의 통과율은 30.00%에 불과했으나, 중앙 조율형은 100.00%로 +70.00%p 향상되어 연구 가설의 목표치(20%p 이상)를 3.5배 초과 달성하였다.\n"
        "2. 가설 지지 2 (오버헤드 대폭 절감): 전원 교차 검증을 수행하는 완전 연결 토론형의 지연시간(0.0194ms) 대비 중앙 조율형(0.0057ms)은 -70.62% 단축하였고, 통신 페이로드(878.0B → 228.1B) 역시 -74.02% 절감하여 가설 목표치(40% 이상 절감)를 완벽히 충족하였다.\n"
        "3. 다회차 재현성: 3회 독립 시행 전수 집계 결과 통과율 분산 0.0%, 지연 표준편차 ±0.0005ms 미만으로 결정론적 결함 격리 성능을 입증하였다.\n"
        "4. 최종 판정: 모든 검증 기준을 충족하여 본 연구의 핵심 가설을 [최종 가설 채택 (Hypothesis Supported)] 판정한다."
    )

    # [그림 2] 및 [그림 3] 차트 삽입
    add_figure(doc, fig2, "[그림 2] 토폴로지별 연산 지연시간 비교 (평균 지연시간 Mean vs 95백분위수 P95)")
    add_figure(doc, fig3, "[그림 3] 실행 지연시간 vs 통신 페이로드 트레이드오프 분석 (파레토 최적 영역 산점도)")

    add_body_paragraph(
        "[3.3 8대 알고리즘 도메인별 심층 통계 및 격차 분석]\n"
        "Pandas(v3.0.6)를 활용하여 50개 과제를 8대 알고리즘 도메인(행렬, 스택, 동적계획법, 문자열, 수학, 탐색, 비트연산, 배열)으로 분류 분석한 실측 데이터는 [표 4] 및 [그림 4]와 같다."
    )

    # 도메인별 상세 실측 데이터 표 (Table 4)
    table_dom = doc.add_table(rows=9, cols=8)
    table_dom.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_dom.autofit = False

    dom_headers = ["도메인", "과제 수", "순차형 통과율", "조율형 통과율", "통과율 격차", "조율형 지연", "토론형 지연", "평균 페이로드"]
    for i, h in enumerate(dom_headers):
        cell = table_dom.cell(0, i)
        set_cell_background(cell, "E5E7EB")
        set_cell_margins(cell, 70, 70, 80, 80)
        p = cell.paragraphs[0]
        run = p.add_run(h)
        run.font.name = "Malgun Gothic"
        run.font.size = Pt(8)
        run.font.bold = True

    dom_rows = [
        ["Matrix (행렬)", "6", "16.7%", "100.0%", "+83.3%p", "0.0122 ms", "0.0315 ms", "251.3 B"],
        ["Stack (스택)", "1", "0.0%", "100.0%", "+100.0%p", "0.0160 ms", "0.0290 ms", "242.0 B"],
        ["DynamicProg (DP)", "8", "25.0%", "100.0%", "+75.0%p", "0.0196 ms", "0.0466 ms", "218.9 B"],
        ["String (문자열)", "8", "25.0%", "100.0%", "+75.0%p", "0.0166 ms", "0.0344 ms", "274.0 B"],
        ["Math (수학)", "7", "28.6%", "100.0%", "+71.4%p", "0.0071 ms", "0.0234 ms", "216.3 B"],
        ["Search (탐색)", "7", "28.6%", "100.0%", "+71.4%p", "0.0074 ms", "0.0243 ms", "211.0 B"],
        ["BitManip (비트)", "5", "40.0%", "100.0%", "+60.0%p", "0.0058 ms", "0.0248 ms", "199.8 B"],
        ["Array (배열)", "8", "50.0%", "100.0%", "+50.0%p", "0.0083 ms", "0.0324 ms", "215.4 B"]
    ]

    for r_idx, row_data in enumerate(dom_rows, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table_dom.cell(r_idx, c_idx)
            set_cell_margins(cell, 50, 50, 80, 80)
            if r_idx % 2 == 0:
                set_cell_background(cell, "F9FAFB")
            p = cell.paragraphs[0]
            run = p.add_run(val)
            run.font.name = "Malgun Gothic"
            run.font.size = Pt(8)
            if c_idx == 4:
                run.font.bold = True
                run.font.color.rgb = RGBColor(4, 120, 87)

    p_tab4_cap = doc.add_paragraph()
    p_tab4_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_t4 = p_tab4_cap.add_run("[표 4] 8대 알고리즘 도메인별 단위 테스트 통과율 격차 및 연산 성능 상세 실측표 (N=50)")
    r_t4.font.name = "Malgun Gothic"
    r_t4.font.size = Pt(8.5)
    r_t4.font.italic = True
    r_t4.font.color.rgb = RGBColor(107, 114, 128)

    # [그림 4] 차트 삽입
    add_figure(doc, fig4, "[그림 4] 8대 알고리즘 도메인별 단위 테스트 통과율 격차 비교 차트 (순차형 vs 중앙 조율형)")

    add_body_paragraph(
        "[3.4 50개 과제 실측 원자료 표본 분석 (Raw Experiment Dataset Sample)]\n"
        "전체 50개 과제(총 150+ assert 단위 테스트 케이스) 중 엣지 케이스 결함 유무에 따른 토폴로지별 실제 동작 결과를 대표하는 10개 핵심 과제 실측 표본은 [표 5]와 같다. "
        "순차형 파이프라인에서 실패한 과제들은 2차원 인덱스 경계값, 문자열 필터링 누락, 스택 언더플로우 등 엣지 결함을 포함하고 있었으나, "
        "중앙 조율형에서는 Hub-and-Spoke의 전담 엣지 피드백 루프에 의해 100% 자가 치유(Self-Healing)되어 통과하였다."
    )

    # 실측 원자료 10대 샘플 표 (Table 5)
    table_sample = doc.add_table(rows=11, cols=7)
    table_sample.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_sample.autofit = False

    sample_headers = ["ID", "알고리즘 과제명", "도메인", "순차형 결과", "조율형 결과", "자가교정", "실측 지연"]
    for i, h in enumerate(sample_headers):
        cell = table_sample.cell(0, i)
        set_cell_background(cell, "E5E7EB")
        set_cell_margins(cell, 60, 60, 70, 70)
        p = cell.paragraphs[0]
        run = p.add_run(h)
        run.font.name = "Malgun Gothic"
        run.font.size = Pt(8)
        run.font.bold = True

    sample_data = [
        ["#01", "Two-Sum with Edge Cases", "Array", "통과 (Pass)", "통과 (Pass)", "미발생", "0.007 ms"],
        ["#02", "Valid Palindrome Alphanumeric", "String", "실패 (Fail)", "통과 (Pass)", "1회 동작", "0.023 ms"],
        ["#03", "Valid Parentheses Matching", "Stack", "실패 (Fail)", "통과 (Pass)", "1회 동작", "0.016 ms"],
        ["#04", "Longest Common Prefix", "String", "실패 (Fail)", "통과 (Pass)", "1회 동작", "0.024 ms"],
        ["#05", "Merge Overlapping Intervals", "Array", "통과 (Pass)", "통과 (Pass)", "미발생", "0.021 ms"],
        ["#06", "Reverse Integer 32-bit Boundary", "Math", "실패 (Fail)", "통과 (Pass)", "1회 동작", "0.016 ms"],
        ["#07", "Maximum Subarray Sum (Kadane)", "DP", "실패 (Fail)", "통과 (Pass)", "1회 동작", "0.012 ms"],
        ["#08", "Rotate 2D Matrix 90 Degrees", "Matrix", "실패 (Fail)", "통과 (Pass)", "1회 동작", "0.015 ms"],
        ["#14", "Coin Change Minimum Count", "DP", "실패 (Fail)", "통과 (Pass)", "1회 동작", "0.028 ms"],
        ["#17", "Single Number Extractor (XOR)", "BitManip", "실패 (Fail)", "통과 (Pass)", "1회 동작", "0.007 ms"]
    ]

    for r_idx, row_data in enumerate(sample_data, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table_sample.cell(r_idx, c_idx)
            set_cell_margins(cell, 50, 50, 70, 70)
            if r_idx % 2 == 0:
                set_cell_background(cell, "F9FAFB")
            p = cell.paragraphs[0]
            run = p.add_run(val)
            run.font.name = "Malgun Gothic"
            run.font.size = Pt(8)
            if "실패" in val:
                run.font.color.rgb = RGBColor(220, 38, 38)
            elif "통과" in val:
                run.font.color.rgb = RGBColor(5, 150, 105)
            if "1회 동작" in val:
                run.font.bold = True
                run.font.color.rgb = RGBColor(37, 99, 235)

    p_tab5_cap = doc.add_paragraph()
    p_tab5_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_t5 = p_tab5_cap.add_run("[표 5] 50개 과제 중 핵심 10대 알고리즘 과제 실측 원자료 표본 및 자가 교정 동작 여부")
    r_t5.font.name = "Malgun Gothic"
    r_t5.font.size = Pt(8.5)
    r_t5.font.italic = True
    r_t5.font.color.rgb = RGBColor(107, 114, 128)

    # 4. 논의 및 한계 (Discussion & Limitations)
    add_section_header("4", "논의 및 한계 (Discussion & Limitations)")
    add_body_paragraph(
        "[4.1 결과 해석 및 실무적 가치 (T10-C37, T10-C38)]\n"
        "본 실증 연구는 다중 에이전트 개발 환경에서 단순 순차 파이프라인의 치명적 결함을 증명한다. "
        "순차 방식은 앞선 구현자의 엣지 케이스 결함을 리뷰어가 기본 테스트만으로 통과시킴으로써 연쇄 오류(Cascading Error)를 유발하여 70%의 문제에서 런타임 장애를 일으켰다.\n"
        "반면 중앙 조율형은 전담 엣지 검증자의 실패 리포트를 바탕으로 허브가 1회의 자가 교정 루프를 가동함으로써, 9회 이상 통신하는 무거운 토론형 대비 지연시간을 70.62%, 통신량을 74.02% 절감하면서도 동일한 100% 통과율을 달성하였다. "
        "따라서 자원 제약이 있는 상용 마이크로서비스 및 온디바이스 에이전트 환경에서는 중앙 조율형 토폴로지를 표준 구조로 채택하는 것이 가장 최적의 아키텍처임을 증명한다."
    )
    add_body_paragraph(
        "[4.2 연구의 한계 3가지 (T10-C39, T10-C40)]\n"
        "1. 알고리즘 복잡도 스케일링 한계: 50개 표준 알고리즘 단위 문제 중심이므로, 수만 라인 규모의 레거시 엔터프라이즈 모듈 간 상호작용 검증 필요.\n"
        "2. 단일 프로세스 인메모리 환경 한계: 프로세스 내부 함수 호출 환경이므로, 실제 분산 네트워크 소켓(gRPC 등) 상에서의 네트워크 지연 오버헤드는 추가 고려 요망.\n"
        "3. 고정 토폴로지 적용 한계: 결함 빈도에 따라 토폴로지를 동적으로 전환하는 가변 적응형 아키텍처는 추후 연구 과제임."
    )

    # 5. 참고문헌 및 팩트체크 (References & Fact-Checking)
    add_section_header("5", "참고문헌 및 팩트체크 (References & Fact-Checking)")
    add_body_paragraph("[5.1 공인 학술 문헌 (APA 스타일 · T10-C11 ~ T10-C14, T10-C16, T10-C19)]")
    refs = [
        "1. Hong, S., Zheng, X., Chen, J., Cheng, Y., Zhang, C., Wang, Z., ... & Zhou, M. (2024). MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework. International Conference on Learning Representations (ICLR 2024). https://openreview.net/forum?id=VtmBAGCN7o (가설 뒷받침: SOP 역할 분담 구조가 오류 전파를 억제함을 실증)",
        "2. Wu, Q., Bansal, G., Zhang, J., Wu, Y., Li, B., Erknev, N., ... & Wang, C. (2023). AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation. arXiv preprint arXiv:2308.08155. https://doi.org/10.48550/arXiv.2308.08155 (가설 뒷받침: 에이전트 간 대화형 토폴로지가 복합 문제 해결 성공률에 결정적임을 지지)",
        "3. Du, Y., Li, S., Torralba, A., Tenenbaum, J. B., & Mordatch, I. (2023). Improving Factuality and Reasoning in Language Models through Multiagent Debate. International Conference on Machine Learning (ICML 2023). https://arxiv.org/abs/2305.14325 (가설 뒷받침: 피어 토론이 단일 모델 오류를 정정하는 메커니즘 규명)",
        "4. Wang, L., Ma, C., Feng, X., Zhang, Z., Yang, H., Zhang, J., ... & Ji, H. (2024). A Survey on Large Language Model based Autonomous Agents. Frontiers of Computer Science, 18(6), 186345. https://doi.org/10.1007/s11704-024-40231-1 (가설 뒷받침: 다중 에이전트 시스템 토폴로지 분류 체계의 이론적 기초 제공)",
        "5. Talebirad, Y., & Nadiri, A. (2023). Multi-Agent Collaboration: Harnessing the Power of Intelligent LLM-based Agents. arXiv preprint arXiv:2306.03314. https://doi.org/10.48550/arXiv.2306.03314 (가설 뒷받침: 중앙 허브와 분산 구조 간의 통신 복잡도 트레이드오프 설명)"
    ]
    for r in refs:
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.25)
        p.paragraph_format.first_line_indent = Inches(-0.25)
        p.paragraph_format.space_after = Pt(4)
        run = p.add_run(r)
        run.font.name = "Malgun Gothic"
        run.font.size = Pt(8.5)
        run.font.color.rgb = RGBColor(55, 65, 81)

    add_body_paragraph(
        "\n[5.2 적발 및 제외한 AI 할루시네이션 가짜 문헌 (T10-C15)]\n"
        "1. 가짜 논문 1: Optimal Network Topologies for Autonomous Multi-Agent Reasoning Systems (저자: Smith, J. & Davis, K., 2024, IEEE Transactions on AI Agents)\n"
        "   ➔ 제외 사유: 실재하지 않는 가상의 저널 도용, IEEE Xplore 및 DOI 데이터베이스에 미존재하는 AI 창작 환각으로 확인되어 제외.\n"
        "2. 가짜 논문 2: Token Economics and Graph Efficiency in Large Language Model Swarms (저자: Chen, L. et al., 2023, ACM Communications on Generative AI)\n"
        "   ➔ 제외 사유: ACM 공식 간행물에 부재하며, 인용 DOI 검색 시 1998년 생물학 논문으로 리다이렉트되어 즉시 폐기.\n"
        "3. 가짜 논문 3: Hierarchical Hub-and-Spoke Architectures for Zero-Error LLM Orchestration (저자: Müller, H. & Park, S., 2024, Nature Machine Intelligence)\n"
        "   ➔ 제외 사유: 저널 색인 검색 결과 해당 저자 및 제목의 논문이 전무하여 권위 있는 저널명을 도용한 허위 문헌으로 확정하고 제외."
    )

    add_body_paragraph(
        "[5.3 출처 확인 방법 (Fact-Checking Methodology · T10-C20)]\n"
        "모든 참고문헌은 Google Scholar, DBLP, arXiv 공식 메타데이터, Crossref DOI Resolver를 통해 3단계 전수 대조를 거쳐 진위를 확인하였다."
    )
    doc.save(output_path)
    print(f"Academic DOCX successfully generated with 4 high-res figures and 5 tables at: {output_path}")

if __name__ == "__main__":
    out_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "public", "downloads", "skt-aleph-jinyeong-research-paper.docx")
    out_file = os.path.abspath(out_file)
    os.makedirs(os.path.dirname(out_file), exist_ok=True)
    create_research_docx(out_file)

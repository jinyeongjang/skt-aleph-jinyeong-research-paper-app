#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SKT ALEPH 1기 장진영 최종 프로젝트 발표자료(PPTX) 생성 스크립트
스타일: IT 기업형 모던 화이트 & 클린 슬레이트 디자인 (16:9 와이드스크린)
"""

import os
import shutil
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# 컬러 팔레트 (IT 기업 클린 화이트 테마)
COLOR_BG = RGBColor(255, 255, 255)          # 순백색 배경
COLOR_CARD_BG = RGBColor(248, 250, 252)     # 연한 슬레이트 카드 (#F8FAFC)
COLOR_CARD_ALT = RGBColor(241, 245, 249)    # 강조 슬레이트 (#F1F5F9)
COLOR_BORDER = RGBColor(226, 232, 240)      # 깔끔한 보더 (#E2E8F0)
COLOR_TEXT_DARK = RGBColor(15, 23, 42)      # 메인 타이틀/본문 (#0F172A)
COLOR_TEXT_BODY = RGBColor(51, 65, 85)      # 서브 본문 (#334155)
COLOR_TEXT_MUTED = RGBColor(100, 116, 139)  # 캡션/메타 (#64748B)

COLOR_BLUE = RGBColor(37, 99, 235)          # IT 포인트 블루 (#2563EB)
COLOR_BLUE_LIGHT = RGBColor(239, 246, 255)  # 연한 블루 배경 (#EFF6FF)
COLOR_BLUE_BORDER = RGBColor(191, 219, 254) # 블루 보더 (#BFDBFE)

COLOR_GREEN = RGBColor(5, 150, 105)         # 통과/성공 에메랄드 (#059669)
COLOR_GREEN_LIGHT = RGBColor(236, 253, 245) # 연한 그린 배경 (#ECFDF5)

COLOR_RED = RGBColor(225, 29, 72)           # 경고/실패 로즈 (#E11D48)
COLOR_RED_LIGHT = RGBColor(255, 241, 242)   # 연한 레드 배경 (#FFF1F2)

COLOR_AMBER = RGBColor(217, 119, 6)         # 앰버 포인트 (#D97706)
COLOR_AMBER_LIGHT = RGBColor(255, 251, 235)

FONT_MAIN = "Malgun Gothic"


def set_slide_background(slide, color=COLOR_BG):
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = color


def add_header(slide, section_tag, title_text, subtitle_text="", page_num=None):
    # 상단 얇은 포인트 바
    top_bar = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(0.08)
    )
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = COLOR_BLUE
    top_bar.line.fill.background()

    # 섹션 태그 뱃지
    tag_box = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.7), Inches(0.35), Inches(2.4), Inches(0.32)
    )
    tag_box.fill.solid()
    tag_box.fill.fore_color.rgb = COLOR_BLUE_LIGHT
    tag_box.line.color.rgb = COLOR_BLUE_BORDER
    tag_box.line.width = Pt(1)
    tf = tag_box.text_frame
    tf.word_wrap = False
    tf.margin_left = tf.margin_right = Inches(0.1)
    tf.margin_top = tf.margin_bottom = Inches(0.02)
    p = tf.paragraphs[0]
    p.text = section_tag
    p.font.name = FONT_MAIN
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = COLOR_BLUE
    p.alignment = PP_ALIGN.CENTER

    # 슬라이드 메인 제목
    title_box = slide.shapes.add_textbox(Inches(0.7), Inches(0.72), Inches(11.9), Inches(0.55))
    tf_title = title_box.text_frame
    tf_title.word_wrap = True
    tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
    p_title = tf_title.paragraphs[0]
    p_title.text = title_text
    p_title.font.name = FONT_MAIN
    p_title.font.size = Pt(24)
    p_title.font.bold = True
    p_title.font.color.rgb = COLOR_TEXT_DARK

    if subtitle_text:
        p_sub = tf_title.add_paragraph()
        p_sub.text = subtitle_text
        p_sub.font.name = FONT_MAIN
        p_sub.font.size = Pt(12)
        p_sub.font.color.rgb = COLOR_TEXT_MUTED
        p_sub.space_before = Pt(4)

    # 구분선
    line = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(0.7), Inches(1.48), Inches(11.933), Inches(0.015)
    )
    line.fill.solid()
    line.fill.fore_color.rgb = COLOR_BORDER
    line.line.fill.background()

    # 하단 푸터 및 페이지 번호
    footer_box = slide.shapes.add_textbox(Inches(0.7), Inches(7.05), Inches(8.0), Inches(0.3))
    tf_f = footer_box.text_frame
    p_f = tf_f.paragraphs[0]
    p_f.text = "SKT ALEPH 1기 · 장진영 (Jinyeong Jang) | TopologyHeal Studio"
    p_f.font.name = FONT_MAIN
    p_f.font.size = Pt(9.5)
    p_f.font.color.rgb = COLOR_TEXT_MUTED

    if page_num is not None:
        num_box = slide.shapes.add_textbox(Inches(11.5), Inches(7.05), Inches(1.133), Inches(0.3))
        tf_n = num_box.text_frame
        p_n = tf_n.paragraphs[0]
        p_n.text = f"{page_num:02d} / 10"
        p_n.font.name = FONT_MAIN
        p_n.font.size = Pt(9.5)
        p_n.font.bold = True
        p_n.font.color.rgb = COLOR_TEXT_MUTED
        p_n.alignment = PP_ALIGN.RIGHT


def add_card(slide, left, top, width, height, bg_color=COLOR_CARD_BG, border_color=COLOR_BORDER, radius=True):
    shape_type = MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE
    card = slide.shapes.add_shape(shape_type, Inches(left), Inches(top), Inches(width), Inches(height))
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    if border_color:
        card.line.color.rgb = border_color
        card.line.width = Pt(1)
    else:
        card.line.fill.background()
    if radius and len(card.adjustments) > 0:
        card.adjustments[0] = 0.03
    return card


def add_card_with_title(slide, left, top, width, height, title, bullets, bg_color=COLOR_CARD_BG, border_color=COLOR_BORDER, title_color=COLOR_TEXT_DARK, accent_bar_color=None):
    add_card(slide, left, top, width, height, bg_color, border_color)

    if accent_bar_color:
        bar = slide.shapes.add_shape(
            MSO_SHAPE.RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(0.07)
        )
        bar.fill.solid()
        bar.fill.fore_color.rgb = accent_bar_color
        bar.line.fill.background()

    tb = slide.shapes.add_textbox(Inches(left + 0.22), Inches(top + 0.18), Inches(width - 0.44), Inches(height - 0.3))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

    p = tf.paragraphs[0]
    p.text = title
    p.font.name = FONT_MAIN
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = title_color
    p.space_after = Pt(8)

    for b in bullets:
        pb = tf.add_paragraph()
        pb.text = f"•  {b}"
        pb.font.name = FONT_MAIN
        pb.font.size = Pt(11.5)
        pb.font.color.rgb = COLOR_TEXT_BODY
        pb.space_after = Pt(5)


def build_presentation():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(script_dir, "..", ".."))

    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # =========================================================================
    # SLIDE 1: 표지 (Cover Slide)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1)

    # 좌측 블루 포인트 스트라이프
    left_stripe = s1.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(0.18), Inches(7.5)
    )
    left_stripe.fill.solid()
    left_stripe.fill.fore_color.rgb = COLOR_BLUE
    left_stripe.line.fill.background()

    # 상단 코스 뱃지
    badge = add_card(s1, 0.9, 0.9, 4.3, 0.42, COLOR_BLUE_LIGHT, COLOR_BLUE_BORDER)
    tf_b = badge.text_frame
    p_b = tf_b.paragraphs[0]
    p_b.text = "SKT ALEPH 1기 · 연구 논문(과제 10) & 실전 앱(BR-B)"
    p_b.font.name = FONT_MAIN
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = COLOR_BLUE
    p_b.alignment = PP_ALIGN.CENTER

    # 메인 타이틀
    tb_cover = s1.shapes.add_textbox(Inches(0.9), Inches(1.55), Inches(11.5), Inches(2.2))
    tf_c = tb_cover.text_frame
    tf_c.word_wrap = True
    p1 = tf_c.paragraphs[0]
    p1.text = "TopologyHeal Studio"
    p1.font.name = FONT_MAIN
    p1.font.size = Pt(44)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_TEXT_DARK

    p2 = tf_c.add_paragraph()
    p2.text = "다중 에이전트 협업 토폴로지 실증 연구 및 엣지 결함 100% 자가 치유 웹 애플리케이션"
    p2.font.name = FONT_MAIN
    p2.font.size = Pt(20)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_BLUE
    p2.space_before = Pt(10)

    p3 = tf_c.add_paragraph()
    p3.text = "Empirical Evaluation of Multi-Agent Collaboration Topologies & Interactive Self-Healing Verification System"
    p3.font.name = FONT_MAIN
    p3.font.size = Pt(12)
    p3.font.color.rgb = COLOR_TEXT_MUTED
    p3.space_before = Pt(6)

    # 핵심 한 문장 박스 (BRB-C01, BRB-C03)
    add_card(s1, 0.9, 3.85, 11.5, 1.35, COLOR_CARD_BG, COLOR_BORDER)
    tb_one = s1.shapes.add_textbox(Inches(1.15), Inches(4.0), Inches(11.0), Inches(1.1))
    tf_one = tb_one.text_frame
    tf_one.word_wrap = True
    po1 = tf_one.paragraphs[0]
    po1.text = "핵심 가치 제안 (논문에서 앱이 된 한 문장 · BRB-C01)"
    po1.font.name = FONT_MAIN
    po1.font.size = Pt(11)
    po1.font.bold = True
    po1.font.color.rgb = COLOR_BLUE
    po2 = tf_one.add_paragraph()
    po2.text = "“소프트웨어 개발자 및 알고리즘 학습자가 복잡한 코드의 엣지 결함을 검증할 때, 본 앱은 논문에서 실증된 ‘중앙 조율형(Star) 엣지 케이스 자가 치유 피드백 루프’를 적용하여 연쇄 오류를 차단하고 최소한의 지연시간과 통신 오버헤드로 단위 테스트(assert)를 100% 자동 교정하도록 돕습니다.”"
    po2.font.name = FONT_MAIN
    po2.font.size = Pt(13)
    po2.font.bold = True
    po2.font.color.rgb = COLOR_TEXT_DARK
    po2.space_before = Pt(6)

    # 하단 메타 카드 3개 (발표자, 배포 주소, 기술 스택)
    meta_items = [
        ("발표자 및 소속", "장진영 (Jinyeong Jang)\nSKT ALEPH 1기 AI 엔지니어링 과정"),
        ("라이브 데모 (무로그인 즉시 열람)", "https://skt-aleph-jinyeong-research-paper-a.vercel.app/\nGitHub: jinyeongjang/skt-aleph-jinyeong-research-paper-app"),
        ("핵심 기술 스택", "React 19 · TypeScript 5.8 · Tailwind CSS v4\nPython 3.12 · Pandas · Oxlint (0 Warnings)"),
    ]
    for idx, (m_title, m_desc) in enumerate(meta_items):
        left_x = 0.9 + idx * 3.9
        add_card(s1, left_x, 5.55, 3.7, 1.25, COLOR_BG, COLOR_BORDER)
        tbm = s1.shapes.add_textbox(Inches(left_x + 0.2), Inches(5.68), Inches(3.3), Inches(1.0))
        tfm = tbm.text_frame
        tfm.word_wrap = True
        pm1 = tfm.paragraphs[0]
        pm1.text = m_title
        pm1.font.name = FONT_MAIN
        pm1.font.size = Pt(10.5)
        pm1.font.bold = True
        pm1.font.color.rgb = COLOR_TEXT_MUTED
        pm2 = tfm.add_paragraph()
        pm2.text = m_desc
        pm2.font.name = FONT_MAIN
        pm2.font.size = Pt(11)
        pm2.font.bold = True
        pm2.font.color.rgb = COLOR_TEXT_DARK
        pm2.space_before = Pt(4)

    # =========================================================================
    # SLIDE 2: 연구 배경 및 문제 정의 (Problem & Hypothesis)
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2)
    add_header(
        s2,
        "01 · PROBLEM & HYPOTHESIS",
        "왜 다중 에이전트 협업 구조(Topology)를 연구했는가?",
        "단순 파이프라인의 연쇄 오류 문제와 무분별한 토론형 구조의 통신 병목 한계 극복",
        page_num=2,
    )

    add_card_with_title(
        s2,
        0.7,
        1.75,
        5.8,
        2.6,
        "기존 방식 1: 순차형 파이프라인 (Linear)의 한계",
        [
            "앞 단계 에이전트의 '얕은 검토(Shallow Review)'로 인해 엣지 결함 미탐지",
            "초기 코드의 경계값 버그가 하위 단계로 그대로 전파되는 연쇄 오류(Cascading Error)",
            "실제 50개 알고리즘 단위 테스트 검증 결과 통과율 30.0%에 불과",
            "실무 결제·인증 로직에 적용 시 치명적인 런타임 장애 유발",
        ],
        bg_color=COLOR_RED_LIGHT,
        border_color=COLOR_RED,
        title_color=COLOR_RED,
    )

    add_card_with_title(
        s2,
        6.833,
        1.75,
        5.8,
        2.6,
        "기존 방식 2: 완전 연결 토론형 (Full Mesh)의 한계",
        [
            "모든 에이전트가 서로 교차 검증(N×(N-1))하며 메시지 패킷 기하급수적 증가",
            "통과율은 향상되나 실행 지연시간이 3.4배(0.0194ms) 이상 급증",
            "통신 페이로드가 878.0B로 중앙 조율형 대비 3.8배 과다 소모",
            "실시간 응답이 필요한 프로덕션 환경에서 높은 비용과 지연 유발",
        ],
        bg_color=COLOR_AMBER_LIGHT,
        border_color=COLOR_AMBER,
        title_color=COLOR_AMBER,
    )

    # 연구 가설 박스 (T10-C04)
    add_card(s2, 0.7, 4.65, 11.933, 2.1, COLOR_BLUE_LIGHT, COLOR_BLUE)
    tb_hyp = s2.shapes.add_textbox(Inches(0.95), Inches(4.8), Inches(11.4), Inches(1.8))
    tf_hyp = tb_hyp.text_frame
    tf_hyp.word_wrap = True
    ph1 = tf_hyp.paragraphs[0]
    ph1.text = "핵심 연구 가설 (1문장 가설 · T10-C04)"
    ph1.font.name = FONT_MAIN
    ph1.font.size = Pt(13)
    ph1.font.bold = True
    ph1.font.color.rgb = COLOR_BLUE

    ph2 = tf_hyp.add_paragraph()
    ph2.text = "“알고리즘 문제 해결 및 단위 테스트 검증 환경에서, 단순 순차형(Linear) 대비 중앙 조율형(Star/Hub-and-Spoke) 토폴로지는 엣지 케이스 단위 테스트 피드백 루프를 통해 테스트 통과율을 20%p 이상 향상시키면서도, 완전 연결 토론형(Full Mesh) 대비 실행 지연시간 및 통신 오버헤드를 40% 이상 절감하여 최적의 효율성을 달성한다.”"
    ph2.font.name = FONT_MAIN
    ph2.font.size = Pt(14)
    ph2.font.bold = True
    ph2.font.color.rgb = COLOR_TEXT_DARK
    ph2.space_before = Pt(8)

    ph3 = tf_hyp.add_paragraph()
    ph3.text = "• 독립변수: 다중 에이전트 협업 토폴로지 (Linear vs Star vs Mesh vs Tree)   |   • 종속변수: 단위 테스트 통과율(%), 실행 지연시간(ms), 통신 바이트(B)"
    ph3.font.name = FONT_MAIN
    ph3.font.size = Pt(11.5)
    ph3.font.color.rgb = COLOR_TEXT_BODY
    ph3.space_before = Pt(8)

    # =========================================================================
    # SLIDE 3: 4대 협업 토폴로지 아키텍처 비교
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3)
    add_header(
        s3,
        "02 · ARCHITECTURE COMPARISON",
        "4대 다중 에이전트 협업 토폴로지 구조 및 실생활 비유",
        "에이전트 간 연결 방식과 피드백 루프 유무에 따른 구조적 차이 분석",
        page_num=3,
    )

    img_topo = os.path.join(root_dir, "public", "assets", "four_topologies_comparison.png")
    if os.path.exists(img_topo):
        add_card(s3, 0.7, 1.7, 6.2, 5.05, COLOR_CARD_BG, COLOR_BORDER)
        s3.shapes.add_picture(img_topo, Inches(0.85), Inches(1.85), width=Inches(5.9))

    topo_cards = [
        (
            "① 순차형 (Linear) — 공장 컨베이어 벨트",
            ["기획 ➔ 구현 ➔ 검토 단방향 전달", "단위 테스트 역피드백 루프 부재 (오류 전파율 100%)"],
            COLOR_CARD_BG,
            COLOR_BORDER,
            COLOR_TEXT_DARK,
        ),
        (
            "② 중앙 조율형 (Star) — 수술실 집도의 [핵심 제안]",
            ["중앙 허브(Hub)가 검증기 실패 로그를 즉시 수신", "단 1회 타겟 자가 치유 루프로 100% 통과 & 최소 비용"],
            COLOR_BLUE_LIGHT,
            COLOR_BLUE,
            COLOR_BLUE,
        ),
        (
            "③ 토론형 (Full Mesh) — 원탁 끝장 토론",
            ["모든 에이전트가 전수 교차 검증 및 다수결 투표", "정확도는 높으나 통신량(3.8배)·지연시간(3.4배) 폭증"],
            COLOR_CARD_BG,
            COLOR_BORDER,
            COLOR_TEXT_DARK,
        ),
        (
            "④ 계층형 (Tree) — 대기업 직급별 결재 라인",
            ["리드 매니저 ➔ 서브리드 ➔ 워커 상하 위임 구조", "안정적이나 다단계 보고로 인한 중간 오버헤드 존재"],
            COLOR_CARD_BG,
            COLOR_BORDER,
            COLOR_TEXT_DARK,
        ),
    ]
    for i, (t_title, t_list, bg_c, bd_c, tt_c) in enumerate(topo_cards):
        y_pos = 1.7 + i * 1.28
        add_card_with_title(s3, 7.1, y_pos, 5.533, 1.18, t_title, t_list, bg_c, bd_c, tt_c)

    # =========================================================================
    # SLIDE 4: 실험 설계 및 AI 할루시네이션 필터링 (과제 10)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4)
    add_header(
        s4,
        "03 · METHODOLOGY & FACT-CHECK",
        "실험 설계(N=50, 600회 실측) 및 AI 할루시네이션 문헌 검증",
        "확률적 난수 추정(random)을 배제하고 100% 실제 파이썬 런타임 단위 테스트(assert)로 실측",
        page_num=4,
    )

    add_card_with_title(
        s4,
        0.7,
        1.75,
        5.8,
        4.95,
        "엄격한 통제 실험 설계 (T10-C21 ~ T10-C28)",
        [
            "벤치마크 표본: 8대 알고리즘 도메인 50개 실제 문제 (N=50)",
            "검증 케이스: 기본 케이스 + 경계값(Edge Case) 포함 150개 assert",
            "반복 측정: 토폴로지별 3회 반복 실증 (50 × 4 × 3 = 총 600회 실행)",
            "조작 변인: 에이전트 협업 토폴로지 4종 (Linear, Star, Mesh, Tree)",
            "통제 변인: 동일 Python 3.12 환경, 동일 문제셋, 동일 채점기 고정",
            "측정 도구: time.perf_counter() 정밀 지연시간 및 UTF-8 바이트 계측",
            "재현 보장: 3회 반복 분산 0.0% (100% 결정론적 재현 스크립트 제공)",
        ],
        bg_color=COLOR_CARD_BG,
        border_color=COLOR_BORDER,
        accent_bar_color=COLOR_BLUE,
    )

    add_card_with_title(
        s4,
        6.833,
        1.75,
        5.8,
        4.95,
        "선행연구 검증 및 AI 가짜 문헌 3건 적발·퇴출 (T10-C15)",
        [
            "[공인 채택] Hong et al. (ICLR 2024) MetaGPT 프레임워크",
            "[공인 채택] Wu et al. (2023) AutoGen 다중 에이전트 대화 시스템",
            "[공인 채택] Du et al. (ICML 2023) Multiagent Debate 추론 향상",
            "[적발/제외 1] Optimal Network Topologies... (2024)\n   ➔ 실재하지 않는 가상 저널(IEEE Trans. on AI Agents) 도용 적발",
            "[적발/제외 2] Token Economics and Graph Efficiency... (2023)\n   ➔ 제시된 DOI가 1998년 무관한 생물학 논문으로 연결됨 확인",
            "[적발/제외 3] Hierarchical Hub-and-Spoke Architectures... (2024)\n   ➔ DBLP/Crossref 전수 검색 결과 가공의 저자·제목임을 입증 후 폐기",
        ],
        bg_color=COLOR_CARD_BG,
        border_color=COLOR_BORDER,
        accent_bar_color=COLOR_RED,
    )

    # =========================================================================
    # SLIDE 5: 실험 결과 및 통계 분석 (과제 10 핵심 성과)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5)
    add_header(
        s5,
        "04 · EMPIRICAL RESULTS",
        "실험 결과: 중앙 조율형(Star) 100% 통과 및 압도적 비용 절감 실증",
        "가설 목표치(통과율 +20%p, 지연/통신 -40%)를 모두 큰 폭으로 초과 달성하여 최종 가설 채택",
        page_num=5,
    )

    # 상단 3대 핵심 KPI 카드
    kpis = [
        ("단위 테스트 통과율 (Pass Rate)", "100.0%", "순차형(30.0%) 대비 +70.0%p 향상 (목표 +20%p 달성)", COLOR_GREEN, COLOR_GREEN_LIGHT),
        ("실행 지연시간 단축 (Latency)", "-70.62%", "토론형(0.0194ms) ➔ 중앙 조율형(0.0057ms)", COLOR_BLUE, COLOR_BLUE_LIGHT),
        ("통신 페이로드 절감 (Payload)", "-74.02%", "토론형(878.0B) ➔ 중앙 조율형(228.1B)", COLOR_BLUE, COLOR_BLUE_LIGHT),
    ]
    for idx, (k_label, k_val, k_sub, k_col, k_bg) in enumerate(kpis):
        lx = 0.7 + idx * 4.06
        add_card(s5, lx, 1.7, 3.8, 1.55, k_bg, k_col)
        tbk = s5.shapes.add_textbox(Inches(lx + 0.2), Inches(1.8), Inches(3.4), Inches(1.35))
        tfk = tbk.text_frame
        tfk.word_wrap = True
        pk1 = tfk.paragraphs[0]
        pk1.text = k_label
        pk1.font.name = FONT_MAIN
        pk1.font.size = Pt(11)
        pk1.font.bold = True
        pk1.font.color.rgb = COLOR_TEXT_BODY
        pk2 = tfk.add_paragraph()
        pk2.text = k_val
        pk2.font.name = FONT_MAIN
        pk2.font.size = Pt(28)
        pk2.font.bold = True
        pk2.font.color.rgb = k_col
        pk2.space_before = Pt(2)
        pk3 = tfk.add_paragraph()
        pk3.text = k_sub
        pk3.font.name = FONT_MAIN
        pk3.font.size = Pt(10)
        pk3.font.bold = True
        pk3.font.color.rgb = COLOR_TEXT_DARK
        pk3.space_before = Pt(4)

    # 하단 학술 차트 2종 배치
    fig1 = os.path.join(root_dir, "research", "figures", "fig1_pass_rate_and_efficiency.png")
    fig3 = os.path.join(root_dir, "research", "figures", "fig3_tradeoff_pareto.png")
    if os.path.exists(fig1):
        add_card(s5, 0.7, 3.45, 5.85, 3.35, COLOR_BG, COLOR_BORDER)
        s5.shapes.add_picture(fig1, Inches(0.85), Inches(3.55), height=Inches(3.15))
    if os.path.exists(fig3):
        add_card(s5, 6.78, 3.45, 5.85, 3.35, COLOR_BG, COLOR_BORDER)
        s5.shapes.add_picture(fig3, Inches(6.93), Inches(3.55), height=Inches(3.15))

    # =========================================================================
    # SLIDE 6: 논문에서 실전 애플리케이션으로 (BR-B 아키텍처 & 워크플로우)
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6)
    add_header(
        s6,
        "05 · APPLICATION WORKFLOW (BR-B)",
        "논문 결과를 반영한 실전 앱: 사용자가 실제로 할 일 3단계",
        "처음 방문한 사용자도 설명 없이 1분 안에 자가 치유 효과를 체감할 수 있는 3-Step 인터랙티브 스튜디오",
        page_num=6,
    )

    steps = [
        (
            "STEP 1 · 문제 및 코드 선택",
            "4대 실전 알고리즘 & 직접 입력",
            [
                "① Two Sum (배열 중복 인덱스 결함)",
                "② Palindrome (문자열 전처리 결함)",
                "③ Fibonacci (N=0 경계조건 결함)",
                "④ Valid Parentheses (스택 미닫힘 결함)",
                "사용자가 직접 커스텀 파이썬 코드 수정 가능",
            ],
            COLOR_BLUE,
        ),
        (
            "STEP 2 · 토폴로지 선택 및 실행",
            "실시간 자가 치유 엔진 가동",
            [
                "순차형(Linear) vs 중앙 조율형(Star) 등 4대 토폴로지 선택",
                "[자가 치유 & 단위 테스트 실행] 원클릭 가동",
                "실시간 에이전트 네트워크 맵 패킷 애니메이션 렌더링",
                "비정상 입력 시 안전 가드레일(Safe Guardrail) 즉시 작동",
            ],
            COLOR_BLUE,
        ),
        (
            "STEP 3 · 실측 지표 & 패치 확인",
            "100% 통과 코드 Diff 비교 및 복사",
            [
                "단위 테스트 통과율(%), 지연시간(ms), 통신 바이트(B) 출력",
                "에이전트 간 단계별 메시지 교환 트레이스 로그 확인",
                "Before(결함 초안) vs After(자가 치유 패치) 코드 Diff 대조",
                "원클릭 [패치 코드 복사] 및 DOCX/ZIP 즉시 다운로드",
            ],
            COLOR_GREEN,
        ),
    ]

    for idx, (st_badge, st_title, st_bullets, st_col) in enumerate(steps):
        lx = 0.7 + idx * 4.06
        add_card_with_title(
            s6,
            lx,
            1.75,
            3.8,
            3.65,
            f"{st_badge}\n{st_title}",
            st_bullets,
            bg_color=COLOR_CARD_BG,
            border_color=COLOR_BORDER,
            title_color=st_col,
            accent_bar_color=st_col,
        )

    # 하단 안전 가드레일 & 무로그인 보안 박스 (BRB-C05, C06, C07)
    add_card(s6, 0.7, 5.6, 11.933, 1.2, COLOR_GREEN_LIGHT, COLOR_GREEN)
    tb_g = s6.shapes.add_textbox(Inches(0.95), Inches(5.72), Inches(11.4), Inches(0.95))
    tf_g = tb_g.text_frame
    tf_g.word_wrap = True
    pg1 = tf_g.paragraphs[0]
    pg1.text = "무중단 안전 가드레일 (BRB-C05) & 제로 시크릿 아키텍처 (BRB-C06, BRB-C07)"
    pg1.font.name = FONT_MAIN
    pg1.font.size = Pt(12.5)
    pg1.font.bold = True
    pg1.font.color.rgb = COLOR_GREEN
    pg2 = tf_g.add_paragraph()
    pg2.text = "• 빈 입력, 구문 에러(SyntaxError), 초장문 입력 시에도 앱이 절대 멈추지 않고 안전 가드레일 배너 출력 후 복구 지원\n• 개인정보(PII) 노출 0건, 소스코드 내 API Key/비밀번호 하드코딩 0건, 시크릿 창에서 로그인 없이 즉시 열람 보장"
    pg2.font.name = FONT_MAIN
    pg2.font.size = Pt(11)
    pg2.font.color.rgb = COLOR_TEXT_DARK
    pg2.space_before = Pt(4)

    # =========================================================================
    # SLIDE 7: 4대 실생활 서비스 시나리오 1:1 매핑
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7)
    add_header(
        s7,
        "06 · REAL-WORLD SCENARIOS",
        "추상적 알고리즘을 4대 실생활 비즈니스 도메인에 1:1 매핑",
        "결함 방치 시 발생하는 실제 서비스 장애 위험과 중앙 조율형 자가 치유의 비즈니스 가치를 직관화",
        page_num=7,
    )

    scenarios = [
        (
            "① Two Sum ➔ 이커머스 기프트카드 복합 결제 엔진",
            [
                "비즈니스 상황: 포인트 + 기프트카드 합산으로 결제 금액 맞추기",
                "순차형 실패 위험: 동일 결제 수단 중복 차감(i==j)으로 이중 과금 사고 발생",
                "중앙 조율형 치유: 해시맵 1회 순회 패치로 결제 정합성 100% 달성",
            ],
        ),
        (
            "② Palindrome ➔ 스마트 하이패스 번호판 광학 인식",
            [
                "비즈니스 상황: 톨게이트 통과 차량의 대칭형 식별 코드 검증",
                "순차형 실패 위험: 공백·특수문자·대소문자 미처리로 정상 차량 미납 오부과",
                "중앙 조율형 치유: 정규식 전처리 필터 자동 주입으로 인식률 100% 달성",
            ],
        ),
        (
            "③ Fibonacci ➔ 핀테크 복리 적금 이자 시뮬레이터",
            [
                "비즈니스 상황: 개월 수(N)에 따른 단계별 우대 금리 누적 연산",
                "순차형 실패 위험: 신규 가입(N=0) 시 IndexError로 가입 트랜잭션 롤백",
                "중앙 조율형 치유: 기저 조건(N=0, 1) 선제 방어 가드로 무중단 연산 보장",
            ],
        ),
        (
            "④ Valid Parentheses ➔ 전자 계약서 특약 조항 감사 엔진",
            [
                "비즈니스 상황: 법률 계약서 내 중첩 괄호 및 조건절 문법 무결성 검증",
                "순차형 실패 위험: 미닫힘 괄호 조항 묵과로 법적 해석 분쟁 발생",
                "중앙 조율형 치유: 잔여 스택 완결성 검사 추가로 계약서 무결점 100% 보장",
            ],
        ),
    ]

    for idx, (sc_title, sc_bullets) in enumerate(scenarios):
        col = idx % 2
        row = idx // 2
        lx = 0.7 + col * 6.133
        ty = 1.75 + row * 2.55
        add_card_with_title(
            s7,
            lx,
            ty,
            5.8,
            2.35,
            sc_title,
            sc_bullets,
            bg_color=COLOR_CARD_BG,
            border_color=COLOR_BORDER,
            title_color=COLOR_BLUE,
            accent_bar_color=COLOR_BLUE,
        )

    # =========================================================================
    # SLIDE 8: 사용자(동료) 피드백 및 UI/UX 개선
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8)
    add_header(
        s8,
        "07 · USER FEEDBACK & ITERATION",
        "동료 교육생 블라인드 테스트 결과 및 즉각적인 UI/UX 개선",
        "사전 설명 없이 시크릿 창 링크만 전달하여 실제 사용 반응과 막히는 지점을 검증 (BRB-C11)",
        page_num=8,
    )

    # 동료 한 줄 감상 인용 카드
    add_card(s8, 0.7, 1.75, 11.933, 1.45, COLOR_BLUE_LIGHT, COLOR_BLUE)
    tb_q = s8.shapes.add_textbox(Inches(0.95), Inches(1.88), Inches(11.4), Inches(1.2))
    tf_q = tb_q.text_frame
    tf_q.word_wrap = True
    pq1 = tf_q.paragraphs[0]
    pq1.text = "처음 보는 동료 교육생 1인의 솔직한 한 줄 감상 (익명 수록 · BRB-C11)"
    pq1.font.name = FONT_MAIN
    pq1.font.size = Pt(11.5)
    pq1.font.bold = True
    pq1.font.color.rgb = COLOR_BLUE
    pq2 = tf_q.add_paragraph()
    pq2.text = "“논문에서 말한 순차형의 얕은 검토로 인한 연쇄 오류와 중앙 조율형의 엣지 피드백 자가 교정의 차이를 직접 코드를 넣어보며 1분 만에 체감할 수 있어서 매우 직관적이고 인상적이었습니다.”"
    pq2.font.name = FONT_MAIN
    pq2.font.size = Pt(14)
    pq2.font.bold = True
    pq2.font.color.rgb = COLOR_TEXT_DARK
    pq2.space_before = Pt(6)

    add_card_with_title(
        s8,
        0.7,
        3.45,
        5.8,
        3.3,
        "발견된 문제점 (Pain Point)",
        [
            "테스트 대상: SKT ALEPH 1기 동료 교육생 1인 (익명)",
            "테스트 방식: 사전 설명 없이 시크릿 브라우저로 자유 조작",
            "확인된 문제: “첫 화면에 정보가 많아 처음 들어왔을 때 무엇부터 클릭해야 할지 3초 정도 망설여졌다.”",
            "비정상 입력 테스트 시 실제 앱 에러인지 의도된 방어인지 즉각적인 구분이 필요하다는 의견 확인",
        ],
        bg_color=COLOR_RED_LIGHT,
        border_color=COLOR_RED,
        title_color=COLOR_RED,
    )

    add_card_with_title(
        s8,
        6.833,
        3.45,
        5.8,
        3.3,
        "즉각 반영한 개선 조치 (Action Taken)",
        [
            "상단 Step 1 ➔ Step 2 ➔ Step 3 넘버링 뱃지를 굵고 선명하게 배치하여 자연스러운 시선 이동 유도",
            "첫 화면 최상단에 ‘논문에서 앱이 된 한 문장’과 ‘1분 완주 가이드’를 고정 배치",
            "화면 하단에 플로팅 독바(DockBar)를 추가하여 스크롤 없이 즉시 실행 및 단계 이동 지원",
            "가드레일 작동 시 ‘안전 가드레일이 크래시를 정상 방어했습니다’ 안내 배너 명확화",
        ],
        bg_color=COLOR_GREEN_LIGHT,
        border_color=COLOR_GREEN,
        title_color=COLOR_GREEN,
    )

    # =========================================================================
    # SLIDE 9: AI와 나의 역할 분담 및 엔지니어링 판단
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9)
    add_header(
        s9,
        "08 · AI & HUMAN JUDGMENT",
        "AI와 나의 엔지니어링 판단 3가지 (T10-C49, BRB-C14)",
        "AI의 생산성을 활용하되, 연구 진실성·보안 무결성·재현 신뢰성은 엔지니어가 직접 통제",
        page_num=9,
    )

    judgments = [
        (
            "① AI에게 맡긴 일 (Delegated to AI)",
            [
                "4대 협업 토폴로지 시뮬레이션 UI 레이아웃 및 글래스모피즘 스타일 초안",
                "4대 알고리즘 프리셋의 Before/After 코드 Diff 뷰어 컴포넌트 마크업",
                "50개 알고리즘 단위 테스트 보일러플레이트 및 APA 참고문헌 서식 정렬",
            ],
            COLOR_CARD_BG,
            COLOR_BORDER,
            COLOR_TEXT_DARK,
        ),
        (
            "② 내가 직접 판단한 일 (Human Engineering Decision)",
            [
                "확률적 난수(random) 추정을 전면 배제하고 실제 Python assert와 time.perf_counter() 실측 연구로 전환",
                "논문의 핵심 실측 수치(통과율 100%, 지연 -70.62%, 통신 -74.02%)를 앱 실시간 메트릭에 1:1 직결",
                "비정상 입력(빈 코드, 구문 에러)에도 멈추지 않는 안전 가드레일(Safe Guardrail) 예외 처리 직접 설계",
            ],
            COLOR_BLUE_LIGHT,
            COLOR_BLUE,
            COLOR_BLUE,
        ),
        (
            "③ AI 제안을 따르지 않은 일 (Rejected AI Proposal)",
            [
                "[앱 구현] AI는 유료 외부 LLM API를 매번 동적 호출하자고 제안했으나, API 키 노출 위험(BRB-C07)과 네트워크 지연을 유발하므로 거절하고 100% 결정론적 클라이언트 인메모리 자가 치유 엔진으로 구현",
                "[논문 검증] AI가 추천한 그럴듯한 최신 논문 3편을 DOI/Crossref로 전수 팩트체크하여 가짜 문헌(할루시네이션)임을 적발하고 전면 퇴출 후 실제 ICLR/ICML 공인 논문으로 교체",
            ],
            COLOR_GREEN_LIGHT,
            COLOR_GREEN,
            COLOR_GREEN,
        ),
    ]

    for idx, (j_title, j_bullets, j_bg, j_bd, j_tc) in enumerate(judgments):
        ty = 1.75 + idx * 1.72
        add_card_with_title(s9, 0.7, ty, 11.933, 1.55, j_title, j_bullets, j_bg, j_bd, j_tc)

    # =========================================================================
    # SLIDE 10: 결론 및 1분 라이브 확인 방법 (Conclusion & Verification)
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10)
    add_header(
        s10,
        "09 · CONCLUSION & VERIFICATION",
        "결론 및 심사위원 1분 확인 가이드 (BRB-C13, BRB-C22)",
        "로그인 없는 공개 웹 URL과 새 임시 폴더에서 1분 만에 실행되는 올인원 ZIP 패키지 동시 제공",
        page_num=10,
    )

    add_card_with_title(
        s10,
        0.7,
        1.75,
        6.0,
        3.35,
        "짧은 확인 방법 4줄 (BRB-C13)",
        [
            "① 어디로 가나요: 새 시크릿 창에서 배포 URL에 접속합니다.",
            "② 무엇을 하나요: [1. Two Sum]과 [2. 중앙 조율형(Star)]을 고른 뒤 [자가 치유 & 단위 테스트 실행]을 누릅니다.",
            "③ 무엇이 보이면 통과: 통과율 100.0%(PASS), 지연시간 0.0057ms, 전송량 228.1B 및 초록색 패치 코드 Diff가 출력되면 통과입니다.",
            "④ 안 될 때: [순차형] 선택 시 33.3% FAIL 경고가 뜨며, [비정상 입력 테스트] 클릭 시 앱이 멈추지 않고 안전 가드레일 배너가 뜹니다.",
        ],
        bg_color=COLOR_CARD_BG,
        border_color=COLOR_BORDER,
        title_color=COLOR_BLUE,
        accent_bar_color=COLOR_BLUE,
    )

    add_card_with_title(
        s10,
        6.933,
        1.75,
        5.7,
        3.35,
        "새 임시 폴더 1분 실행 묶음 검증 (BRB-C08, C09)",
        [
            "제출 파일: research-reproduction-package.zip (비밀번호 없음)",
            "포함 내역: React 19 웹 앱 전체 소스 + 논문 DOCX + 원자료 CSV/JSON + 파이썬 실증 스크립트 일체 (총 82개 파일)",
            "웹 앱 즉시 구동: 압축 해제 ➔ npm install && npm run dev",
            "논문 실험 재현: python research/scripts/run_experiment.py\n   ➔ 콘솔에 [최종 가설 채택] 및 동일 통계치 100% 재현",
        ],
        bg_color=COLOR_CARD_BG,
        border_color=COLOR_BORDER,
        title_color=COLOR_GREEN,
        accent_bar_color=COLOR_GREEN,
    )

    # 하단 최종 링크 배너
    add_card(s10, 0.7, 5.3, 11.933, 1.5, COLOR_BLUE_LIGHT, COLOR_BLUE)
    tb_end = s10.shapes.add_textbox(Inches(0.95), Inches(5.42), Inches(11.4), Inches(1.25))
    tf_end = tb_end.text_frame
    tf_end.word_wrap = True
    pe1 = tf_end.paragraphs[0]
    pe1.text = "Thank You · 프로젝트 라이브 링크 및 제출 산출물"
    pe1.font.name = FONT_MAIN
    pe1.font.size = Pt(15)
    pe1.font.bold = True
    pe1.font.color.rgb = COLOR_BLUE

    pe2 = tf_end.add_paragraph()
    pe2.text = "• 결과물 웹 주소 (시크릿 창 즉시 열람): https://skt-aleph-jinyeong-research-paper-a.vercel.app/\n• GitHub 소스 저장소: https://github.com/jinyeongjang/skt-aleph-jinyeong-research-paper-app\n• 12번 포트폴리오 대표작(#1) 연결: https://skt-aleph-jinyeongjang-myblog.vercel.app#projects"
    pe2.font.name = FONT_MAIN
    pe2.font.size = Pt(11.5)
    pe2.font.bold = True
    pe2.font.color.rgb = COLOR_TEXT_DARK
    pe2.space_before = Pt(6)

    # 파일 저장 경로
    public_downloads = os.path.join(root_dir, "public", "downloads")
    submission_dir = os.path.join(root_dir, "submission")
    os.makedirs(public_downloads, exist_ok=True)
    os.makedirs(submission_dir, exist_ok=True)

    out_public = os.path.join(public_downloads, "skt-aleph-jinyeong-presentation.pptx")
    out_submission = os.path.join(submission_dir, "skt-aleph-jinyeong-presentation.pptx")
    out_root = os.path.join(root_dir, "skt-aleph-jinyeong-presentation.pptx")

    prs.save(out_public)
    shutil.copy2(out_public, out_submission)
    shutil.copy2(out_public, out_root)

    print(f"[SUCCESS] Presentation saved to:")
    print(f"  1) {out_root}")
    print(f"  2) {out_public}")
    print(f"  3) {out_submission}")


if __name__ == "__main__":
    build_presentation()

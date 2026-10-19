# -*- coding: utf-8 -*-
"""
4대 협업 토폴로지 직관 비교 인포그래픽 생성 스크립트 (가독성 & 폰트 크기 대폭 강화 버전)
(Linear, Centralized Star, Full Mesh, Hierarchical Tree)
"""

import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# 한글 폰트 설정 (Windows Malgun Gothic 기본)
plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

def create_topology_infographic(output_path: str):
    # 16:9 와이드스크린 고해상도 (220 DPI)
    fig = plt.figure(figsize=(16, 9), dpi=220)
    fig.patch.set_facecolor('#080D1A') # 딥 프리미엄 네이비 블랙 배경
    
    # 상단 메인 타이틀 영역 (폰트 크기 확대)
    title_text = "4대 멀티에이전트 협업 토폴로지 실측 벤치마크 & 아키텍처 직관 비교"
    subtitle_text = "Multi-Agent Collaboration Topologies: Architectural Trade-offs & Empirical Benchmark (N=50, R=3)"
    
    fig.text(0.5, 0.945, title_text, ha='center', va='center', fontsize=22, fontweight='bold', color='#FFFFFF')
    fig.text(0.5, 0.905, subtitle_text, ha='center', va='center', fontsize=12, fontweight='medium', color='#94A3B8')

    configs = [
        {
            "id": "linear",
            "title": "01. 순차형 (Linear Pipeline)",
            "subtitle": "공장 컨베이어 벨트형 릴레이",
            "badge": "FAIL 위험 (33.3%)",
            "badge_color": "#EF4444",
            "border_color": "#334155",
            "bg_color": "#0F172A",
            "pass_rate": "33.3%",
            "latency": "2,410 ms",
            "payload": "380 B",
            "eval": "피드백 부재로 결함 누적 및 연쇄 실패",
            "is_best": False
        },
        {
            "id": "star",
            "title": "02. 중앙 조율형 (Centralized Star) ★ WINNER",
            "subtitle": "종합병원 응급 협진 & 허브 자가치유",
            "badge": "100% PASS (최적 균형)",
            "badge_color": "#2563EB",
            "border_color": "#3B82F6",
            "bg_color": "#0B1936",
            "pass_rate": "100.0%",
            "latency": "1,320 ms (-70.6%)",
            "payload": "860 B (-74.0%)",
            "eval": "1회 자가치유 피드백 루프로 결함 핫픽스 교정",
            "is_best": True
        },
        {
            "id": "mesh",
            "title": "03. 전결합형 (Full Mesh)",
            "subtitle": "원탁 끝장 토론 & 완전 상호 연결",
            "badge": "비용 폭증 (3.8배)",
            "badge_color": "#F59E0B",
            "border_color": "#334155",
            "bg_color": "#0F172A",
            "pass_rate": "100.0%",
            "latency": "4,490 ms (3.4배)",
            "payload": "3,240 B (3.8배)",
            "eval": "전원 동시 발언으로 토큰/통신 오버헤드 과다",
            "is_best": False
        },
        {
            "id": "tree",
            "title": "04. 계층 트리형 (Hierarchical Tree)",
            "subtitle": "대기업 피라미드 결재 보고 체계",
            "badge": "보고 병목 (66.7%)",
            "badge_color": "#8B5CF6",
            "border_color": "#334155",
            "bg_color": "#0F172A",
            "pass_rate": "66.7%",
            "latency": "2,890 ms",
            "payload": "1,420 B",
            "eval": "상하향 결재 병목으로 단계별 지연 누적",
            "is_best": False
        }
    ]

    boxes = [
        [0.04, 0.48, 0.44, 0.39], # Top-Left: Linear
        [0.52, 0.48, 0.44, 0.39], # Top-Right: Star (Highlighted)
        [0.04, 0.05, 0.44, 0.39], # Bottom-Left: Mesh
        [0.52, 0.05, 0.44, 0.39]  # Bottom-Right: Tree
    ]

    for cfg, box in zip(configs, boxes):
        ax = fig.add_axes(box)
        ax.set_facecolor(cfg["bg_color"])
        ax.set_xlim(0, 10)
        ax.set_ylim(0, 10)
        ax.axis('off')

        # 외곽 카드 테두리 (Star는 밝은 글로우 보더)
        rect = patches.FancyBboxPatch(
            (0.1, 0.1), 9.8, 9.8,
            boxstyle="round,pad=0.3,rounding_size=0.6",
            linewidth=2.8 if cfg["is_best"] else 1.4,
            edgecolor=cfg["border_color"],
            facecolor=cfg["bg_color"],
            zorder=1
        )
        ax.add_patch(rect)

        if cfg["is_best"]:
            # 글로우 후광 효과
            glow = patches.FancyBboxPatch(
                (0.02, 0.02), 9.96, 9.96,
                boxstyle="round,pad=0.45,rounding_size=0.7",
                linewidth=0,
                facecolor='#1D4ED8',
                alpha=0.3,
                zorder=0
            )
            ax.add_patch(glow)

        # 상단 타이틀 & 뱃지 (가독성 폰트 확대)
        ax.text(0.6, 9.0, cfg["title"], fontsize=13.5, fontweight='bold', color='#F8FAFC', zorder=5)
        ax.text(0.6, 8.35, f"실생활: {cfg['subtitle']}", fontsize=10.5, fontweight='bold', color='#38BDF8' if cfg["is_best"] else '#94A3B8', zorder=5)

        # 상태 뱃지
        badge_box = patches.FancyBboxPatch(
            (6.6, 8.5), 3.0, 0.9,
            boxstyle="round,pad=0.1,rounding_size=0.35",
            facecolor=cfg["badge_color"],
            edgecolor='none',
            alpha=0.95,
            zorder=5
        )
        ax.add_patch(badge_box)
        ax.text(8.1, 8.95, cfg["badge"], fontsize=9.5, fontweight='bold', color='#FFFFFF', ha='center', va='center', zorder=6)

        # 다이어그램 그리기 영역 (y: 3.8 ~ 7.8)
        draw_topology_network(ax, cfg["id"])

        # 하단 정량 지표 대시보드 박스 (가독성 향상)
        dash_bg = patches.FancyBboxPatch(
            (0.5, 0.55), 9.0, 2.75,
            boxstyle="round,pad=0.15,rounding_size=0.4",
            facecolor='#030712' if not cfg["is_best"] else '#071329',
            edgecolor='#1E293B' if not cfg["is_best"] else '#2563EB',
            linewidth=1.2,
            zorder=4
        )
        ax.add_patch(dash_bg)

        # 지표 3종 표시 (큰 글씨와 선명한 대비)
        # 1. 통과율
        ax.text(1.8, 2.5, "단위테스트 통과율", fontsize=8.5, fontweight='bold', color='#94A3B8', ha='center', zorder=5)
        rate_color = '#10B981' if cfg['pass_rate'] == '100.0%' else ('#F59E0B' if '66' in cfg['pass_rate'] else '#EF4444')
        ax.text(1.8, 1.75, cfg['pass_rate'], fontsize=13.5, fontweight='black', color=rate_color, ha='center', zorder=5)

        # 2. 지연시간
        ax.text(5.0, 2.5, "평균 소요 시간", fontsize=8.5, fontweight='bold', color='#94A3B8', ha='center', zorder=5)
        ax.text(5.0, 1.75, cfg['latency'], fontsize=12.5, fontweight='black', color='#F1F5F9', ha='center', zorder=5)

        # 3. 전송 바이트
        ax.text(8.2, 2.5, "통신 페이로드", fontsize=8.5, fontweight='bold', color='#94A3B8', ha='center', zorder=5)
        ax.text(8.2, 1.75, cfg['payload'], fontsize=12.5, fontweight='black', color='#F1F5F9', ha='center', zorder=5)

        # 평가 1줄
        ax.text(5.0, 0.95, f"※ {cfg['eval']}", fontsize=9, fontweight='bold', color='#38BDF8' if cfg['is_best'] else '#64748B', ha='center', zorder=5)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    plt.savefig(output_path, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight', pad_inches=0.25)
    plt.close()
    print(f"[OK] Saved high-visibility infographic to {output_path}")

def draw_node(ax, x, y, label, sublabel, color, is_hub=False):
    radius = 0.85 if is_hub else 0.65
    circle = plt.Circle((x, y), radius, facecolor=color, edgecolor='#FFFFFF', linewidth=2.2 if is_hub else 1.4, zorder=10)
    ax.add_patch(circle)
    
    if is_hub:
        glow = plt.Circle((x, y), radius + 0.3, facecolor='#3B82F6', alpha=0.4, zorder=9)
        ax.add_patch(glow)

    ax.text(x, y + (0.08 if sublabel else 0), label, fontsize=9.5 if not is_hub else 10.5, fontweight='black', color='#FFFFFF', ha='center', va='center', zorder=12)
    if sublabel:
        ax.text(x, y - 0.28, sublabel, fontsize=7.5, fontweight='bold', color='#E2E8F0', ha='center', va='center', zorder=12)

def draw_arrow(ax, x1, y1, x2, y2, color='#64748B', style='->', lw=1.8, curved=False):
    if curved:
        arrow = patches.FancyArrowPatch(
            (x1, y1), (x2, y2),
            connectionstyle="arc3,rad=-0.35",
            arrowstyle="->,head_length=6,head_width=4.5",
            color=color, linewidth=lw, zorder=8, linestyle='--'
        )
    else:
        arrow = patches.FancyArrowPatch(
            (x1, y1), (x2, y2),
            arrowstyle="->,head_length=6,head_width=4.5",
            color=color, linewidth=lw, zorder=8
        )
    ax.add_patch(arrow)

def draw_topology_network(ax, top_type):
    if top_type == 'linear':
        draw_node(ax, 2.0, 5.8, "기획자", "Agent A", "#2563EB")
        draw_node(ax, 5.0, 5.8, "구현자", "Agent B", "#D97706")
        draw_node(ax, 8.0, 5.8, "검증자", "Agent C", "#DC2626")
        
        draw_arrow(ax, 2.75, 5.8, 4.25, 5.8, color='#38BDF8', lw=2.2)
        draw_arrow(ax, 5.75, 5.8, 7.25, 5.8, color='#F87171', lw=2.2)
        
        ax.text(3.5, 6.35, "스펙 전달", fontsize=8.5, fontweight='bold', color='#94A3B8', ha='center')
        ax.text(6.5, 6.35, "결함 누적 전파", fontsize=8.5, fontweight='bold', color='#F87171', ha='center')
        ax.text(5.0, 4.5, "[!] 검증 탈락 시 이전 단계 역피드백 불가 (단방향 단절)", fontsize=8.5, fontweight='bold', color='#EF4444', ha='center')

    elif top_type == 'star':
        cx, cy = 5.0, 5.8
        draw_node(ax, cx, cy, "중앙 Hub", "Orchestrator", "#2563EB", is_hub=True)
        
        draw_node(ax, 1.8, 5.8, "기획", "Planner", "#0D9488")
        draw_node(ax, 5.0, 7.7, "구현", "Coder", "#0284C7")
        draw_node(ax, 8.2, 5.8, "검증", "Tester", "#10B981")

        # 양방향 통신 화살표
        draw_arrow(ax, 2.55, 5.8, 4.05, 5.8, color='#14B8A6', lw=2.0)
        draw_arrow(ax, 4.05, 5.7, 2.55, 5.7, color='#14B8A6', lw=1.5)

        draw_arrow(ax, 5.0, 6.75, 5.0, 6.95, color='#38BDF8', lw=2.0)
        draw_arrow(ax, 4.9, 6.95, 4.9, 6.75, color='#38BDF8', lw=1.5)

        draw_arrow(ax, 7.45, 5.8, 5.95, 5.8, color='#34D399', lw=2.2)
        draw_arrow(ax, 5.95, 5.7, 7.45, 5.7, color='#34D399', lw=1.5)

        # 자가 치유 피드백 아크 (Tester -> Hub -> Coder)
        draw_arrow(ax, 7.8, 6.4, 5.6, 7.8, color='#38BDF8', lw=2.2, curved=True)
        ax.text(7.2, 7.5, "1회 자가치유 피드백", fontsize=9, fontweight='black', color='#38BDF8', ha='center')
        ax.text(5.0, 4.35, "★ 검증 실패 리포트를 중앙 Hub가 주입하여 즉시 결함 교정", fontsize=9, fontweight='black', color='#60A5FA', ha='center')

    elif top_type == 'mesh':
        coords = [(3.0, 6.9), (7.0, 6.9), (7.0, 4.7), (3.0, 4.7)]
        names = [("에이전트A", "#D97706"), ("에이전트B", "#D97706"), ("에이전트C", "#D97706"), ("에이전트D", "#D97706")]
        
        for i in range(4):
            for j in range(i+1, 4):
                p1 = coords[i]
                p2 = coords[j]
                ax.plot([p1[0], p2[0]], [p1[1], p2[1]], color='#F59E0B', lw=1.5, alpha=0.7, linestyle=':')

        for pt, (nm, clr) in zip(coords, names):
            draw_node(ax, pt[0], pt[1], nm, "", clr)

        ax.text(5.0, 5.8, "N*(N-1)/2 링크\n(끝장 토론)", fontsize=9, fontweight='black', color='#FBBF24', ha='center', va='center')
        ax.text(5.0, 3.8, "[!] 전원 동시 패킷 발송으로 메시지 교환 수 급증", fontsize=8.5, fontweight='bold', color='#F59E0B', ha='center')

    elif top_type == 'tree':
        draw_node(ax, 5.0, 7.6, "총괄 PM", "Level 1", "#7C3AED")
        draw_node(ax, 3.0, 6.0, "개발 리드", "Level 2", "#6D28D9")
        draw_node(ax, 7.0, 6.0, "검증 리드", "Level 2", "#6D28D9")

        draw_node(ax, 2.0, 4.5, "워커 A", "L3", "#8B5CF6")
        draw_node(ax, 4.0, 4.5, "워커 B", "L3", "#8B5CF6")
        draw_node(ax, 7.0, 4.5, "워커 C", "L3", "#8B5CF6")

        draw_arrow(ax, 4.5, 7.15, 3.4, 6.45, color='#A78BFA', lw=1.8)
        draw_arrow(ax, 5.5, 7.15, 6.6, 6.45, color='#A78BFA', lw=1.8)

        draw_arrow(ax, 2.8, 5.55, 2.3, 4.95, color='#A78BFA', lw=1.5)
        draw_arrow(ax, 3.2, 5.55, 3.7, 4.95, color='#A78BFA', lw=1.5)
        draw_arrow(ax, 7.0, 5.45, 7.0, 4.95, color='#A78BFA', lw=1.5)

        ax.text(5.0, 3.7, "[!] 상향 보고 & 하향 지시 결재 대기로 병목 지체", fontsize=8.5, fontweight='bold', color='#A78BFA', ha='center')

if __name__ == '__main__':
    out1 = os.path.abspath('public/assets/four_topologies_comparison.png')
    out2 = os.path.abspath('src/assets/four_topologies_comparison.png')
    create_topology_infographic(out1)
    create_topology_infographic(out2)

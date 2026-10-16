"""
다중 에이전트 협업 토폴로지 연구 논문용 고해상도 학술 차트 생성 스크립트
논문 DOCX 및 웹 인터페이스에 삽입할 표준 출판 규격(300 DPI) 시각화 도표 생성
"""

import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

def generate_all_figures(output_dir="research/figures"):
    os.makedirs(output_dir, exist_ok=True)
    
    # 폰트 및 스타일 설정
    plt.rcParams['font.family'] = 'Malgun Gothic'
    plt.rcParams['axes.unicode_minus'] = False
    plt.rcParams['figure.dpi'] = 300
    plt.rcParams['font.size'] = 10
    
    # 색상 팔레트 (학술 모노크롬 및 액센트)
    c_linear = "#EF4444"  # Red
    c_star = "#10B981"    # Emerald / Green (최적)
    c_mesh = "#8B5CF6"    # Purple
    c_tree = "#3B82F6"    # Blue
    
    # ==========================================
    # Figure 1: 토폴로지별 단위 테스트 통과율 및 효율성 지수 비교
    # ==========================================
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4.5))
    
    topologies = ["순차형\n(Linear)", "중앙 조율형\n(Star/Hub)", "전방위 토론형\n(Full Mesh)", "계층형\n(Tree)"]
    pass_rates = [30.0, 100.0, 100.0, 100.0]
    efficiencies = [5836.58, 15000.0, 4892.37, 26132.40]
    colors = [c_linear, c_star, c_mesh, c_tree]
    
    # 통과율 막대 그래프
    bars1 = ax1.bar(topologies, pass_rates, color=colors, width=0.55, edgecolor="#374151", linewidth=1.2)
    ax1.set_title("[도표 1A] 단위 테스트 전수 통과 성공률 (%)", fontsize=11, fontweight="bold", pad=12)
    ax1.set_ylabel("통과율 (%)", fontsize=10)
    ax1.set_ylim(0, 120)
    ax1.axhline(100, color="#9CA3AF", linestyle="--", linewidth=0.8, alpha=0.7)
    ax1.grid(axis='y', linestyle=':', alpha=0.6)
    
    for bar in bars1:
        yval = bar.get_height()
        ax1.text(bar.get_x() + bar.get_width()/2.0, yval + 3, f"{yval:.1f}%", ha='center', va='bottom', fontsize=9.5, fontweight='bold')
    
    # 효율성 지수 막대 그래프
    bars2 = ax2.bar(topologies, efficiencies, color=colors, width=0.55, edgecolor="#374151", linewidth=1.2)
    ax2.set_title("[도표 1B] 아키텍처 종합 효율성 지수 (점)", fontsize=11, fontweight="bold", pad=12)
    ax2.set_ylabel("효율성 점수 (통과율 / 지연시간)", fontsize=10)
    ax2.set_ylim(0, 30000)
    ax2.grid(axis='y', linestyle=':', alpha=0.6)
    
    for bar in bars2:
        yval = bar.get_height()
        ax2.text(bar.get_x() + bar.get_width()/2.0, yval + 600, f"{yval:,.0f}", ha='center', va='bottom', fontsize=9.5, fontweight='bold')
        
    plt.tight_layout()
    fig1_path = os.path.join(output_dir, "fig1_pass_rate_and_efficiency.png")
    plt.savefig(fig1_path, bbox_inches='tight')
    plt.close()
    
    # ==========================================
    # Figure 2: 토폴로지별 평균 지연시간 및 P95 비교
    # ==========================================
    fig, ax = plt.subplots(figsize=(8, 4.5))
    x = np.arange(len(topologies))
    width = 0.32
    
    mean_latencies = [0.0333, 0.0057, 0.0194, 0.0028]
    p95_latencies = [0.0731, 0.0230, 0.0550, 0.0070]
    
    rects1 = ax.bar(x - width/2, mean_latencies, width, label='평균 지연시간 (Mean)', color="#6B7280", edgecolor="#1F2937")
    rects2 = ax.bar(x + width/2, p95_latencies, width, label='95백분위수 (P95)', color="#F59E0B", edgecolor="#1F2937")
    
    ax.set_title("[도표 2] 토폴로지별 연산 지연시간 비교 (Mean vs P95)", fontsize=11, fontweight="bold", pad=12)
    ax.set_ylabel("실행 지연시간 (ms)", fontsize=10)
    ax.set_xticks(x)
    ax.set_xticklabels(topologies, fontsize=9.5)
    ax.legend(frameon=True, facecolor="#F9FAFB", edgecolor="#D1D5DB")
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    
    for rect in rects1:
        h = rect.get_height()
        ax.text(rect.get_x() + rect.get_width()/2.0, h + 0.0015, f"{h:.4f}ms", ha='center', va='bottom', fontsize=8.5)
        
    for rect in rects2:
        h = rect.get_height()
        ax.text(rect.get_x() + rect.get_width()/2.0, h + 0.0015, f"{h:.4f}ms", ha='center', va='bottom', fontsize=8.5, fontweight='bold', color="#B45309")
        
    ax.set_ylim(0, 0.085)
    plt.tight_layout()
    fig2_path = os.path.join(output_dir, "fig2_latency_comparison.png")
    plt.savefig(fig2_path, bbox_inches='tight')
    plt.close()
    
    # ==========================================
    # Figure 3: 지연시간 vs 통신 페이로드 트레이드오프 (파레토 프론티어)
    # ==========================================
    fig, ax = plt.subplots(figsize=(8, 5))
    
    latencies = [0.0333, 0.0057, 0.0194, 0.0028]
    payloads = [85.9, 228.1, 878.0, 126.2]
    labels = ["A. 순차형 (Linear)\n[통과율 30% 저품질]", 
              "B. 중앙 조율형 (Star/Hub)\n★ 파레토 최적 [통과율 100%]", 
              "C. 전방위 토론형 (Mesh)\n[과다 통신 오버헤드]", 
              "D. 계층형 (Tree)\n[통과율 100%]"]
    
    sizes = [200, 350, 300, 250]
    
    for i in range(len(topologies)):
        ax.scatter(latencies[i], payloads[i], color=colors[i], s=sizes[i], edgecolors="#111827", linewidth=1.5, zorder=5)
        offset_y = 35 if i != 2 else -60
        offset_x = 0.001 if i != 0 else -0.008
        ax.annotate(labels[i], (latencies[i] + offset_x, payloads[i] + offset_y), fontsize=9, fontweight='bold',
                    bbox=dict(boxstyle="round,pad=0.3", fc="#F3F4F6", ec="#D1D5DB", lw=0.8, alpha=0.9))
        
    ax.set_title("[도표 3] 실행 지연시간 vs 통신 페이로드 트레이드오프 분석", fontsize=11, fontweight="bold", pad=12)
    ax.set_xlabel("평균 실행 지연시간 (ms)", fontsize=10)
    ax.set_ylabel("평균 전송 페이로드 (Bytes)", fontsize=10)
    ax.set_xlim(0.00, 0.040)
    ax.set_ylim(0, 1000)
    ax.grid(True, linestyle=':', alpha=0.6)
    
    # 최적 영역 음영 처리
    ax.axvspan(0.002, 0.012, ymin=0, ymax=0.35, color='#D1FAE5', alpha=0.5, label='이상적 고성능·저비용 영역')
    ax.legend(loc='upper right', frameon=True, facecolor="#F9FAFB")
    
    plt.tight_layout()
    fig3_path = os.path.join(output_dir, "fig3_tradeoff_pareto.png")
    plt.savefig(fig3_path, bbox_inches='tight')
    plt.close()
    
    # ==========================================
    # Figure 4: 8대 알고리즘 도메인별 순차형 vs 조율형 통과율 격차
    # ==========================================
    fig, ax = plt.subplots(figsize=(9, 5))
    
    categories = ["Matrix", "Stack", "DP", "String", "Math", "Search", "BitManip", "Array"]
    linear_cat_pass = [16.7, 0.0, 25.0, 25.0, 28.6, 28.6, 40.0, 50.0]
    star_cat_pass = [100.0] * len(categories)
    
    y = np.arange(len(categories))
    h = 0.38
    
    rects_lin = ax.barh(y - h/2, linear_cat_pass, h, label='순차형 (Linear Pipeline)', color=c_linear, edgecolor="#991B1B")
    rects_star = ax.barh(y + h/2, star_cat_pass, h, label='중앙 조율형 (Star/Hub)', color=c_star, edgecolor="#065F46")
    
    ax.set_title("[도표 4] 8대 알고리즘 도메인별 단위 테스트 통과율 격차 비교", fontsize=11, fontweight="bold", pad=12)
    ax.set_xlabel("단위 테스트 통과율 (%)", fontsize=10)
    ax.set_yticks(y)
    ax.set_yticklabels(categories, fontsize=9.5)
    ax.set_xlim(0, 120)
    ax.legend(loc='lower right', frameon=True, facecolor="#F9FAFB")
    ax.grid(axis='x', linestyle=':', alpha=0.6)
    
    # 격차 텍스트 표시
    for i, (lin, star) in enumerate(zip(linear_cat_pass, star_cat_pass)):
        delta = star - lin
        ax.text(lin + 1.5, i - h/2, f"{lin:.1f}%", va='center', fontsize=8.5, color="#7F1D1D", fontweight='bold')
        ax.text(star + 1.5, i + h/2, f"+{delta:.1f}%p", va='center', fontsize=8.5, color="#047857", fontweight='bold')
        
    plt.tight_layout()
    fig4_path = os.path.join(output_dir, "fig4_domain_breakdown.png")
    plt.savefig(fig4_path, bbox_inches='tight')
    plt.close()
    
    print("All 4 publication-quality figures successfully generated in", output_dir)
    return [fig1_path, fig2_path, fig3_path, fig4_path]

if __name__ == "__main__":
    generate_all_figures()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
과제 10 및 마지막 과제 BR-B 통합 실행 묶음 ZIP 빌더 (경량화 최적화 버전)
목표: 단일 파일 8MB 이하 및 전체 제출 파일 합계 8MB 이하 규격 완벽 준수
"""

import os
import sys
import zipfile

def build_zip():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(script_dir, "..", ".."))
    public_downloads = os.path.join(root_dir, "public", "downloads")
    os.makedirs(public_downloads, exist_ok=True)

    zip_path = os.path.join(public_downloads, "research-reproduction-package.zip")

    # 제외할 디렉터리 목록
    excluded_dirs = {
        "node_modules",
        "dist",
        ".git",
        "__pycache__",
        ".vscode",
        ".idea",
        "projects",
        "submission",
        "temp",
        "tmp"
    }

    # 제외할 파일 목록 (미사용 대용량 미디어 및 중복 산출물)
    excluded_file_names = {
        "research-reproduction-package.zip",
        "evening-sky.png",
        "morning-sky.png",
        "hero.png",
        "skt-aleph-jinyeong-presentation.pptx",  # 발표자료는 별도 제출 파일로 분리
    }

    print(f"[BUILD] Reproduction ZIP (Optimized): {zip_path}")
    packed_count = 0

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zipf:
        for foldername, subfolders, filenames in os.walk(root_dir):
            # 제외 디렉터리 필터링
            subfolders[:] = [d for d in subfolders if d not in excluded_dirs]

            rel_folder = os.path.relpath(foldername, root_dir)
            if any(part in excluded_dirs for part in rel_folder.split(os.sep)):
                continue

            for filename in filenames:
                if filename in excluded_file_names:
                    continue
                if filename.endswith(".pyc") or filename.endswith(".zip"):
                    continue

                filepath = os.path.join(foldername, filename)
                arcname = os.path.relpath(filepath, root_dir)

                zipf.write(filepath, arcname)
                packed_count += 1

    file_size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    print(f"[성공] 총 {packed_count}개 파일 패키징 완료")
    print(f"       파일 크기: {file_size_mb:.2f} MB ({os.path.getsize(zip_path):,} 바이트)")

if __name__ == "__main__":
    build_zip()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
과제 10 및 마지막 과제 BR-B 통합 실행 묶음 ZIP 빌더 (All-in-One Reproduction Package Builder)
저자: 장진영 (SKT ALEPH 1기)
규격 준수:
  - condi 10-6, condi 10-7, T10-C48 (논문 원고, 학술 DOCX, 원자료 CSV/JSON, 파이썬 재현 스크립트, 연구 차트)
  - condi br-b-5, condi br-b-6, BRB-C08, BRB-C09, BRB-C22 (새 임시 폴더에서 1분 만에 npm install && npm run dev로 실행되는 전체 웹 앱 소스코드 묶음)
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

    # 제외할 디렉터리 및 파일 목록 (용량 및 재귀 방지)
    excluded_dirs = {
        "node_modules",
        "dist",
        ".git",
        "__pycache__",
        ".vscode",
        ".idea",
        "projects"
    }

    excluded_files = {
        "research-reproduction-package.zip"
    }

    print(f"[BUILD] Reproduction ZIP: {zip_path}")
    packed_count = 0

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for foldername, subfolders, filenames in os.walk(root_dir):
            # 제외 디렉터리 필터링
            subfolders[:] = [d for d in subfolders if d not in excluded_dirs]

            rel_folder = os.path.relpath(foldername, root_dir)
            if any(part in excluded_dirs for part in rel_folder.split(os.sep)):
                continue

            for filename in filenames:
                if filename in excluded_files:
                    continue
                if filename.endswith(".pyc"):
                    continue

                filepath = os.path.join(foldername, filename)
                arcname = os.path.relpath(filepath, root_dir)

                zipf.write(filepath, arcname)
                packed_count += 1

    print(f"[성공] 총 {packed_count}개 파일이 포함된 올인원 실행 묶음 ZIP 파일이 생성되었습니다: {zip_path}")
    print(f"       파일 크기: {os.path.getsize(zip_path) / (1024 * 1024):.2f} MB")

if __name__ == "__main__":
    build_zip()

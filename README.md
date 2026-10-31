# 명품숲길 50선 탐방 가이드

산림청 「2023 국토녹화 50주년 명품숲길 50선」 데이터를 검색·필터링하고, 즐겨찾기·완주 체크·메모를 남길 수 있는 반응형 웹앱입니다. 빌드 과정 없이 정적 파일만으로 동작합니다.

## 파일 구성

| 파일 | 설명 |
|---|---|
| `index.html` | 앱 본체 (데이터 50건 내장) |
| `data.json` | 원본 엑셀에서 추출한 데이터 (참고/재사용용) |
| `manifest.webmanifest`, `sw.js` | 홈 화면 설치(PWA) 및 오프라인 지원 |
| `icon.svg`, `icon-192.png`, `icon-512.png` | 앱 아이콘 |
| `vendor/leaflet/` | 지도 라이브러리 Leaflet 1.9.4 (BSD-2 라이선스, 저장소에 포함) |
| `SOURCES.md` | 숲길별 좌표·주차·화장실·주의사항 출처 목록 |
| `screenshots/`, `icon-maskable-*.png`, `apple-touch-icon.png` | 앱 설치 화면용 이미지·아이콘 |
| `.nojekyll` | GitHub Pages가 파일을 그대로 서빙하도록 설정 |

## GitHub Pages 배포

1. GitHub에서 새 저장소 생성 (예: `forest-trails-50`, Public)
2. 이 폴더의 파일 전체를 저장소 루트에 업로드 (`.nojekyll` 포함)
3. 저장소 **Settings → Pages → Build and deployment**에서 Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 지정 후 Save
4. 1~2분 뒤 `https://<아이디>.github.io/forest-trails-50/` 주소로 접속

## 주요 기능

- 통합 검색: 숲길명·부제·설명·주소·기관 검색, 한글 초성 검색(예: `ㅅㄹㄴ` → 사려니숲길), 검색어 하이라이트, `/` 키로 검색창 이동
- 필터: 지역(15개 시·도), 이용자레벨(1~5), 길이 구간, 조합 필터 / 정렬 7종 / 카드·목록 보기 전환
- 즐겨찾기 ★, 완주 체크 ✓와 진행률(n/50), 숲길별 개인 메모
- 테마: 라이트·다크·시스템 자동 + 색상 4종(숲·단풍·호수·벚꽃)
- 상세 화면: 지도 링크, 주소 복사, 네이버/카카오 지도 검색, 공유(모바일 공유 시트), 이전/다음 이동(←/→ 키), 모바일 바텀시트(아래로 끌어 닫기)
- 숲길별 고유 링크(`#trail-12`) 공유, 랜덤 추천(안 가본 곳 우선)
- 기록 백업/복원(JSON), 인쇄/PDF, 홈 화면 설치·오프라인 사용
- 지도 보기: 필터된 숲길을 핀으로 표시(핀 숫자 = 레벨, ★ 즐겨찾기, 회색 = 완주, 점선 = 대략 위치), 상세 화면 위치 지도
- 내 위치에서 가까운 순 정렬과 거리 표시(브라우저 위치 권한 필요, https에서만 동작)
- 날씨: 숲길 위치 기준 현재 날씨와 7일 예보, 주말 강조 (Open-Meteo, API 키 불필요)
- 예상 소요시간(레벨별 평균 보행속도 기준 참고값), 편의 정보(주차·화장실·무장애: 원자료 기재 내용), 테마 태그 필터

## 앱으로 설치 (PWA)

- Android Chrome·PC Chrome/Edge: 상단 📲 버튼 또는 하단 배너의 **설치**를 누르면 바로 설치 창이 뜹니다.
- iPhone·iPad: 같은 버튼을 누르면 '공유 → 홈 화면에 추가' 안내가 나옵니다(iOS는 자동 설치 창을 지원하지 않음).
- 카카오톡·네이버 등 앱 안 브라우저: 설치가 안 되므로 Chrome/Safari로 여는 버튼과 안내를 보여 줍니다.
- 설치 후 홈 화면 아이콘을 길게 누르면 '지도로 보기·즐겨찾기·안 가본 숲길' 바로가기가 있습니다(Android).
- 데이터를 고친 뒤에는 `sw.js`의 `CACHE` 이름을 올리면(`trail50-v3` → `v4`) 설치한 사람에게 "새 버전이 준비됐어요" 알림이 뜹니다.

## 외부 서비스

- 지도 타일: CARTO Basemaps(OpenStreetMap 데이터) — 비상업·소규모 이용은 무료, 화면에 출처 표시
- 날씨: Open-Meteo — 비상업 무료, 키 불필요

즐겨찾기·완주·메모는 각 사용자의 브라우저(localStorage)에만 저장됩니다.

## 데이터 수정

`index.html` 하단의 `<script id="trail-data" type="application/json">` 안 JSON을 고치면 됩니다. 항목 구조:

```json
{"id":1,"name":"인제 자작나무숲","sub":"달맞이숲길","desc":"…","links":[{"label":"지도 보기","url":"https://naver.me/…"}],
 "level":2,"km":5,"kmNote":"","addr":["강원 인제군 인제읍 원대리 763-4"],"org":"인제국유림관리소","region":"강원",
 "lat":37.99,"lng":128.198,"geo":"approx","mins":110,
 "parking":[{"t":"자작나무숲 주차장","src":"https://…"}],"toilet":null,"barrierFree":null,"notice":null,"start":{"name":"…","addr":"…"},"tags":["계곡"]}
```

- `lat`/`lng`: 좌표. `geo`가 `exact`면 원자료 링크 좌표, `approx`면 주소 기준 대략 위치입니다. 네이버 지도에서 출발점 좌표를 확인해 고치고 `geo`를 `exact`로 바꾸면 핀의 점선이 사라집니다.
- `mins`: 예상 소요시간(분)
- `parking`/`toilet`/`barrierFree`/`notice`: `[{"t":"문구","src":"출처 URL 또는 null(원자료)"}]`, 정보가 없으면 `null`
- `start`: 출발점 `{"name","addr"}`
- `geo`: `exact`(원자료 링크) · `sourced`(조사 출처 좌표, `geoSrc`에 URL) · `approx`(추정)
- `tags`: 테마 태그(무장애, 데크길, 계곡, 전망 등)

데이터를 바꾼 뒤에는 `sw.js`의 `CACHE` 이름(`trail50-v1` → `v2`)을 올려야 설치된 사용자에게도 새 버전이 반영됩니다.

# Daily Tarot MVP

하루에 한 장의 타로 카드와 짧은 한국어 해석을 보여주는 모바일 우선 정적 웹서비스 목업입니다. 예측을 단정하기보다 자기 성찰과 작게 실행할 수 있는 행동에 초점을 둡니다.

## 주요 기능

- 전체 78장 중 오늘의 카드 한 장 선택(정방향)
- 카드 뒷면에서 앞면으로 전환되는 CSS 3D 플립
- 사용자 기기의 현지 날짜를 기준으로 당일 결과 유지
- 손상된 저장 데이터 복구와 이미지 로드 오류 안내
- 키보드 포커스, 스크린리더 알림, 모션 감소 설정 지원
- 프레임워크·서버·빌드·외부 CDN 없이 실행

## 폴더 구조

```text
index.html
css/style.css
js/tarot-data.js
js/app.js
images/cards/
  major/
  minor/{wands,cups,swords,pentacles}/
  ui/
source-assets/Cards-png.zip
README.md
.gitignore
```

## 실행 방법

`index.html`을 최신 브라우저에서 직접 열 수 있습니다. 저장 및 이미지 검증까지 가장 안정적으로 확인하려면 프로젝트 루트에서 정적 서버를 실행하세요.

```powershell
python -m http.server 8000
```

그다음 브라우저에서 `http://localhost:8000`에 접속합니다. 별도의 설치나 빌드는 필요하지 않습니다.

## localStorage 동작 방식

`dailyTarotResult` 키에 `{ "date": "YYYY-MM-DD", "cardId": 0~77 }` 형태로 저장합니다. 같은 현지 날짜에는 저장된 카드를 즉시 보여주고, 날짜가 달라지거나 데이터가 손상·변조된 경우 새 카드를 선택합니다. 재추첨과 히스토리는 제공하지 않습니다.

## 이미지와 Git 정책

원본은 `source-assets/Cards-png.zip`에 보관하며 수정하지 않습니다. `.gitignore`의 `source-assets/`와 `*.zip` 규칙으로 원본 ZIP은 Git 추적에서 제외하고, `images/cards/`에 정리된 실제 서비스 이미지는 포함합니다.

카드 이미지의 이용·수정·재배포 가능 범위와 출처 표기 조건은 저장소에 공개하거나 서비스하기 전에 원 라이선스를 별도로 확인해야 합니다.

## GitHub 업로드 전 체크리스트

- [ ] 카드 이미지 원본 라이선스와 표기 의무 확인
- [ ] ZIP 및 `source-assets/`가 Git 추적에서 제외되는지 확인
- [ ] 카드 데이터 78장과 이미지 80개가 모두 있는지 확인
- [ ] 모바일·데스크톱 최신 브라우저에서 카드 공개 흐름 확인
- [ ] localStorage의 당일 복원과 날짜 변경 동작 확인
- [ ] 브라우저 콘솔 오류와 이미지 404가 없는지 확인
- [ ] 임시 파일, 개인정보, 비밀키가 포함되지 않았는지 확인

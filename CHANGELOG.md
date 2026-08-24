# CHANGELOG.md

# Changelog

Daily Tarot 프로젝트의 주요 변경 사항을 기록한다.

## v0.1.1

- 결과 화면에서 `UPRIGHT` 문구 제거
- 한국어 카드명 옆의 `정방향` 문구 제거
- `orientation: "upright"` 데이터 필드는 향후 확장을 위해 유지

## v0.1.0

- Daily Tarot MVP 최초 구현
- 라이더-웨이트 계열 카드 78장 데이터 구성
- 하루 한 장 카드 선택
- 같은 날짜에 동일한 결과 유지
- `localStorage`를 이용한 오늘의 카드 저장 및 복원
- 카드 뒷면 → 앞면 플립 애니메이션 구현
- 카드 이미지 및 한국어 해석 표시
- 모바일 우선 반응형 UI 구현
- 접근성 및 `prefers-reduced-motion` 대응
# airsoft game tracker
server: Node.js + typescript
database: mysql 
front: android kotlin?

# spec
*에어소프트 게임을 쉽고 즐겁게.*

- 기본 스펙
  - 라운드 관리
  - 참가 인원 관리
  - 전사자 확인
  - 라운드 시작
  - 알림

- 있으면 좋을 기능
  - 전적 조회
  - 라운드 별 소요 시간 등의 통계 제공
  - 각 개인이 들어와서 로그 남길 수 있도록 (아이디, 게스트 토큰 등으로)
  - 팀 관리
  - 팀간 전적 공유

- 개발 순서
  - 서버 개발
  - 웹으로 제공
  - 앱(?)

# 개발 초기 스펙
- 게임 진행 기능
  1. 라운드 등의 옵션을 입력하여 게임 룸 생성
  2. 양 팀 입장
  3. 팀원 수 입력
  4. 양 팀 준비 확인 후 게임 시작
  5. 전사자 체크
  6. 게임 종료
  7. 매치 종료 시까지 3번으로 돌아가 반복
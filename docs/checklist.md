# 개발 체크리스트 (Monorepo)

모든 소스는 **모노레포(Monorepo)** 구조로 통합 관리합니다. 코어 비즈니스 로직은 TDD를 원칙으로 하고, 각 기능 단위별로 커밋합니다.

## 1단계: 모노레포 및 프론트엔드 초기화
- [x] **1-1. 모노레포 환경 및 워크스페이스 설정**
  - [x] pnpm 워크스페이스 설정 (package.json, pnpm-workspace.yaml)
  - [x] `apps/frontend`, `apps/backend` 디렉터리 생성
  - [x] 루트 및 각 앱별 package.json 작성
  - [x] ESLint, Prettier, TypeScript 공통 설정
  - [x] Git hooks (Husky) 설정
  - > **Commit:** `build: Initialize monorepo with pnpm workspaces`

- [x] **1-2. 프론트엔드 앱(Vite+React+Mantine) 초기화**
  - [x] `apps/frontend`에 Vite+React 프로젝트 생성
  - [x] Mantine UI 설치 및 `MantineProvider` 설정
  - [x] ESLint, Prettier 설정
  - [x] MantineProvider에서 더 이상 지원되지 않는 withGlobalStyles, withNormalizeCSS props 제거(main.tsx)
  - [x] husky pre-commit hook 적용: 실행 코드(src, public, services) 변경 시 lint fix, build, test 자동 실행
  - > **Commit:** `feat(frontend): Initialize Vite+React+Mantine app & fix MantineProvider props`

- [x] **1-3. 공통 모듈 설정**
  - [x] `shared` 모듈 생성 및 프로젝트 구조 단순화
  - [x] 타입, 상수, 유틸리티 등 공통 코드 작성
  - [x] 프론트엔드에서 `shared` 모듈 참조 테스트
  - > **Commit:** `feat(shared): Setup shared module and add common code`

## 2단계: 프론트엔드 핵심 로직 및 UI
- [x] **2-1. Todo CRUD 서비스 및 테스트 (TDD)**
  - [x] `apps/frontend/services/todoService.ts` 생성 및 테스트 코드 작성
  - [x] 로컬스토리지 기반 CRUD 함수 구현 및 테스트 통과
  - > **Commit:** `feat(frontend/core): Implement localStorage CRUD logic (TDD)`
- [x] **2-2. 기본 UI 컴포넌트(Mantine 기반)**
  - [x] TodoForm onClose 핸들러 타입 안전성 개선 (onClose={() => { if (onClose) onClose(); }} 적용)
  - [x] 할 일 중복 추가 및 동시 삭제 버그 수정
  - [x] 모바일/데스크톱 UI 분기 로직 점검 및 반영
- [x] 데스크톱/모바일에서 앱이 브라우저를 넘지 않고, 내용이 꽉 차게 표시되도록 CSS 구조 통일 및 리팩터링
- [x] .app-bg, .app-center-wrapper, .app-card, .todo-list-wrapper, .mantine-Table-root 등 주요 컨테이너 width/max-width/padding/box-sizing/overflow-x 일관화
- [x] table-layout: fixed, 컬럼 min-width/padding 조정, 내부 여백 최소화
- [x] #root 배경색/패딩 제거, 데스크톱에서 최대한 넓게 표시되도록 개선
- [x] 모바일/데스크톱 모두 넉넉한 공간감, 큰 폰트, 가독성 강화
- [x] 이미지처럼 꽉 차고 예쁜 레이아웃 구현
- [x] checklist.md 업데이트 및 커밋
  - [ ] 빌드 및 테스트 필요확인
  - [x] `TodoItem` 등 구현 (Mantine 컴포넌트 활용)
  - > **Commit:** `feat(frontend/ui): Implement basic UI components with Mantine`
- [x] **2-3. UI와 서비스 연동**
  - [x] UI 컴포넌트와 서비스 로직 연동 (추가/수정/삭제/조회)
  - > **Commit:** `feat(frontend): Connect UI components with service logic`
- [x] **2-4. 상태 관리 커스텀 훅 분리**
  - [x] useTodos 커스텀 훅 분리 및 App 적용
  - > **Commit:** `refactor(frontend): Extract useTodos custom hook for state management`

## 3단계: 백엔드(Serverless) 및 연동
- [ ] **3-1. 백엔드 앱 초기화 및 인프라 세팅**
  - [ ] `apps/backend`에 AWS CDK 프로젝트 생성
  - [ ] DynamoDB, Lambda, API Gateway 스택 정의
  - > **Commit:** `feat(backend): Initialize CDK project and infra stack`
- [ ] **3-2. Lambda CRUD 함수 (TDD)**
  - [ ] 각 Lambda 함수별 테스트 코드 작성 및 구현
  - > **Commit:** `feat(backend/lambda): Implement CRUD Lambda functions (TDD)`
- [ ] **3-3. API Gateway-Lambda 연동 및 테스트**
  - [ ] 엔드포인트와 Lambda 함수 연결, 동작 테스트
  - > **Commit:** `feat(backend): Connect API Gateway and Lambda`
- [ ] **3-4. 프론트엔드-백엔드 연동**
  - [ ] `apiClient` 모듈 작성, 서비스 로직을 API 호출로 리팩터링
  - > **Commit:** `refactor(frontend): Replace local logic with backend API calls`

## 4단계: 인증 및 고급 기능
- [ ] **4-1. Cognito 인증 인프라(CDK) 및 연동**
  - [ ] Cognito User Pool 및 Authorizer 추가, API 인증 적용
  - > **Commit:** `feat(auth): Add Cognito infra and secure APIs`
- [ ] **4-2. 프론트엔드 인증 UI 및 로직**
  - [ ] 회원가입, 로그인, 인증 토큰 처리
  - > **Commit:** `feat(frontend/auth): Implement authentication UI and logic`

## 5단계: UI/UX 고도화 및 CI/CD
- [ ] **5-1. 필터, 검색, 정렬 등 고급 UI 기능**
  - [ ] 상태/우선순위 필터, 제목 검색, 정렬 등
  - > **Commit:** `feat(frontend/ui): Add filtering, search, and sorting`
- [ ] **5-2. 반응형/다크모드(Mantine 기능 활용)**
  - [x] Mantine의 컬러스킴 및 반응형 시스템 적용 (useMediaQuery, Affix 등)
  - [x] 데스크톱/모바일 와이어프레임 기반 반응형 레이아웃 구현 (UI 구조/배치 완료)
  - [x] lint 에러, 의존성(@tabler/icons-react) 및 타입 선언(global.d.ts 통한 CSS import) 문제 해결, 빌드 정상화
  - [ ] 다크모드 컬러스킴/세부 스타일 개선(추가 예정)
  - > **Commit:** `feat(frontend/ui): Apply responsive design and dark mode`
- [ ] **5-3. CI/CD 파이프라인 구축**
  - [ ] Github Actions 등으로 테스트/배포 자동화
  - > **Commit:** `ci: Setup CI/CD pipeline for monorepo`

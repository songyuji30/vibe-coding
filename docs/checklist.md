# 개발 체크리스트 (Monorepo)

모든 소스는 **모노레포(Monorepo)** 구조로 통합 관리합니다. 코어 비즈니스 로직은 TDD를 원칙으로 하고, 각 기능 단위별로 커밋합니다.

## 1단계: 모노레포 및 프론트엔드 초기화
- [x] **1-1. 모노레포 환경 및 워크스페이스 설정**
  - [x] pnpm 또는 yarn workspaces로 루트 워크스페이스 구성 (package.json, pnpm-workspace.yaml)
  - [x] `apps/frontend`, `apps/backend` 디렉터리 생성
  - [x] 루트 및 각 앱별 package.json 작성
  - > **Commit:** `feat: Setup monorepo structure and workspaces`
  - [작업 내역]
    - 루트: package.json, pnpm-workspace.yaml 생성
    - apps/frontend, apps/backend 디렉터리 및 각 package.json 생성
    - MantineProvider props 최신화(main.tsx, withGlobalStyles/withNormalizeCSS 제거)
    - husky pre-commit hook 적용: 실행 코드(src, public, services) 변경 시 lint fix, build, test 자동 실행
- [x] **1-2. 프론트엔드 앱(Vite+React+Mantine) 초기화**
  - [x] `apps/frontend`에 Vite+React 프로젝트 생성
  - [x] Mantine UI 설치 및 `MantineProvider` 설정
  - [x] ESLint, Prettier 설정
  - [x] MantineProvider에서 더 이상 지원되지 않는 withGlobalStyles, withNormalizeCSS props 제거(main.tsx)
  - > **Commit:** `feat(frontend): Initialize Vite+React+Mantine app & fix MantineProvider props`

## 2단계: 프론트엔드 핵심 로직 및 UI
- [ ] **2-1. Todo CRUD 서비스 및 테스트 (TDD)**
  - [ ] `apps/frontend/services/todoService.ts` 생성 및 테스트 코드 작성
  - [ ] 로컬스토리지 기반 CRUD 함수 구현 및 테스트 통과
  - > **Commit:** `feat(frontend/core): Implement localStorage CRUD logic (TDD)`
- [ ] **2-2. 기본 UI 컴포넌트(Mantine 기반)**
  - [ ] `TodoForm`, `TodoList`, `TodoItem` 등 구현 (Mantine 컴포넌트 활용)
  - > **Commit:** `feat(frontend/ui): Implement basic UI components with Mantine`
- [ ] **2-3. UI와 서비스 연동**
  - [ ] UI 컴포넌트와 서비스 로직 연동 (추가/수정/삭제/조회)
  - > **Commit:** `feat(frontend): Connect UI components with service logic`

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
  - [ ] Mantine의 컬러스킴 및 반응형 시스템 적용
  - > **Commit:** `feat(frontend/ui): Apply responsive design and dark mode`
- [ ] **5-3. CI/CD 파이프라인 구축**
  - [ ] Github Actions 등으로 테스트/배포 자동화
  - > **Commit:** `ci: Setup CI/CD pipeline for monorepo`

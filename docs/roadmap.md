# 개발 로드맵 및 작업 목록

이 문서는 `design.md`를 기반으로 프로젝트의 상세 개발 계획과 작업 단위를 정의합니다.
코어 비즈니스 로직은 TDD를 원칙으로 하며, 각 기능 단위로 커밋합니다.

---

### 1단계: 프론트엔드 기반 구축 (로컬스토리지)

- [ ] **1-1. 프로젝트 초기 설정 및 도구 구성**
  - [ ] Vite와 React 템플릿으로 프로젝트 생성
  - [ ] Mantine UI 설치 및 `MantineProvider` 설정
  - [ ] ESLint, Prettier를 통한 코드 포맷팅 및 품질 규칙 설정
  - [ ] `components`, `services`, `hooks` 등 기본 폴더 구조 정의
  - > **Commit:** `feat: Initial project setup with Vite, React, and Tailwind CSS`

- [ ] **1-2. 로컬스토리지 기반 핵심 CRUD 서비스 (TDD)**
  - [ ] `services/todoService.js` 파일 생성
  - [ ] Vitest 또는 Jest를 사용하여 `addTodo`, `getTodos`, `updateTodo`, `deleteTodo` 함수에 대한 테스트 케이스 작성
  - [ ] 테스트를 통과하도록 `localStorage`를 이용한 CRUD 함수 구현
  - > **Commit:** `feat(core): Implement localStorage-based todo service (TDD)`

- [ ] **1-3. 기본 UI 컴포넌트 구현**
  - [ ] `TodoForm.jsx`: 새 할 일을 입력받는 폼
  - [ ] `TodoList.jsx`: 할 일 목록을 렌더링하는 컨테이너
  - [ ] `TodoItem.jsx`: 개별 할 일 항목 (체크박스, 삭제 버튼 포함)
  - [ ] Mantine 컴포넌트(`TextInput`, `Button`, `List`, `Checkbox`)를 사용한 기본 스타일링 적용
  - > **Commit:** `feat(ui): Implement basic UI components with Mantine`

- [ ] **1-4. 상태 관리 및 UI-로직 연동**
  - [ ] `App.jsx`에서 `useState`, `useEffect`를 사용해 할 일 목록 상태 관리
  - [ ] `todoService`를 UI 컴포넌트와 연결하여 실제 CRUD 기능 수행
  - [ ] 할 일 추가, 수정, 삭제 시 UI가 즉시 업데이트되는지 확인
  - > **Commit:** `feat: Integrate todo service with UI components`

### 2단계: 백엔드 연동 (AWS Serverless)

- [ ] **2-1. AWS CDK 인프라 설정**
  - [ ] `backend` 디렉터리에 AWS CDK 프로젝트 초기화
  - [ ] `TodoAppStack`에 DynamoDB, Lambda, API Gateway 리소스 정의
  - > **Commit:** `feat(backend): Initial AWS CDK setup for serverless infrastructure`

- [ ] **2-2. CRUD Lambda 함수 구현 (TDD)**
  - [ ] Jest를 사용하여 Lambda 함수 테스트 환경 구성
  - [ ] 각 함수(create, read, update, delete)에 대해 DynamoDB 클라이언트를 모킹하여 단위 테스트 작성
  - [ ] `@aws-sdk/client-dynamodb`를 사용하여 핸들러 로직 구현
  - > **Commit:** `feat(lambda): Implement and test CRUD Lambda functions (TDD)`

- [ ] **2-3. API Gateway 연동 및 테스트**
  - [ ] API Gateway 엔드포인트(`/todos`, `/todos/{id}`)와 Lambda 함수 통합
  - [ ] CDK 스택 배포 후 Postman 등으로 엔드포인트 동작 테스트
  - > **Commit:** `feat(backend): Configure API Gateway and integrate with Lambda functions`

- [ ] **2-4. 프론트엔드 API 클라이언트 연동**
  - [ ] `axios`를 사용하여 `services/apiClient.js` 모듈 생성
  - [ ] `todoService.js`가 `localStorage` 대신 백엔드 API를 호출하도록 리팩토링
  - [ ] 비동기 작업에 대한 로딩 상태 및 에러 처리 UI 추가
  - > **Commit:** `refactor(frontend): Replace localStorage with backend API calls`

### 3단계: 인증 기능 (AWS Cognito)

- [ ] **3-1. Cognito 인프라 추가 (CDK)**
  - [ ] CDK 스택에 Cognito User Pool 및 App Client 리소스 추가
  - > **Commit:** `feat(auth): Add Cognito User Pool infrastructure via CDK`

- [ ] **3-2. API 엔드포인트 보안 (CDK)**
  - [ ] API Gateway에 Cognito Authorizer를 생성하고 `todos` 관련 엔드포인트에 적용
  - [ ] Lambda 함수가 Authorizer로부터 사용자 정보를 받도록 수정
  - > **Commit:** `feat(auth): Secure API endpoints with Cognito Authorizer`

- [ ] **3-3. 프론트엔드 인증 흐름 구현**
  - [ ] AWS Amplify 라이브러리 설치 및 설정
  - [ ] `SignUp`, `SignIn` 컴포넌트 및 로그아웃 기능 구현
  - [ ] 인증된 사용자만 접근 가능한 `ProtectedRoute` 구현
  - [ ] `apiClient`가 모든 요청에 JWT를 자동으로 포함하도록 수정
  - > **Commit:** `feat(auth): Implement frontend authentication flow with Amplify`

### 4단계: UI/UX 고도화

- [ ] **4-1. 고급 기능 구현**
  - [ ] 상태(완료/미완료) 및 우선순위별 클라이언트 사이드 필터링 기능 구현
  - [ ] 할 일 제목으로 검색하는 기능 구현
  - > **Commit:** `feat(ui): Implement todo filtering and search functionality`

- [ ] **4-2. 디자인 시스템 개선**
  - [ ] Mantine의 반응형 시스템을 사용하여 모바일/데스크톱 레이아웃 최적화
  - [ ] Mantine의 내장 컬러 스킴 기능을 사용하여 다크/라이트 모드 토글 기능 구현
  - > **Commit:** `feat(ui): Add responsive design and dark mode support using Mantine`

### 5단계: CI/CD 파이프라인

- [ ] **5-1. 테스트 자동화 (GitHub Actions)**
  - [ ] Push 발생 시 프론트엔드와 백엔드의 테스트를 자동으로 실행하는 워크플로우(`test.yml`) 설정
  - > **Commit:** `ci: Configure GitHub Actions for automated testing`

- [ ] **5-2. 배포 자동화 (GitHub Actions)**
  - [ ] `main` 브랜치에 Push 발생 시 프론트엔드(GitHub Pages)와 백엔드(`cdk deploy`)를 자동으로 배포하는 워크플로우(`deploy.yml`) 설정
  - > **Commit:** `ci: Implement automated deployment pipeline for frontend and backend`

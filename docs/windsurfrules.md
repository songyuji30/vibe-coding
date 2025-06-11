# Windsurf 프로젝트 개발/운영 규칙

본 문서는 Windsurf 모노레포 프로젝트의 아키텍처, 개발 원칙, 코드 스타일, 협업 및 커밋 규칙, 폴더 구조 등 실무 규칙을 명확히 정의합니다.

---

## 1. 분석 및 작업 프로세스

### 1.1. 요청 분석
- 작업 유형(코드 작성, 디버깅, 설계, 문서화 등) 명확히 파악
- 관련 언어/프레임워크/라이브러리(React, Mantine, AWS CDK 등) 확인
- 명시적/암묵적 요구사항 식별
- 핵심 문제와 기대 결과 정의
- 프로젝트 맥락, 폴더 구조, 체크리스트 반영

### 1.2. 솔루션 설계
- 논리적 단계로 세분화, 모듈화/재사용성 고려
- 필요한 파일/디렉터리/의존성 명확히 정의
- 대안 접근법 평가, 테스트/검증 계획 포함

### 1.3. 구현 전략
- 적합한 디자인 패턴 적용(예: Container/Presentational, Service Layer 등)
- 성능, 오류 처리, 엣지 케이스, 접근성, 유지보수성 고려
- 코드/문서/테스트/커밋 주기를 짧게 유지

---

## 2. 코드 스타일 및 구조

### 2.1. TypeScript/JavaScript
- 모든 코드 TypeScript 기반
- 함수형/선언형 프로그래밍 우선, 불변성 지향
- DRY 원칙, 조기 반환(Early return) 적극 활용
- 네이밍: isLoading/hasError 등 상태, handleClick/handleSubmit 등 이벤트, 폴더/파일은 소문자-dash
- 컴포넌트/서비스/유틸/타입/테스트 등 역할별 폴더 구분

### 2.2. React(Mantine 기반)
- Mantine 컴포넌트 적극 활용, 불필요한 커스텀 최소화
- Presentational/Container 패턴 권장
- 상태 관리 최소화, 필요시 React Context/Hook 활용
- 페이지/라우팅은 `pages/`, 공통 UI는 `components/`, 서비스로직은 `services/`에 분리
- 접근성(ARIA), 반응형, 다크모드(Mantine 기능) 필수 적용

### 2.3. AWS CDK/백엔드
- 인프라 코드는 `cdk/`, Lambda 함수는 `lambdas/handlers/`에 분리
- 각 Lambda 함수는 단일 책임 원칙(SRP) 준수, 테스트 코드(`lambdas/tests/`) 필수
- 환경변수/시크릿 관리, 에러 처리/로깅 체계화

### 2.4. 공통
- 타입은 interface 우선, enum 대신 const map 사용
- 공통 타입/유틸은 `packages/`에 작성, 모노레포에서 재사용
- 테스트(TDD): 백엔드/핵심 비즈니스 로직은 테스트 주도, UI는 실행 코드 우선

---

## 3. 커밋/협업/문서화 규칙 및 핵심 개발 원칙

- **짧은 주기로 작업 내용을 상세히 명시하여 커밋을 남긴다.**
- **커밋 전 반드시 `docs/checklist.md`에 진행 상황을 업데이트한다.**
- **설계 변경 시에는 `docs/design.md`와 `docs/todo_app_requirements.md`를 동시 수정한다.**
- **커뮤니케이션 및 문서화는 한국어로 진행한다.**
- **프론트엔드 UI 구현 시에는 실행 코드를 먼저 작성한다. 코어 비즈니스 로직 구현 시에만 TDD로 진행한다.**
- **백엔드는 TDD로 구현한다.**
- 커밋 메시지: feat, fix, chore, docs, refactor, test, ci 등 prefix 사용, 상세 작업 내역 포함
- PR/리뷰 시 checklist, 설계 문서, 커밋 내역 모두 참고

---

## 4. 폴더 구조 (상세)

```
root/
├── apps/
│   ├── frontend/                # 프론트엔드(React+Mantine)
│   │   ├── public/              # 정적 파일 (favicon, index.html 등)
│   │   ├── src/
│   │   │   ├── components/      # UI 컴포넌트
│   │   │   ├── pages/           # 페이지 단위 컴포넌트
│   │   │   ├── hooks/           # 커스텀 훅
│   │   │   ├── services/        # API/비즈니스 로직 (todoService.ts 등)
│   │   │   ├── styles/          # 전역 스타일/테마
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── tests/               # 프론트엔드 단위/통합 테스트
│   │   ├── package.json
│   │   └── ...
│   └── backend/                 # 백엔드(AWS Lambda, CDK 등)
│       ├── cdk/                 # AWS CDK 인프라 코드
│       │   ├── lib/             # 스택 정의 (dynamodb-stack.ts, lambda-stack.ts 등)
│       │   ├── bin/             # CDK 엔트리포인트
│       │   └── cdk.json
│       ├── lambdas/             # Lambda 함수 소스
│       │   ├── handlers/        # 각 기능별 핸들러 (createTodo.ts 등)
│       │   └── tests/           # Lambda 단위 테스트
│       ├── package.json
│       └── ...
├── packages/                    # (선택) 공통 유틸리티, 타입 등 공유 패키지
├── docs/                        # 설계, 요구사항, 체크리스트, 규칙 문서
├── node_modules/
├── package.json                 # 루트 패키지 관리
├── pnpm-workspace.yaml          # (pnpm 사용 시) 워크스페이스 설정
└── ...
```

---

## 5. 참고 문서
- `docs/design.md`: 전체 아키텍처/폴더 구조/시퀀스/와이어프레임/설계
- `docs/todo_app_requirements.md`: 요구사항 및 기능 명세
- `docs/checklist.md`: 단계별 상세 체크리스트 및 커밋 내역
- `README.md`: 프로젝트 개요 및 시작 방법

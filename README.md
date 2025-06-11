# Windsurf Todo App (Monorepo)

Windsurf는 프론트엔드(React+Mantine)와 백엔드(Serverless, AWS)로 구성된 모던 Todo 웹앱 프로젝트입니다. 모든 소스는 **모노레포(Monorepo)** 구조로 통합 관리되며, TDD 및 짧은 주기의 상세 커밋을 원칙으로 개발합니다.

## 주요 특징
- **모노레포**: 프론트엔드와 백엔드, 공통 패키지를 하나의 저장소에서 관리
- **프론트엔드**: React, Mantine UI, Vite, TypeScript
- **백엔드**: AWS Lambda, API Gateway, DynamoDB, AWS CDK
- **CI/CD**: Github Actions 기반 테스트 및 자동 배포
- **설계/요건/체크리스트 문서화**: `docs/` 폴더에 상세 관리
- **개발 전략**: 프론트엔드를 독립적으로 완성한 뒤, 서비스 레이어(API 클라이언트) 교체만으로 백엔드에 연동하는 구조. 프론트 개발 및 테스트, 사용자 피드백을 백엔드와 무관하게 선반영하고, 연동 시 기존 UI/상태/테스트를 최대한 재사용

## 개발 환경 및 워크플로우
- pnpm 기반 Monorepo
- Vite + React + Mantine 프론트엔드
- AWS CDK + Lambda 백엔드
- TDD 및 ESLint/Prettier 적용
- 커밋 시 husky pre-commit hook을 통해 실행 코드(src, public, services) 변경 시 lint fix, build, test 자동 실행

## 폴더 구조 (요약)

```
root/
├── apps/
│   ├── frontend/   # 프론트엔드(React+Mantine)
│   └── backend/    # 백엔드(AWS Lambda, CDK 등)
├── packages/       # (선택) 공통 유틸리티, 타입 등 공유 패키지
├── docs/           # 설계, 요구사항, 체크리스트 문서
├── package.json    # 루트 패키지 관리 및 워크스페이스
├── pnpm-workspace.yaml # (pnpm 사용 시)
└── ...
```

## 개발 원칙 및 규칙
- 짧은 주기로 작업 내용을 상세히 명시하여 커밋
- 커밋 전 `docs/checklist.md`에 진행 상황 업데이트
- 설계 변경 시 `docs/design.md`, `docs/todo_app_requirements.md` 동시 수정
- 프론트엔드 UI는 실행 코드를 먼저 작성, 코어 비즈니스 로직은 TDD 적용
- 백엔드는 TDD 기반 개발

## 시작 방법 (예시)

1. **의존성 설치**
   ```bash
   pnpm install
   # 또는 yarn install
   ```
2. **프론트엔드 개발 서버 실행**
   ```bash
   cd apps/frontend
   pnpm dev
   # 또는 yarn dev
   ```
3. **백엔드(CDK) 배포**
   ```bash
   cd apps/backend/cdk
   pnpm deploy
   # 또는 cdk deploy
   ```

자세한 개발 절차와 체크리스트는 `docs/checklist.md`를 참고하세요.

# 프로젝트 기술 스택 및 디자인 가이드

## 1. 기술 스택
- **프레임워크**: Next.js 15.5.3 (React 19.1.0)
- **언어**: TypeScript 5.x
- **스타일링**: Tailwind CSS 4.x

---

## 2. 디자인 컴포넌트 및 아이콘

### UI 컴포넌트: Shadcn
- **적용**: 모든 UI 컴포넌트는 `shadcn/ui` 라이브러리 사용
- **추가**: 필요한 컴포넌트는 `npx shadcn@latest add [component-name]` 명령어로 추가
- **임포트 경로**: `@/components/ui` 경로에서 컴포넌트 임포트
- **임포트 예시**: `import { Button } from "@/components/ui/button"` 
- **스타일링**: Tailwind CSS 유틸리티 클래스 활용
- **인터랙션**: `hover:`, `focus:`와 같은 Tailwind variant 클래스 활용

### 아이콘: Lucide React
- **적용**: 모든 아이콘은 `lucide-react` 라이브러리 사용
- **임포트 방법**: `import { IconName } from "lucide-react"` 형식으로 임포트
- **예시**: `import { Search, Menu } from "lucide-react"`와 같이 임포트
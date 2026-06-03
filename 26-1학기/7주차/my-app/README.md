# 아기 사자 대시보드 (9주차 · TypeScript + Supabase)

## 사전 준비

1. [Supabase](https://supabase.com) 프로젝트 생성
2. SQL Editor에서 `supabase/schema.sql` 실행
3. Authentication → Sign In / Providers → **Confirm email** OFF (개발용 권장)
4. `.env.example`을 복사해 `.env.local` 생성 후 값 입력:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

`.env.local`은 Git에 커밋하지 마세요.

## 실행

```bash
yarn install
yarn dev      # http://localhost:5173
yarn build    # tsc && vite build
yarn typecheck
```

## 디렉터리 구조

```
src/
├── lib/supabase.ts       # Supabase 클라이언트 (Database 제네릭)
├── types/
│   ├── database.ts       # DB 스키마 타입
│   └── lion.ts           # Lion 앱 타입 · props
├── data/lions.ts         # rowToLion / formToLionInsert 변환
├── hooks/
│   ├── useAuth.ts
│   ├── useLions.ts
│   └── useViewOptions.ts
├── pages/
│   ├── HomePage.tsx
│   ├── DetailPage.tsx
│   └── LoginPage.tsx
└── components/
    ├── AuthForm.tsx
    └── ...
```

## 기능 요약

- 비로그인: 명단 **조회** (Supabase)
- 로그인: 추가·삭제·랜덤 추가 (DB 반영)
- `/login` 회원가입·로그인, 세션 유지·로그아웃
- URL 쿼리 필터/정렬/검색 유지

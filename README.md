# cat-birthday-card

고양이 생일 초대장 + 방명록 (Next.js)

## 로컬 개발

```bash
npm install
npm run dev
```

## Vercel 배포 (방명록 저장)

방명록은 **서버 DB**에 저장됩니다. Vercel에 배포할 때 아래 중 하나로 DB를 연결하세요.

### 1. Vercel Postgres (권장)

1. [Vercel](https://vercel.com) → 프로젝트 → **Storage** → **Create Database** → **Postgres**
2. 생성된 DB를 프로젝트에 **Connect**
3. 환경 변수 `POSTGRES_URL` 이 자동으로 붙습니다. (그대로 두면 됨)
4. **Redeploy**

### 2. Neon

1. [Neon](https://neon.tech)에서 프로젝트 생성 후 **Connection string** 복사
2. Vercel → 프로젝트 → **Settings** → **Environment Variables**
3. `DATABASE_URL` 또는 `POSTGRES_URL` 이름으로 연결 문자열 추가
4. **Redeploy**

### 테이블 생성

API가 첫 요청 시 `guestbook_messages` 테이블을 `CREATE TABLE IF NOT EXISTS` 로 자동 생성합니다. 별도 마이그레이션 불필요합니다.

---

배포 후 방명록 작성 → **API `/api/messages`** → **Postgres/Neon** 에 저장되며, 새로고침/다른 기기에서도 동일하게 보입니다.

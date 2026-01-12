# Vercel Cron 작업 테스트 가이드

## 📋 개요

부천교회 홈페이지의 Vercel Cron 작업은 Supabase DB를 주기적으로 쿼리하여 자동 정지 방지를 위한 작업입니다.

## ⚙️ 설정 정보

- **Cron 스케줄**: `0 0 * * 1,4` (매주 월요일, 목요일 자정 UTC)
- **API 엔드포인트**: `/api/cron`
- **함수 위치**: `api/cron.js`

## 🧪 테스트 방법

### 1. 수동 테스트 (브라우저 또는 curl)

**방법 1: 브라우저에서 직접 접속**
```
https://bucheonchurch.vercel.app/api/cron
```

**방법 2: curl 명령어 사용**
```bash
curl https://bucheonchurch.vercel.app/api/cron
```

### 2. 예상 응답

**성공 시:**
```json
{
  "ok": true,
  "dbActive": true,
  "timestamp": "2026-01-12T16:54:34.244Z",
  "queryResult": "success"
}
```

**실패 시 (환경변수 누락):**
```json
{
  "ok": false,
  "error": "Missing environment variables. URL: OK, Key: MISSING",
  "timestamp": "2026-01-12T16:54:34.244Z"
}
```

**실패 시 (DB 연결 오류):**
```json
{
  "ok": false,
  "error": "[에러 메시지]",
  "timestamp": "2026-01-12T16:54:34.244Z"
}
```

## 🔧 환경변수 확인

Vercel 대시보드 → Settings → Environment Variables에서 다음 환경변수가 설정되어 있는지 확인:

- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Supabase 프로젝트 URL
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Supabase Service Role Key (서버사이드 전용)

## 📅 Cron 실행 확인

1. **Vercel 대시보드 확인**
   - Vercel 대시보드 → 해당 프로젝트 → Functions 탭
   - `/api/cron` 함수의 실행 로그 확인

2. **Cron 실행 시간**
   - 매주 월요일 00:00 UTC (한국시간: 월요일 오전 9시)
   - 매주 목요일 00:00 UTC (한국시간: 목요일 오전 9시)

3. **로그 확인 방법**
   - Vercel 대시보드 → 해당 프로젝트 → Logs
   - 필터: `/api/cron` 또는 `cron`
   - 성공 시: `✅ Ping successful - DB active` 메시지 확인

## 🐛 문제 해결

### 문제 1: 404 에러
- **원인**: API 경로가 잘못되었거나 배포가 완료되지 않음
- **해결**: 
  - 배포 완료 대기 (1-2분)
  - 경로가 `/api/cron`인지 확인 (마지막에 `/` 없음)

### 문제 2: "supabaseKey is required" 에러
- **원인**: 환경변수가 설정되지 않았거나 이름이 다름
- **해결**: 
  - Vercel 환경변수 이름 확인 (`SUPABASE_SERVICE_ROLE_KEY`)
  - 환경변수 재배포 (변경 후 재배포 필요)

### 문제 3: "Missing environment variables" 에러
- **원인**: 환경변수가 누락됨
- **해결**: 
  - Vercel 환경변수 설정 확인
  - 모든 환경에 적용되었는지 확인 (Production, Preview, Development)

## 📝 코드 위치

- **파일**: `api/cron.js`
- **함수**: `handler(req, res)`
- **설정**: `vercel.json` (crons 설정)

## ✅ 체크리스트

테스트 전 확인사항:
- [ ] Vercel 배포가 완료되었는가?
- [ ] 환경변수가 모두 설정되었는가?
- [ ] 환경변수 이름이 정확한가?
- [ ] 브라우저/curl로 수동 테스트가 성공하는가?
- [ ] Cron 스케줄이 `vercel.json`에 올바르게 설정되었는가?

## 🔗 관련 링크

- Vercel Cron 문서: https://vercel.com/docs/cron-jobs
- Supabase 문서: https://supabase.com/docs
- 프로젝트 URL: https://bucheonchurch.vercel.app

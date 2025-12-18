# Supabase MCP 설정 가이드

## ✅ Supabase 연결 완료!

모든 파일에 Supabase 프로젝트 정보가 설정되었습니다:
- ✅ `js/supabase-config.js`
- ✅ `admin/login.html`
- ✅ `admin/index.html`
- ✅ `index.html` (Supabase JS SDK 추가됨)

---

## 🔧 Supabase MCP 설정 방법

### 1. Cursor 설정 파일 열기

**방법 1: 명령 팔레트 사용**
1. `Cmd + Shift + P` (Mac) 또는 `Ctrl + Shift + P` (Windows)
2. "Preferences: Open User Settings (JSON)" 입력
3. 또는 "MCP" 검색

**방법 2: 직접 파일 열기**
```bash
# Mac/Linux
code ~/.cursor/mcp.json

# 또는 프로젝트별 설정
mkdir -p .cursor
nano .cursor/mcp.json
```

### 2. MCP 설정 파일 내용

아래 내용을 **mcp.json** 파일에 붙여넣으세요:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-postgrest",
        "--apiUrl",
        "https://fkqxalcwhqohrkdzwhvv.supabase.co/rest/v1",
        "--apiKey",
        "sbp_1ae04ca2ac352e4865a41c96d8e287d8a78356cc",
        "--schema",
        "public"
      ]
    }
  }
}
```

### 3. 저장 및 Cursor 재시작

1. 파일 저장: `Cmd + S` (Mac) / `Ctrl + S` (Windows)
2. Cursor 완전 종료: `Cmd + Q` (Mac) / `Alt + F4` (Windows)
3. Cursor 다시 실행
4. 프로젝트 폴더 열기

### 4. MCP 연결 확인

Cursor 재시작 후:
1. 왼쪽 하단에 "MCP" 아이콘 확인
2. 또는 채팅창에서 `@supabase` 입력 가능한지 확인
3. 연결되면: "Supabase MCP connected" 메시지

---

## 🎯 이제 SQL 작업은 MCP로!

### 사용 예시

#### 1. 테이블 생성
```
@supabase 테이블 생성해줘:
- 테이블명: announcements
- 컬럼: title, content, created_at
```

#### 2. 데이터 조회
```
@supabase service_cards 테이블의 모든 데이터 보여줘
```

#### 3. 데이터 삽입
```
@supabase hero_section 테이블에 새 데이터 추가:
- main_title: "새로운 제목"
- description: "설명 텍스트"
```

#### 4. 업데이트
```
@supabase stats_items에서 label이 "설립 연도"인 행의 value를 "1990"으로 변경해줘
```

---

## 📊 Supabase 대시보드 직접 접근

MCP 없이도 직접 작업 가능:

1. **Supabase 대시보드**: https://supabase.com/dashboard
2. 프로젝트 선택: **bucheon-church** (또는 프로젝트명)
3. **Table Editor** → 테이블 직접 편집
4. **SQL Editor** → SQL 쿼리 실행

---

## 🔐 보안 정보

### 프로젝트 정보
- **Project URL**: https://fkqxalcwhqohrkdzwhvv.supabase.co
- **Publishable Key**: `sb_publishable_5sLcyIwutRptBow_Xe7MpA_IDKtDwXI`
- **Secret Key**: `sb_secret_EjCToXXubkgySBQNbmOvaw_e_sNejOM`
- **MCP Token**: `sbp_1ae04ca2ac352e4865a41c96d8e287d8a78356cc`

⚠️ **주의**: Secret Key는 서버 사이드에서만 사용하세요!

---

## 🚀 다음 단계: 데이터베이스 초기화

### 1. Supabase 대시보드에서 SQL 실행

1. https://supabase.com/dashboard 접속
2. 프로젝트 선택
3. **SQL Editor** 클릭
4. **New query** 버튼
5. `supabase-setup.sql` 파일 내용 복사 & 붙여넣기
6. **Run** 버튼 클릭

### 2. 관리자 계정 생성

1. **Authentication** → **Users** 메뉴
2. **Add user** 버튼
3. 정보 입력:
   - Email: `admin@bucheonchurch.kr`
   - Password: 안전한 비밀번호
   - Auto Confirm User: ✅ 체크
4. **Save** 클릭

### 3. Storage 버킷 생성

1. **Storage** 메뉴
2. **New bucket** 버튼
3. 버킷 3개 생성:
   - `images` (Public, 5MB limit, image/* only)
   - `bulletins` (Public, 10MB limit, application/pdf only)
   - `uploads` (Public, 20MB limit)

---

## ✅ 설정 완료 확인

모든 설정이 끝나면:

1. **메인 페이지**: http://localhost:3000
2. **관리자 로그인**: http://localhost:3000/admin/login.html
   - 위에서 만든 이메일/비밀번호로 로그인
3. **대시보드**: 통계 확인

---

## 🆘 문제 해결

### MCP 연결 안 됨
- Cursor 완전히 종료 후 재시작
- `npx` 명령어 사용 가능한지 확인
- Node.js 설치 확인: `node --version`

### 로그인 안 됨
- Supabase에서 관리자 계정 생성했는지 확인
- Email/Password 제공자 활성화 확인
- 브라우저 콘솔(F12)에서 에러 확인

### 데이터 안 보임
- `supabase-setup.sql` 실행했는지 확인
- Table Editor에서 데이터 있는지 확인
- RLS 정책 확인

---

**모든 설정이 완료되면 이 파일은 삭제해도 됩니다!**










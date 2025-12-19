# 📦 Supabase Storage 설정 가이드

## ⚠️ 중요: 반드시 이 설정을 완료해야 업로드가 작동합니다!

미디어 업로드가 작동하려면 Supabase Dashboard에서 Storage 정책(RLS Policy)을 설정해야 합니다.

---

## 📋 설정 순서

### 1. Supabase Dashboard 접속
```
https://fkqxalcwhqohrkdzwhvv.supabase.co
```
로그인하세요.

---

### 2. Storage 메뉴로 이동
왼쪽 사이드바에서:
- **Storage** 클릭
- **media** 버킷 확인 (이미 생성되어 있습니다)

---

### 3. Configuration 설정
`media` 버킷을 클릭한 후 우측 상단의 **Configuration** 탭으로 이동:

#### ✅ Public bucket 설정
- **Public bucket** 토글을 **ON**으로 변경
- 이렇게 하면 업로드된 파일을 누구나 볼 수 있습니다

#### ✅ File size limit
- 이미 50MB로 설정되어 있습니다

#### ✅ Allowed MIME types
- 이미 설정되어 있습니다:
  - image/jpeg, image/png, image/gif, image/webp
  - video/mp4, video/webm, video/quicktime
  - application/pdf

---

### 4. Policies (정책) 설정

`media` 버킷의 **Policies** 탭으로 이동:

#### 📤 정책 1: 업로드 허용 (INSERT)
**New Policy** 버튼 클릭 → **Create a policy** 선택

```
Policy Name: Anyone can upload to media
Target roles: public
Policy definition: For INSERT operations
WITH CHECK expression: bucket_id = 'media'
```

또는 SQL Editor에서 직접 실행:
```sql
CREATE POLICY "Anyone can upload to media"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'media');
```

---

#### 👀 정책 2: 읽기 허용 (SELECT)
**New Policy** 버튼 클릭 → **Create a policy** 선택

```
Policy Name: Public Access to media
Target roles: public
Policy definition: For SELECT operations
USING expression: bucket_id = 'media'
```

또는 SQL Editor에서:
```sql
CREATE POLICY "Public Access to media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');
```

---

#### ✏️ 정책 3: 수정 허용 (UPDATE)
**New Policy** 버튼 클릭 → **Create a policy** 선택

```
Policy Name: Anyone can update media
Target roles: public
Policy definition: For UPDATE operations
USING expression: bucket_id = 'media'
```

또는 SQL Editor에서:
```sql
CREATE POLICY "Anyone can update media"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'media');
```

---

#### 🗑️ 정책 4: 삭제 허용 (DELETE)
**New Policy** 버튼 클릭 → **Create a policy** 선택

```
Policy Name: Anyone can delete media
Target roles: public
Policy definition: For DELETE operations
USING expression: bucket_id = 'media'
```

또는 SQL Editor에서:
```sql
CREATE POLICY "Anyone can delete media"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'media');
```

---

## 🚀 빠른 설정 (SQL Editor 사용) ⭐ 추천

**가장 빠른 방법**: `fix-storage-rls.sql` 파일을 사용하세요!

1. **SQL Editor** 메뉴로 이동
2. `fix-storage-rls.sql` 파일 내용 전체 복사
3. **New query** → 붙여넣기 → **Run** 실행
4. 성공 메시지 확인

또는 아래 코드를 직접 사용:

```sql
-- 기존 정책 삭제 (있다면)
DROP POLICY IF EXISTS "Anyone can upload to media" ON storage.objects;
DROP POLICY IF EXISTS "Public Access to media" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update media" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete media" ON storage.objects;

-- 새 정책 생성
CREATE POLICY "Anyone can upload to media"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Public Access to media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

CREATE POLICY "Anyone can update media"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'media');

CREATE POLICY "Anyone can delete media"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'media');

-- media_library 테이블 정책도 수정
DROP POLICY IF EXISTS "Admin write media" ON media_library;
DROP POLICY IF EXISTS "Public read media" ON media_library;

CREATE POLICY "Public read media" ON media_library FOR SELECT TO public USING (true);
CREATE POLICY "Public write media" ON media_library FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public update media" ON media_library FOR UPDATE TO public USING (true);
CREATE POLICY "Public delete media" ON media_library FOR DELETE TO public USING (true);
```

3. **RUN** 버튼 클릭

---

## ✅ 설정 확인

설정이 완료되면:

1. `http://localhost:3000/admin/media-upload.html` 접속
2. 테스트 이미지 파일 선택
3. 카테고리 선택 (예: "예배")
4. **업로드** 버튼 클릭
5. 성공 메시지 확인!

---

## 🔒 보안 참고사항

현재 설정은 **누구나 업로드/삭제**가 가능합니다.

나중에 관리자만 업로드하도록 제한하려면:
- `TO public` 대신 `TO authenticated` 사용
- 관리자 로그인 기능 추가 필요

예시:
```sql
CREATE POLICY "Only authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');
```

---

## 📞 문제 해결

### 업로드 시 "new row violates row-level security policy" 에러
→ 정책 4개가 모두 생성되었는지 확인하세요.

### 업로드된 이미지가 보이지 않음
→ "Public Access to media" 정책이 활성화되었는지 확인하세요.

### 파일 삭제가 안 됨
→ "Anyone can delete media" 정책이 활성화되었는지 확인하세요.

---

## 📌 요약

✅ Storage > media 버킷 > Configuration > **Public bucket ON**
✅ Storage > media 버킷 > Policies > **4개 정책 생성**
   1. INSERT (업로드)
   2. SELECT (읽기)
   3. UPDATE (수정)
   4. DELETE (삭제)

이제 미디어 업로드 시스템을 사용할 수 있습니다! 🎉









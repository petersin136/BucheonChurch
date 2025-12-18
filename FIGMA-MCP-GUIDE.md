# 🎨 Figma MCP 설정 완료!

## ✅ 설정 완료

Figma MCP 서버가 `~/.cursor/mcp.json`에 추가되었습니다.

---

## 🔄 다음 단계

**중요:** Cursor를 완전히 종료하고 다시 실행해야 합니다!

1. **Cursor 완전 종료**
   - macOS: `Cmd + Q`
   - Windows: `Alt + F4` 또는 작업 관리자에서 종료

2. **Cursor 다시 실행**

3. **설정 확인**
   - MCP 서버가 정상적으로 연결되었는지 확인

---

## 📖 사용법

### 1. Figma에서 디자인 만들기
- Figma에서 원하는 디자인을 완성하세요

### 2. 디자인 링크 복사
- Figma에서 **Share → Copy link** 클릭
- 링크를 복사하세요

### 3. Cursor에서 사용
다음 프롬프트를 Cursor에게 주세요:

```
이 Figma 디자인을 HTML/CSS로 정확히 변환해줘:
[여기에 Figma 링크 붙여넣기]

요구사항:
- 글씨체, 크기, 색상, 위치 Figma와 100% 동일하게
- Tailwind CSS 사용
- 반응형 적용 (모바일/태블릿/데스크톱)
- 현재 index.html에 적용
```

---

## 🎯 예시

```
이 Figma 디자인을 HTML/CSS로 정확히 변환해줘:
https://www.figma.com/file/xxxxx/design-name

요구사항:
- 글씨체, 크기, 색상, 위치 Figma와 100% 동일하게
- Tailwind CSS 사용
- 반응형 적용
- 현재 index.html에 적용
```

---

## ⚠️ 주의사항

- Figma API Key가 유효한지 확인하세요
- Cursor를 재시작하지 않으면 MCP 서버가 작동하지 않습니다
- Figma 디자인이 공개(Public)로 설정되어 있어야 합니다

---

## 🔧 문제 해결

### MCP 서버가 작동하지 않을 때:
1. Cursor 완전 종료 후 재시작 확인
2. `~/.cursor/mcp.json` 파일 확인
3. Figma API Key 유효성 확인
4. Figma 디자인 공개 설정 확인

---

**이제 Figma 디자인을 바로 코드로 변환할 수 있습니다!** 🎉








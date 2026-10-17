# Pinterest 홍보 — 사장님 할 일 (총 ~10분, 한 번만)

Claude가 직종별 템플릿 핀 32개(이미지·제목·설명·링크·키워드·게시 일정)를 준비해 두었습니다.
업로드하면 Pinterest가 **10/20부터 하루 2개씩(미국 오전/오후) 16일 동안 자동 게시**합니다.

## 순서
1. **Pinterest 비즈니스 계정 만들기** (5분): https://business.pinterest.com → 무료로 가입 (언어 English, 국가 United States 권장 — 해외 대상).
   - 웹사이트 항목에 `https://sendinvoicefree.com` 입력.
2. **보드 만들기** (1분): 프로필 → `+` → Board → 이름을 정확히 **`Free Invoice Templates`** 로.
3. **CSV 일괄 업로드** (2분): 상단 `Create` → **Bulk create Pins**(또는 `Create Pin` 화면의 "Bulk upload") → 이 폴더의 `pins.csv` 업로드.
   - 파일 받기: https://github.com/ziro0914/free-invoice-maker/raw/main/marketing/pinterest/pins.csv
4. 끝나면 폰 Claude에 "핀 업로드 완료"라고만 알려주세요.

## 참고
- 이미지는 사이트에 올라가 있어야 업로드됩니다(`https://sendinvoicefree.com/pins/<직종>.png`). 이 변경이 main에 반영된 뒤 업로드하세요.
- 업로드가 10/20 이후로 늦어지면 날짜 오류가 날 수 있습니다 → Claude에게 "핀 날짜 다시 만들어줘"라고 하면 새 CSV를 만듭니다
  (`PW_DIR=<playwright 경로> node ops/make-pins.mjs <시작일> <하루개수>`).
- (선택) Settings → Claim → 웹사이트 `sendinvoicefree.com` 소유 확인 시 메타태그 값을 알려주시면 사이트에 넣어 드립니다 → 핀 노출에 유리.
- 새 직종이 추가되면 Claude가 핀 이미지를 만들어 다음 CSV에 포함합니다.

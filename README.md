# Madrasa Result Web

A simple Next.js website to publish class results from Google Sheets.

## ✅ Implemented (Option A)

This project uses **Option A: one spreadsheet per class**.

- Teacher of each class updates only their class sheet.
- Frontend search supports:
  - `class + hajira/index` → single student result
  - `class only` → full class result table

## Is Google Service Account free?

**Yes, service account is free to create.**

- You create it in Google Cloud project.
- You enable Google Sheets API (normal API usage limits apply).
- No separate paid fee just for creating a service account.

## Can I use my own Google account spreadsheets?

**Yes.** Your personal Google account can still own/manage all spreadsheets.

Backend app authentication is the only reason for service account:

- server can read sheets automatically
- no manual login in production
- cleaner and safer backend auth

You just share each class spreadsheet with service account email as Viewer.

---

## Quick start (Demo mode: no Google setup needed)

If you want to run immediately without service account:

1. Create `.env.local`
2. Add:

```bash
USE_DEMO_DATA=true
```

3. Install and run:

```bash
npm install
npm run dev
```

4. Open `http://localhost:3000`

Demo data files:

- `data/demo/class-6.json`
- `data/demo/class-7.json`

---

## Production setup (Real Google Sheets)

Set in `.env.local`:

```bash
USE_DEMO_DATA=false

GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

SHEET_ID_CLASS_6=your_sheet_id
SHEET_ID_CLASS_7=your_sheet_id
```

Then share each class spreadsheet with `GOOGLE_SERVICE_ACCOUNT_EMAIL`.

---

## Sample spreadsheet template (for teachers)

Use this CSV template and upload/import to Google Sheets:

- `docs/templates/class-sheet-template.csv`

Headers used by app:

- `hajira_no`
- `student_name`
- subject columns (bangla, english, math, etc.)
- optional `total`
- optional `merit_position`

---

## API examples

- `GET /api/results?classId=class-6`
- `GET /api/results?classId=class-6&hajiraNo=2`



## Public viewer mode (no service account)

Yes, you can run this project **without a service account** if each class spreadsheet is publicly viewable.

Set in `.env.local`:

```bash
USE_DEMO_DATA=false
USE_PUBLIC_SHEETS=true

SHEET_ID_CLASS_6=your_sheet_id
SHEET_ID_CLASS_7=your_sheet_id
```

Important for this mode:

- Google Sheet must be shared as **Anyone with the link → Viewer**.
- App reads public CSV endpoint by sheet/tab name (from your configured range like `Marks!A1:Z`).
- Keep non-sensitive data only in public sheets.

If data is sensitive/private, keep `USE_PUBLIC_SHEETS=false` and use service account mode.

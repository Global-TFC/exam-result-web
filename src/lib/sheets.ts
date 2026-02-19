import { google } from "googleapis";

function normalizePrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

function getGoogleAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY in environment variables.",
    );
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: normalizePrivateKey(privateKey),
    scopes:
      process.env.GOOGLE_SHEETS_SCOPES ??
      "https://www.googleapis.com/auth/spreadsheets.readonly",
  });
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      const next = line[index + 1];
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function parseCsv(csvText: string): string[][] {
  return csvText
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .map((line) => parseCsvLine(line));
}

function getSheetNameFromRange(range: string): string {
  const [sheetPart] = range.split("!");
  return sheetPart?.trim() || "Sheet1";
}

async function getPublicSheetValues(spreadsheetId: string, range: string) {
  const sheet = encodeURIComponent(getSheetNameFromRange(range));
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${sheet}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      "Failed to read public sheet. Make sure sheet is shared publicly (Anyone with link: Viewer).",
    );
  }

  const csv = await response.text();
  return parseCsv(csv);
}

export async function getSheetValues(spreadsheetId: string, range: string) {
  if (!spreadsheetId) {
    throw new Error("Spreadsheet ID is missing in class config.");
  }

  const usePublicSheets = process.env.USE_PUBLIC_SHEETS === "true";
  if (usePublicSheets) {
    return getPublicSheetValues(spreadsheetId, range);
  }

  const auth = getGoogleAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values ?? [];
}

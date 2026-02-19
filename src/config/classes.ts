export type ClassConfig = {
  id: string;
  label: string;
  spreadsheetId: string;
  range: string;
};

type EnvClassConfig = {
  id?: string;
  label?: string;
  sheet?: string;
  range?: string;
};

const DEFAULT_RANGE = "Marks!A1:Z";

function extractSpreadsheetId(value: string | undefined) {
  const input = (value ?? "").trim();
  if (!input) return "";

  const match = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match?.[1]) {
    return match[1];
  }

  return input;
}

function getLegacyClassEnvConfig(classNumber: number): EnvClassConfig {
  const classId = `class-${classNumber}`;
  const legacySheetId = process.env[`SHEET_ID_CLASS_${classNumber}`] ?? "";

  return {
    id: classId,
    label: `Class ${classNumber}`,
    sheet: legacySheetId,
    range: DEFAULT_RANGE,
  };
}

function getDefaultClasses(): EnvClassConfig[] {
  return Array.from({ length: 12 }, (_, index) =>
    getLegacyClassEnvConfig(index + 1),
  );
}

function getClassesFromJsonEnv(): EnvClassConfig[] | null {
  const raw = process.env.CLASS_SHEETS_JSON;
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed as EnvClassConfig[];
  } catch {
    return null;
  }
}

function mapToClassConfig(item: EnvClassConfig, index: number): ClassConfig {
  const classNumber = index + 1;
  const id = (item.id ?? `class-${classNumber}`).trim() || `class-${classNumber}`;
  const label = (item.label ?? `Class ${classNumber}`).trim() || `Class ${classNumber}`;
  const spreadsheetId = extractSpreadsheetId(item.sheet);
  const range = (item.range ?? DEFAULT_RANGE).trim() || DEFAULT_RANGE;

  return {
    id,
    label,
    spreadsheetId,
    range,
  };
}

const envClasses = getClassesFromJsonEnv() ?? getDefaultClasses();

export const classes: ClassConfig[] = envClasses.map(mapToClassConfig);

export function getClassConfig(classId: string) {
  return classes.find((item) => item.id === classId);
}

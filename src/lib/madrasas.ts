import madrasaData from "@/data/madrasas.json";

const DEFAULT_RANGE = "Marks!A1:Z";

export type Madrasa = {
  slug: string;
  name: string;
  location: string;
  image: string;
  description?: string;
  classes: Record<string, string>;
};

export type MadrasaClassOption = {
  id: string;
  label: string;
};

export type MadrasaClassConfig = {
  id: string;
  label: string;
  spreadsheetId: string;
  range: string;
};

function extractSpreadsheetId(value: string | undefined) {
  const input = (value ?? "").trim();
  if (!input) return "";

  const match = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match?.[1]) return match[1];

  return input;
}

function toClassLabel(classId: string) {
  const match = classId.match(/^class-(\d+)$/i);
  if (!match) return classId;
  return `Class ${match[1]}`;
}

export const madrasas: Madrasa[] = (madrasaData as Madrasa[]).map((item) => ({
  ...item,
  classes: item.classes ?? {},
}));

export function getMadrasaBySlug(slug: string) {
  return madrasas.find((item) => item.slug === slug);
}

export function getMadrasaClassOptions(slug: string): MadrasaClassOption[] {
  const madrasa = getMadrasaBySlug(slug);
  if (!madrasa) return [];

  return Object.keys(madrasa.classes)
    .filter((classId) => `${madrasa.classes[classId] ?? ""}`.trim() !== "")
    .map((classId) => ({
      id: classId,
      label: toClassLabel(classId),
    }))
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
}

export function getMadrasaClassConfig(
  slug: string,
  classId: string,
): MadrasaClassConfig | null {
  const madrasa = getMadrasaBySlug(slug);
  if (!madrasa) return null;

  const sheetValue = madrasa.classes[classId];
  if (!sheetValue) return null;

  return {
    id: classId,
    label: toClassLabel(classId),
    spreadsheetId: extractSpreadsheetId(sheetValue),
    range: DEFAULT_RANGE,
  };
}

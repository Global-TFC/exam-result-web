export type StudentResult = {
  hajiraNo: string;
  studentName: string;
  subjects: Record<string, number>;
  total: number;
  meritPosition?: number;
  raw: Record<string, string>;
};

const RESERVED_COLUMNS = new Set([
  "hajira_no",
  "hajira",
  "index_no",
  "index",
  "student_name",
  "name",
  "total",
  "merit_position",
  "position",
]);

function parseNumber(value: string | undefined) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function rowsToResults(rows: string[][]): StudentResult[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map((header) => header.trim().toLowerCase());
  const dataRows = rows.slice(1);

  return dataRows
    .filter((row) => row.some((cell) => `${cell}`.trim() !== ""))
    .map((row) => {
      const raw: Record<string, string> = {};
      headers.forEach((header, index) => {
        raw[header] = `${row[index] ?? ""}`.trim();
      });

      const subjects: Record<string, number> = {};
      headers.forEach((header) => {
        if (RESERVED_COLUMNS.has(header)) return;
        const num = parseNumber(raw[header]);
        if (typeof num === "number") {
          subjects[header] = num;
        }
      });

      const totalFromSheet = parseNumber(raw.total);
      const totalFromSubjects = Object.values(subjects).reduce((sum, mark) => sum + mark, 0);

      const meritPosition = parseNumber(raw.merit_position) ?? parseNumber(raw.position);

      return {
        hajiraNo: raw.hajira_no || raw.hajira || raw.index_no || raw.index || "",
        studentName: raw.student_name || raw.name || "",
        subjects,
        total: typeof totalFromSheet === "number" ? totalFromSheet : totalFromSubjects,
        meritPosition,
        raw,
      };
    })
    .sort((a, b) => b.total - a.total);
}

export function filterResults(results: StudentResult[], hajiraNo?: string) {
  if (!hajiraNo) return results;
  return results.filter((student) => student.hajiraNo === hajiraNo.trim());
}

export type StudentResult = {
  no: string;
  studentName: string;
  subjects: Record<string, number>;
  total: number;
  meritPosition?: number;
  finalResult?: string;
  raw: Record<string, string>;
};

const RESERVED_COLUMNS = new Set([
  "no",
  "hajira_no",
  "hajira",
  "index_no",
  "index",
  "roll_no",
  "roll",
  "student_name",
  "name",
  "total",
  "merit_position",
  "position",
  "pass_fail",
  "passed_failed",
  "final_result",
  "result",
  "status",
]);

function parseNumber(value: string | undefined) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function rowsToResults(rows: string[][]): StudentResult[] {
  if (rows.length < 2) return [];

  const originalHeaders = rows[0].map((header) => `${header ?? ""}`.trim());
  const headers = originalHeaders.map((header) => header.toLowerCase());
  const dataRows = rows.slice(1);

  return dataRows
    .filter((row) => row.some((cell) => `${cell}`.trim() !== ""))
    .map((row) => {
      const raw: Record<string, string> = {};
      headers.forEach((header, index) => {
        raw[header] = `${row[index] ?? ""}`.trim();
      });

      const subjects: Record<string, number> = {};
      headers.forEach((header, index) => {
        if (RESERVED_COLUMNS.has(header)) return;
        const num = parseNumber(raw[header]);
        if (typeof num === "number") {
          const subjectName = originalHeaders[index] || header;
          subjects[subjectName] = num;
        }
      });

      const totalFromSheet = parseNumber(raw.total);
      const totalFromSubjects = Object.values(subjects).reduce((sum, mark) => sum + mark, 0);

      const meritPosition = parseNumber(raw.merit_position) ?? parseNumber(raw.position);
      const finalResult =
        raw.final_result ||
        raw.pass_fail ||
        raw.passed_failed ||
        raw.result ||
        raw.status ||
        undefined;

      return {
        no:
          raw.no ||
          raw.hajira_no ||
          raw.hajira ||
          raw.index_no ||
          raw.index ||
          raw.roll_no ||
          raw.roll ||
          "",
        studentName: raw.student_name || raw.name || "",
        subjects,
        total: typeof totalFromSheet === "number" ? totalFromSheet : totalFromSubjects,
        meritPosition,
        finalResult,
        raw,
      };
    })
    .sort((a, b) => b.total - a.total);
}

export function filterResults(results: StudentResult[], no?: string) {
  if (!no) return results;
  return results.filter((student) => student.no === no.trim());
}

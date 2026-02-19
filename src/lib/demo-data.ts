import class6 from "../../data/demo/class-6.json";
import class7 from "../../data/demo/class-7.json";

const demoMap: Record<string, Record<string, string>[]> = {
  "class-6": class6,
  "class-7": class7,
};

export function getDemoRowsForClass(classId: string): string[][] {
  const entries = demoMap[classId] ?? [];
  if (entries.length === 0) return [];

  const headers = Object.keys(entries[0]);
  const rows = entries.map((item) => headers.map((header) => item[header] ?? ""));
  return [headers, ...rows];
}

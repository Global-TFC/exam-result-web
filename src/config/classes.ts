export type ClassConfig = {
  id: string;
  label: string;
  spreadsheetId: string;
  range: string;
};

/**
 * Option A implementation: one spreadsheet per class.
 * Fill these using your real spreadsheet IDs.
 */
export const classes: ClassConfig[] = [
  {
    id: "class-6",
    label: "Class 6",
    spreadsheetId: process.env.SHEET_ID_CLASS_6 ?? "",
    range: "Marks!A1:Z",
  },
  {
    id: "class-7",
    label: "Class 7",
    spreadsheetId: process.env.SHEET_ID_CLASS_7 ?? "",
    range: "Marks!A1:Z",
  },
];

export function getClassConfig(classId: string) {
  return classes.find((item) => item.id === classId);
}

export type ClassConfig = {
  id: string;
  label: string;
  spreadsheetId: string;
  range: string; // e.g. "Marks!A1:Z"
};

export const classes: ClassConfig[] = [
  {
    id: "class-6",
    label: "Class 6",
    spreadsheetId: "YOUR_GOOGLE_SPREADSHEET_ID",
    range: "Marks!A1:Z",
  },
  {
    id: "class-7",
    label: "Class 7",
    spreadsheetId: "YOUR_GOOGLE_SPREADSHEET_ID",
    range: "Marks!A1:Z",
  },
];

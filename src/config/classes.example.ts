export type ClassConfig = {
  id: string;
  label: string;
  spreadsheetId: string;
  range: string; // e.g. "Marks!A1:Z"
};

/**
 * Prefer setting classes through:
 * CLASS_SHEETS_JSON in .env
 *
 * Example:
 * CLASS_SHEETS_JSON=[
 *   {"id":"class-1","label":"Class 1","sheet":"https://docs.google.com/spreadsheets/d/XXX/edit","range":"Marks!A1:Z"},
 *   {"id":"class-2","label":"Class 2","sheet":"XXX_SPREADSHEET_ID","range":"Marks!A1:Z"}
 * ]
 */

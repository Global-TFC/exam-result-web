import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClassConfig } from "@/config/classes";
import { rowsToResults, filterResults } from "@/lib/results";
import { getSheetValues } from "@/lib/sheets";
import { getDemoRowsForClass } from "@/lib/demo-data";

const querySchema = z.object({
  classId: z.string().min(1),
  hajiraNo: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse({
    classId: request.nextUrl.searchParams.get("classId") ?? "",
    hajiraNo: request.nextUrl.searchParams.get("hajiraNo") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid query. classId is required." },
      { status: 400 },
    );
  }

  const config = getClassConfig(parsed.data.classId);
  if (!config) {
    return NextResponse.json({ message: "Class not found." }, { status: 404 });
  }

  try {
    const useDemoData = process.env.USE_DEMO_DATA === "true";

    const rows = useDemoData
      ? getDemoRowsForClass(config.id)
      : await getSheetValues(config.spreadsheetId, config.range);
    const allResults = rowsToResults(rows as string[][]);
    const students = filterResults(allResults, parsed.data.hajiraNo);

    return NextResponse.json({
      classId: config.id,
      classLabel: config.label,
      count: students.length,
      students,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unexpected error while reading Google Sheets.",
      },
      { status: 500 },
    );
  }
}

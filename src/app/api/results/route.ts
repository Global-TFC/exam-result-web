import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getMadrasaBySlug, getMadrasaClassConfig } from "@/lib/madrasas";
import { rowsToResults, filterResults } from "@/lib/results";
import { getSheetValues } from "@/lib/sheets";
import { getDemoRowsForClass } from "@/lib/demo-data";

const querySchema = z.object({
  madrasaSlug: z.string().min(1),
  classId: z.string().min(1),
  no: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse({
    madrasaSlug:
      request.nextUrl.searchParams.get("madrasaSlug") ??
      request.nextUrl.searchParams.get("madrasa") ??
      "",
    classId: request.nextUrl.searchParams.get("classId") ?? "",
    no:
      request.nextUrl.searchParams.get("no") ??
      request.nextUrl.searchParams.get("hajiraNo") ??
      undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid query. madrasaSlug and classId are required." },
      { status: 400 },
    );
  }

  const madrasa = getMadrasaBySlug(parsed.data.madrasaSlug);
  if (!madrasa) {
    return NextResponse.json({ message: "Madrasa not found." }, { status: 404 });
  }

  const config = getMadrasaClassConfig(parsed.data.madrasaSlug, parsed.data.classId);
  if (!config) {
    return NextResponse.json({ message: "Class not found." }, { status: 404 });
  }

  try {
    const useDemoData = process.env.USE_DEMO_DATA === "true";

    const rows = useDemoData
      ? getDemoRowsForClass(config.id)
      : await getSheetValues(config.spreadsheetId, config.range);
    const allResults = rowsToResults(rows as string[][]);
    const students = filterResults(allResults, parsed.data.no);

    return NextResponse.json({
      madrasaSlug: madrasa.slug,
      madrasaName: madrasa.name,
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

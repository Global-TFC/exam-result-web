"use client";

import { useMemo, useState } from "react";

type Student = {
  hajiraNo: string;
  studentName: string;
  subjects: Record<string, number>;
  total: number;
  meritPosition?: number;
};

type ApiResponse = {
  classId: string;
  classLabel: string;
  count: number;
  students: Student[];
  message?: string;
};

type ClassOption = {
  id: string;
  label: string;
};

export function ResultSearch({ classes }: { classes: ClassOption[] }) {
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [hajiraNo, setHajiraNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ApiResponse | null>(null);

  const subjectHeaders = useMemo(() => {
    const first = data?.students?.[0];
    return first ? Object.keys(first.subjects) : [];
  }, [data]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setData(null);

    const params = new URLSearchParams({ classId });
    if (hajiraNo.trim()) params.set("hajiraNo", hajiraNo.trim());

    const response = await fetch(`/api/results?${params.toString()}`);
    const json = (await response.json()) as ApiResponse;

    if (!response.ok) {
      setError(json.message ?? "Could not load results.");
      setLoading(false);
      return;
    }

    setData(json);
    setLoading(false);
  }

  return (
    <>
      <section className="card">
        <h1>Madrasa Result Publishing Portal</h1>
        <p>Search using class + hajira number for one student, or class only for full class result.</p>
        <form onSubmit={onSubmit} className="grid">
          <div>
            <label htmlFor="classId">Class</label>
            <select id="classId" value={classId} onChange={(e) => setClassId(e.target.value)}>
              {classes.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="hajiraNo">Hajira / Index No (optional)</label>
            <input
              id="hajiraNo"
              value={hajiraNo}
              onChange={(e) => setHajiraNo(e.target.value)}
              placeholder="e.g. 17"
            />
          </div>
          <div>
            <button type="submit" disabled={loading || !classId}>
              {loading ? "Searching..." : "Get Result"}
            </button>
          </div>
        </form>
        {error ? <div className="status">❌ {error}</div> : null}
      </section>

      {data ? (
        <section className="card table-wrap">
          <h2>
            {data.classLabel} — {data.count} result{data.count === 1 ? "" : "s"}
          </h2>
          {data.students.length === 0 ? (
            <p>No student found for this query.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Hajira</th>
                  <th>Name</th>
                  {subjectHeaders.map((subject) => (
                    <th key={subject}>{subject}</th>
                  ))}
                  <th>Total</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {data.students.map((student) => (
                  <tr key={`${student.hajiraNo}-${student.studentName}`}>
                    <td>{student.hajiraNo}</td>
                    <td>{student.studentName}</td>
                    {subjectHeaders.map((subject) => (
                      <td key={`${student.hajiraNo}-${subject}`}>{student.subjects[subject] ?? "-"}</td>
                    ))}
                    <td>{student.total}</td>
                    <td>{student.meritPosition ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ) : null}
    </>
  );
}

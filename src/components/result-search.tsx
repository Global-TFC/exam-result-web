"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  no: string;
  studentName: string;
  subjects: Record<string, number>;
  total: number;
  meritPosition?: number;
  finalResult?: string;
};

type ApiResponse = {
  madrasaSlug?: string;
  madrasaName?: string;
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

type MadrasaHeader = {
  slug: string;
  name: string;
  location: string;
  image?: string;
};

const HERO_IMAGE_FALLBACK = "/madrasa.jpg";

export function ResultSearch({
  madrasa,
  classes,
}: {
  madrasa: MadrasaHeader;
  classes: ClassOption[];
}) {
  const router = useRouter();
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [no, setNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<"print" | "pdf" | "share" | null>(null);
  const [error, setError] = useState("");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [pulseResults, setPulseResults] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const hasHydratedFromUrl = useRef(false);
  const hasQueuedBackgroundPrefetch = useRef(false);
  const classCacheRef = useRef<Record<string, ApiResponse>>({});

  const selectedClassLabel = useMemo(() => {
    return classes.find((item) => item.id === classId)?.label ?? "Select class";
  }, [classId, classes]);

  const subjectHeaders = useMemo(() => {
    if (!data?.students?.length) return [];

    const ordered = new Set<string>();
    data.students.forEach((student) => {
      Object.keys(student.subjects).forEach((subject) => ordered.add(subject));
    });

    return Array.from(ordered);
  }, [data]);

  const singleStudent = useMemo(() => {
    if (!data?.students?.length) return null;
    return no.trim() && data.students.length === 1 ? data.students[0] : null;
  }, [data, no]);

  const heroImage = madrasa.image || process.env.NEXT_PUBLIC_MADRASA_IMAGE_URL || HERO_IMAGE_FALLBACK;

  function buildQuery(targetClassId: string, targetNo: string) {
    const params = new URLSearchParams();
    params.set("madrasaSlug", madrasa.slug);
    params.set("classId", targetClassId);
    if (targetNo.trim()) params.set("no", targetNo.trim());
    return params.toString();
  }

  function buildShareUrl(targetClassId: string, targetNo: string) {
    if (typeof window === "undefined") return "";
    const query = buildQuery(targetClassId, targetNo);
    return `${window.location.origin}/${madrasa.slug}?${query}`;
  }

  function filterByNo(classData: ApiResponse, targetNo: string) {
    const trimmedNo = targetNo.trim();
    if (!trimmedNo) return classData;

    const filteredStudents = classData.students.filter((student) => student.no === trimmedNo);
    return {
      ...classData,
      count: filteredStudents.length,
      students: filteredStudents,
    };
  }

  async function fetchClassData(targetClassId: string) {
    const cached = classCacheRef.current[targetClassId];
    if (cached) return cached;

    const params = new URLSearchParams({
      madrasaSlug: madrasa.slug,
      classId: targetClassId,
    });
    const response = await fetch(`/api/results?${params.toString()}`);
    const json = (await response.json()) as ApiResponse;

    if (!response.ok) {
      throw new Error(json.message ?? "Could not load results.");
    }

    classCacheRef.current[targetClassId] = json;
    return json;
  }

  function prefetchClassData(targetClassId: string) {
    if (!targetClassId || classCacheRef.current[targetClassId]) return;
    void fetchClassData(targetClassId).catch(() => {
      // Ignore background prefetch failures. Foreground search handles errors.
    });
  }

  async function fetchResults(targetClassId: string, targetNo: string) {
    setLoading(true);
    setError("");
    setData(null);
    setShareMessage("");

    try {
      const classData = await fetchClassData(targetClassId);
      const filtered = filterByNo(classData, targetNo);
      setData(filtered);
      setPulseResults(true);
      window.setTimeout(() => setPulseResults(false), 450);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Could not load results.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
    };
  }, []);

  useEffect(() => {
    if (hasHydratedFromUrl.current || typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const classFromUrl = params.get("classId");
    const noFromUrl = params.get("no") ?? "";
    const classExists = classFromUrl && classes.some((item) => item.id === classFromUrl);

    if (classExists && classFromUrl) {
      setClassId(classFromUrl);
      setNo(noFromUrl);
      void fetchResults(classFromUrl, noFromUrl);
    }

    hasHydratedFromUrl.current = true;
  }, [classes, madrasa.slug]);

  useEffect(() => {
    prefetchClassData(classId);

    if (hasQueuedBackgroundPrefetch.current || typeof window === "undefined") return;
    hasQueuedBackgroundPrefetch.current = true;

    const timeoutIds = classes
      .map((item) => item.id)
      .filter((id) => id !== classId)
      .map((id, index) =>
        window.setTimeout(() => {
          prefetchClassData(id);
        }, (index + 1) * 350),
      );

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [classId, classes]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const query = buildQuery(classId, no);
    router.replace(`/${madrasa.slug}?${query}`, { scroll: false });
    await fetchResults(classId, no);
  }

  async function onPrint() {
    setActionLoading("print");
    await new Promise((resolve) => setTimeout(resolve, 150));
    window.print();
    setActionLoading(null);
  }

  async function onDownloadPdf() {
    setActionLoading("pdf");
    await new Promise((resolve) => setTimeout(resolve, 150));
    window.print();
    setActionLoading(null);
  }

  async function onShare() {
    setActionLoading("share");
    const url = buildShareUrl(classId, no);
    if (!url) {
      setActionLoading(null);
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Madrasa Result",
          text: "Student result link",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShareMessage("Result link copied.");
      }
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-brand">
            <img
              className="hero-image"
              src={heroImage}
              alt="Madrasa"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <div>
              <p className="hero-kicker">Academic Result Portal</p>
              <h1>{madrasa.name}</h1>
              <p className="hero-location">{madrasa.location}</p>
            </div>
          </div>

          <p>
            Select class and enter student No for individual result card. Leave No empty to view full class table.
          </p>

          {classes.length === 0 ? (
            <div className="status">X No classes are configured for this madrasa yet.</div>
          ) : null}

          <form onSubmit={onSubmit} className="search-grid">
            <div className="field" ref={dropdownRef}>
              <label htmlFor="classDropdownButton">Class</label>
              <button
                id="classDropdownButton"
                type="button"
                className="dropdown-trigger"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-expanded={dropdownOpen}
                aria-haspopup="listbox"
              >
                <span>{selectedClassLabel}</span>
                <span className={`chevron ${dropdownOpen ? "open" : ""}`} aria-hidden="true">
                  v
                </span>
              </button>
              {dropdownOpen ? (
                <ul className="dropdown-menu" role="listbox" aria-label="Select class">
                  {classes.map((option) => (
                    <li key={option.id}>
                      <button
                        type="button"
                        className={`dropdown-item ${option.id === classId ? "active" : ""}`}
                        onClick={() => {
                          setClassId(option.id);
                          prefetchClassData(option.id);
                          setDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="no">No (optional)</label>
              <input id="no" value={no} onChange={(event) => setNo(event.target.value)} placeholder="e.g. 17" />
            </div>

            <button className="cta" type="submit" disabled={loading || !classId} aria-busy={loading}>
              {loading ? (
                <span className="btn-content">
                  <span className="spinner" aria-hidden="true" />
                  Searching...
                </span>
              ) : (
                "Get Result"
              )}
            </button>
          </form>

          {error ? <div className="status">X {error}</div> : null}
        </div>
      </section>

      {data ? (
        singleStudent ? (
          <section className={`student-card ${pulseResults ? "result-pulse" : ""}`}>
            {singleStudent.finalResult?.toLowerCase().includes("pass") ? (
              <div className="confetti confetti-page" aria-hidden="true">
                {Array.from({ length: 36 }).map((_, index) => (
                  <span key={`confetti-page-${index}`} className="confetti-piece" />
                ))}
              </div>
            ) : null}
            <header className="student-card-head">
              <h2>{singleStudent.studentName || "Name"}</h2>
              <p>Annual Exam Result</p>
              <div className="student-head-meta">
                <span>Name: {singleStudent.studentName || "-"}</span>
                <span>No: {singleStudent.no || "-"}</span>
                <span>Class: {data.classLabel}</span>
              </div>
            </header>

            <div className="subject-card">
              <div className="subject-card-head">
                <h3>Subject-wise Results</h3>
                <span className="subject-card-chip">Detailed Marks</span>
              </div>
              <table className="subject-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks Obtained</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectHeaders.map((subject) => (
                    <tr key={`single-${subject}`}>
                      <td>{subject}</td>
                      <td>{singleStudent.subjects[subject] ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="summary-grid">
              <div className="summary-box">
                <span>Total Marks</span>
                <strong>{singleStudent.total}</strong>
              </div>
              <div className="summary-box">
                <span>Rank</span>
                <strong>{singleStudent.meritPosition ?? "-"}</strong>
              </div>
            </div>

            <div className="final-status-wrap">
              {singleStudent.finalResult?.toLowerCase().includes("pass") ? (
                <div className="confetti" aria-hidden="true">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <span key={`confetti-${index}`} className="confetti-piece" />
                  ))}
                </div>
              ) : null}
              <span
                className={`final-status ${
                  singleStudent.finalResult?.toLowerCase().includes("pass")
                    ? "final-status-pass final-status-pass-anim"
                    : "final-status-fail"
                }`}
              >
                {singleStudent.finalResult || "-"}
              </span>
            </div>

            <div className="result-actions no-print">
              <button
                type="button"
                className="action-btn"
                onClick={onPrint}
                disabled={actionLoading !== null}
                aria-busy={actionLoading === "print"}
              >
                {actionLoading === "print" ? (
                  <span className="btn-content">
                    <span className="spinner spinner-light" aria-hidden="true" />
                    Printing...
                  </span>
                ) : (
                  "Print Result"
                )}
              </button>
              <button
                type="button"
                className="action-btn action-btn-outline"
                onClick={onDownloadPdf}
                disabled={actionLoading !== null}
                aria-busy={actionLoading === "pdf"}
              >
                {actionLoading === "pdf" ? (
                  <span className="btn-content">
                    <span className="spinner" aria-hidden="true" />
                    Preparing PDF...
                  </span>
                ) : (
                  "Download PDF"
                )}
              </button>
              <button
                type="button"
                className="action-btn action-btn-outline"
                onClick={onShare}
                disabled={actionLoading !== null}
                aria-busy={actionLoading === "share"}
              >
                {actionLoading === "share" ? (
                  <span className="btn-content">
                    <span className="spinner" aria-hidden="true" />
                    Sharing...
                  </span>
                ) : (
                  "Share Result"
                )}
              </button>
            </div>
            {shareMessage ? <p className="share-note no-print">{shareMessage}</p> : null}
          </section>
        ) : (
          <section className={`card table-wrap ${pulseResults ? "result-pulse" : ""}`}>
            <div className="result-head">
              <h2>
                {data.classLabel} - {data.count} result{data.count === 1 ? "" : "s"}
              </h2>
            </div>

            {data.students.length === 0 ? (
              <p>No student found for this query.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    {subjectHeaders.map((subject) => (
                      <th key={subject}>{subject}</th>
                    ))}
                    <th>Total</th>
                    <th>Rank</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {data.students.map((student) => (
                    <tr key={`${student.no}-${student.studentName}`}>
                      <td>{student.no}</td>
                      <td>{student.studentName}</td>
                      {subjectHeaders.map((subject) => (
                        <td key={`${student.no}-${subject}`}>{student.subjects[subject] ?? "-"}</td>
                      ))}
                      <td>{student.total}</td>
                      <td>{student.meritPosition ?? "-"}</td>
                      <td>
                        {student.finalResult ? (
                          <span
                            className={`badge ${
                              student.finalResult.toLowerCase().includes("pass") ? "badge-pass" : "badge-fail"
                            }`}
                          >
                            {student.finalResult}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )
      ) : loading ? (
        <section className="card table-wrap result-skeleton">
          <div className="skeleton-line w-60" />
          <div className="skeleton-line w-40" />
          <div className="skeleton-table">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`skeleton-row-${index}`} className="skeleton-row" />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Student = {
  no: string;
  studentName: string;
  subjects: Record<string, number>;
  total: number;
  meritPosition?: number;
  finalResult?: string;
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

type MadrasaHeader = {
  slug: string;
  name: string;
  location: string;
  image?: string;
};

const HERO_IMAGE_FALLBACK = "/madrasa.jpg";

export function StudentResultView({
  madrasa,
  classes,
}: {
  madrasa: MadrasaHeader;
  classes: ClassOption[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [no, setNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<"print" | "pdf" | "share" | null>(null);
  const [error, setError] = useState("");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [pulseResults, setPulseResults] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const hasHydratedFromUrl = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    return data.students[0] ?? null;
  }, [data]);

  const heroImage = madrasa.image || process.env.NEXT_PUBLIC_MADRASA_IMAGE_URL || HERO_IMAGE_FALLBACK;

  function buildQuery(targetClassId: string, targetNo: string) {
    const params = new URLSearchParams();
    params.set("classId", targetClassId);
    params.set("no", targetNo.trim());
    return params.toString();
  }

  function buildShareUrl(targetClassId: string, targetNo: string) {
    if (typeof window === "undefined") return "";
    const query = buildQuery(targetClassId, targetNo);
    return `${window.location.origin}/${madrasa.slug}/result?${query}`;
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

  async function fetchResult(targetClassId: string, targetNo: string) {
    setLoading(true);
    setError("");
    setData(null);
    setShareMessage("");

    try {
      if (!targetNo.trim()) {
        setError("Enter student No to view the student result.");
        return;
      }

      const classData = await fetchClassData(targetClassId);
      const match = classData.students.filter((student) => student.no === targetNo.trim());
      const resultData: ApiResponse = {
        ...classData,
        count: match.length,
        students: match,
      };

      if (resultData.students.length === 0) {
        setError("No student found with this student No in the selected class.");
      }

      setData(resultData);
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
    if (hasHydratedFromUrl.current) return;

    const classFromUrl = searchParams.get("classId");
    const noFromUrl = searchParams.get("no") ?? "";
    const classExists = classFromUrl && classes.some((item) => item.id === classFromUrl);
    const initialClass = classExists && classFromUrl ? classFromUrl : classes[0]?.id ?? "";

    setClassId(initialClass);
    setNo(noFromUrl);
    if (initialClass && noFromUrl.trim()) {
      void fetchResult(initialClass, noFromUrl);
    }

    hasHydratedFromUrl.current = true;
  }, [classes, searchParams]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setShareMessage("");
    const query = buildQuery(classId, no);
    router.replace(`/${madrasa.slug}/result?${query}`, { scroll: false });
    await fetchResult(classId, no);
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
          title: singleStudent?.studentName || "Student Result",
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
      {/* <section className="hero">
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
              <p className="hero-kicker">Student Result</p>
              <h1>{madrasa.name}</h1>
              <p className="hero-location">{madrasa.location}</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="search-grid">
            <div className="field" ref={dropdownRef}>
              <label htmlFor="studentClassDropdownButton">Class</label>
              <button
                id="studentClassDropdownButton"
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
              <label htmlFor="studentNo">Student No</label>
              <input
                id="studentNo"
                value={no}
                onChange={(event) => setNo(event.target.value)}
                placeholder="e.g. 17"
                required
              />
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
      </section> */}

      {singleStudent ? (
        <section className={`student-card ${pulseResults ? "result-pulse" : ""}`}>
          {singleStudent.finalResult?.toLowerCase().includes("pass") ? (
            <div className="confetti confetti-page" aria-hidden="true">
              {Array.from({ length: 36 }).map((_, index) => (
                <span key={`confetti-page-${index}`} className="confetti-piece" />
              ))}
            </div>
          ) : null}

          <header className="student-card-head bg-blue-600 rounded-lg text-white p-3">
            <h2 className="text-3xl font-bold">{singleStudent.studentName || "Student Result"}</h2>
            <div className=" text-gray-100">
              <span>{data?.classLabel ?? "-"}</span>
              <span> | No: {singleStudent.no || "-"} </span>
              <p>
               Madrasa: {madrasa.name}
              </p>
              <span>Location: {madrasa.location || "-"}</span>
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
              className={`final-status ${singleStudent.finalResult?.toLowerCase().includes("pass")
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

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
  const [error, setError] = useState("");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [pulseResults, setPulseResults] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const heroImage = madrasa.image || process.env.NEXT_PUBLIC_MADRASA_IMAGE_URL || HERO_IMAGE_FALLBACK;

  function buildQuery(targetClassId: string, targetNo?: string) {
    const params = new URLSearchParams();
    params.set("classId", targetClassId);
    if (targetNo?.trim()) params.set("no", targetNo.trim());
    return params.toString();
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
      if (noFromUrl.trim()) {
        router.replace(`/${madrasa.slug}/result?${buildQuery(classFromUrl, noFromUrl)}`, {
          scroll: false,
        });
      } else {
        setNo("");
        void fetchResults(classFromUrl, "");
      }
    }

    hasHydratedFromUrl.current = true;
  }, [classes, madrasa.slug, router]);

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
    if (no.trim()) {
      router.push(`/${madrasa.slug}/result?${buildQuery(classId, no)}`);
      return;
    }

    const query = buildQuery(classId);
    router.replace(`/${madrasa.slug}?${query}`, { scroll: false });
    await fetchResults(classId, "");
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
            Select class and enter student No to open the student result page. Leave No empty to view full class
            table here.
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
              <input id="no" value={no} onChange={(event) => setNo(event.target.value)} placeholder="e.g. 1" />
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

import Link from "next/link";
import { madrasas } from "@/lib/madrasas";

type PageProps = {
  searchParams?: {
    q?: string;
  };
};

export default function MadrasasPage({ searchParams }: PageProps) {
  const query = (searchParams?.q ?? "").trim().toLowerCase();
  const filtered = !query
    ? madrasas
    : madrasas.filter((item) => {
        const haystack = `${item.name} ${item.location} ${item.description ?? ""}`.toLowerCase();
        return haystack.includes(query);
      });

  return (
    <main className="listing">
      <section className="listing-head">
        <h1>Madrasas Directory</h1>
        <form action="/madrasas" method="get" className="listing-search">
          <input
            type="search"
            name="q"
            defaultValue={searchParams?.q ?? ""}
            placeholder="Search madrasa by name or location"
            aria-label="Search madrasa"
          />
          <button type="submit">Search</button>
        </form>
        <p>
          Showing {filtered.length} madrasa{filtered.length === 1 ? "" : "s"}.
        </p>
      </section>

      <section className="landing-grid">
        {filtered.map((madrasa) => (
          <Link href={`/${madrasa.slug}`} className="madrasa-card" key={madrasa.slug}>
            <img src={madrasa.image} alt={madrasa.name} />
            <div>
              <h3>{madrasa.name}</h3>
              <p>{madrasa.location}</p>
              <small>{madrasa.description}</small>
              <span>Open Result Portal</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

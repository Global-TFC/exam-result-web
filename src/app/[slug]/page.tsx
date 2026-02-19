import { notFound } from "next/navigation";
import { ResultSearch } from "@/components/result-search";
import { getMadrasaBySlug, getMadrasaClassOptions } from "@/lib/madrasas";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function MadrasaResultPage({ params }: PageProps) {
  const madrasa = getMadrasaBySlug(params.slug);
  if (!madrasa) notFound();

  const classOptions = getMadrasaClassOptions(madrasa.slug);

  return (
    <main>
      <ResultSearch
        madrasa={{
          slug: madrasa.slug,
          name: madrasa.name,
          location: madrasa.location,
          image: madrasa.image,
        }}
        classes={classOptions}
      />
    </main>
  );
}

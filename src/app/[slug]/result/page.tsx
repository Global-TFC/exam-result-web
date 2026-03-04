import { notFound } from "next/navigation";
import { StudentResultView } from "@/components/student-result-view";
import { getMadrasaBySlug, getMadrasaClassOptions } from "@/lib/madrasas";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function MadrasaStudentResultPage({ params }: PageProps) {
  const madrasa = getMadrasaBySlug(params.slug);
  if (!madrasa) notFound();

  const classOptions = getMadrasaClassOptions(madrasa.slug);

  return (
    <main>
      <StudentResultView
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

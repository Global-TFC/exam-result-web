import { ResultSearch } from "@/components/result-search";
import { classes } from "@/config/classes";

export default function HomePage() {
  const classOptions = classes.map(({ id, label }) => ({ id, label }));

  return (
    <main>
      <ResultSearch classes={classOptions} />
    </main>
  );
}

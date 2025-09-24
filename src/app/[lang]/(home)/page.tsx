import { redirect } from "next/navigation";

interface HomePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function HomePage(props: HomePageProps) {
  const { lang } = await props.params;
  return redirect(`/${lang}/docs/library/quickstart`);
}

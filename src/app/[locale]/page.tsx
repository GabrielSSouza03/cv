import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { getContent, sectionIds, type SectionId } from "@/content";
import { isLocale } from "@/i18n/config";

export const revalidate = 86400;

const sections: Record<SectionId, typeof About> = {
  about: About,
  experience: Experience,
  skills: Skills,
  education: Education,
  contact: Contact,
};

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return (
    <>
      <Hero content={content} />
      {sectionIds.map((id, i) => {
        const SectionComponent = sections[id];
        return <SectionComponent key={id} content={content} index={i + 1} />;
      })}
    </>
  );
}

import type { Metadata } from "next";
import DomainRiskStatus from "@/components/DomainRiskStatus";

export const metadata: Metadata = {
  title: "Ověření obchodu | Nenaletíš.cz",
  description: "Nenalítněte nekalým praktikám podvodných e-shopů!",
};

export default function DetailPage({ params }: { params: { slug: string } }) {
  const domainName = params.slug.replace(/-([^-.]*)$/, ".$1");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-16 md:p-24">
      <div className="max-w-5xl w-full items-center justify-center text-sm lg:flex">
        <div className="w-full flex flex-col gap-12 items-center justify-center">
          <h1 className="text-secondary font-bold mb-12 text-2xl text-center after:content-[''] after:w-8 after:h-1 after:bg-secondary after:block after:mx-auto after:my-4">
            Ověření domény {domainName}
          </h1>

          <div className="w-full max-w-sm leading-6 p-4 sm:p-12 bg-secondary text-center text-tertiary">
            <DomainRiskStatus domainName={domainName} />
          </div>
        </div>
      </div>
    </main>
  );
}

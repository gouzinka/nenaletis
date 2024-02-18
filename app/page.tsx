import type { Metadata } from "next";
import Image from "next/image";
import Form from "@/components/Form";

export const metadata: Metadata = {
  title: "Nenaletíš.cz",
  description: "Nenalítněte nekalým praktikám podvodných e-shopů!",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-16 md:p-24">
      <div className="max-w-5xl w-full items-center justify-center text-sm lg:flex">
        <div className="w-full flex flex-col gap-12 items-center justify-center">
          <Image
            className="w-[90px] h-[100px]"
            src="/logo.svg"
            alt="Nenaletíš Logo"
            width={90}
            height={100}
            priority
          />

          <div className="w-full max-w-sm md:max-w-2xl px-4 py-12 sm:px-12 md:py-16 md:px-28 lg:px-32 bg-secondary rounded-tl-xl rounded-br-xl md:rounded-tl-3xl md:rounded-br-3xl">
            <h1 className="mb-12 text-xl text-center text-white after:content-[''] after:w-8 after:h-1 after:bg-white after:block after:mx-auto after:my-4">
              Zadejte internetovou adresu e&#8209;shopu
            </h1>
            <Form />
          </div>
        </div>
      </div>
    </main>
  );
}

import { appConfig } from "@/lib/app-config";

export default function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          Milestone 0.1
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          {appConfig.name}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
          Фундамент застосунку готовий. Дизайн-система, навігація та
          перемикач мови з’являться у наступному погодженому підкроці.
        </p>
      </section>
    </main>
  );
}

import PatternGrid from "@/components/PatternGrid";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        KnitMind - Pattern Studio
      </h1>
      <PatternGrid />
    </main>
  );
}
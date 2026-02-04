import { ConsciousnessTest } from "@/components/consciousness-test"

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Hawkins Consciousness Test
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Análisis de nivel de conciencia basado en la escala del Dr. David Hawkins
          </p>
        </header>
        <ConsciousnessTest />
        <footer className="text-center">
          <p className="text-xs text-muted-foreground/60">
            Este análisis es orientativo y no sustituye la evaluación profesional.
          </p>
        </footer>
      </div>
    </main>
  )
}

import { VALORACION_LEVELS } from "@/lib/valoracion"
import { LevelCard } from "@/components/level-card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Valoración de Conciencia | Escala de Hawkins",
  description: "Selecciona un nivel de conciencia para analizar cómo se manifiesta en tu vida",
}

export default function ValoracionPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-foreground mb-4">
            Valoración de Nivel de Conciencia
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Selecciona el nivel de conciencia que deseas explorar. 
            Después te haremos una pregunta para analizar cómo este nivel 
            se manifiesta en tu vida.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {VALORACION_LEVELS.map((level) => (
            <LevelCard key={level.key} level={level} />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          Basado en la Escala de Conciencia del Dr. David Hawkins
        </p>
      </div>
    </main>
  )
}

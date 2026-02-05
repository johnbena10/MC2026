import { LIFE_AREAS } from "@/lib/valoracion"
import { AreaCard } from "@/components/area-card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Valoración de Conciencia | Escala de Hawkins",
  description: "Explora las áreas de tu vida donde se manifiesta tu nivel de conciencia",
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
          <h1 className="text-3xl font-light text-foreground mb-4 text-balance">
            Valoración del Nivel de Conciencia
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Selecciona un área de tu vida para explorar. Tu respuesta será 
            analizada para revelar qué nivel de conciencia se manifiesta 
            actualmente en esa dimensión de tu experiencia.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {LIFE_AREAS.map((area) => (
            <AreaCard key={area.key} area={area} />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12 text-balance">
          Basado en el Mapa de la Conciencia del Dr. David R. Hawkins
        </p>
      </div>
    </main>
  )
}

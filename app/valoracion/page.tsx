import { LIFE_AREAS } from "@/lib/valoracion"
import { AreaCard } from "@/components/area-card"
import { Compass } from "lucide-react"

export const metadata = {
  title: "Valoracion | Mapa de Conciencia",
  description: "Explora las areas de tu vida donde se manifiesta tu nivel de conciencia",
}

export default function ValoracionPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-32 md:pb-16 max-w-4xl">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 mb-6">
            <Compass className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Selecciona un area
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance leading-relaxed">
            Elige el area de tu vida que deseas explorar. Tu respuesta sera analizada 
            para revelar el nivel de conciencia presente.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {LIFE_AREAS.map((area) => (
            <AreaCard key={area.key} area={area} />
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground/60 mt-12">
          Basado en el Mapa de la Conciencia del Dr. David R. Hawkins
        </p>
      </div>
    </main>
  )
}

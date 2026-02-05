import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Sparkles, TrendingUp, Zap } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-32 md:pb-16 max-w-4xl">
        {/* Hero Section */}
        <header className="text-center space-y-8 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Zap className="w-4 h-4" />
            Powered by AI
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance leading-tight">
            Mapa de
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Conciencia
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Descubre tu nivel de conciencia en las areas mas importantes de tu vida. 
            Basado en la escala del Dr. David R. Hawkins y analizado con inteligencia artificial.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/valoracion">
              <Button size="lg" className="h-14 px-8 text-base font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Comenzar Valoracion
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/evolucion">
              <Button variant="outline" size="lg" className="h-14 px-8 text-base font-semibold rounded-full bg-transparent">
                Ver mi progreso
              </Button>
            </Link>
          </div>
        </header>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="group p-6 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-500/5 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-violet-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              8 Areas de Vida
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Evalua espiritualidad, salud, pareja, familia, trabajo, dinero, emociones y autoimagen.
            </p>
          </div>

          <div className="group p-6 rounded-3xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-500/5 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Analisis con GPT-4o
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              IA avanzada que interpreta tus respuestas usando la escala de Hawkins (20-600).
            </p>
          </div>

          <div className="group p-6 rounded-3xl bg-card border border-border/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Visualiza tu Evolucion
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Graficas interactivas que muestran como evoluciona tu conciencia con el tiempo.
            </p>
          </div>
        </section>

        {/* Scale Info */}
        <section className="p-8 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                La Escala de Hawkins
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                El Dr. David R. Hawkins desarrollo una escala logaritmica de conciencia que va 
                desde 20 (Verguenza) hasta 1000 (Iluminacion). El nivel 200 marca el punto de 
                inflexion entre los estados que drenan energia y los que la generan.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { level: 20, name: "Verguenza", color: "#8B4513" },
                  { level: 200, name: "Valentia", color: "#FFD700" },
                  { level: 500, name: "Amor", color: "#FF69B4" },
                  { level: 600, name: "Paz", color: "#9370DB" },
                ].map((item) => (
                  <span
                    key={item.level}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${item.color}20`,
                      color: item.color 
                    }}
                  >
                    <span className="font-bold">{item.level}</span>
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-xs text-muted-foreground/60">
            Este analisis es orientativo y no sustituye la evaluacion profesional.
          </p>
        </footer>
      </div>
    </main>
  )
}

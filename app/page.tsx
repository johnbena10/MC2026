import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Brain, LineChart, Sparkles, Target } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <header className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance">
            Mapa de Conciencia
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Una herramienta de autoconocimiento basada en la escala de conciencia
            del Dr. David R. Hawkins para explorar y comprender tu estado de
            conciencia en diferentes áreas de la vida.
          </p>
        </header>

        {/* What it does */}
        <section className="mb-16">
          <h2 className="text-xl font-medium text-foreground mb-6 text-center">
            ¿Qué hace este software?
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/10 mb-4">
                  <Target className="h-6 w-6 text-violet-500" />
                </div>
                <h3 className="font-medium text-foreground mb-2">
                  Evalúa áreas de tu vida
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Selecciona entre 8 áreas fundamentales donde se manifiesta la
                  conciencia: espiritualidad, salud, pareja, familia, trabajo,
                  dinero, manejo emocional y autoimagen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 mb-4">
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="font-medium text-foreground mb-2">
                  Análisis con IA
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tu respuesta es analizada por GPT-4o utilizando la escala de
                  Hawkins (20-600) para identificar el nivel de conciencia
                  predominante y los patrones presentes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 mb-4">
                  <LineChart className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-medium text-foreground mb-2">
                  Visualiza tu evolución
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Guarda tus valoraciones y observa cómo evoluciona tu nivel de
                  conciencia en cada área a lo largo del tiempo con gráficas
                  detalladas.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Hawkins Scale Info */}
        <section className="mb-16">
          <Card className="border-0 shadow-sm bg-muted/30">
            <CardContent className="py-8 px-6 md:px-10">
              <h2 className="text-lg font-medium text-foreground mb-4">
                Sobre la escala de Hawkins
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                El Dr. David R. Hawkins, en sus obras{" "}
                <em>Power vs. Force</em> y{" "}
                <em>The Map of Consciousness Explained</em>, presenta una escala
                logarítmica de niveles de conciencia que va desde 20 (Vergüenza)
                hasta 1000 (Iluminación).
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                El nivel 200 (Valentía) marca el punto de inflexión entre los
                niveles de fuerza (que drenan energía) y los niveles de poder
                (que la generan). Este software te ayuda a identificar dónde te
                encuentras en diferentes aspectos de tu vida y ofrece una
                perspectiva de crecimiento.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4">
          <Link href="/valoracion">
            <Button size="lg" className="h-14 px-8 text-base font-medium">
              Comenzar Valoración
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/evolucion"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver mi evolución
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center">
          <p className="text-xs text-muted-foreground/60">
            Este análisis es orientativo y no sustituye la evaluación
            profesional. Basado en las enseñanzas del Dr. David R. Hawkins.
          </p>
        </footer>
      </div>
    </main>
  )
}

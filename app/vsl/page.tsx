"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Mic, 
  Globe, 
  Users, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Play,
  Star,
  Zap,
  Target,
  Award,
  ChevronLeft
} from "lucide-react"

const benefits = [
  { icon: Mic, text: "Presencia escenica y dominio del publico" },
  { icon: Sparkles, text: "Diseno de experiencias formativas de alto impacto" },
  { icon: Target, text: "Estructura neuroeducativa del aprendizaje acelerado" },
  { icon: Play, text: "Storytelling transformacional aplicado al escenario" },
  { icon: Trophy, text: "Tecnicas de cierre y venta desde tarima" },
  { icon: Users, text: "Como crear tus propios eventos rentables" },
  { icon: Globe, text: "Como escalar tu mensaje internacionalmente" },
]

const certificationBenefits = [
  "Comunidad privada de High Impact Trainers",
  "Oportunidades reales de compartir escenario con el equipo HIT",
  "Participacion en conferencias, seminarios y eventos por Espana y Latinoamerica",
  "Red de formadores que viven de inspirar y transformar vidas",
]

const isForYou = [
  "Sientes que tienes un mensaje que merece ser escuchado",
  "Quieres dedicarte profesionalmente a formar, inspirar y transformar personas",
  "Deseas aprender a vender desde el escenario sin sentirte 'vendedor'",
  "Buscas una certificacion oficial que respalde tu trabajo como formador",
  "Suenas con expandir tus eventos por el mundo",
]

export default function VSLPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/evolucion">
          <Button variant="ghost" size="sm" className="rounded-full gap-1 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className={`relative max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Academia Europea de Neurociencia</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            Certificado de Oratoria y{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Formacion de Alto Impacto
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
            No necesitas "hablar mejor".
          </p>
          
          <p className="text-lg md:text-xl text-foreground mb-12 max-w-2xl mx-auto font-medium">
            Necesitas aprender a transformar personas desde un escenario.
          </p>

          <Link href="#certificarme">
            <Button size="lg" className="h-14 px-8 text-lg font-semibold rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all">
              Quiero Certificarme como HIT
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-muted-foreground mb-4">
                Hay miles de personas que saben comunicar.
              </p>
              <p className="text-lg text-foreground font-medium mb-6">
                Pero muy pocas saben disenar una experiencia que cambie la vida de quienes escuchan.
              </p>
              <p className="text-muted-foreground">
                Esa es la diferencia entre alguien que da una charla...
              </p>
              <p className="text-2xl font-bold text-primary mt-2">
                y un High Impact Trainer (HIT).
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Esto no es un curso de oratoria
              </h3>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Es una nueva profesion.
              </p>
              <p className="text-muted-foreground mt-4 text-sm">
                Una donde tu escenario es tu oficina. Tu mensaje es tu activo. Y tu voz es tu fuente de ingresos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
            Lo que vas a dominar dentro del programa
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Mientras otros siguen intentando "hablar bonito", tu aprenderas a provocar cambios reales.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-foreground font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Benefits */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Conviertete en un HIT oficial
            </h2>
            <p className="text-muted-foreground">
              Cuando te certifiques, no solo tendras un diploma. Tendras acceso a:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {certificationBenefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-5 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50"
              >
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Imagina esto por un momento
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {["Viajar", "Subirte a escenarios", "Impactar vidas", "Vivir de tu mensaje"].map((item, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
              >
                <Star className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-lg text-muted-foreground">
            Eso es exactamente lo que este programa fue disenado para lograr.
          </p>
        </div>
      </section>

      {/* Is For You */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Este programa es para ti si...
          </h2>

          <div className="space-y-3">
            {isForYou.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Badge */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Award className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">Certificacion Oficial</span>
          </div>
          
          <p className="text-lg text-muted-foreground mb-4">
            Tu proceso estara avalado por la <span className="text-foreground font-medium">Academia Europea de Neurociencia</span>, lo que convierte esta formacion en una acreditacion profesional real dentro del mundo de la formacion de alto impacto.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section id="certificarme" className="py-24 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Tu voz puede cambiar vidas.
          </h2>
          <p className="text-xl text-primary font-semibold mb-8">
            Y tambien puede cambiar la tuya.
          </p>

          <p className="text-lg text-muted-foreground mb-4">
            No se trata de hablar mejor.
          </p>
          <p className="text-lg text-foreground mb-12 max-w-2xl mx-auto">
            Se trata de convertirte en alguien que, cada vez que pisa un escenario... deja a las personas diferentes a como llegaron.
          </p>

          <p className="text-sm text-muted-foreground mb-6">
            Es momento de convertir tu mensaje en tu profesion
          </p>

          <Button 
            size="lg" 
            className="h-16 px-12 text-lg font-bold rounded-full shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all"
          >
            QUIERO CERTIFICARME COMO HIT
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Academia Europea de Neurociencia - Certificado de Oratoria y Formacion de Alto Impacto
          </p>
        </div>
      </footer>
    </main>
  )
}

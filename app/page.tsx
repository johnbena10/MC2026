"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Target,
  Activity,
  Heart,
  Briefcase,
  Wallet,
  Users,
  Flame,
  CheckCircle2,
  Zap,
  DollarSign,
  Clock
} from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-32 md:pb-16 max-w-4xl">
        
        {/* Hero Hook */}
        <header className="text-center space-y-6 mb-16">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight text-balance">
            <span className="text-muted-foreground">Y si pudieras ver,</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              con claridad absoluta,
            </span>
            <br />
            <span className="text-foreground">
              en que nivel de conciencia estas HOY?
            </span>
          </h1>
        </header>

        {/* Product Intro */}
        <section className="mb-16 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border border-primary/20">
          <p className="text-base md:text-lg text-foreground leading-relaxed text-center text-pretty">
            Un software basado en la tabla de niveles de conciencia del{" "}
            <span className="font-bold text-primary">Dr. David Hawkins</span> que analiza 
            tus respuestas, identifica tu nivel real en{" "}
            <span className="font-bold">8 areas clave</span> y te muestra, con graficas 
            y recomendaciones, como elevarlo.
          </p>
        </section>

        {/* Problem Agitation */}
        <section className="mb-16 space-y-6">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            La mayoria de las personas creen que se conocen.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Creen que estan <span className="text-foreground font-medium">"bien"</span>.
            Creen que estan <span className="text-foreground font-medium">"avanzando"</span>.
            Creen que estan <span className="text-foreground font-medium">"evolucionando"</span>.
          </p>
          <div className="p-6 rounded-2xl bg-destructive/10 border border-destructive/20">
            <p className="text-lg md:text-xl text-foreground font-semibold leading-relaxed">
              Pero no tienen ninguna forma real de medirlo.
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">x</span>
                No saben en que punto estan.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">x</span>
                No saben cuando suben.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">x</span>
                No saben cuando caen.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">x</span>
                Y mucho menos por que.
              </li>
            </ul>
            <p className="mt-4 text-base text-muted-foreground italic">
              Viven su vida emocional, espiritual, fisica y relacional a ciegas.
            </p>
          </div>
        </section>

        {/* Pain Point */}
        <section className="mb-16 space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tu puedes tener un gran dia y sentirte pleno...
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Y al dia siguiente, sentirte <span className="text-foreground font-medium">drenado</span>,{" "}
            <span className="text-foreground font-medium">confundido</span>,{" "}
            <span className="text-foreground font-medium">irritable</span>,{" "}
            <span className="text-foreground font-medium">desmotivado</span>...
          </p>
          <p className="text-xl text-foreground font-semibold">
            Y no entiendes que paso.
          </p>
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center p-4 rounded-2xl bg-muted/50">
              <p className="text-sm text-muted-foreground">Sin</p>
              <p className="font-bold text-foreground">Trazabilidad</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-muted/50">
              <p className="text-sm text-muted-foreground">Sin</p>
              <p className="font-bold text-foreground">Medicion</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-muted/50">
              <p className="text-sm text-muted-foreground">Sin</p>
              <p className="font-bold text-foreground">Conciencia</p>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-center font-bold text-primary">
            Y lo que no se mide... no se puede mejorar.
          </p>
        </section>

        {/* Hawkins Introduction */}
        <section className="mb-16 space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            El <span className="font-bold text-foreground">Dr. David Hawkins</span> dedico 
            su vida a estudiar y mapear los niveles de conciencia humana.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Creo una escala que va de <span className="font-bold text-foreground">0 a 1000</span> que 
            describe con precision matematica los estados internos del ser humano:{" "}
            <span className="text-destructive">miedo</span>,{" "}
            <span className="text-destructive">culpa</span>,{" "}
            <span className="text-destructive">apatia</span>,{" "}
            <span className="text-yellow-500">orgullo</span>,{" "}
            <span className="text-emerald-500">coraje</span>,{" "}
            <span className="text-emerald-500">aceptacion</span>,{" "}
            <span className="text-pink-500">amor</span>,{" "}
            <span className="text-primary">paz</span>,{" "}
            <span className="text-primary">iluminacion</span>...
          </p>
          <div className="p-6 rounded-2xl bg-muted/50 border border-border">
            <p className="text-base text-muted-foreground">
              Pero hasta hoy, esa tabla ha sido solo teorica para la mayoria.
            </p>
            <p className="text-lg text-foreground font-semibold mt-2">
              Nadie la habia convertido en algo que tu pudieras usar en tu vida diaria.
            </p>
            <p className="text-2xl text-primary font-bold mt-2">
              Hasta ahora.
            </p>
          </div>
        </section>

        {/* Solution */}
        <section className="mb-16 space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Hemos creado un software que toma esa tabla...
          </p>
          <p className="text-xl text-foreground font-semibold">
            Y la convierte en algo practico, medible y visible para ti.
          </p>
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Este sistema analiza tus respuestas mediante{" "}
              <span className="font-bold text-primary">inteligencia artificial avanzada</span> y 
              determina tu nivel de conciencia actual en{" "}
              <span className="font-bold">8 areas fundamentales</span> de tu vida.
            </p>
            <div className="mt-6 space-y-3">
              <p className="text-muted-foreground">No es un test.</p>
              <p className="text-muted-foreground">No es un cuestionario superficial.</p>
              <p className="text-lg text-foreground font-semibold">
                Es una entrevista guiada que profundiza como lo haria un coach experto.
              </p>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="mb-16 space-y-6">
          <h2 className="text-xl font-bold text-foreground">Y al final te entrega:</h2>
          <div className="space-y-3">
            {[
              { icon: Target, text: "Tu puntaje real de conciencia (0-1000)" },
              { icon: Heart, text: "La emocion dominante segun Hawkins" },
              { icon: Eye, text: "Un analisis claro y honesto de tu estado actual" },
              { icon: Zap, text: "Una recomendacion especifica para elevar tu nivel" },
              { icon: TrendingUp, text: "Y una grafica que registra tu evolucion en el tiempo" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/50">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8 Areas */}
        <section className="mb-16 space-y-6">
          <h2 className="text-xl font-bold text-foreground">
            El software evalua tu nivel de conciencia en:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Sparkles, name: "Espiritualidad", color: "#9333EA" },
              { icon: Activity, name: "Cuerpo y salud", color: "#10B981" },
              { icon: Heart, name: "Relaciones de pareja", color: "#EC4899" },
              { icon: Users, name: "Relaciones familiares", color: "#F97316" },
              { icon: Briefcase, name: "Trabajo y proposito", color: "#3B82F6" },
              { icon: Wallet, name: "Finanzas y dinero", color: "#EAB308" },
              { icon: Flame, name: "Emociones", color: "#EF4444" },
              { icon: Brain, name: "Autoimagen", color: "#8B5CF6" },
            ].map((area, i) => (
              <div 
                key={i} 
                className="p-4 rounded-2xl text-center border border-border/50"
                style={{ backgroundColor: `${area.color}10` }}
              >
                <area.icon className="w-6 h-6 mx-auto mb-2" style={{ color: area.color }} />
                <p className="text-sm font-medium text-foreground">{area.name}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground italic">
            Porque no puedes estar "alto" en todo. Y ahi esta la clave.
          </p>
        </section>

        {/* Discovery */}
        <section className="mb-16 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Descubriras algo impactante:
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Puedes estar en <span className="font-bold text-emerald-500">500</span> en espiritualidad...
              <br />
              Y en <span className="font-bold text-destructive">150</span> en pareja.
            </p>
            <p className="text-muted-foreground">
              Puedes sentirte pleno en tu proposito...
              <br />
              Y completamente drenado en tus emociones.
            </p>
            <p className="text-lg text-foreground font-semibold">
              Y por primera vez entenderas que area esta descompensando tu vida.
            </p>
          </div>
        </section>

        {/* Tracking Power */}
        <section className="mb-16 space-y-6">
          <h2 className="text-xl font-bold text-foreground">
            Aqui ocurre algo poderoso.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Cada vez que haces una valoracion, el sistema la registra con fecha y hora.
            Y crea una grafica de tu conciencia en el tiempo.
          </p>
          <div className="p-6 rounded-2xl bg-card border border-border/50">
            <p className="font-semibold text-foreground mb-4">Podras ver:</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-foreground">Cuando subiste</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-destructive" />
                <span className="text-sm text-foreground">Cuando caiste</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">Que dia ocurrio</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                <span className="text-sm text-foreground">Que area bajo</span>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground mb-3">
              Y empezaras a identificar patrones como:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-foreground italic">
                "Cada vez que discuto con mi pareja, mi nivel cae 300 puntos"
              </p>
              <p className="text-foreground italic">
                "Cada vez que descuido mi cuerpo, mi conciencia baja"
              </p>
              <p className="text-foreground italic">
                "Cada vez que trabajo en X, mi nivel sube"
              </p>
            </div>
            <p className="mt-4 text-foreground font-semibold">
              Esto no es teoria. Es trazabilidad de tu estado interno.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16 space-y-6">
          <h2 className="text-xl font-bold text-foreground">
            Este software te permite:
          </h2>
          <div className="space-y-3">
            {[
              "Conocerte con una claridad brutal",
              "Detectar que area esta afectando tu vida",
              "Entender por que emocionalmente estas como estas",
              "Medir tu evolucion real, no imaginaria",
              "Tomar decisiones basadas en conciencia, no en impulsos",
              "Elevar tu nivel de conciencia de forma intencional",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Price Anchor Section */}
        <section className="mb-16 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-yellow-500/10 via-primary/10 to-accent/10 border border-yellow-500/30">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm font-semibold">
              <DollarSign className="w-4 h-4" />
              El valor real de esta herramienta
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Contratar a un profesional certificado en la metodologia Hawkins para hacer este tipo de valoracion puede costar{" "}
                <span className="font-bold text-foreground">miles de dolares</span>.
              </p>
              <p className="text-base text-muted-foreground">
                Y muy pocas personas en el mundo estan realmente capacitadas para hacerlo bien.
              </p>
              <p className="text-lg text-muted-foreground">
                Una sesion de coaching profundo con medicion de conciencia tiene un valor de mercado de{" "}
                <span className="font-bold text-foreground">$150 a $500 USD por hora</span>.
              </p>
            </div>

            <div className="py-6 space-y-4">
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl text-muted-foreground line-through">$297 USD/mes</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-sm font-bold">
                  -91% OFF
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-5xl md:text-6xl font-bold text-foreground">$27</span>
                <div className="text-left">
                  <span className="text-xl font-bold text-foreground">USD</span>
                  <p className="text-sm text-muted-foreground">/mes</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Acceso ilimitado a todas las valoraciones y funciones
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Sin contratos
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Cancela cuando quieras
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                Acceso inmediato
              </div>
            </div>
          </div>
        </section>

        {/* CTA 1 */}
        <section className="mb-16 flex justify-center px-4">
          <Link href="/auth" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="group w-full sm:w-auto h-14 px-8 text-base font-bold rounded-full shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 animate-pulse hover:animate-none"
            >
              Descubrir mi nivel
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>

        {/* What You Receive */}
        <section className="mb-16 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">
            QUE RECIBES EXACTAMENTE?
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Al adquirir acceso obtienes:
          </p>
          <div className="space-y-3">
            {[
              "Acceso al sistema de valoracion por areas",
              "Entrevista adaptativa guiada por IA (5 preguntas profundas por area)",
              "Resultado calibrado segun la escala Hawkins (0-1000)",
              "Emocion dominante identificada",
              "Recomendacion practica para elevar tu nivel",
              "Historial completo de tus valoraciones",
              "Grafica de evolucion por fechas",
              "Capacidad de medir tu conciencia cada dia",
              "Identificacion de patrones que afectan tu vida",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final Push */}
        <section className="mb-16 space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            No puedes cambiar lo que no ves.
          </p>
          <p className="text-lg text-muted-foreground">
            No puedes mejorar lo que no mides.
          </p>
          <p className="text-lg text-foreground font-semibold">
            Y no puedes elevar tu conciencia si no sabes donde estas realmente.
          </p>
          <div className="py-4">
            <p className="text-xl md:text-2xl text-foreground font-bold">
              Hoy puedes dejar de vivir a ciegas.
            </p>
            <p className="text-xl md:text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
              Y empezar a verte con claridad.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="flex justify-center pb-8 px-4">
          <Link href="/auth" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="group w-full sm:w-auto h-14 px-8 text-base font-bold rounded-full shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 animate-pulse hover:animate-none"
            >
              Comenzar valoracion
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>

      </div>
    </main>
  )
}

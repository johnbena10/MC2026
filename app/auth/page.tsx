"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ArrowRight, 
  CheckCircle2, 
  Shield,
  Sparkles,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  DollarSign,
  Zap
} from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    localStorage.setItem("user", JSON.stringify({
      name: formData.name || "Usuario",
      email: formData.email,
      createdAt: new Date().toISOString()
    }))
    
    setIsLoading(false)
    router.push("/valoracion")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-32 md:pb-16 max-w-5xl">
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left: Offer */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-semibold mb-4">
                <Zap className="w-4 h-4" />
                Oferta por tiempo limitado
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4 text-balance">
                Accede al sistema completo de{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  valoracion de conciencia
                </span>
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Basado en la escala del Dr. David Hawkins. Mide, visualiza y eleva tu nivel 
                de conciencia en las 8 areas fundamentales de tu vida.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border border-primary/30">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Inversion mensual</span>
              </div>
              
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl text-muted-foreground line-through">$297</span>
                <span className="text-5xl font-bold text-foreground">$27</span>
                <span className="text-lg text-muted-foreground">USD/mes</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Ahorra $270 USD cada mes con esta oferta especial
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Sin contratos
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Cancela cuando quieras
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Acceso inmediato
                </span>
              </div>
            </div>

            {/* What's included */}
            <div className="p-6 rounded-3xl bg-card border border-border/50">
              <h3 className="font-semibold text-foreground mb-4">
                Que incluye tu acceso:
              </h3>
              <div className="space-y-3">
                {[
                  "Valoracion ilimitada en 8 areas de vida",
                  "Entrevista adaptativa con IA (5 preguntas por area)",
                  "Resultado calibrado 0-1000 segun Hawkins",
                  "Emocion dominante identificada",
                  "Recomendacion personalizada para elevar tu nivel",
                  "Historial completo de todas tus valoraciones",
                  "Graficas de evolucion temporal",
                  "Identificacion de patrones que afectan tu vida",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-emerald-500" />
                Datos 100% privados
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4 text-emerald-500" />
                Conexion segura SSL
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-5 rounded-2xl bg-muted/50 border border-border/50">
              <p className="text-sm text-muted-foreground italic mb-3">
                "Por primera vez entendi por que me sentia estancado. El area de finanzas 
                estaba en 125 mientras mi espiritualidad en 450. Ahora se donde enfocarme."
              </p>
              <p className="text-xs text-muted-foreground">
                - Carlos M., Emprendedor
              </p>
            </div>
          </div>

          {/* Right: Auth Form */}
          <div className="lg:sticky lg:top-32">
            <div className="p-6 md:p-8 rounded-3xl bg-card border border-border/50 shadow-xl shadow-primary/5">
              
              {/* Toggle */}
              <div className="flex p-1 rounded-full bg-muted/50 mb-6">
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                    !isLogin 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Crear cuenta
                </button>
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                    isLogin 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Iniciar sesion
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Nombre
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10 h-12 rounded-xl"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Contrasena
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10 h-12 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full h-14 text-base font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {isLogin ? "Acceder por $27/mes" : "Comenzar por $27/mes"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>

              {/* Price reminder */}
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="line-through">$297</span>{" "}
                  <span className="font-bold text-foreground">$27 USD/mes</span>
                  {" "}- Ahorra 91%
                </p>
              </div>

              {/* Terms */}
              <p className="mt-4 text-xs text-center text-muted-foreground">
                Al continuar, aceptas nuestros{" "}
                <span className="text-primary cursor-pointer hover:underline">
                  Terminos de uso
                </span>{" "}
                y{" "}
                <span className="text-primary cursor-pointer hover:underline">
                  Politica de privacidad
                </span>
              </p>

              {/* Guarantee */}
              <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Garantia de satisfaccion de 7 dias
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Si no estas satisfecho, te devolvemos tu dinero sin preguntas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo link */}
            <div className="mt-4 flex justify-center">
              <Link 
                href="/valoracion" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                Probar demo gratuita
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

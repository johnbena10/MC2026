"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ Revisa tu correo para confirmar tu cuenta.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 420, margin: "80px auto" }}>
      <h1>Crear cuenta</h1>

      <form onSubmit={handleRegister} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 10 }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: 10 }}
        />

        <button disabled={loading} style={{ padding: 10 }}>
          {loading ? "Creando..." : "Registrarme"}
        </button>
      </form>

      {message && <p style={{ marginTop: 16 }}>{message}</p>}

      <p style={{ marginTop: 16 }}>
        ¿Ya tienes cuenta? <a href="/auth/login">Inicia sesión</a>
      </p>
    </div>
  );
}


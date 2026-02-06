'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      // Espera a que Supabase procese la sesión del magic link
      await supabase.auth.getSession();

      // Redirige donde tú quieras después del registro
      router.replace('/'); // o '/valoracion' o '/evolucion'
    };

    handleCallback();
  }, [router]);

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Confirmando tu cuenta...</h2>
      <p>Un momento por favor ✨</p>
    </div>
  );
}


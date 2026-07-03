"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Não foi possível entrar.");
        return;
      }

      const redirectTo = searchParams.get("from") ?? "/admin/demos";
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="admin-password" className="text-sm font-medium text-zinc-300">
          Senha de acesso
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-white outline-none ring-1 ring-white/[0.08] transition-shadow placeholder:text-zinc-600 focus:ring-[#4d7cff]/40"
          placeholder="••••••••"
          required
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button
        type="submit"
        variant="gradient"
        className="h-11 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}

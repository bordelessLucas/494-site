import { AdminLoginForm } from "@/components/admin/admin-login-form";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin — Unique Gestor",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0c0c14] p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        <div className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Unique Gestor
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold text-white">
            Painel administrativo
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Acesse para gerenciar solicitações de demonstração.
          </p>
        </div>
        <Suspense fallback={<div className="h-32 animate-pulse rounded-xl bg-white/[0.04]" />}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}

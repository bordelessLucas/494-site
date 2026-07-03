"use client";

import { Button } from "@/components/ui/button";
import {
  DEMO_STATUS_LABELS,
  formatCreatedAt,
  formatScheduledDate,
  getSolutionsLabel,
} from "@/lib/admin/demo-labels";
import type { DemoRequest, DemoRequestStatus } from "@/lib/demo-requests/types";
import { DEMO_REQUEST_STATUSES } from "@/lib/demo-requests/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

type AdminRequestDetailProps = {
  request: DemoRequest | null;
  onClose: () => void;
  onUpdated: (request: DemoRequest) => void;
};

export function AdminRequestDetail({
  request,
  onClose,
  onUpdated,
}: AdminRequestDetailProps) {
  const [status, setStatus] = useState<DemoRequestStatus>("pending");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!request) return;
    setStatus(request.status);
    setNotes(request.notes);
    setError("");
    setSuccess(false);
  }, [request]);

  useEffect(() => {
    if (!request) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [request, onClose]);

  const handleSave = async () => {
    if (!request) return;

    setIsSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`/api/admin/demos/${request.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Não foi possível salvar as alterações.");
        return;
      }

      onUpdated(data.request);
      setSuccess(true);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {request && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.button
            type="button"
            aria-label="Fechar painel"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-request-title"
            className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-white/[0.08] bg-[#0c0c14] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Solicitação
                </p>
                <h2
                  id="admin-request-title"
                  className="mt-1 font-display text-xl font-bold text-white"
                >
                  {request.name}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  {formatScheduledDate(request.scheduledDate, request.scheduledTime)}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              <DetailSection title="Contato">
                <DetailRow label="E-mail" value={request.email} />
                <DetailRow label="Telefone" value={request.phone} />
                {request.company && <DetailRow label="Empresa" value={request.company} />}
                {request.role && <DetailRow label="Cargo" value={request.role} />}
                <DetailRow
                  label="Soluções"
                  value={getSolutionsLabel(request.solutions, request.solution)}
                />
                {request.message && <DetailRow label="Mensagem" value={request.message} />}
                <DetailRow label="Recebida em" value={formatCreatedAt(request.createdAt)} />
              </DetailSection>

              <div className="space-y-2">
                <label htmlFor="request-status" className="text-sm font-medium text-zinc-300">
                  Status
                </label>
                <select
                  id="request-status"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as DemoRequestStatus)
                  }
                  className="w-full rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-white outline-none ring-1 ring-white/[0.08] focus:ring-[#4d7cff]/40"
                >
                  {DEMO_REQUEST_STATUSES.map((option) => (
                    <option key={option} value={option} className="bg-[#0c0c14]">
                      {DEMO_STATUS_LABELS[option]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="request-notes" className="text-sm font-medium text-zinc-300">
                  Notas internas
                </label>
                <textarea
                  id="request-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={5}
                  placeholder="Observações da equipe comercial..."
                  className="w-full resize-none rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-white outline-none ring-1 ring-white/[0.08] placeholder:text-zinc-600 focus:ring-[#4d7cff]/40"
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}
              {success && (
                <p className="text-sm text-emerald-400">Alterações salvas com sucesso.</p>
              )}
            </div>

            <div className="border-t border-white/[0.06] px-6 py-4">
              <Button
                type="button"
                variant="gradient"
                className="h-11 w-full gap-2"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar alterações"
                )}
              </Button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
      <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-zinc-500">{label}</span>
      <span className="text-right text-zinc-200">{value}</span>
    </div>
  );
}

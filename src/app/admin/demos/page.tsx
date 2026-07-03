import { AdminDemosDashboard } from "@/components/admin/admin-demos-dashboard";
import { listDemoRequests } from "@/lib/demo-requests/store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitações de demo — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDemosPage() {
  const requests = await listDemoRequests();

  return <AdminDemosDashboard initialRequests={requests} />;
}

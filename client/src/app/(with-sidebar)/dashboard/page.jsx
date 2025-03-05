"use client";

import ProtectedRoute from "@/hoc/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="bg-background text-foreground">Dashboard</div>
    </ProtectedRoute>
  );
}

"use client";
import { useAuth } from "@/context/authContext";
import ProtectedRoute from "@/hoc/ProtectedRoute";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const handleSignout = async (e) => {
    e.preventDefault();
    console.log("clicked");
    await logout();
  };
  return (
    <ProtectedRoute>
      <Button variant="destructive" onClick={handleSignout}>
        Signout
      </Button>
    </ProtectedRoute>
  );
}

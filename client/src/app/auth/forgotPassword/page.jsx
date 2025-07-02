"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/authContext";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { handleForgotPassword } = useAuth();
  const handlesubmit = (e) => {
    e.preventDefault();
    handleForgotPassword(email);
  };
  const { theme } = useTheme();
  return (
    <form
      onSubmit={handlesubmit}
      className="max-w-[600px]  p-4 items-center justify-center h-screen m-auto mt-auto flex gap-5 flex-col"
    >
      <Image
        src={theme === "light" ? "/logo-black.png" : "/logo-white.png"}
        height={40}
        width={40}
        alt="Logo"
        className="transition-opacity delay-100 ease-in-out"
      />
      <h2 className="text-2xl font-bold">Reset password</h2>
      <div className="w-full">
        <Label htmlFor="email">* Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button variant="accent" type="submit">
        Send reset password instrustions
      </Button>
      <a
        href="/auth/login"
        className="text-sm text-accent font-medium hover:underline  "
      >
        Go back to sign in
      </a>
    </form>
  );
};

export default ForgotPassword;

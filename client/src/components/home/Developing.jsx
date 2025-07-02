"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { ArrowRight } from "lucide-react";

export default function DevelopingPage({ onPasswordCorrect }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = "shelfudev123";

    if (password === correctPassword) {
      localStorage.setItem("shelfuAuthorized", "true");
      onPasswordCorrect();
    } else {
      alert("Incorrect password, Launch coming soon!!");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Image
        src="/currently-developing.gif"
        alt="Currently Developing"
        width={300}
        height={300}
        priority
      />

      <form onSubmit={handleSubmit}>
        <h2 className="text-black">Page Under Development!!!!</h2>
        <Label className="text-black">
          Please enter the password to continue:
        </Label>
        <div className="flex gap-2 mt-2">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white p-1 rounded-md outline-black outline-1 outline text-black"
          />
          <button
            type="submit"
            className="text-black hover:translate-x-1 transition-all ease-in"
          >
            <ArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";
import { useAuth } from "@/context/authContext";
import { useManga } from "@/context/mangaContext";
import {
  Calendar,
  LibraryBig,
  LibrarySquare,
  Mail,
  UserCircle,
} from "lucide-react";
import React from "react";

const ProfileContent = () => {
  const { userName, userEmail, user } = useAuth();
  const { collection } = useManga();

  const totalVolume = collection.filter(
    (item) => item.status === "Owned" || item.status === "For_Sale"
  ).length;

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="flex flex-col gap-8 px-6 py-10">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold text-foreground">
          Account Overview
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage your account details and collection info.
        </p>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 border border-border bg-card rounded-2xl p-6 shadow-sm">
        {/* Avatar Section */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <UserCircle className="h-40 w-40 text-muted-foreground" />
            <div className="absolute bottom-2 right-2 h-4 w-4 bg-green-500 rounded-full border-2 border-card"></div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center gap-5 w-full">
          <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <UserCircle className="h-5 w-5 text-muted-foreground" />
            {userName || "User"}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-5 w-5" />
            <span className="text-foreground">
              {userEmail || "No email set"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <LibrarySquare className="h-5 w-5" />
            <span className="text-foreground">{totalVolume} Volumes Owned</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span className="text-foreground">
              Joined on {formatDate(user?.metadata?.creationTime)}
            </span>
          </div>

          <a
            href="/collection"
            className="mt-4 flex items-center justify-center gap-2 w-max bg-accent text-accent-foreground px-5 py-2.5 rounded-xl font-medium hover:bg-accent-hover transition-all shadow-sm"
          >
            <LibraryBig className="h-5 w-5" />
            View Collection
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;

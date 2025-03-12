"use client";
import { useAuth } from "@/context/authContext";
import { useManga } from "@/context/mangaContext";
import {
  Calendar,
  LibraryBig,
  LibrarySquare,
  Mail,
  User,
  UserCircle,
} from "lucide-react";
import React from "react";

const ProfileContent = () => {
  const { userName, userEmail, user } = useAuth();
  const { collection } = useManga();
  const totalVolume = collection.filter(
    (item) => item.status === "Owned" || "For_Sale"
  ).length;
  console.log(user);
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="">
        <h2 className="text-2xl font-bold">Account Information</h2>
        <p className="text-sm text-muted-foreground">Info about your account</p>
      </div>
      <div className="flex gap-5  items-center">
        <UserCircle className="h-52 w-52 text-gray-300" />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h3 className="text-lg font-semibold">{userName}</h3>
          </div>
          <div className="flex gap-2">
            <h3>
              <Mail className="text-muted-foreground" />
            </h3>
            <h3>{userEmail}</h3>
          </div>
          <div className="flex gap-2">
            <h3>
              <LibrarySquare className="text-muted-foreground" />
            </h3>
            <h3>{totalVolume} Volumes Owned</h3>
          </div>
          <div className="flex gap-2">
            <h3>
              <Calendar className="text-muted-foreground" />
            </h3>
            <h3>Joined on {formatDate(user?.metadata?.creationTime)}</h3>
          </div>
          <a
            href="/collection"
            className=" flex justify-center bg-accent-foreground text-secondary p-2 rounded-3xl"
          >
            <span className="">
              <LibraryBig />
            </span>{" "}
            View Collection
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;

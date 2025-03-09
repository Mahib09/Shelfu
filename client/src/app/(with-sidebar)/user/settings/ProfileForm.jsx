"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/authContext";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const selectedLabel = languages.find(
    (lang) => lang.value === selectedLanguage
  )?.label;
  const [active, setActive] = useState("light");
  const { setTheme } = useTheme();

  const handleAccountUpdate = async () => {
    if (name === "") {
      toast("Name cannot be empty");
      return;
    }
    try {
      await updateProfile(auth.currentUser, { displayName: name });
      toast("Your name has been successfully updated!");
    } catch (error) {
      toast("Update failed!");
    }
  };
  const handlePreferenceUpdate = () => {
    setTheme(active);
  };
  return (
    <>
      <section className="p-4">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className=" text-muted-foreground">
          Manage your account settings and set preferences.
        </p>
      </section>
      <Separator />
      <section className="py-2 pb-6 px-4 max-w-[800px]">
        <div className="py-2">
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings. Set your preferred language and
            timezone.
          </p>
        </div>
        <Separator />
        <div className="pt-4 pb-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Your name"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <p className="text-xs text-muted-foreground">
              This is the name that will be displayed on your profile and in
              emails.
            </p>
          </div>

          <div className="flex flex-col py-4 gap-2">
            <Label htmlFor="language">Language</Label>
            <Popover id="language">
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[200px] justify-between text-muted-foreground"
                >
                  {selectedLabel || "Select language"}
                  <ChevronsUpDown className="ml-2 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          key={language.value}
                          onSelect={() => setSelectedLanguage(language.value)}
                        >
                          <Check
                            className={`mr-2 ${
                              language.value === selectedLanguage
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              Your selected language will be used across the application.
            </p>
          </div>
        </div>
        <Button onClick={handleAccountUpdate}>Update Account</Button>
      </section>
      <Separator />
      <section className=" py-2 px-4 max-w-[800px]">
        <div className="py-2">
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Automatically switch between
            day and night themes.
          </p>
        </div>
        <Separator />
        <div className="py-2 flex flex-col gap-3">
          <div>
            <Label>Theme</Label>
            <p className="text-xs text-muted-foreground">
              Select the theme for the app.
            </p>
          </div>

          <RadioGroup
            value={active}
            onValueChange={setActive}
            className="flex flex-wrap gap-2 sm:gap-4 md:gap-6"
          >
            {/* Light Theme */}
            <div className="flex flex-col items-center">
              <label
                className={`cursor-pointer rounded-md border-2 p-1 ${
                  active === "light"
                    ? "border-primary"
                    : "border-muted hover:border-accent"
                }`}
                onClick={() => setActive("light")}
              >
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </label>
              <span
                className="mt-2 cursor-pointer p-2 text-center font-normal"
                onClick={() => setActive("light")}
              >
                Light
              </span>
            </div>

            {/* Dark Theme */}
            <div className="flex flex-col items-center">
              <label
                className={`cursor-pointer rounded-md border-2 p-1 ${
                  active === "dark"
                    ? "border-primary"
                    : "border-muted hover:border-accent"
                }`}
                onClick={() => setActive("dark")}
              >
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </label>
              <span
                className="mt-2 cursor-pointer p-2 text-center font-normal"
                onClick={() => setActive("dark")}
              >
                Dark
              </span>
            </div>
          </RadioGroup>
        </div>
        <Button onClick={handlePreferenceUpdate}>Update preferences</Button>
      </section>
    </>
  );
};

export default ProfileForm;

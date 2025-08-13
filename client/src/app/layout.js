import { MangaProvider } from "@/context/mangaContext";
import "../styles/globals.css";
import { AuthProvider } from "@/context/authContext"; // Adjust the path as needed

import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
export const metadata = {
  title: "Shelfu | Your Manga Collection Manager",
  description:
    "Organize and track your manga collection effortlessly with ShelfU. Search, add, and manage your favorite series in one place.",
  icons: "/favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="description"
          content="Manage your manga collection with ease on ShelfU."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthProvider>
          <MangaProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Analytics />
            </ThemeProvider>

            <Toaster />
          </MangaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

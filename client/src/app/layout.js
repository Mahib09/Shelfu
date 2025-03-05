import { MangaProvider } from "@/context/mangaContext";
import "../styles/globals.css";
import { AuthProvider } from "@/context/authContext"; // Adjust the path as needed
import { UiProvider } from "@/context/uiContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
            </ThemeProvider>

            <Toaster />
          </MangaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import { MangaProvider } from "@/context/mangaContext";
import "../styles/globals.css";
import { AuthProvider } from "@/context/authContext"; // Adjust the path as needed
import { UiProvider } from "@/context/uiContext";
import { Toaster } from "sonner";

export const metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MangaProvider>
            {children}
            <Toaster />
          </MangaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

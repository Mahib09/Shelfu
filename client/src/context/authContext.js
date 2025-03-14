"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { getProfileApi, logoutApi, sendTokenToBackendApi } from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }
  }, []);
  const checkAuth = async () => {
    try {
      const response = await getProfileApi(); // Fetch user profile
      setUser(response.data.user);
      setProfile(response.data.profile);
      setUserName(response.data.user.displayName);
      setUserEmail(response.data.user.email);
    } catch (error) {
      setUser(null);
      setProfile(null);
      setUserName("");
      setUserEmail("");
      router.push("/auth/login"); // Redirect to login if fetching profile fails
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true); // Start loading while checking auth state
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsLoggedIn(true); // Set user as logged in
        try {
          await checkAuth(); // Fetch the profile if authenticated
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setUser(null);
        setProfile(null);
        setIsLoggedIn(false); // Set user as logged out
      }
      setLoading(false); // Stop loading after auth state is determined
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, [router]);
  console.log(user, profile);
  const sendTokenToBackend = async (idToken, endpoint) => {
    try {
      const response = await sendTokenToBackendApi(idToken, endpoint);
      if (response.data.success) {
        setIsLoggedIn(true);
        router.push("/dashboard");
      } else {
        setError(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(`Error during ${endpoint}:`, error);
      setError(error.message || `An error occurred during ${endpoint}`);
    }
  };

  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      setError(null);

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredentials.user;
      const idToken = await firebaseUser.getIdToken();
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      setUser(firebaseUser);

      await sendTokenToBackend(idToken, "login");
      await checkAuth();
      return { status: 200, user: firebaseUser };
    } catch (error) {
      handleAuthError(error);
      return { status: 400, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      await logoutApi();
      setUser(null);
      setProfile(null);
      setUserName("");
      setUserEmail("");
      setError(null);
      localStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({ email, password, name }) => {
    try {
      setLoading(true);
      setError(null);

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredentials.user;

      await updateProfile(firebaseUser, { displayName: name });
      const idToken = await firebaseUser.getIdToken();

      setUser(firebaseUser);
      localStorage.setItem("isLoggedIn", "true");
      await sendTokenToBackend(idToken, "signup");
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError(error.message || "An error occurred during sign-up");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      const userCredentials = await signInWithPopup(auth, provider);
      const firebaseUser = userCredentials.user;

      const idToken = await firebaseUser.getIdToken();
      localStorage.setItem("isLoggedIn", "true");
      await sendTokenToBackend(idToken, "login");
      await checkAuth();

      setUserName(firebaseUser.displayName || "No name");
      setUserEmail(firebaseUser.email || "No email");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError(error.message || "An error occurred during Google sign-in");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error) => {
    // Handling specific Firebase auth errors
    if (error.code === "auth/invalid-email") {
      setError("Invalid email format.");
    } else if (error.code === "auth/wrong-password") {
      setError("Incorrect password. Please try again.");
    } else if (error.code === "auth/user-not-found") {
      setError("No user found with this email.");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        isLoggedIn,
        login,
        logout,
        user,
        error,
        signUp,
        signInWithGoogle,
        profile,
        setProfile,
        userName,
        userEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

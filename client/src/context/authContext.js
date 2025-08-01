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
  sendPasswordResetEmail,
} from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { getProfileApi, logoutApi, sendTokenToBackendApi } from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // const checkAuth = async () => {
  //   try {
  //     const response = await getProfileApi();
  //     setUser(response.data.user);
  //     setProfile(response.data.profile);
  //     setUserName(response.data.user.displayName);
  //     setUserEmail(response.data.user.email);
  //   } catch (error) {
  //     console.error("Error fetching profile:", error);
  //     setError("Error fetching profile");
  //     setUser(null);
  //     setProfile(null);
  //   }
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const storedToken = localStorage.getItem("token");

      if (firebaseUser && storedToken) {
        try {
          // Attempt to fetch profile
          await fetchUserProfile();

          // If successful, set user states
          setIsLoggedIn(true);
          setUser(firebaseUser);
          setUserEmail(firebaseUser.email || "");
          setUserName(firebaseUser.displayName || "");
        } catch (error) {
          console.error("Profile fetch failed:", error);

          // On profile fetch error (likely 401), clear states & logout
          setIsLoggedIn(false);
          setUser(null);
          setProfile(null);
          localStorage.removeItem("token");

          // Optional: sign out Firebase user to fully clear auth state
          await auth.signOut();
        }
      } else {
        // No firebaseUser or token -> clear all states
        setIsLoggedIn(false);
        setUser(null);
        setProfile(null);
        localStorage.removeItem("token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

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
  const fetchUserProfile = async () => {
    try {
      const response = await getProfileApi();
      setProfile(response.data.profile);
    } catch (error) {
      if (error.response?.status === 401) {
        // Unauthorized — token expired or invalid
        console.warn("Token expired or unauthorized, logging out...");
        await logout(); // Your logout function clears everything and redirects
      } else {
        setError("Failed to fetch Profile");
        console.log(error, error);
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
      }
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
      localStorage.setItem("token", idToken);
      await fetchUserProfile();
      setIsLoggedIn(true);
      setUser(firebaseUser);

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
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");

      setUser(null);
      setProfile(null);
      setUserName("");
      setUserEmail("");
      setIsLoggedIn(false);
      setError(null);

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
      await sendTokenToBackend(idToken, "signup");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", idToken);
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
      localStorage.setItem("token", idToken);

      await fetchUserProfile();
      localStorage.setItem("isLoggedIn", "true");
      setUser(firebaseUser);
      setUserName(firebaseUser.displayName || "No name");
      setUserEmail(firebaseUser.email || "No email");
      setIsLoggedIn(true);
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

  const handleForgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password Reset Email Sent");
    } catch (error) {
      alert(error.message);
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
        handleForgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

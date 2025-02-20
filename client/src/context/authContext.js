"use client";
import { createContext, useContext, useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "@/lib/firebase";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Helper function to make the backend API call
  const sendTokenToBackend = async (idToken, endpoint) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/auth/${endpoint}`,
        {
          token: idToken,
        }
      );

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

      setUser(firebaseUser); // Set Firebase user directly into the state
      await sendTokenToBackend(idToken, "login");
    } catch (error) {
      console.error("Error during Login:", error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during sign-out:", error);
      setError(error.message || "Sign-out failed.");
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

      setUser(firebaseUser); // Set Firebase user directly into the state
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

      setUser(firebaseUser); // Set Firebase user directly into the state
      await sendTokenToBackend(idToken, "signup"); // Reuse the same backend call for Google login
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError(error.message || "An error occurred during Google sign-in");
    } finally {
      setLoading(false);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

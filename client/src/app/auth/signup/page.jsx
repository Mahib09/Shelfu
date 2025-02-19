"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../../public/logo.png";
import {
  auth,
  createUserWithEmailAndPassword,
  provider,
  signInWithPopup,
  updateProfile,
} from "@/lib/firebase";
import Cookies from "js-cookie";

// Validation schema for form
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  reEnterEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Emails must match")
    .required("Re-entering email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  reEnterPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Re-entering password is required"),
});

const SignUp = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setErrorMessage(""); // Reset error message on each submit attempt
    const { email, password, name } = data;

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await updateProfile(user, {
        displayName: name,
      });

      const idToken = await user.getIdToken();

      const response = await axios.post("http://localhost:3001/auth/signup", {
        token: idToken,
      });
      if (response.data.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage(error.message || "An error occurred during sign-up");
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    try {
      const userCredentials = await signInWithPopup(auth, provider);
      const user = userCredentials.user;
      const idToken = await user.getIdToken();
      const response = await axios.post("http://localhost:3001/auth/signup", {
        token: idToken,
      });
      if (response.data.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setErrorMessage(
        error.message || "An error occurred during Google sign-in"
      );
    }
  };

  return (
    <div className="authContainer">
      <Image src={Logo} height={100} width={100} alt="logo" />
      <div className="formHolder">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-3xl">Sign Up</h2>
          <p className="text-sm text-gray-600">Welcome to Shelfu</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <button
            type="button"
            className=" rounded-md flex items-center justify-center gap-2 p-2 bg-gray-100 w-full"
            onClick={handleGoogleSignIn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-brand-google "
            >
              <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z"></path>
            </svg>
            Sign up with Google
          </button>
          <p className="text-xs text-gray-500">or create a new account</p>
          <div className="w-full flex flex-col gap-2">
            <input
              type="text"
              id="name"
              placeholder={`${errors.name?.message || "Name"}`}
              {...register("name")}
              className={`inputField ${
                errors.name
                  ? "border-red-500 focus:outline-red-500"
                  : "border-gray-300"
              }`}
            />

            <input
              type="email"
              id="email"
              placeholder={`${errors.email?.message || "Email"}`}
              className={`inputField ${
                errors.email
                  ? "border-red-500 focus:outline-red-500"
                  : "border-gray-300 focus:outline-black"
              }`}
              {...register("email")}
            />

            <input
              type="email"
              id="reEnterEmail"
              placeholder={`${
                errors.reEnterEmail?.message || "Re-Enter Email"
              }`}
              className={`inputField ${
                errors.reEnterEmail
                  ? "border-red-500 focus:outline-red-500"
                  : "border-gray-300"
              }`}
              {...register("reEnterEmail")}
            />

            <input
              type="password"
              id="password"
              placeholder={`${errors.password?.message || "Password"}`}
              className={`inputField ${
                errors.password
                  ? "border-red-500 focus:outline-red-500"
                  : "border-gray-300"
              }`}
              {...register("password")}
            />

            <input
              type="password"
              id="reEnterPassword"
              placeholder={`${
                errors.reEnterPassword?.message || "Re-Enter Password"
              }`}
              className={`inputField ${
                errors.reEnterPassword
                  ? "border-red-500 focus:outline-red-500"
                  : "border-gray-300"
              }`}
              {...register("reEnterPassword")}
            />
          </div>
          <div className="flex gap-5 w-full ">
            <button
              className="btnGoback"
              onClick={() => {
                router.push("/");
              }}
              type="button"
            >
              Back to Home
            </button>
            <button type="submit" className="btnSubmit">
              Sign Up
            </button>
          </div>
        </form>

        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <p className="text-sm text-gray-500">
        Have an Account?{" "}
        <a href="/auth/login" className="text-black">
          Sign In
        </a>
      </p>
    </div>
  );
};

export default SignUp;

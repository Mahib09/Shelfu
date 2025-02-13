"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Validation schema for form
const schema = Yup.object().shape({
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
    const { email, password } = data;

    try {
      // Use axios to send the signup request
      const response = await axios.post(
        "http://localhost:3001/auth/signup", // Use sign-up endpoint here
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.message); // Successful signup message from backend
      // Store token or user data (e.g., in localStorage or cookies)
      localStorage.setItem("authToken", response.data.token);

      // Redirect or update UI after successful signup
      router.push("/"); // Redirect to home or dashboard after signup
    } catch (error) {
      console.error(error);
      setErrorMessage("SignUp failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <br></br>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        <br></br>
        <label htmlFor="reEnterEmail">Re-enter Email</label>
        <br></br>
        <input
          type="email"
          id="reEnterEmail"
          placeholder="Re-enter your email"
          {...register("reEnterEmail")}
        />
        {errors.reEnterEmail && <p>{errors.reEnterEmail.message}</p>}

        {errors.email && <p>{errors.email.message}</p>}
        <br></br>

        <label htmlFor="password">Password</label>
        <br></br>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        <br></br>

        <label htmlFor="reEnterPassword">Re-enter Password</label>
        <br></br>
        <input
          type="password"
          id="reEnterPassword"
          placeholder="Re-enter your password"
          {...register("reEnterPassword")}
        />
        {errors.reEnterPassword && <p>{errors.reEnterPassword.message}</p>}

        {errors.password && <p>{errors.password.message}</p>}
        <br></br>
        <button type="submit">Submit</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default SignUp;

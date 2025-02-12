"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
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
      // Use axios to send the login request
      const response = await axios.post(
        "http://localhost:3001/auth/login", // Update with your backend URL
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.message); // Successful login message from backend
      // Store token or user data (e.g., in localStorage or cookies)
      localStorage.setItem("authToken", response.data.token);

      // Redirect or update UI after successful login
      router.push("/"); // Example to redirect
    } catch (error) {
      console.error(error);
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <br></br>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is Required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <br></br>
        <label htmlFor="password">Password</label>
        <br></br>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is Required" })}
        />
        <br></br>
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;

"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "@/context/authContext"; // Importing the context hook
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Validation schema for form
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  reEnterPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Re-entering password is required"),
});

const SignUp = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { isLoggedIn, signUp, errorMessage, loading, signInWithGoogle } =
    useAuth(); // Accessing signUp, errorMessage, loading, and other data from context
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);
  const handleSignUp = async (data) => {
    await signUp(data);
  };

  return (
    <div className="authContainer">
      <Image
        src={theme == "light" ? "/logo-black.png" : "/logo-white.png"}
        height={100}
        width={100}
        alt="logo"
      />
      <div className="formHolder">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-3xl">Sign Up</h2>
          <p className="text-sm text-muted-foreground">Welcome to Shelfu</p>
        </div>
        <form onSubmit={handleSubmit(handleSignUp)} className="form">
          <Button
            variant="secondary"
            type="button"
            onClick={signInWithGoogle}
            className="w-full"
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
              className="tabler-icon tabler-icon-brand-google"
            >
              <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z"></path>
            </svg>
            Sign up with Google
          </Button>
          <p className="text-xs text-muted-foreground">
            or create a new account
          </p>
          <div className="w-full flex flex-col gap-2">
            <div>
              <Label htmlFor="name">* Name</Label>
              <Input
                type="text"
                id="name"
                placeholder={errors.name?.message}
                className={`inputField ${
                  errors.name ? "border-red-500 focus:outline-red-500" : ""
                }`}
                {...register("name")}
              />
            </div>
            <div>
              {" "}
              <Label htmlFor="name">* Email</Label>
              <Input
                type="email"
                id="email"
                placeholder={errors.email?.message}
                className={`inputField ${
                  errors.email ? "border-red-500 focus:outline-red-500" : ""
                }`}
                {...register("email")}
              />
            </div>
            <div>
              <Label htmlFor="name">* Password</Label>
              <Input
                type="password"
                id="password"
                placeholder={errors.password?.message}
                className={`inputField ${
                  errors.password ? "border-red-500 focus:outline-red-500" : ""
                }`}
                {...register("password")}
              />
            </div>
            <div>
              {" "}
              <Label htmlFor="name">* Re-enter Password</Label>
              <Input
                type="password"
                id="reEnterPassword"
                placeholder={errors.reEnterPassword?.message}
                className={`inputField ${
                  errors.reEnterPassword
                    ? "border-red-500 focus:outline-red-500"
                    : ""
                }`}
                {...register("reEnterPassword")}
              />
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <Button variant="secondary" onClick={() => router.push("/")}>
              Back to Home
            </Button>
            <Button
              variant="accent"
              type="submit"
              disabled={loading}
              className="ml-auto"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </div>
        </form>

        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <p className="text-sm text-muted-foreground">
        Have an Account?{" "}
        <a href="/auth/login" className="text-accent hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
};

export default SignUp;

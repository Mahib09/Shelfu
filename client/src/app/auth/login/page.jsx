"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/authContext";
import { Input } from "@/components/ui/input";
import { useManga } from "@/context/mangaContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { isLoggedIn, login, error, setError, loading, signInWithGoogle } =
    useAuth();
  const { fetchUserCollection } = useManga();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    try {
      await login(data);
      reset({ password: "" });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="authContainer">
      <Image
        src={theme === "light" ? "/logo-black.png" : "/logo-white.png"}
        height={100}
        width={100}
        alt="logo"
      />
      <div className="formHolder flex">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-3xl">Sign In</h2>
          <p className="text-sm text-secondary-foreground">
            Welcome back to Shelfu
          </p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="form">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              signInWithGoogle();
            }}
            className=" w-full"
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
            Sign in with Google
          </Button>
          <p className="mt-1 text-xs text-muted-foreground whitespace-nowrap">
            or
          </p>
          <div className="w-full flex flex-col gap-4">
            <div>
              {" "}
              <Label htmlFor="email">* Email</Label>
              <Input
                type="email"
                id="email"
                placeholder={`${errors.email?.message || ""}`}
                {...register("email", { required: "Email is Required" })}
                className={`inputField ${
                  errors.email || error
                    ? "border-red-500 focus:outline-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <Label htmlFor="password">* Password</Label>
              <Input
                type="password"
                id="password"
                placeholder={`${errors.password?.message || ""}`}
                {...register("password", { required: "Password is Required" })}
                className={`inputField ${
                  errors.password || error
                    ? "border-red-500 focus:outline-red-500"
                    : ""
                }`}
              />
            </div>

            <a
              href="/auth/forgotPassword"
              className="font-medium mb-3 text-sm text-accent cursor-pointer hover:underline transition-all ease-in-out"
            >
              Forgot your Password?
            </a>
          </div>
          <div className="flex gap-5 w-full ">
            <Button
              variant="secondary"
              onClick={() => {
                router.push("/");
              }}
              type="button"
            >
              Back to Home
            </Button>
            <Button
              className="ml-auto"
              variant="accent"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>
        {error && <p className="text-destructive m-auto ">{error}</p>}
      </div>
      <p className="text-sm text-muted-foreground">
        No account?{" "}
        <a href="/auth/signup" className="text-accent hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default Login;

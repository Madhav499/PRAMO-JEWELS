"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

// 1. Define login schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { saveSession } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    setErrorMsg(null);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Invalid email or password.");
      }

      const { access_token, user } = resData.data;

      // Save token and profile to localStorage/state
      saveSession(access_token, user);

      // Redirect to profile page
      router.push("/profile");
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-16 relative overflow-hidden select-none">
      {/* Background elegant lighting glow */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-gold/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-gold/5 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md lux-glass rounded-2xl p-8 sm:p-12 relative z-10 shadow-2xl">
        {/* Header Logo & Intro */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extralight tracking-widest text-gold mb-2">PRAMO JEWELS</h1>
          <p className="text-xs tracking-wider text-foreground/45 uppercase font-medium">Log in to your account</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-lg bg-error/10 border border-error/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
            <p className="text-sm text-error/90 font-light">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-foreground/60 tracking-wider mb-2 uppercase">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/35">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="client@pramojewels.com"
                className="lux-input w-full pl-10 pr-4 py-3 rounded-lg text-sm text-foreground/90 font-light"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-error/90 font-light">{errors.email.message}</p>
            )}
          </div>

          {/* Password field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-xs font-medium text-foreground/60 tracking-wider uppercase">Password</label>
              <Link href="#" className="text-xs text-gold/60 hover:text-gold transition-colors font-light">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/35">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="lux-input w-full pl-10 pr-10 py-3 rounded-lg text-sm text-foreground/90 font-light"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/35 hover:text-gold transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-error/90 font-light">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-lg bg-gold hover:bg-gold-hover text-background text-sm font-semibold tracking-widest lux-button flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-background/25 border-t-background rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>

        {/* Navigation Link */}
        <div className="mt-8 text-center border-t border-white/5 pt-6 text-xs text-foreground/45 tracking-wide">
          <span>Don&apos;t have an account? </span>
          <Link href="/register" className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors font-medium ml-1">
            Register here
          </Link>
        </div>
      </div>
    </main>
  );
}

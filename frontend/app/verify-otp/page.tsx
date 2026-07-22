"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldAlert, KeyRound, ArrowRight, AlertCircle, Copy, Check } from "lucide-react";

// 1. Define verification schema
const verifySchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().length(6, "Code must be exactly 6 digits").regex(/^[0-9]+$/, "Code must contain numbers only"),
});

type VerifyFormInputs = z.infer<typeof verifySchema>;

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyFormInputs>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      email: emailParam,
      code: "",
    },
  });

  useEffect(() => {
    if (emailParam) {
      setValue("email", emailParam);
    }
    
    // Retrieve simulation OTP if stored locally
    const savedSimulationOtp = localStorage.getItem("pramo_simulation_otp");
    if (savedSimulationOtp) {
      setSimulatedOtp(savedSimulationOtp);
    }
  }, [emailParam, setValue]);

  const copyToClipboard = () => {
    if (simulatedOtp) {
      navigator.clipboard.writeText(simulatedOtp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const onSubmit = async (data: VerifyFormInputs) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

    try {
      const response = await fetch(`${apiBaseUrl}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "OTP verification failed. Please check the code.");
      }

      // Cleanup simulation OTP from storage
      localStorage.removeItem("pramo_simulation_otp");

      setSuccessMsg("Account activated successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md lux-glass rounded-2xl p-8 sm:p-12 relative z-10 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extralight tracking-widest text-gold mb-2">VERIFICATION</h1>
        <p className="text-xs tracking-wider text-foreground/45 uppercase font-medium">Verify your email address</p>
      </div>

      {/* Email context info */}
      <div className="text-center text-sm font-light text-foreground/60 mb-8">
        We have generated a 6-digit OTP code to verify:
        <span className="block mt-1 font-normal text-gold">{emailParam || "your email"}</span>
      </div>

      {/* Simulated OTP developer helper */}
      {simulatedOtp && (
        <div className="mb-6 p-4 rounded-lg bg-gold/5 border border-gold/15 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-gold shrink-0" />
            <span className="text-xs text-foreground/75 font-light">
              Simulation code: <strong className="text-gold tracking-widest ml-1">{simulatedOtp}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={copyToClipboard}
            className="p-1.5 rounded hover:bg-white/5 text-foreground/45 hover:text-gold transition-colors cursor-pointer"
            title="Copy verification code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 rounded-lg bg-error/10 border border-error/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
          <p className="text-sm text-error/90 font-light">{errorMsg}</p>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-4 rounded-lg bg-success/15 border border-success/30 flex items-start gap-3">
          <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <p className="text-sm text-success/90 font-light">{successMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden email field */}
        <input type="hidden" {...register("email")} />

        {/* Verification code input */}
        <div>
          <label htmlFor="code" className="block text-xs font-medium text-foreground/60 tracking-wider mb-3 uppercase text-center">Enter 6-Digit Code</label>
          <input
            id="code"
            type="text"
            maxLength={6}
            placeholder="000000"
            className="w-full text-center tracking-[1.5em] pl-[1.5em] py-4 rounded-lg text-lg text-foreground/90 font-light border border-white/8 bg-white/2 focus:border-gold focus:ring-4 focus:ring-gold/15 transition-all outline-none"
            {...register("code")}
          />
          {errors.code && (
            <p className="mt-2 text-xs text-error/90 font-light text-center">{errors.code.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !!successMsg}
          className="w-full py-4 px-6 rounded-lg bg-gold hover:bg-gold-hover text-background text-sm font-semibold tracking-widest lux-button flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-background/25 border-t-background rounded-full animate-spin" />
          ) : (
            <>
              <span>Verify Code</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-16 relative overflow-hidden select-none">
      {/* Background elegant lighting glow */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-gold/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-gold/5 blur-[160px] pointer-events-none" />

      <Suspense fallback={<div className="text-gold animate-pulse tracking-widest text-sm uppercase">Loading verification portal...</div>}>
        <VerifyOtpForm />
      </Suspense>
    </main>
  );
}

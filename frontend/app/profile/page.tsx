"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserProfile } from "@/hooks/useAuth";
import { User, Mail, Phone, ShieldCheck, LogOut, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, clearSession, fetchWithAuth } = useAuth();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // 1. Redirect if not authenticated once auth check finishes
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchUserProfile = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetchWithAuth("/auth/me");
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to fetch profile details.");
      }

      setProfile(resData.data);
    } catch (err: any) {
      setErrorMsg(err.message || "Could not retrieve profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      // call logout endpoint to revoke token in database
      await fetchWithAuth("/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout request failed: ", err);
    } finally {
      clearSession();
      router.push("/login");
    }
  };

  if (authLoading || (loading && !profile)) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center bg-background select-none">
        <span className="w-8 h-8 border-2 border-gold/25 border-t-gold rounded-full animate-spin mb-4" />
        <span className="text-xs tracking-widest text-gold uppercase animate-pulse">Retrieving Profile...</span>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-16 relative overflow-hidden select-none">
      {/* Background elegant lighting glow */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-gold/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-gold/5 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-xl lux-glass rounded-2xl p-8 sm:p-12 relative z-10 shadow-2xl">
        {/* Navigation back helper */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-foreground/45 hover:text-gold transition-colors tracking-widest uppercase">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Boutique</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-white/5 pb-8 mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extralight tracking-widest text-gold mb-2 uppercase">My Profile</h1>
          <p className="text-xs tracking-wider text-foreground/45 uppercase font-medium">Bespoke Client Dashboard</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-lg bg-error/10 border border-error/20 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
              <p className="text-sm text-error/90 font-light">{errorMsg}</p>
            </div>
            <button
              onClick={fetchUserProfile}
              className="p-1 rounded hover:bg-white/5 text-foreground/45 hover:text-gold transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}

        {profile && (
          <div className="space-y-6">
            {/* Display fields grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-white/2 border border-white/5">
                <div className="flex items-center gap-3 text-foreground/45 text-xs uppercase tracking-wider mb-2">
                  <User className="w-4 h-4 text-gold/60" />
                  <span>Client Name</span>
                </div>
                <div className="text-sm font-light text-foreground/90">
                  {profile.first_name} {profile.last_name}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/2 border border-white/5">
                <div className="flex items-center gap-3 text-foreground/45 text-xs uppercase tracking-wider mb-2">
                  <Mail className="w-4 h-4 text-gold/60" />
                  <span>Email Address</span>
                </div>
                <div className="text-sm font-light text-foreground/90 break-all">
                  {profile.email}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/2 border border-white/5">
                <div className="flex items-center gap-3 text-foreground/45 text-xs uppercase tracking-wider mb-2">
                  <Phone className="w-4 h-4 text-gold/60" />
                  <span>Phone Number</span>
                </div>
                <div className="text-sm font-light text-foreground/90">
                  {profile.phone || "Not Provided"}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/2 border border-white/5">
                <div className="flex items-center gap-3 text-foreground/45 text-xs uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-gold/60" />
                  <span>Client Tier / Role</span>
                </div>
                <div className="text-sm font-light text-gold">
                  {profile.role}
                </div>
              </div>
            </div>

            {/* Logout button */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <span className="text-xs text-foreground/35 font-light">
                Secure Session Active
              </span>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-6 py-3 rounded-lg border border-error/30 hover:bg-error/10 text-error text-xs font-semibold tracking-widest lux-button flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

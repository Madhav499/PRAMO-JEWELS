"use client";

import { useState, useEffect } from "react";

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Retrieve authentication state from localStorage
    const savedToken = localStorage.getItem("pramo_token");
    const savedUser = localStorage.getItem("pramo_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Save user session details.
   */
  const saveSession = (accessToken: string, profile: UserProfile) => {
    localStorage.setItem("pramo_token", accessToken);
    localStorage.setItem("pramo_user", JSON.stringify(profile));
    setToken(accessToken);
    setUser(profile);
  };

  /**
   * Terminate user session.
   */
  const clearSession = () => {
    localStorage.removeItem("pramo_token");
    localStorage.removeItem("pramo_user");
    setToken(null);
    setUser(null);
  };

  /**
   * Central API Request Helper with auto authorization headers.
   */
  const fetchWithAuth = async (path: string, options: RequestInit = {}) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    
    // Inject headers
    const headers = new Headers(options.headers || {});
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    
    const savedToken = token || localStorage.getItem("pramo_token");
    if (savedToken) {
      headers.set("Authorization", `Bearer ${savedToken}`);
    }

    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers,
    });

    // Auto logout if unauthenticated on protected routes
    if (response.status === 401 && savedToken) {
      clearSession();
    }

    return response;
  };

  return {
    token,
    user,
    isAuthenticated: !!token,
    loading,
    saveSession,
    clearSession,
    fetchWithAuth,
  };
}

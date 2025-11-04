"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/app/utils/axios";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/users/login", {
        email,
        password,
      });

      // If backend returns { token: "xyz" }
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link href="/">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="tracking-tight text-lg font-semibold">ContactHub</span>
          </div>
        </div>
         </Link>
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-8 relative overflow-hidden">

          <div className="relative text-center mb-8">
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your contacts</p>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-3 text-center">{error}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input className="pl-10" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div>
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input className="pl-10" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>

            <Button disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button onClick={() => router.push("/register")} className="text-blue-500 hover:text-blue-600">
                Create account
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

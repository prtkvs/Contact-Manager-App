"use client";

import Link from "next/link";
import { Users, Mail, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="tracking-tight font-semibold">ContactHub</span>
          </div>
          </Link>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Simple Contact Management
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl tracking-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text ">
              Your Personal Contact Manager
            </h1>

            <p className="text-gray-600 max-w-lg">
              Store, manage, and access your contacts securely — all in one clean and intuitive platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/25"
                >
                  Create Free Account
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600">Secure Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600">Easy Access</span>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-gray-900/10 p-8 border border-gray-200/50">
              <Image
                src="https://images.unsplash.com/photo-1737505599162-d9932323a889?auto=format&fit=crop&w=800&q=80"
                alt="Contact network illustration"
                width={500}
                height={400}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Organize Contacts",
              text: "Keep all your contacts in one place with powerful search and filters.",
            },
            {
              icon: Shield,
              title: "Secure & Private",
              text: "Encrypted storage with modern authentication security.",
            },
            {
              icon: Mail,
              title: "Quick Access",
              text: "Access your contacts anytime, anywhere with a clean UI.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
      <footer>
        <div className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4 text-center text-gray-600">
            &copy; {new Date().getFullYear()} Prateek Verma. All rights reserved.
          </div>
        </div>
        </footer>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Login successful!");

      // Store token in localStorage and cookies
      localStorage.setItem("token", data.token);
      Cookies.set("token", data.token, { expires: 1, path: "/" }); // Expires in 1 day
      Cookies.set("userEmail", email, { expires: 1, path: "/" });

      // Redirect to home page ("/"), which loads `page.tsx`
      router.push("/");
      router.refresh();
    } else {
      alert(`❌ ${data.error}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSignin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </>
  );
};

export default Signin;

"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";

export default function SignIn() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useContext(UserContext);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    signIn(loginEmail, loginPassword)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setError("Invalid email address.");
        } else if (error.code === "auth/wrong-password") {
          setError("Invalid password.");
        } else if (error.code === "auth/user-not-found") {
          setError("User not found.");
        } else {
          setError("Unknown error occurred. Please try again later.");
        }
      });
  };

  return (
    <motion.div
      className="sign-in-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "easeInOut",
        duration: "0.4",
        delay: 0,
      }}
    >
      <h1 className="sign-title">Sign In</h1>
      <div className="sign-in-div">
        <input
          type="text"
          value={loginEmail}
          required
          placeholder="Email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          required
          value={loginPassword}
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <div className="sign-in-btn-div">
          <button className="next-btn" onClick={(e) => handleLogin(e)}>
            Sign In
          </button>
          <span>Forgot Password?</span>
        </div>
        <div className="no-acc-div">
          Don't have an account?
          <span role="button" onClick={() => router.push("/signup")}>
            {" "}
            Sign up
          </span>
        </div>
      </div>
    </motion.div>
  );
}

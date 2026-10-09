import React, { useState } from "react";

export default function LoginPage({ onBack, onRegisterNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    setError("");
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8085/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Login failed");
      }

      const data = await response.json();
      const userData = {
        ...data,
        email,
        username: data.username || email,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      if (onLoginSuccess) onLoginSuccess(userData);
    } catch (err) {
      setError(err.message || "Login error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-0 pb-8 px-0 bg-sand-50 md:min-h-screen md:flex md:items-center md:justify-center md:py-12 md:px-4">
      <div className="w-full max-w-md md:bg-sand-50 md:rounded-3xl md:shadow-soft-lg md:p-8">
        {/* Mobile Header with Back Button */}
        <div className="flex items-center justify-between h-14 px-4 sm:px-0">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center w-10 h-10 text-olive-600 hover:text-burnt-500 transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex-1" />
        </div>

        {/* Logo & Heading */}
        <div className="px-4 sm:px-0 pt-6 pb-4">
          {/* Mini Logo */}
          <div className="flex items-center gap-2 mb-6">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-burnt-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 3h6M10 3v7l-4 8a2 2 0 002 3h8a2 2 0 002-3l-4-8V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-display text-sm font-bold text-olive-900">ScienceHub</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-olive-900 mb-1" style={{ fontSize: "var(--text-h1)", lineHeight: "var(--text-h1-lh)" }}>
            Welcome Back
          </h1>
          <p className="text-olive-600" style={{ fontSize: "var(--text-body)", lineHeight: "var(--text-body-lh)" }}>
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="px-4 sm:px-0 space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-olive-900 mb-1.5 font-semibold" style={{ fontSize: "var(--text-sm)" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="mobile-input w-full border border-sand-200 bg-white text-olive-900 placeholder-olive-400 focus:outline-none focus:border-burnt-500 focus:ring-1 focus:ring-burnt-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-olive-900 mb-1.5 font-semibold" style={{ fontSize: "var(--text-sm)" }}>
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                className="mobile-input w-full border border-sand-200 bg-white text-olive-900 placeholder-olive-400 focus:outline-none focus:border-burnt-500 focus:ring-1 focus:ring-burnt-500 pr-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-olive-400 hover:text-olive-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Forgot Password Link - Right aligned */}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="text-burnt-500 hover:text-burnt-600 transition-colors font-medium"
                style={{ fontSize: "var(--text-sm)" }}
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mobile-button-lg w-full bg-burnt-500 text-sand-50 hover:bg-burnt-600 disabled:bg-burnt-300 transition-colors font-semibold mt-6"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        {/* Account Creation Text - Single Line */}
        <div className="px-4 sm:px-0 mt-6 text-center">
          <p className="text-olive-600" style={{ fontSize: "var(--text-sm)" }}>
            New to ScienceHub?{" "}
            <button
              onClick={onRegisterNavigate}
              className="text-burnt-500 hover:text-burnt-600 font-semibold transition-colors whitespace-nowrap"
            >
              Create account
            </button>
          </p>
        </div>

        {/* Desktop-only: Help Text */}
        <p className="text-center text-xs text-olive-400 mt-8 hidden md:block">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

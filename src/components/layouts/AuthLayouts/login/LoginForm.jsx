"use client";
import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import SocialButton from "@/components/buttons/SocialButton";

const LoginForm = () => {
  const params = useSearchParams();
  const callBack = params.get("callbackUrl") || "/";
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;

    const loginInfo = {
      email: form.email.value,
      password: form.password.value,
    };

    const result = await signIn("credentials", {
      email: loginInfo.email,
      password: loginInfo.password,
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });
    if (result.ok) {
      Swal.fire("success", "Welcome to Kidz Hub", "success");
      router.push(callBack);
    } else {
      Swal.fire(
        "error",
        "Email password not matched. Try Google Login/Register",
        "error"
      );
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none "
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-content py-2 rounded-lg hover:bg-orange-700 transition">
              Login
            </button>
          </form>

          <div className="my-4 text-center text-sm text-gray-500">or</div>

          <SocialButton></SocialButton>

          <p className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href={`/register?callbackUrl=${callBack}`}
              className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

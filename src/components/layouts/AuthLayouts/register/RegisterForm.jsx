"use client";
import { postUser } from "@/actions/server/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa";

const RegisterForm = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

    const userData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    const result = await postUser(userData);
    if (result.acknowledged) {
      alert("register successful. please login");
      router.push("/login");
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl text-primary font-semibold text-center mb-6">
            Register
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
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
              Register
            </button>
          </form>

          <div className="my-4 text-center text-sm text-gray-500">or</div>

          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
            <FaGoogle />
            Register with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

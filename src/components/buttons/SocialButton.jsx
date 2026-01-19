import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa";

const SocialButton = () => {
  const params = useSearchParams();
  const handleSignIn = async () => {
    const result = await signIn("google", {
      // redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });
    if (result.ok) {
      Swal.fire("success", "Welcome to Kidz Hub", "success");
    } else {
      Swal.fire("error", "Login Failed", "error");
    }
  };
  return (
    <div>
      <button
        onClick={handleSignIn}
        className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
        <FaGoogle />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialButton;

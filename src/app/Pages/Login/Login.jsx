"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData)); // ✅ correct
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button className="bg-green-600 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
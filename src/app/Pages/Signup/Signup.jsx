"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/authSlice";

export default function Signup({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showMessage, setShowMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    //it will send data to Redux store
    dispatch(
      signup({
        email: formData.email,
        password: formData.password,
      })
    );

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div
        className="bg-white p-6 shadow-lg rounded-lg w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Message */}
        {showMessage && (
          <div className="mb-4 p-2 bg-blue-100 text-blue-700 text-sm rounded text-center">
             Account Created Successfully!
          </div>
        )}

        <h2 className="text-2xl font-bold text-center mb-5">Signup</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* Create Password */}
          <input
            type="password"
            placeholder="Create password"
            className="w-full mb-3 p-3 border rounded"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full mb-4 p-3 border rounded"
            required
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          {/* Signup Button */}
          <button className="bg-blue-600 text-white w-full p-3 rounded font-medium">
            Signup
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Login</span>
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t"></div>
          <span className="px-2 text-gray-500 text-sm">Or</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Facebook Button */}
        <button className="w-full bg-blue-700 text-white p-3 rounded mb-3">
          Login with Facebook
        </button>

        {/* Google Button */}
        <button className="w-full border p-3 rounded">
          Login with Google
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
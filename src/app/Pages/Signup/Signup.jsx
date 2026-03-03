"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/authSlice";

export default function Signup({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));

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
        
        {showMessage && (
          <div className="mb-4 p-2 bg-blue-100 text-blue-700 text-sm rounded text-center">
            🎉 Account Created Successfully!
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-3 p-2 border rounded"
            required
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border rounded"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button className="bg-blue-600 text-white w-full p-2 rounded">
            Sign Up
          </button>
        </form>

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
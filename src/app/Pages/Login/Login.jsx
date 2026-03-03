"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";

export default function Login({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 shadow-lg rounded-lg w-96 relative">
        
        {showMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 text-sm rounded text-center">
            ✅ Login Successful!
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
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

          <button className="bg-green-600 text-white w-full p-2 rounded">
            Login
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
"use client";
import { useState } from "react"; //used to store and update data inside a component
import { useDispatch } from "react-redux"; //used to send data to Redux store.
import { login } from "../../../redux/authSlice"; //importing login function from authSlice

export default function Login({ isOpen, onClose }) {
  const dispatch = useDispatch(); // it is used to send data to Redux store

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)); //it will send login data to Redux store

    setShowMessage(true);
//auto close modal after 2sec
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
          <div className="mb-4 p-2 bg-green-100 text-green-700 text-sm rounded text-center">
            ✅ Login Successful!
          </div>
        )}

        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

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

          {/* Password */}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border rounded"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
            
            </span>
          </div>

          {/* Forgot Password */}
          <p className="text-right text-sm text-blue-600 mb-4 cursor-pointer">
            Forgot password?
          </p>

          {/* Login Button */}
          <button className="bg-blue-600 text-white w-full p-3 rounded font-medium">
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-sm mt-3">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Signup</span>
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t"></div>
          <span className="px-2 text-gray-500 text-sm">Or</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Facebook Login */}
        <button className="w-full bg-blue-700 text-white p-3 rounded mb-3">
          Login with Facebook
        </button>

        {/* Google Login */}
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
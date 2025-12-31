import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authThunk";

export default function TechStoreSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
const handleLogIn = async (e) => {
  e.preventDefault();

  const formData = { email, password };

  try {
    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {

      toast.success("Login successful");
      navigate("/chat"); 
    } else {
      toast.error(result.payload || "Login failed");
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.error(error);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-full mb-4 shadow-lg">
            <MessageCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ChatApp
          </h1>
          <p className="text-gray-600">
            Sign in to continue messaging
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogIn}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-5"
        >
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {authState.error && (
            <p className="text-red-500 text-sm">
              {typeof authState.error === "string"
                ? authState.error
                : authState.error.message || "Login failed"}
            </p>
          )}

          <button
            type="submit"
            disabled={authState.loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50"
          >
            {authState.loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-emerald-600 font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

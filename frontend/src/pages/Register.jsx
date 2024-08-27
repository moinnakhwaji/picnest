import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "../components/Loading";
import { PinData } from "../context/PinContext";
import picnest from "../assets/picnest2.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { registerUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const { fetchPins } = PinData();

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(name, email, password, navigate, fetchPins);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-zinc-200">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src={picnest}
            alt="Pinterest"
            className="h-24 w-24 rounded-full border-4 border-purple-600"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Register to Pinterest</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingAnimation /> : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-zinc-800 px-2 text-zinc-400">OR</span>
            </div>
          </div>

          <div className="mt-4 text-center text-sm">
            <span>
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-purple-400 hover:underline"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

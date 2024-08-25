
import React from "react";
import { Link } from "react-router-dom";
import picnest from "../assets/picnest.jpg";

const Navbar = ({ user }) => {
  return (
    <nav className="bg-zinc-900 text-zinc-200 shadow-md">
      <div className="mx-auto px-4 py-3 flex justify-between items-center max-w-screen-xl">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={picnest}
            alt="Picnest Logo"
            className="h-10 md:h-12 rounded-full"
          />
          <span className="text-red-500 text-2xl font-bold">Picnest</span>
        </Link>

        <div className="flex items-center space-x-6 text-lg">
          <Link
            to="/"
            className="hover:text-red-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="hover:text-red-400 transition-colors duration-300"
          >
            Create
          </Link>
          <Link
            to="/account"
            className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xl text-zinc-200 hover:bg-zinc-700 transition-colors duration-300"
          >
            {user.name.slice(0, 1)}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

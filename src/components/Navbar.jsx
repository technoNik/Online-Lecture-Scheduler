import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-sky-400 to-cyan-300 flex flex-row justify-start gap-x-6 p-4">
      <h1 className="text-gray-100 font-semibold text-xl text-left">
        <Link to="/">Home</Link>
      </h1>
      <h1 className="text-gray-100 font-semibold text-xl">
        <Link to="/admin">Admin Panel</Link>
      </h1>
      <h2 className="text-gray-100 font-semibold text-xl">
        <Link to="/instructor">Instructor Panel</Link>
      </h2>
    </nav>
  );
};

export default Navbar;

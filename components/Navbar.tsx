import React from "react";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className="flex items-center justify-between container mx-auto py-8 px-5">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">
          Play<span className="text-gray-400">Moku</span>
        </h1>
        <div className="bg-red-500 py-0.5 px-3 rounded-lg font-bold">Live</div>
      </div>
      <ul className="flex items-center space-x-12">
        <li>
          <a href="#" className="text-gray-200 text-lg">
            Lobby
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-200 text-lg">
            Learn
          </a>
        </li>
        <li>
          <button className="bg-red-500 text-lg py-1.5 px-5 rounded-lg">
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
};

import React from "react";

interface LobbyNavigationProps {}

export const LobbyNavigation: React.FC<LobbyNavigationProps> = ({}) => {
  return (
    <nav className="inline-flex items-center mt-6 bg-gray-800 border border-gray-700 rounded-full shadow-inner p-1 space-x-2">
      <button className="flex items-center bg-white text-gray-900 font-medium rounded-full px-5 py-1.5 shadow-xl focus:outline-none">
        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse mr-2.5" />
        Live Lobby
      </button>
      <button className="px-5 py-1.5 rounded-full font-medium focus:outline-none">
        Your Games
      </button>
    </nav>
  );
};

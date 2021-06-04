import React from "react";
import { Game, User } from "../../lib/types";

interface PlayerCardProps {
  game: Game;
  user: User;
  color: "Black" | "White";
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  game,
  user,
  color,
}) => {
  return (
    <div className="flex items-center space-x-6">
      {user?.profilePicture ? (
        <img
          src={user?.profilePicture}
          className={`w-14 h-14 rounded-full mb-2 ${
            game?.turn === (color === "Black" ? game?.black : game?.white)
              ? "ring-2 ring-red-500"
              : ""
          }`}
        />
      ) : (
        <div
          className={`w-14 h-14 rounded-full bg-gray-700 ${
            game?.turn === (color === "Black" ? game?.black : game?.white)
              ? "ring-2 ring-red-500"
              : ""
          }`}
        />
      )}
      <div>
        <h6 className="text-lg font-bold">{user?.name} (Host)</h6>
        <p className="text-gray-400">{color}</p>
      </div>
    </div>
  );
};

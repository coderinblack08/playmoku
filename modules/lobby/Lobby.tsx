import React from "react";
import { useList } from "react-firebase-hooks/database";
import firebase from "firebase/app";
import "firebase/database";
import { GameCard } from "./GameCard";

interface LobbyProps {}

export const Lobby: React.FC<LobbyProps> = ({}) => {
  const [snapshots, loading] = useList(firebase.database().ref("games"));

  return (
    <div>
      {loading ? (
        <div className="spinner-md mt-8" />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {snapshots?.map((game) => (
            <GameCard key={game.key} id={game.key} {...game.val()} />
          ))}
        </div>
      )}
    </div>
  );
};

import React from "react";
import { useList } from "react-firebase-hooks/database";
import firebase from "firebase/app";
import "firebase/database";
import { GameCard } from "./GameCard";

interface LobbyProps {}

export const Lobby: React.FC<LobbyProps> = ({}) => {
  const [snapshots, loading, error] = useList(firebase.database().ref("games"));

  return (
    <div>
      {loading ? (
        <div className="spinner-md mt-8" />
      ) : (
        snapshots?.map((game) => <GameCard key={game.key} {...game.val()} />)
      )}
    </div>
  );
};

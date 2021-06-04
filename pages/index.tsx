import React from "react";
import { Button } from "../components/Button";
import { LobbyNavigation } from "../modules/lobby/LobbyNavigation";
import { GameModal } from "../modules/lobby/GameModal";
import { Navbar } from "../components/Navbar";
import { Lobby } from "../modules/lobby/Lobby";

const Index: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl px-5 mx-auto py-10">
        <h1 className="font-dm text-3xl font-bold">Live Lobby</h1>
        <h6 className="text-gray-400 font-dm mt-2">
          Play and find online{" "}
          <span className="text-red-500">realtime gomoku games</span>
        </h6>
        <LobbyNavigation />
        <div className="grid grid-cols-[5fr,3fr] gap-12 mt-8">
          <main>
            <Lobby />
          </main>
          <aside className="space-y-4">
            <GameModal />
            <Button className="w-full" color="secondary">
              Play Against a Friend
            </Button>
            <p className="text-gray-400">
              <span className="font-bold text-white">153</span> users online
              <span className="mx-2 font-bold">·</span>
              <span className="font-bold text-white">1,123,213</span> games
              played
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Index;

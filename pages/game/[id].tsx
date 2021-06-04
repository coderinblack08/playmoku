import firebase from "firebase/app";
import "firebase/database";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { MdFlag, MdPersonAdd } from "react-icons/md";
import { Button } from "../../components/Button";
import { Navbar } from "../../components/Navbar";
import { Game as GameType, User } from "../../lib/types";
import { useUser } from "../../lib/userContext";
import dynamic from "next/dynamic";
import { PlayerCard } from "../../modules/game/PlayerCard";

const GoBoard = dynamic(
  import("../../modules/game/GoBoard").then((x) => x.GoBoard),
  {
    ssr: false,
  }
);

const Game: React.FC<{ gameId: string }> = ({ gameId }) => {
  const user = useUser();
  const [game] = useObjectVal<GameType>(
    firebase.database().ref(`games/${gameId}`)
  );
  const [black] = useObjectVal<User | null>(
    firebase.database().ref(`users/${game?.black}`)
  );
  const [white] = useObjectVal<User | null>(
    firebase.database().ref(`users/${game?.white}`)
  );

  useEffect(() => {
    if (
      game &&
      user &&
      game.host !== user.id &&
      game.status === "waiting" &&
      !game.opponent
    ) {
      const updates: Record<string, any> = {
        opponent: user?.id,
        status: "playing",
      };
      const random = Math.random();
      if (random > 0.5) {
        updates.black = user.id;
        updates.white = game.host;
      } else {
        updates.black = game.host;
        updates.white = user.id;
      }
      updates.turn = updates.black;
      firebase.database().ref(`games/${gameId}`).update(updates);
    }
  }, [user?.id, game, gameId]);
  return (
    <div>
      <Navbar />
      <div className="flex space-x-6 max-w-7xl mx-auto px-5 py-8">
        <aside className="space-y-6 max-w-sm w-full">
          <div className="overflow-hidden bg-gray-800 rounded-lg">
            {game?.status === "waiting" ? (
              <div className="p-4">
                <h6 className="text-gray-200 text-lg mb-3">
                  Waiting for Opponent...
                </h6>
                <Button icon={<MdPersonAdd className="w-5 h-5" />}>
                  Invite
                </Button>
              </div>
            ) : (
              <>
                <div className="px-5 py-6 space-y-6">
                  {game && black ? (
                    <PlayerCard color="Black" user={black} game={game} />
                  ) : null}
                  {game && white ? (
                    <PlayerCard color="White" user={white} game={game} />
                  ) : null}
                </div>
                <div className="bg-gray-700 flex items-center space-x-2 px-5 py-2.5">
                  <Button>
                    <MdFlag className="w-5 h-5" />
                  </Button>
                  <Button color="secondary" className="hover:bg-gray-800">
                    Draw
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="relative overflow-hidden bg-gray-800 rounded-lg p-4 min-h-[20em]">
            <h6 className="text-lg font-bold">Chat</h6>
            <div className="absolute bottom-0 inset-x-0 m-4">
              <input
                type="text"
                placeholder="Message"
                className="w-full bg-gray-700 px-4 py-2 rounded-lg focus:outline-none mt-4"
              />
            </div>
          </div>
        </aside>
        <div>
          <GoBoard />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (props) => {
  const gameId = props.query.id?.toString();
  return { props: { gameId } };
};

export default Game;

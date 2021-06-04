import firebase from "firebase/app";
import "firebase/database";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { MdDragHandle, MdFlag } from "react-icons/md";
import { Button } from "../../components/Button";
import { Navbar } from "../../components/Navbar";
import { User, Game as GameType } from "../../lib/types";
import { useUser } from "../../lib/userContext";
import { PlayerCard } from "../../modules/game/PlayerCard";

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
      <div className="max-w-7xl mx-auto px-5">
        <aside className="overflow-hidden bg-gray-800 border border-gray-700 rounded-lg max-w-sm">
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
            <Button color="secondary">Draw</Button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (props) => {
  const gameId = props.query.id?.toString();
  return { props: { gameId } };
};

export default Game;

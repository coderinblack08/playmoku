import React from "react";
import { useObject } from "react-firebase-hooks/database";
import "firebase/database";
import firebase from "firebase/app";
import { Time, timeObjectToString, timeToType } from "../../lib/utils";

interface GameCardProps {
  createdAt: number;
  host: string;
  status: string;
  time: Time;
}

export const GameCard: React.FC<GameCardProps> = ({ time, host }) => {
  const [hostProfile, loading] = useObject(
    firebase.database().ref(`users/${host}`)
  );

  return (
    <article className="max-w-sm rounded-lg overflow-hidden bg-gray-800 border border-gray-700 transition transform hover:-translate-y-1">
      <div className="px-4 py-6">
        <h4 className="text-2xl font-bold">
          {timeObjectToString(time)} ({timeToType(time)})
        </h4>
        {loading ? (
          <div className="spinner" />
        ) : (
          <div className="flex items-center space-x-2 mt-1">
            <img
              src={hostProfile?.val().profilePicture}
              className="w-6 h-6 rounded-full"
            />
            <p className="text-gray-300 mt-1">
              Created by{" "}
              <a href="#" className="link">
                {hostProfile?.val().name}
              </a>
            </p>
          </div>
        )}
      </div>
      <div className="bg-gray-700 text-gray-200 px-4 py-2 font-semibold">
        Press to play
      </div>
    </article>
  );
};

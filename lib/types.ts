import { Time } from "./utils";

export interface User {
  email: string;
  name: string;
  profilePicture: string;
}

export interface Game {
  black?: string;
  white?: string;
  status: "waiting" | "playing" | "ending";
  host: string;
  opponent: string;
  turn: string;
  time: Time;
  board: ("empty" | "black" | "white")[][];
  createdAt: number;
}

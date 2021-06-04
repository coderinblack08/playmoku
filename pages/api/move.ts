import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { Game } from "../../lib/types";

const app = admin.initializeApp();

const isSquare = (board: Game["board"]) =>
  board.every((x) => x.length === board.length);

function checkWinner(board: Game["board"]): null | "white" | "black" {
  const n = board.length;
  const flatBoard = board.flat();
  if (!isSquare(board)) throw new Error("Board is not square");
  if (n < 5) throw new Error("Board size is too small");

  function winAt(i: number, step: number, skip: number = 0) {
    if (flatBoard[i] === undefined) return false;
    let k = skip;
    for (let j = 1; j < 5; j++) {
      const next = i + j * step + k;
      k += skip;
      if (flatBoard[i] !== flatBoard[next]) return false;
    }
    return true;
  }

  for (let i = 0; i < flatBoard.length; i++) {
    const right = winAt(i, 1);
    const down = winAt(i, n);
  }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405);
  const db = app.database();
  const ref = db.ref(`games/${req.body.gameId}`);
  const game: Game = (await ref.get()).val();

  let board = game.board;
  const { x, y } = req.body.coords;
  board[y][x] = game.turn === game.black ? "black" : "white";

  let updates: Record<string, any> = {
    board,
    turn: game.turn === game.host ? game.opponent : game.host,
  };

  const winner = checkWinner(board);
  await ref.update(updates);
}

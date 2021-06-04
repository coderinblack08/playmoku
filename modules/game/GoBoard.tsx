import p5Types from "p5";
import React from "react";
import Sketch from "react-p5";
import { Game } from "../../lib/types";

interface GoBoardProps {}

let x = 50;
let y = 50;
let player: "black" | "white" = "black";
let board: Game["board"] = new Array(15).fill(new Array(15).fill("empty"));
const rows = 19;
const unit = 30;
const margin = 0.7;
const width = unit * (rows - 1 + margin * 2);
const stars = [
  [4, 4],
  [4, 10],
  [4, 16],
  [10, 4],
  [10, 10],
  [10, 16],
  [16, 4],
  [16, 10],
  [16, 16],
];

const coordsToPoint = (x: number, y: number) => {
  const px = Math.round(x / unit - margin + 1);
  const py = Math.round(y / unit - margin + 1);
  return [px, py];
};

const pointToCoords = (x: number, y: number) => {
  return [unit * (margin + x - 1), unit * (margin + y - 1)];
};

const drawLine = (
  p5: p5Types,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const start = pointToCoords(x1, y1);
  const end = pointToCoords(x2, y2);
  p5.line(start[0], start[1], end[0], end[1]);
};

export const GoBoard: React.FC<GoBoardProps> = ({}) => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const canvas = p5.createCanvas(width, width).parent(canvasParentRef);
    p5.background("#eecc66");
    // draw lines
    for (let i = 1; i <= rows; i++) {
      drawLine(p5, 1, i, rows, i);
      drawLine(p5, i, 1, i, rows);
    }
    // draw stars
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      const point = pointToCoords(star[0], star[1]);
      p5.fill(0);
      p5.circle(point[0], point[1], unit * 0.2);
    }
  };

  const draw = (p5: p5Types) => {
    // p5.ellipse(x++, y++, 70, 70);
  };

  return <Sketch setup={setup} draw={draw} />;
};

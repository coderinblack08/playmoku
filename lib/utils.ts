import { isEqual } from "lodash";
export type Time = {
  bonus: number;
  time: number;
};

export const times = [
  {
    value: { time: 1, bonus: 0 },
    type: "Bullet",
  },
  {
    value: { time: 3, bonus: 0 },
    type: "Blitz",
  },
  {
    value: { time: 5, bonus: 0 },
    type: "Blitz",
  },
  {
    value: { time: 10, bonus: 0 },
    type: "Rapid",
  },
];

export const timeToType = (time: Time) =>
  times.find((x) => isEqual(time, x.value))?.type;

export const timeObjectToString = (time: Time) => time.time + "+" + time.bonus;

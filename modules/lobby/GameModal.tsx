import { Dialog, RadioGroup } from "@headlessui/react";
import firebase from "firebase/app";
import "firebase/database";
import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { useUser } from "../../lib/userContext";
import { Time, timeObjectToString, times } from "../../lib/utils";

interface GameModalProps {}

export const GameModal: React.FC<GameModalProps> = ({}) => {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<Time | null>(null);

  return (
    <>
      <Button className="w-full" onClick={() => setOpen(true)}>
        Create Game
      </Button>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <Dialog.Title as="h2" className="font-bold text-lg">
          Time Controls
        </Dialog.Title>
        <RadioGroup
          value={time}
          onChange={setTime}
          className="grid grid-cols-2 gap-4 mt-2"
        >
          {times.map((time) => (
            <RadioGroup.Option
              value={time.value}
              as="button"
              className={({ active, checked }) =>
                `${active ? "ring" : ""}
                  ${
                    checked
                      ? "bg-red-500 border border-red-400"
                      : "bg-gray-800 border border-gray-700"
                  }
                  flex flex-col items-center justify-center h-28 px-4 rounded-lg shadow-md focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label className="text-2xl font-bold font-sans">
                    {timeObjectToString(time.value)}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={checked ? "text-red-50" : "text-gray-300"}
                  >
                    {time.type}
                  </RadioGroup.Description>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
        <div className="flex items-center space-x-2 my-4">
          <input type="checkbox" name="unlimited" id="unlimited" />
          <label htmlFor="unlimited" className="text-gray-500">
            <span className="text-gray-400">Unlimited time</span> - no time
            controls
          </label>
        </div>
        <Button
          onClick={async () => {
            const ref = firebase.database().ref("games/");
            const newGame = await ref.push();
            await newGame.set({
              time,
              status: "waiting",
              host: user?.id,
              createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
            setOpen(false);
          }}
          className="w-full"
        >
          Create Game
        </Button>
      </Modal>
    </>
  );
};

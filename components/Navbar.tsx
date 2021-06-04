import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useUser } from "../lib/userContext";
import { Button } from "./Button";
import { UserDropdown } from "./UserDropdown";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const user = useUser();
  return (
    <nav className="flex items-center justify-between max-w-7xl mx-auto py-8 px-5">
      <Link href="/">
        <a className="text-2xl font-bold">
          Play<span className="text-gray-400 font-bold">Moku</span>
        </a>
      </Link>
      <ul className="flex items-center space-x-10">
        <li>
          <button className="flex items-center space-x-1.5">
            <span className="text-gray-200">Lobby</span>
            <MdKeyboardArrowDown className="text-gray-400 w-5 h-5" />
          </button>
        </li>
        <li>
          <a href="#" className="text-gray-200">
            Learn
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-200">
            <span className="mr-2 text-sm">🏆</span> Podium
          </a>
        </li>
        <li>
          {user ? (
            <UserDropdown />
          ) : (
            <Button
              size="small"
              onClick={async () => {
                const provider = new firebase.auth.GoogleAuthProvider();
                try {
                  const { user } = await firebase
                    .auth()
                    .signInWithPopup(provider);

                  firebase
                    .database()
                    .ref("users/" + user?.uid)
                    .set({
                      name: user?.displayName,
                      email: user?.email,
                      profilePicture: user?.photoURL,
                    });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Login
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
};

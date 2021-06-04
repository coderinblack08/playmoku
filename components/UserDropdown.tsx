import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useUser } from "../lib/userContext";
import firebase from "firebase/app";
import "firebase/auth";

export const UserDropdown: React.FC = () => {
  const user = useUser();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        {user?.profilePicture ? (
          <img
            alt={user?.name}
            src={user?.profilePicture}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          "Profile"
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute overflow-hidden right-0 w-48 mt-4 origin-top-right bg-gray-800 border border-gray-700 rounded-lg focus:outline-none">
          <Menu.Item as="div">
            {({ active }) => (
              <button
                className={`px-5 py-3 w-full text-left ${
                  active ? "bg-gray-700" : ""
                }`}
              >
                Profile
              </button>
            )}
          </Menu.Item>
          <Menu.Item as="div">
            {({ active }) => (
              <button
                className={`px-5 py-3 w-full text-left ${
                  active ? "bg-gray-700" : ""
                }`}
                onClick={() => firebase.auth().signOut()}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

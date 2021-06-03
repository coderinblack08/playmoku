import firebase from "firebase/app";
import {
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  id: string;
  name: string;
  profilePicture: string;
  setAuthUser: Dispatch<SetStateAction<firebase.User | null>>;
  authUser: firebase.User | null;
} | null;

const UserContext = createContext<User>(null);

export const UserProvider: React.FC = (props) => {
  const [user, setUser] = useState<User>(null);
  const [authUser, setAuthUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((u) => {
      setAuthUser(u ? u : null);
    });
  }, []);

  useEffect(() => {
    if (!authUser) {
      setUser(null);
      return;
    }

    const userRef = firebase.database().ref(`/users/${authUser?.uid}`);
    function update(snapshot: firebase.database.DataSnapshot) {
      setUser({
        ...snapshot.val(),
        id: authUser?.uid,
        setAuthUser,
        authUser,
      });
    }

    userRef.on("value", update);
    return () => {
      userRef.off("value", update);
    };
  }, [authUser]);

  return <UserContext.Provider value={user} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Hook isn't located inside UserProvider");
  }
  return context;
};

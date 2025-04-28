import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { fireDb } from "../utils/firebaseConfig";

export const createUserInDatabase = async ({
  name,
  lastName,
  email,
  password,
}) => {
  try {
    const auth = getAuth();
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    const newUser = {
      uid: user.uid,
      name,
      lastName,
      email,
      role: 1,
    };

    await setDoc(doc(fireDb, "users", user.uid), newUser);
    return newUser;
  } catch (e) {
    return { error: e.message };
  }
};

export const loginUserInDatabase = async ({ email, password }) => {
  try {
    const auth = getAuth();
    const res = await signInWithEmailAndPassword(auth, email, password);
    const { user } = res;
    const userDocRef = doc(fireDb, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("User not found in database");
    }
  } catch (e) {
    return { error: e.message };
  }
};

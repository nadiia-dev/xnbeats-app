import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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

export const autoSignInDatabase = () => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();

      if (user) {
        try {
          const userDocRef = doc(fireDb, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            resolve(docSnap.data());
          } else {
            reject(new Error("User data not found"));
          }
        } catch (e) {
          reject(new Error(e.message));
        }
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  });
};

export const logoutUserFromDatabse = async () => {
  const auth = getAuth();
  await signOut(auth);
};

export const reAuthUser = async ({ email, password }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user is currently signed in");
  }

  const credential = EmailAuthProvider.credential(email, password);

  try {
    await reauthenticateWithCredential(user, credential);
  } catch (error) {
    throw new Error(error.message || "Re-authentication failed");
  }
};

export const updateUserProfile = async (data) => {
  const docRef = doc(fireDb, "users", data.uid);

  try {
    await updateDoc(docRef, data);
    const snapshot = await getDoc(docRef);
    return { user: snapshot.data() };
  } catch (error) {
    throw new Error("Failed to update document: " + error.message);
  }
};

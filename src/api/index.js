import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where as whereFn,
  limit as limitFn,
} from "firebase/firestore";
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

export const addReviewToDatabase = async (data, user) => {
  try {
    const docRef = await addDoc(collection(fireDb, "reviews"), {
      ...data,
      createdAt: serverTimestamp(),
      ownerData: {
        ownerid: user.uid,
        name: `${user.name} ${user.lastName}`,
      },
    });

    return docRef.id;
  } catch (error) {
    console.error("Failed to add review:", error);
    throw new Error("Could not add review");
  }
};

export const addImageToReview = async (reviewId, imageUrl) => {
  const reviewRef = doc(fireDb, "reviews", reviewId);
  await updateDoc(reviewRef, {
    imageUrl,
  });
};

export const getAllReviewsFromDatabase = async () => {
  try {
    const snapshot = await getDocs(collection(fireDb, "reviews"));

    const reviews = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    });
    return reviews;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    throw new Error("Could not fetch reviews");
  }
};

export const getReviewFromDatabase = async (id) => {
  try {
    const docRef = doc(fireDb, "reviews", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate().toISOString(),
      };
    } else {
      throw new Error("No such document");
    }
  } catch (error) {
    console.error("Failed to fetch review:", error);
    throw new Error("Could not fetch review");
  }
};

export const updateReviewInDatabase = async (id, reviewData) => {
  try {
    const docRef = doc(fireDb, "reviews", id);
    await updateDoc(docRef, reviewData);

    console.log("Review updated successfully");
    const docSnap = await getDoc(docRef);
    const updatedData = docSnap.data();
    return updatedData;
  } catch (error) {
    console.error("Error updating review:", error);
  }
};

export const fetchPostsFromDatabase = async ({ limit, where } = {}) => {
  try {
    const baseRef = collection(fireDb, "reviews");
    let q = query(baseRef, whereFn("public", "==", "public"));

    if (where) {
      q = query(q, whereFn(where[0], where[1], where[2]));
    } else {
      q = query(q, orderBy("createdAt"));
    }

    q = query(q, limitFn(limit));

    const snapshot = await getDocs(q);

    const posts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const addMessageToDatabase = async (data) => {
  try {
    const docRef = await addDoc(collection(fireDb, "messages"), {
      ...data,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Failed to add review:", error);
    throw new Error("Could not add review");
  }
};

export const getAllMessagessFromDatabase = async () => {
  try {
    const snapshot = await getDocs(collection(fireDb, "messages"));

    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    });
    return messages;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    throw new Error("Could not fetch messages");
  }
};

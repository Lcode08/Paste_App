// src/utils/firestore.js
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const addFeedback = async (type, data) => {
  try {
    await addDoc(collection(db, type), data);
  } catch (e) {
    console.error(`Error adding ${type}: `, e);
  }
};

const getFeedback = async (type) => {
  const snapshot = await getDocs(collection(db, type));
  return snapshot.docs.map(doc => doc.data());
};

const clearFeedback = async (type) => {
  const snapshot = await getDocs(collection(db, type));
  snapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

export { addFeedback, getFeedback, clearFeedback };
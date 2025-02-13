import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { addDoc, collection, doc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const initialState = {
  pastes: []
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    setPastes: (state, action) => {
      state.pastes = action.payload;
    },
    addToPastes: (state, action) => {
      state.pastes.push(action.payload);
      toast.success("Paste created successfully!");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
      }
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      state.pastes = state.pastes.filter((item) => item._id !== pasteId);
      toast.success("Paste deleted");
    },
  },
});

export const { setPastes, addToPastes, updateToPastes, removeFromPastes } = pasteSlice.actions;

export const fetchPastes = () => async (dispatch) => {
  const querySnapshot = await getDocs(collection(db, "pastes"));
  const pastes = querySnapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id }));
  dispatch(setPastes(pastes));
};

export const createNewPaste = (paste) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "pastes"), paste);
    dispatch(addToPastes({ ...paste, _id: docRef.id }));
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    toast.error("Error creating paste.");
  }
};

export const updatePaste = (paste) => async (dispatch) => {
  const docRef = doc(db, "pastes", paste._id);
  await updateDoc(docRef, paste);
  dispatch(updateToPastes(paste));
};

export const deletePaste = (pasteId) => async (dispatch) => {
  const docRef = doc(db, "pastes", pasteId);
  await deleteDoc(docRef);
  dispatch(removeFromPastes(pasteId));
  dispatch(fetchPastes());
};

export default pasteSlice.reducer;

"use client"

import React, { createContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/auth'
import { collection, onSnapshot, doc } from "firebase/firestore";
import Loading from '../components/loading/page';

import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from '../firebase/firebase.config';
import { getFirestore} from "firebase/firestore";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userID, setUserID] = useState(null);
  const [pending, setPending] = useState(true);
  const [userData, setUserData] = useState({});
  const app = initializeApp(getFirebaseConfig());
  const db = getFirestore(app);

  const usersRef = collection(db, 'users');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
        setUserID(currentUser.uid);
        onSnapshot(doc(usersRef, currentUser.uid), (doc) => {
          let data = doc.data();
          setTimeout(() => {
            setPending(false);
          }, 200);
          setUserData((u) => ({
            ...u,
            name: data.name
          })); 
        }, (err) => console.log(err)
        );
      } else {
        setTimeout(() => {
          setPending(false);
        }, 200);
      }
    });

  },[])

    if(pending) {
      <div>
        <Loading />
      </div>
    }


 const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
}
  
  const signout = async () => {
    return await signOut(auth)
  }

  return (
    <UserContext.Provider value={{ signIn, signout, currentUser, userName: userData.name}}>
      {children}
    </UserContext.Provider>
  );
};
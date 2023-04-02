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
import ProfileImg from '../../public/blank.png'

import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from '../firebase/firebase.config';
import { getFirestore} from "firebase/firestore";
import { getStorage, getDownloadURL, ref} from "firebase/storage"


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const app = initializeApp(getFirebaseConfig());
  const db = getFirestore(app);
  const storage = getStorage(app)

  const [currentUser, setCurrentUser] = useState(null)
  const [userID, setUserID] = useState(null);
  const [pending, setPending] = useState(true);
  const [userData, setUserData] = useState({});


  const usersRef = collection(db, 'users');
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
        setUserID(currentUser.uid);
        onSnapshot(doc(usersRef, currentUser.uid), (doc) => {
          let data = doc.data();
          console.log(data)
          setTimeout(() => {
            setPending(false);
          }, 200);
          setUserData((u) => ({
            ...u,
            name: data.name,
            followers: data.followers || [],
            bio: data.bio || "",
            follows: data.follows || [],
            watched: data.watched || [],
            goingToWatch: data.goingToWatch || [],
          })); 

        }, (err) => console.log(err)
        );

        
        const storageAvatarRef = ref(storage,"avatars/" + currentUser.uid + ".png");

        getDownloadURL(storageAvatarRef)
          .then((url) => {
            setUserData((u) => ({ ...u, image: url }));
          })
          .catch(() => {
            console.log("set image again");
            setUserData((u) => ({ ...u, image: ProfileImg }));
          });



      } else {
        setTimeout(() => {
          setPending(false);
        }, 200);
      }
    });

  },[])

  console.log(userData)

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
    <UserContext.Provider value={{ 
                                signIn, 
                                signout, 
                                userID, 
                                currentUser, 
                                userName: userData.name,
                                userImage: userData.image,
                                userFollows: userData.follows,
                                userBio: userData.bio,
                                userFollowers: userData.followers, 
                                db,
                                storage
                                }}>
      {children}
    </UserContext.Provider>
  );
};
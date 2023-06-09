"use client"
import { addDoc, getDocs, query, collection, where, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/index'
import { toast } from 'react-toastify';

async function addToWatchlist({userID, userToWatch, userAt, userName, movieID, title}) {
  
    const mediaRef = collection(db, 'watchlist');
    const userRef = doc(db, 'users', userID);
    const userWRef = collection(db, "users");


/*
    const querySnapshot = await getDocs(query(userWRef, where("goingToWatch", "array-contains", movieID)));
    if (!querySnapshot.empty) {
        toast.error('Movie already added!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        return;
    }
*/

    addDoc(mediaRef, {
        name: userName,
        at: userAt,
        userID: userID,
        movieID: movieID,
        title: title || '',
        timeStamp: new Date(),
    }).then((newMedia) => {
        updateDoc(userRef, {
            goingToWatch: [...userToWatch, newMedia.id] 
        });
         toast.success('Added to profile!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }).catch((error) => {
        console.error(error);
        toast.error('Failed to add movie');
    });
}

export default addToWatchlist




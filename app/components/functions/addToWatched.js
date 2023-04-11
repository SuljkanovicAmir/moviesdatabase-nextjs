"use client"

import { addDoc, getDocs, query, collection, where, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/index'
import { toast } from 'react-toastify';

async function addToWatched({userID, userWatched, userAt, userName, movieID, ratingInput, reviewInput}) {
  
    const mediaRef = collection(db, 'watched');
    const userRef = doc(db, 'users', userID);

    const querySnapshot = await getDocs(query(mediaRef, where('movieID', '==', movieID), where('movieID', '==', movieID)));
    if (!querySnapshot.empty) {
        toast.error('Movie already added!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        return;
    }

    console.log(userWatched, userAt, userName, movieID, ratingInput, reviewInput)

    addDoc(mediaRef, {
        name: userName,
        rating: ratingInput,
        review: reviewInput,
        at: userAt,
        userID: userID,
        movieID: movieID
    }).then((newMedia) => {
        updateDoc(userRef, {
            watched: [...userWatched, newMedia.id] 
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

export default addToWatched




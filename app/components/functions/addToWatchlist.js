
import { addDoc, getDocs, query, collection, where, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/index'

async function addToWatchlist({userID, userToWatch, userAt, userName, movieID}) {
  
    const mediaRef = collection(db, 'watchlist');
    const userRef = doc(db, 'users', userID);

    const querySnapshot = await getDocs(query(mediaRef, where('movieID', '==', movieID), where('movieID', '==', movieID)));
    if (!querySnapshot.empty) {
        console.log('Movie already added!');
        return;
    }


    addDoc(mediaRef, {
        name: userName,
        at: userAt,
        userID: userID,
        movieID: movieID
    }).then((newMedia) => {
        updateDoc(userRef, {
            goingToWatch: [...userToWatch, newMedia.id] 
        });
    });
}

export default addToWatchlist




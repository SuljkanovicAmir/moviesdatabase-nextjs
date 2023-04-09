
import { addDoc, getDocs, query, collection, where, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/index'

async function addToWatched({userID, userWatched, userAt, userName, movieID, ratingInput, reviewInput}) {
  
    const mediaRef = collection(db, 'watched');
    const userRef = doc(db, 'users', userID);

    const querySnapshot = await getDocs(query(mediaRef, where('movieID', '==', movieID), where('movieID', '==', movieID)));
    if (!querySnapshot.empty) {
        <div>Movie already Added </div>
        return;
    }


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
    });
}

export default addToWatched




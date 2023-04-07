
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/index'

async function addToWatchlist({userID, userToWatch, userAt, userName, movieID}) {
  
    const mediaRef = collection(db, 'media');
    const userRef = doc(db, 'users', userID);

    console.log(userID, userToWatch, userAt, userName)

    addDoc(mediaRef, {
        name: userName,
        rating: '5',
        review: 'great',
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



    /*
    const newList = [...userWatchList, mediaID];

    const docSnap = await getDoc(mediaRef);
    const data = docSnap.data();

    console.log(data)
    let toWatch = docSnap.data().goingToWatch;

    const newToWatch = [...(toWatch || []), userID]
    
    updateDoc(mediaRef, {toWatch: newToWatch})
    
    updateDoc(userRef, {toWatch: newList})

    */
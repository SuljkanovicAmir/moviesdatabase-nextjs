import {
    doc,
    deleteDoc,
    collection,
    updateDoc,
    where,
    query,
    onSnapshot,
    getDoc,
  } from "firebase/firestore";
  import { db} from "../../firebase/index";
  

  async function deleteContent(deletedContent, userContent, userID) {
    const userRef = doc(db, "users", userID);
  
    const newList = userContent.filter((content) => content !== deletedContent);
    await updateDoc(userRef, { goingToWatch: newList });
  
    await deleteDoc(doc(db, "watchlist", deletedContent));
  
}

export default deleteContent
"use client"

import React, {useEffect, useState, useContext} from 'react'
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import dynamic from 'next/dynamic';
import Loading from '../../components/Loading';
import { UserContext } from '@/app/context/UserContext';
import Feed from './Feed';




function ProfileFeed(props) {

    const { db } = useContext(UserContext);
    const { profileID, image, at, activeTab } = props;
    const [ watchlistData, setWatchlistData] = useState([]);
    const [watchedData, setWatchedData] = useState([]);

    const watchedRef = collection(db, 'watched');
    const watchlistRef = collection(db, 'watchlist');
   


useEffect(() =>{

    const q = query(watchlistRef,  where("userID", "==", profileID), orderBy("timeStamp", "desc"));
  
    const unsub = onSnapshot(q, (querySnapshot) => {
        let tempArray = [];
        let deletionArray = [];
    

        querySnapshot.docChanges().forEach((change) => {
            const doc = change.doc;
            if (change.type === "removed") {
                deletionArray.push(doc.id);
            }
        })

        querySnapshot.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        })
        console.log(watchlistData)

        setWatchlistData(tempArray.filter((doc) => !deletionArray.includes(doc.id)));
    })
    
    return () => {
        unsub();
    };
   
}, [profileID])



useEffect(() =>{

    const q = query(watchedRef,  where("userID", "==", profileID), orderBy("timeStamp", "desc"));

    const unsub = onSnapshot(q, (querySnapshot) => {
        let tempArray = [];
        querySnapshot.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        })
        setWatchedData(tempArray);
    })
    
    console.log(watchedData)
    return () => {
        unsub();
    };
   
}, [profileID])


    return (
       <Feed watchedData={watchedData} watchlistData={watchlistData} image={image} at={at} activeTab={activeTab}/>
    )
}

export default ProfileFeed

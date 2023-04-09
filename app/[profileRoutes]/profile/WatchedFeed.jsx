"use client"

import React, {useEffect, useState} from 'react'
import { db } from "../../firebase/index";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Feed from './Feed';


function WatchedFeed(props) {

    const { profileID, image, at } = props;

    const [watchedData, setWatchedData] = useState([]);
    const mediaRef = collection(db, 'watched');


useEffect(() =>{

    const q = query(mediaRef,  where("userID", "==", profileID));

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
        <>
            {watchedData.length ? <Feed watchedData={watchedData} image={image} at={at}/> : <></>}
        </>
    )
}

export default WatchedFeed


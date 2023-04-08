"use client"

import React, {useEffect, useState} from 'react'
import { db } from "../firebase/index";
import Feed from './reusables/Feed';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";


function WatchlistFeed(props) {

    const { profileID, image, at } = props;

    const [ watchlistData, setWatchlistData] = useState([]);
    const mediaRef = collection(db, 'watchlist');


useEffect(() =>{

    const q = query(mediaRef,  where("userID", "==", profileID));

    const unsub = onSnapshot(q, (querySnapshot) => {
        let tempArray = [];
        querySnapshot.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        })
        setWatchlistData(tempArray);
    })

    console.log(watchlistData)
    
    return () => {
        unsub();
    };
   
}, [profileID])


    return (
        <>
            {watchlistData.length ? <Feed watchlistData={watchlistData} image={image} at={at}/> : <></>}
        </>
    )
}

export default WatchlistFeed


"use client"

import React, {useEffect, useState} from 'react'
import { db } from "../firebase/index";
import Feed from './reusables/Feed';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";


function ProfileFeed(props) {

    const { profileID } = props;

    const [watchedData, setWatchedData] = useState([]);
    const mediaRef = collection(db, 'media');


useEffect(() =>{

    const q = query(mediaRef,  where("userID", "==", profileID));

    const unsub = onSnapshot(q, (querySnapshot) => {
        let tempArray = [];
        querySnapshot.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        })
        setWatchedData(tempArray);
    })
    
   
    return () => {
        unsub();
    };
   
}, [profileID])


    return (
        <>
            {watchedData.length ? <Feed watchedData={watchedData}/> : <></>}
        </>
    )
}

export default ProfileFeed


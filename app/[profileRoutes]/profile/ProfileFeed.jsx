"use client"

import React, {useEffect, useState} from 'react'
import { db } from "../../firebase/index";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import dynamic from 'next/dynamic';
import Loading from '../../components/Loading';




function ProfileFeed(props) {

    const { profileID, image, at, activeTab } = props;
    const [ watchlistData, setWatchlistData] = useState([]);
    const [watchedData, setWatchedData] = useState([]);
    const watchedRef = collection(db, 'watched');
    const watchlistRef = collection(db, 'watchlist');


useEffect(() =>{

    const q = query(watchlistRef,  where("userID", "==", profileID));

    const unsub = onSnapshot(q, (querySnapshot) => {
        let tempArray = [];
        querySnapshot.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        })
        console.log(watchlistData)
        setWatchlistData(tempArray);
    })
    
    return () => {
        unsub();
    };
   
}, [profileID])



useEffect(() =>{

    const q = query(watchedRef,  where("userID", "==", profileID));

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
       <div>
        hi
       </div>
    )
}

export default ProfileFeed

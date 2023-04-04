"use client"

import { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot, query, where,  collection } from "firebase/firestore";
import { UserContext } from '../context/UserContext';
import Loading from '../components/loading/page';
import Profile from './profile/page'



export default function ProfileRoutes ({ params }) {

    const { profileRoutes } = params

    const { userName, userID, db, userAt, userImage} = useContext(UserContext);
    
    const [userProfile, setUserProfile] = useState(null);
    const [profileID, setProfileID] = useState(null);
    const usersRef = collection(db, 'users');

    const q = query(usersRef, where("at", "==", profileRoutes));

   
useEffect(() => {
    if (userAt === profileRoutes) {
        setProfileID(userID);
        setUserProfile(true);
    } else {
        setUserProfile(false);
        onSnapshot(q, (querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
                if (doc) {
                    setProfileID(doc.id);
                } else {
                    setProfileID(404);
                }
            });
        });
}
}, [profileRoutes, userID, userName]);



    return (
        <div className="">
        {profileID ? (
            profileID !== 404 ? (
                <Profile    
                        profileID={profileID}   
                        userProfile={userProfile} />
            ) : (

                <p>Not found</p>
            )
        ) : (
            <Loading />
        )}
    </div>
    );
}
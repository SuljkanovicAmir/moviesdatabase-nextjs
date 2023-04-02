"use client"

import { useState, useEffect, useContext } from 'react';
import ProfileImg from '../../../public/blank.png'
import { UserContext } from '../../context/UserContext';
import Image from 'next/image';
import { doc, onSnapshot, collection } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';


export default function Profile ({userProfile, profileID}) {

    const { userName, userImage, userBio, userID, db, storage, userFollowers, userFollows } = useContext(UserContext);
    const [profileData, setProfileData] = useState({ follows: [],
        followers: [],
      });
  
    const [isActiveEdit, setEditActive] = useState(false);
    const [previewAvatar, setPreviewAvatar] = useState(userImage);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [followed, setFollowed] = useState(false);
    const usersRef = collection(db, 'users');


    useEffect(() => {
      const storageAvatarRef = ref(storage, "avatars/" + profileID + '.png')
  

      userProfile 
        ?
           setProfileData((prevData) => ({ ...prevData, image: userImage }))
        :
         getDownloadURL(storageAvatarRef).then((url) => {
            setProfileData((prevData) => ({ ...prevData, image: url }))
          })
          .catch((e) => {
            console.log(e);
            setProfileData((prevData) => ({ ...prevData, image: ProfileImg }));
      });
        
           
    }, [profileID, userImage, userProfile]);
  
    console.log(userProfile)


    useEffect(() => {
        setProfileData((n) => ({ ...n, follows: [], followers: [] }));
    
        userProfile 
        ?
            setProfileData((n) => ({
              ...n,
              name: userName,
              follows: userFollows || [],
              followers: userFollowers || [],
              bio: userBio,
              id: userID,
              image: userImage,
            }))
          :
              onSnapshot(doc(usersRef, profileID), (doc) => {
              let data = doc.data();
                console.log(data)
              setProfileData((prevData) => ({
                ...prevData,
                name: data.name,
                follows: data.follows || [],
                bio: data.bio,
                followers: data.followers || [],
                id: doc.id,
              }));
            });
          
      }, [
        userProfile,
        profileID,
        userImage,
        userBio,
        userID,
        userName,
        userFollowers,
        userFollows,
      ]);
    

  useEffect(() => {
		if (userID && userFollows) {
			!userProfile && setFollowed(userFollows.includes(profileID));
		}
	}, [userProfile, userFollows, profileID, userID]);


  const imageLoad = () => {
		setImageLoaded(true);
	};




    return (
        <>
        <div className='profile-div'>
                       <div className="profile-header">
                           <div>
                               <div className={`profile-header-image-div ${!imageLoaded ? "transparent" : ""}`} onLoad={imageLoad}>
                                   <Image src={profileData.image} quality={100} priority alt='profilepic'  width={500} height={500}/>
                               </div>
                               <p>{profileData.name}</p>
                               {userProfile ? (
                               <button onClick={() => setEditActive(true)}>
                                  Edit Profile
                                </button>
                               ) : userID && (
                                <button>Follow</button>
                               )
                            }
                           </div>
                       </div>
                       <div className='profile-main'>
                           <div className='profile-nav'>
                               <div>
                                   Watched
                               </div>
                               <div>
                                   Watchlist
                               </div>
                           </div>
           
                       </div>
                   </div>
    </>
    );
}
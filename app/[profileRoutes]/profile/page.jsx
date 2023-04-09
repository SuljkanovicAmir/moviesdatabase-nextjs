"use client";

import { useState, useEffect, useContext } from "react";
import ProfileImg from "../../../public/blank.png";
import { UserContext } from "../../context/UserContext";
import Image from "next/image";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import Editor from "../../components/reusables/Edtior";
import Loading from "@/app/components/Loading";
import dynamic from "next/dynamic";

const WatchedFeed = dynamic(() => import("@/app/components/WatchlistFeed"), {
  loading: () => <Loading />,
  ssr: false,
});


const WatchlistFeed = dynamic(() => import("@/app/components/WatchlistFeed"), {
  loading: () => <Loading />,
  ssr: false,
});



export default function Profile({ userProfile, profileID }) {
  const {
    userName,
    userImage,
    userBio,
    userAt,
    userID,
    db,
    storage,
    userFollowers,
    userFollows,
  } = useContext(UserContext);

  const [isActiveEdit, setEditActive] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [followed, setFollowed] = useState(false);

  const [activeTab, setActiveTab] = useState('watched');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const usersRef = collection(db, "users");

  const [profileData, setProfileData] = useState({
    follows: [],
    followers: [],
  });

  useEffect(() => {
    const storageAvatarRef = ref(storage, "avatars/" + profileID + ".png");

    userProfile
      ? setProfileData((prevData) => ({ ...prevData, image: userImage }))
      : getDownloadURL(storageAvatarRef)
          .then((url) => {
            setProfileData((prevData) => ({ ...prevData, image: url }));
          })
          .catch((e) => {
            console.log(e);
            setProfileData((prevData) => ({ ...prevData, image: ProfileImg }));
          });
  }, [profileID, userImage, userProfile]);

  useEffect(() => {
    setProfileData((n) => ({ ...n, follows: [], followers: [] }));

    userProfile
      ? setProfileData((n) => ({
          ...n,
          at: userAt,
          name: userName,
          follows: userFollows || [],
          followers: userFollowers || [],
          bio: userBio,
          id: userID,
          image: userImage,
        }))
      : onSnapshot(doc(usersRef, profileID), (doc) => {
          let data = doc.data();
          setProfileData((prevData) => ({
            ...prevData,
            name: data.name,
            at: data.at,
            follows: data.follows || [],
            bio: data.bio,
            followers: data.followers || [],
            id: doc.id,
          }));
        });
  }, [
    profileID,
    userAt,
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
      <div className="profile-div">
        <div className="profile-header">
          <div>
            <div
              className={`profile-header-image-div ${
                !imageLoaded ? "" : "transparent"
              }`}
              onLoad={imageLoad}
            >
              <div
                className="avatar"
                style={{ backgroundImage: `url(${profileData.image})` }}
              ></div>
            </div>
            <p>{profileData.name}</p>
            <p className="bio">{profileData.bio}</p>
            {!userProfile && !userID && (
              <button>
                <Link href="/signin">Follow</Link>
              </button>
            )}
            {userProfile ? (
              <>
                <button onClick={() => setEditActive(true)}>
                  Edit Profile
                </button>
                <Editor
                  isActiveEdit={isActiveEdit}
                  setEditActive={setEditActive}
                />
              </>
            ) : (
              userID && <button>Follow</button>
            )}
          </div>
        </div>
        <div className="profile-main">
          <div className="profile-nav">
            <div
              className={
                activeTab === "watched" ? " watched active-tab" : "watched"
              }
              onClick={() => handleTabClick("watched")}
            >
              Watched
            </div>
            <div
              className={
                activeTab === "watchlist" ? "watchlist active-tab" : "watchlist"
              }
              onClick={() => handleTabClick("watchlist")}
            >
              Watchlist
            </div>
          </div>
          <div>
            {activeTab === "watched" && (
              <WatchedFeed
                image={profileData.image}
                at={profileData.at}
                profileID={profileID}
              />
            )}
            {activeTab === "watchlist" && (
              <WatchlistFeed
                image={profileData.image}
                at={profileData.at}
                profileID={profileID}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

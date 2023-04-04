"use client"
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import resizeFile from '../functions/resizeFile';
import {updateDoc, doc } from "firebase/firestore";
import { uploadBytes, ref } from 'firebase/storage';
import Close from '../../../public/close.svg'
import CameraIcon from '../../../public/camera.svg'
import Image from 'next/image';

export default function({isActiveEdit, setEditActive}) {

    const { userName, userImage, userBio, userID, currentUser, db, storage, userFollowers, userFollows } = useContext(UserContext);
    
    const [updateName, setUpdateName] = useState(userName)
    const [updateBio, setUpdateBio] = useState(userBio)
    const [updateAvatar, setUpdateAvatar] = useState(userImage)
    const [showAvatar, setShowAvatar] = useState(null)
    const userRef = doc(db, 'users', userID);
    const [previewAvatar, setPreviewAvatar] = useState(userImage);

    useEffect(() => {
		if (showAvatar) {
			setPreviewAvatar(URL.createObjectURL(updateAvatar));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showAvatar]);

    console.log(previewAvatar)


  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(currentUser) {
       updateDoc(userRef, {
        name: updateName || "", 
        bio: updateBio || "", 
    });
    if (updateAvatar !== userImage) {
        const storagAvatareRef = ref(storage, ("avatars/" + userID + '.png'))
        uploadBytes(storagAvatareRef, updateAvatar)
      }
    setEditActive(false);
}}



const handleAvatarChange = async (e) => {
    if (e.target.files[0]) {
        const file = e.target.files[0];
        const blob = await resizeFile(file, 133, 133);
        setShowAvatar(blob)
        setUpdateAvatar(blob);
    } else {
        console.log("Fail");
    }
};


    return (
        <>
        <div className={isActiveEdit ? 'modal-div active' : 'modal-div'}>
        <div onClick={() => setEditActive(false)}className={isActiveEdit ? 'edit-backdrop active' : 'edit-backdrop' }></div>
            <div className='modal'>
                <div className="modal-header ">
                    <Image src={Close} className="close-icon" onClick={() => setEditActive(false)} alt='close-img' width={400} height={400}/>
                    <h2>Edit profile</h2>
                    <button onClick={(e) => handleSubmit(e)}>Save</button>
                </div>
                <div className="modal-body">    
                    <div className='change-profile-img pi-avatar-edit'>
                      <div className='pi-avatar' style={{backgroundImage: `url(${previewAvatar})`}}>
                        <label className='avatar-input-label' htmlFor="avatar-input">
                          <Image src={CameraIcon} alt="changeAvatar" width={400} height={400}/>
                        </label>
                        <input
                          id="avatar-input"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </div>
                    </div>
                    <div className='change-name'>
                      <input type='text' maxLength={20} onChange={(e) => setUpdateName(e.target.value)} defaultValue={userName}/>
                    </div>
                    <div className='change-bio'>
                      <input type='text' maxLength={42} placeholder='Bio' onChange={(e) => setUpdateBio(e.target.value)} defaultValue={userBio} />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
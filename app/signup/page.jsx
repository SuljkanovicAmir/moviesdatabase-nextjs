"use client"

import React from "react";
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/auth'
import { setDoc, doc} from "firebase/firestore";
import Camera from '../../public/camera.svg'
import { uploadBytes, ref } from 'firebase/storage';
import resizeFile from "../components/functions/resizeFile";
import Image from "next/image";
import { UserContext } from '../context/UserContext';

export default function SignUp() {

    const { db, storage} = useContext(UserContext);

    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [name, setName] = useState('')
	const [image, setImage] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(image);
    const router = useRouter();

    useEffect(() => {
        if(image) {
            	setPreviewAvatar(URL.createObjectURL(image));
        }
	

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image]);


    const handleSignUp = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((cred) => {
            setDoc(doc(db, 'users', cred.user.uid), {
                name: name,
                watched: [],
                goingToWatch: [],
                follows: [cred.user.uid],
                followers: [cred.user.uid],
                joinDate: new Date(),
            })
            if(image) {
                const storageAvatarRef = ref(storage, "avatars/" + cred.user.uid + '.png')
                console.log(image)
                uploadBytes(storageAvatarRef, image)
            }
            }).then(() => {
                router.push('/')
            });
    };

    const handleFileChange = async (e) => {
		if (e.target.files[0]) {
			const file = e.target.files[0];
			const blob = await resizeFile(file, 135, 135);
            console.log(blob)
			setImage(blob);
		} else {
			console.log("set image fail");
		}
	};

    console.log(image)

    return (
        <div className="sign-in-page">
              <h1 className='sign-title'> Create your account </h1>
                <div className='sign-in-div'>
                    <div className='pi-avatar' style={{backgroundImage: `url(${previewAvatar})`}}>
                        <label className='avatar-input-label' htmlFor="avatar-input">
                            <Image src={Camera} alt="changeAvatar" width={500} height={500}/>
                        </label>
                        <input
                            id="avatar-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <input type="text" autocomplete="off" required placeholder='Username' onChange={(e) => setName(e.target.value)} />
                    <input type="text" autocomplete="off" placeholder='Email' onChange={(e) => setRegisterEmail(e.target.value)}/>
                    <input type="password" autoComplete="new-password" placeholder='Password' onChange={(e) => setRegisterPassword(e.target.value)}/>
                    <div className='sign-in-btn-div'>
                        <button className='signup-btn'  onClick={(e) => handleSignUp(e)}>Sign up</button>
                    </div>
                    <div className='no-acc-div'>
                        Have an account already?
                        <span role='button' onClick={() => router.push('/signin')}> Sign in</span>
                    </div>
                </div>
               
        </div>
    );
}
"use client"

import React from "react";
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/auth'
import { setDoc, doc, updateDoc} from "firebase/firestore";
import Camera from '../../public/camera.svg'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import resizeFile from "../components/functions/resizeFile";
import Image from "next/image";
import { UserContext } from '../context/UserContext';
import validateSignupForm from "../components/functions/validateSignupForm";

export default function SignUp() {

    const { db, storage} = useContext(UserContext);
    const [userAt, setUserAt] = useState("");
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [name, setName] = useState('')
	const [image, setImage] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(image);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if(image) {
            setPreviewAvatar(URL.createObjectURL(image));
        } else {
            setPreviewAvatar(null);
        }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image]);


    const handleSignUp = (e) => {
        e.preventDefault()
        const validationErrors = validateSignupForm(userAt, name, registerEmail, image, registerPassword);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
          // submit the form
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((cred) => {
            setDoc(doc(db, 'users', cred.user.uid), {
                name: name,
                at: userAt,
                watched: [],
                goingToWatch: [],
                follows: [cred.user.uid],
                followers: [cred.user.uid],
                joinDate: new Date(),
            })
            if(image) {
                const storagAvatarRef = ref(storage, `avatars/${cred.user.uid}.png`);
                const userRef = doc(db, 'users', cred.user.uid);

                uploadBytes(storagAvatarRef, image).then(() => {
                    getDownloadURL(storagAvatarRef).then((downloadURL) => {
                    updateDoc(userRef, {
                        image: downloadURL
                    });
                });
                });
            }
            }).then(() => {
                setImage(null);
                router.push('/')
            });
        }
    };

    const handleFileChange = async (e) => {
		if (e.target.files[0]) {
			const file = e.target.files[0];
			const blob = await resizeFile(file, 135, 135);
			setImage(blob);
		} else {
			console.log("set image fail");
		}
	};


    return (
        <div className="sign-in-page">
              <h1 className='sign-title'> Create your account </h1>
                <div className='sign-in-div'>
                    {errors.image && <div className="error">{errors.image}</div>}
                    <div className='pi-avatar' style={{backgroundImage: `url(${previewAvatar})`}}>
                        <label className='avatar-input-label' htmlFor="avatar-input">
                            <Image src={Camera} alt="changeAvatar" width={500} height={500}/>
                        </label>
                        <input
                            id="avatar-input"
                            required
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <input type="text" value={userAt} autoComplete="off" required placeholder='At' onChange={(e) => setUserAt(e.target.value)} />
                    {errors.userAt && <div className="error">{errors.userAt}</div>}
                    <input type="text" value={name} autoComplete="off" required placeholder='Name' onChange={(e) => setName(e.target.value)} />
                    {errors.name && <div className="error">{errors.name}</div>}
                    <input type="text"  value={registerEmail} autoComplete="off" required placeholder='Email' onChange={(e) => setRegisterEmail(e.target.value)}/>
                    {errors.registerEmail && <div className="error">{errors.registerEmail}</div>}
                    <input type="password" value={registerPassword} autoComplete="off" required placeholder='Password' onChange={(e) => setRegisterPassword(e.target.value)}/>
                    {errors.registerPassword && <div className="error">{errors.registerPassword}</div>}
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
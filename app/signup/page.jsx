"use client"

import React from "react";
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase/index'
import { auth } from '../firebase/auth'
import { setDoc, doc} from "firebase/firestore";


export default function SignUp() {

    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [name, setName] = useState('')

    const router = useRouter();

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
            .then(() => {
                router.push('/')
            });
            })
    };



    return (
        <div className="sign-in-page">
              <h1 className='sign-title'> Create your account </h1>
                <div className='signup-name-email'>
                    <input type="text" required placeholder='Username' onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder='Email' onChange={(e) => setRegisterEmail(e.target.value)}/>
                    <input type="password" placeholder='Password' onChange={(e) => setRegisterPassword(e.target.value)}/>
                </div>
                <button className='signup-btn'  onClick={(e) => handleSignUp(e)}>Sign up</button>
        </div>
    );
}
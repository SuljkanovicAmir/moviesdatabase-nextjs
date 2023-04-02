"use client"

import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation';
import { UserContext } from '../context/UserContext';

export default function SignIn() {

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const { signIn } = useContext(UserContext);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
           signIn(loginEmail, loginPassword )
           router.push('/')
        } catch (err) {
          console.log(err);
        }
    };


    return (
        <div className="sign-in-page">
            <h1 className='sign-title'>Sign In</h1>
            <div className='sign-in-div'>
                <input type="text" placeholder='Email'  onChange={(e) => setLoginEmail(e.target.value)}  />
                <input type="password" placeholder='Password'  onChange={(e) => setLoginPassword(e.target.value)}  />
                <div className='sign-in-btn-div'>
                    <button className='next-btn' onClick={(e) => handleLogin(e)} >Sign In</button>
                    <span>Forgot Password?</span>
                </div>
                <div className='no-acc-div'>
                    Don't have an account? 
                    <span role='button' onClick={() => router.push('/signup')}> Sign up</span>
                </div>
            </div>
            
        </div>
    );
}
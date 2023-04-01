"use client"

import { useState, useEffect, useContext } from 'react';
import ProfileImg from '../../public/profile.jpg'
import { UserContext } from '../context/UserContext';
import Image from 'next/image';
import Loading from '../components/loading/page';



export default function() {

    const { signout, userName } = useContext(UserContext);
    
    return (
        <>
        {!userName ? (
         <Loading />
         )
        : (
        <div className='profile-div'>
            <div className="profile-header">
                <div>
                    <div className='profile-header-image-div'>
                        <Image src={ProfileImg} quality={100} priority alt='profilepic'  width={500} height={500}/>
                    </div>
                    <p>{userName}</p>
                    <button>Edit Profile</button>
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
        )
        }
        </>
    );
}
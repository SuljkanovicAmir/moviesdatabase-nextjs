"use client"
import { useState, useEffect, useContext } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/logo.png'
import SearchIcon from '../../../public/search.svg'
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/navigation';



export default function Header() {
  
  const router = useRouter();
  const [isActive, setIsActive] = useState(false)
  const { signout, userName, userImage } = useContext(UserContext);

  const handleDropdown = () => {
    setIsActive(prev => !prev)
  }

  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      signout()
      window.location.reload()
      router.push('/')
    } catch (err) {
      console.log(err);
    }
};

console.log(userImage)


      return (
          <header>
              <nav>
                <ul>
                  <li>
                    <Link href="/">
                      <Image className="logo-img" priority src={Logo} alt='logo' width={500} height={500}/>
                    </Link>
                  </li>
                  <li className='nav-movies'>
                      <Link href="/movies-page">
                       Movies
                      </Link>
                    </li>
                    <li>
                      <Link href="/alltv">
                       TV Shows
                      </Link>
                    </li>
                    <li>
                      <Link href="/search" className='search'>
                        <Image className="search-img" priority src={SearchIcon} alt='logo' width={500} height={500}/>
                      </Link>
                    </li>
                      {userName ?
                      <>
                      <li className='profile-icon-div'>
                        <div onClick={handleDropdown} className='profile-nav-image'>
                            <Image src={userImage} alt='profilepic'  width={100} height={100}/>
                        </div>
                        <div className={isActive ? 'profile-dropdown': 'profile-dropdown hidden'}>
                          <ul>
                            <li>
                            <Link onClick={handleDropdown} href={`/${userName}`}>
                              Profile
                            </Link>
                            </li>
                            <li>Settings</li>
                            <span></span>
                            <li onClick={e => handleSignOut(e)}>Sign Out</li>
                          </ul>
                        </div>
                      </li>
                      </>
                      : 
                      <li className='sign-in-btn'>
                        <Link href="/signin">
                          Sign In
                        </Link>
                       </li>
                      }
                  </ul>
                </nav>
          </header>
          )
        
              
}
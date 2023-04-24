"use client"
import { useState, useEffect, useContext } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png'
import SearchIcon from '../../public/search.svg'
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import Loading from './Loading';
import React from 'react';


const Header = React.memo(() => { 
  
  const router = useRouter();
  const [isActive, setIsActive] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false);
  const { signout, userName, userImage, userAt, pending  } = useContext(UserContext);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHeaderVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);



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

const imageLoad = () => {
  setImageLoaded(true);
};


if(pending) {
  return <Loading />
}


      return (
          <header className={isHeaderVisible ? "header-visible" : "header-hidden"}>
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
                    </li> <>
                      {userName ?
                      <li className='profile-icon-div'>
                        <div onClick={handleDropdown} className='profile-nav-image' >
                            <Image src={userImage} alt='profilepic' priority className={`${!imageLoaded ? "" : "transparent"}`} onLoad={() => imageLoad} width={100} height={100}/>
                        </div>
                        <div className={isActive ? 'profile-dropdown': 'profile-dropdown hidden'}>
                          <ul>
                            <li>
                            <Link onClick={handleDropdown} href={`/${userAt}`}>
                              Profile
                            </Link>
                            </li>
                            <li>Settings</li>
                            <span></span>
                            <li onClick={e => handleSignOut(e)}>Sign Out</li>
                          </ul>
                        </div>
                      </li>
  
                      : 
                      <li className='sign-in-btn'>
                        <Link href="/signin">
                          Sign In
                        </Link>
                       </li>
                    
                      }    </> 
                  </ul>
                </nav>
          </header>
          )
        
              
        });

export default Header
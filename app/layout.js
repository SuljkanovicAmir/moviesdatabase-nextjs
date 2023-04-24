"use client"

import './styles/style.css'
import { Poppins } from 'next/font/google'
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})


export default function RootLayout({ children }) {
  
  useEffect(() => {
    document.title = "Cineboxd";
  }, []);

  return (
    <html lang="en">
      <body className={poppins.className}>
      <UserProvider>
        <Header/>
        <ToastContainer transition={Flip} />
          {children}
      </UserProvider>
      </body>
    </html>
  )
}

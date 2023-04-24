"use client"

import './styles/style.css'
import { Poppins } from 'next/font/google'
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})





export default function RootLayout({ children }) {
  

  return (
    <html lang="en">
      <body className={poppins.className}>
      <Helmet>
          <title>Cineboxd</title>
          <meta name="description" content="Movies and TV Shows" />
          <meta property="og:title" content="Cineboxd" />
          <meta property="og:image" content="https://i.postimg.cc/YCtwy2Yr/logo.png" />
        </Helmet>
      <UserProvider>
        <Header/>
        <ToastContainer transition={Flip} />
          {children}
      </UserProvider>
      </body>
    </html>
  )
}

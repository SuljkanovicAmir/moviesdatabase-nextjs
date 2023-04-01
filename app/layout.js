import './styles/style.css'
import { Poppins } from 'next/font/google'
import { UserProvider } from './context/UserContext';
import Header from './components/header/page';



const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: 'MovieInfo',
  description: 'Personal Project',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={poppins.className}>
      <UserProvider>
        <Header/>
        {children}
      </UserProvider></body>
    </html>
  )
}

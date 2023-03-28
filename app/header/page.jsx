import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png'

export default function Header() {
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
                      <Link href="/movies">
                       Movies
                      </Link>
                    </li>
                    <li>
                      <Link href="/tv">
                       TV Shows
                      </Link>
                    </li>
                    <li className='sign-in-btn'>
                      <Link href="/signin">
                       Sign In
                      </Link>
                    </li>
                  </ul>
                </nav>
              </header>
            );
}
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
              <header>
                <nav>
                  <ul>
                    <li>
                      <Link href="/">
                        Moview
                      </Link>
                    </li>
                    <li className='nav-home'>
                      <Link href="/">
                       Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/movies">
                       Movies
                      </Link>
                    </li>
                    <li>
                      <Link href="/tv-shows">
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
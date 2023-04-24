import Image from 'next/image';
import Arrow from '../../../public/arrow.png';

export default function ScrollButtons({ scrollPosition, setScrollPosition, movieListRef, movieListWidth}) {


  function handleScrollLeft() {
    if (movieListRef.current) {
      const scrollAmount = movieListRef.current.offsetWidth;
      setScrollPosition(scrollPosition - scrollAmount);
      movieListRef.current.scrollTo({
        top: 0,
        left: movieListRef.current.scrollLeft - scrollAmount,
        behavior: "smooth"
      });
    }
  }

  function handleScrollRight() {
    if (movieListRef.current) {
      const scrollAmount = movieListRef.current.offsetWidth;
      setScrollPosition(scrollPosition + scrollAmount);
      movieListRef.current.scrollTo({
        top: 0,
        left: movieListRef.current.scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  }

  return (
    <div className="button-container">
        <div className={`scroll-button-left`} onClick={() => handleScrollLeft()}>
          <Image src={Arrow} width={50} height={50} alt="arrow" />
        </div>
        <div className={`scroll-button-right`} onClick={() => handleScrollRight()}>
          <Image src={Arrow} width={50} height={50} alt="arrow" />
        </div>
    </div>
  );
}



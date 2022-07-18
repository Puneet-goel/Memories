import React, { useEffect, memo } from 'react';
import { photoArr } from '../../assets/photos/index.js';
import './styles.css';

const PhotoCarousel = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    const id = setInterval(() => {
      document.getElementsByClassName('carousel-control-next')[0].click();
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      id="footerCaraousel"
      className="carousel carousel-dark slide mt-2"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {arr.map((key) => (
          <button
            key={key}
            type="button"
            data-bs-target="#footerCaraousel"
            data-bs-slide-to={key - 1}
            className={key === 1 ? 'active' : ''}
            aria-current={key === 1}
            aria-label={`Slide ${key}`}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {arr.map((key) => (
          <div
            className={`carousel-item text-center ${key === 1 ? 'active' : ''}`}
            key={key}
          >
            <img src={photoArr[key - 1]} className="w-100" alt={key} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#footerCaraousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#footerCaraousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default memo(PhotoCarousel);

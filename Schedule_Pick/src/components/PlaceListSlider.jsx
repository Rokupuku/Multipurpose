import React, { useState } from 'react';
import PlaceListBanner from './PlaceListBanner';

const places = [
  { name: "카페 야미", address: "경기도 성남시 중원구 무슨로", img: "/img/place-list-banner.png" },
  { name: "카페 라떼", address: "서울시 강남구 어딘가", img: "/img/place-list-banner.png" },
  { name: "카페 모카", address: "서울시 송파구 어디로", img: "/img/place-list-banner.png" },
  { name: "카페 아메", address: "경기도 수원시 무슨동", img: "/img/place-list-banner.png" },
  { name: "카페 바닐라", address: "서울시 마포구 무슨길", img: "/img/place-list-banner.png" },
  { name: "카페 카라멜", address: "경기도 용인시 무슨로", img: "/img/place-list-banner.png" }
];

function PlaceListSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeft = () => {
    if (currentIndex - 3 >= 0) setCurrentIndex(currentIndex - 3);
  };
  const handleRight = () => {
    if (currentIndex + 3 < places.length) setCurrentIndex(currentIndex + 3);
  };

  return (
    <div className="place-list-slider">
      <div className="place-list-container">
        <button className="slider-arrow left" onClick={handleLeft}>&lt;</button>
        {places.slice(currentIndex, currentIndex + 3).map((place, idx) => (
          <PlaceListBanner key={idx} {...place} />
        ))}
        <button className="slider-arrow right" onClick={handleRight}>&gt;</button>
      </div>
    </div>
  );
}

export default PlaceListSlider; 
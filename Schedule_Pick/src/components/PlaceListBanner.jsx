import React from 'react';

function PlaceListBanner({ name, address, img }) {
  return (
    <div className="place-list-banner">
      <img className="place-list-banner-img" src={img} alt={name} />
      <div className="place-list-banner-text-container">
        <div className="place-list-banner-title"><p>{name}</p></div>
        <div className="place-list-banner-address"><p>{address}</p></div>
      </div>
    </div>
  );
}

export default PlaceListBanner; 
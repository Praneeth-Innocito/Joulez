import React from 'react';
import { Users, Zap, MapPin } from 'lucide-react';
import './CarCard.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <div className="car-header">
        <div className="car-info">
          <h3>{car.brand} {car.model}</h3>
          <span className="car-type">{car.type}</span>
        </div>
        <div className="car-price">
          <div className="price-day">${car.priceDay}*/day</div>
          <div className="price-trip">${car.priceTrip}*/trip</div>
        </div>
      </div>
      
      <div className="car-image-container">
        <img src={car.image} alt={`${car.brand} ${car.model}`} className="car-image" />
      </div>
      
      <div className="car-footer">
        <div className="car-specs">
          <div className="spec">
            <Users size={14} color="#a0a0a0" />
            <span>{car.seats}</span>
          </div>
          <div className="spec">
            <Zap size={14} color="#a0a0a0" />
            <span>{car.range} mi</span>
          </div>
        </div>
        <div className="car-location">
          <span>{car.location}</span>
          <MapPin size={14} color="#a0a0a0" />
        </div>
      </div>
    </div>
  );
};

export default CarCard;

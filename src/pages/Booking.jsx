import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchWidget from '../components/SearchWidget';
import CarCard from '../components/CarCard';
import { carsData, vehicleTypes, vehicleBrands, vehicleModels } from '../data';
import './Booking.css';

const Booking = () => {
  const location = useLocation();
  const searchState = location.state || {}; // { pickUp, dropOff, startDate, endDate }

  const [filteredCars, setFilteredCars] = useState(carsData);
  
  // Filter states
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  // Apply filters whenever state changes
  useEffect(() => {
    let result = carsData;

    if (selectedTypes.length > 0) {
      result = result.filter(car => selectedTypes.includes(car.type));
    }
    
    if (selectedBrands.length > 0) {
      result = result.filter(car => selectedBrands.includes(car.brand));
    }

    if (selectedModels.length > 0) {
      result = result.filter(car => selectedModels.includes(car.model));
    }

    setFilteredCars(result);
  }, [selectedTypes, selectedBrands, selectedModels]);

  const toggleFilter = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedBrands([]);
    setSelectedModels([]);
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <SearchWidget />
      </div>

      <div className="booking-content">
        <div className="cars-grid">
          {filteredCars.length > 0 ? (
            filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))
          ) : (
            <div className="no-cars-message">
              <h3>No vehicles match your filters.</h3>
              <p>Try adjusting your search criteria.</p>
            </div>
          )}
        </div>

        <div className="filters-sidebar">
          
          <div className="filter-group">
            <h3>Vehicle Type</h3>
            <div className="filter-badges">
              {vehicleTypes.map(type => (
                <button 
                  key={type} 
                  className={`filter-badge ${selectedTypes.includes(type) ? 'active' : ''}`}
                  onClick={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-divider"></div>

          <div className="filter-group">
            <h3>Brand</h3>
            <div className="filter-badges">
              {vehicleBrands.map(brand => (
                <button 
                  key={brand} 
                  className={`filter-badge ${selectedBrands.includes(brand) ? 'active' : ''}`}
                  onClick={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-divider"></div>

          <div className="filter-group">
            <h3>Model</h3>
            <div className="filter-badges">
              {vehicleModels.map(model => (
                <button 
                  key={model} 
                  className={`filter-badge ${selectedModels.includes(model) ? 'active' : ''}`}
                  onClick={() => toggleFilter(selectedModels, setSelectedModels, model)}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          <button className="clear-filters-btn" onClick={clearAllFilters}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;

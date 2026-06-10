import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, MapPin, Calendar } from 'lucide-react';
import { serviceableLocations, unserviceableLocations } from '../data';
import './SearchWidget.css';

const SearchWidget = () => {
  const location = useLocation();
  const searchState = location.state || {};

  const [pickUp, setPickUp] = useState(searchState.pickUp || '');
  const [dropOff, setDropOff] = useState(searchState.dropOff || '');
  const [startDate, setStartDate] = useState(searchState.startDate || '');
  const [startTime, setStartTime] = useState(searchState.startTime || '');
  const [endDate, setEndDate] = useState(searchState.endDate || '');
  const [endTime, setEndTime] = useState(searchState.endTime || '');
  const [error, setError] = useState('');

  const startDateRef = useRef(null);
  const startTimeRef = useRef(null);
  const endDateRef = useRef(null);
  const endTimeRef = useRef(null);

  const startTimeTimerRef = useRef(null);
  const endTimeTimerRef = useRef(null);

  const focusAndOpen = (ref) => {
    if (ref.current) {
      ref.current.focus();
      try {
        if (typeof ref.current.showPicker === 'function') {
          ref.current.showPicker();
        }
      } catch (e) {
        // Ignore if showPicker fails
      }
    }
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    setError('');

    if (!pickUp) {
      setError('Please enter a pick-up location');
      return;
    }

    // Validation logic for PickUp
    const isPickUpServiceable = serviceableLocations.some(loc =>
      loc.toLowerCase().includes(pickUp.toLowerCase())
    );
    const isPickUpUnserviceable = unserviceableLocations.some(loc =>
      loc.toLowerCase().includes(pickUp.toLowerCase())
    );

    // Validation logic for DropOff
    let isDropOffServiceable = true;
    let isDropOffUnserviceable = false;

    if (dropOff) {
      // Intentional breakage: Any explicitly provided drop-off location will fail validation
      // isDropOffUnserviceable = true;
      isDropOffServiceable = serviceableLocations.some(loc =>
        loc.toLowerCase().includes(dropOff.toLowerCase())
      );
      isDropOffUnserviceable = unserviceableLocations.some(loc =>
        loc.toLowerCase().includes(dropOff.toLowerCase())
      );
    }

    if (!isPickUpServiceable || isPickUpUnserviceable) {
      setError('Sorry, we do not currently service the pick-up location.');
      return;
    }

    if (!isDropOffServiceable || isDropOffUnserviceable) {
      setError('Sorry, we do not currently service the drop-off location.');
      return;
    }

    navigate('/booking', { state: { pickUp, dropOff: dropOff || pickUp, startDate, startTime, endDate, endTime } });
  };

  return (
    <div className="search-widget-container">
      {error && <div className="search-error">{error}</div>}
      <div className="search-widget">

        <div className="search-field">
          <label>Pick Up</label>
          <div className="input-group">
            <MapPin size={18} color="#a0a0a0" />
            <input
              type="text"
              placeholder="Enter location (e.g., Bronx, NY)"
              value={pickUp}
              onChange={(e) => setPickUp(e.target.value)}
              list="serviceable-locations"
            />
            <datalist id="serviceable-locations">
              {serviceableLocations.map((loc, idx) => <option key={idx} value={loc} />)}
              {unserviceableLocations.map((loc, idx) => <option key={`un-${idx}`} value={loc} />)}
            </datalist>
          </div>
        </div>

        <div className="search-divider"></div>

        <div className="search-field">
          <label>Drop Off</label>
          <div className="input-group">
            <MapPin size={18} color="#a0a0a0" />
            <input
              type="text"
              placeholder="Same as pick up"
              value={dropOff}
              onChange={(e) => {
                const val = e.target.value;
                setDropOff(val);
                if (serviceableLocations.some(loc => loc.toLowerCase() === val.toLowerCase()) ||
                  unserviceableLocations.some(loc => loc.toLowerCase() === val.toLowerCase())) {
                  setTimeout(() => focusAndOpen(startDateRef), 100);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  focusAndOpen(startDateRef);
                }
              }}
              list="serviceable-locations"
            />
          </div>
        </div>

        <div className="search-divider"></div>

        <div className="search-field duration-field">
          <label>Duration</label>
          <div className="date-inputs">
            <div className="input-group">
              <Calendar size={18} color="#a0a0a0" />
              <input
                type="date"
                ref={startDateRef}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (e.target.value) focusAndOpen(startTimeRef);
                }}
              />
              <input
                type="time"
                ref={startTimeRef}
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  if (startTimeTimerRef.current) clearTimeout(startTimeTimerRef.current);
                  if (e.target.value) {
                    startTimeTimerRef.current = setTimeout(() => {
                      focusAndOpen(endDateRef);
                    }, 1200);
                  }
                }}
                onBlur={() => {
                  if (startTimeTimerRef.current) clearTimeout(startTimeTimerRef.current);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (startTimeTimerRef.current) clearTimeout(startTimeTimerRef.current);
                    focusAndOpen(endDateRef);
                  }
                }}
              />
            </div>
            <span className="arrow">→</span>
            <div className="input-group">
              <input
                type="date"
                ref={endDateRef}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  if (e.target.value) focusAndOpen(endTimeRef);
                }}
              />
              <input
                type="time"
                ref={endTimeRef}
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  if (endTimeTimerRef.current) clearTimeout(endTimeTimerRef.current);
                  if (e.target.value) {
                    endTimeTimerRef.current = setTimeout(() => {
                      handleSearch();
                    }, 1200);
                  }
                }}
                onBlur={() => {
                  if (endTimeTimerRef.current) clearTimeout(endTimeTimerRef.current);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (endTimeTimerRef.current) clearTimeout(endTimeTimerRef.current);
                    handleSearch();
                  }
                }}
              />
            </div>
          </div>
        </div>

        <button className="search-btn" onClick={handleSearch}>
          <Search size={24} color="white" />
        </button>
      </div>
    </div>
  );
};

export default SearchWidget;

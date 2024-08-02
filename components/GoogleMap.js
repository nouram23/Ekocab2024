import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

// Set the dimensions for the map container
const containerStyle = {
  width: '100%',
  height: '400px'
};

// Set the initial center to Ulaanbaatar
const initialCenter = {
  lat: 47.9077221256817, // Latitude for Ulaanbaatar
  lng: 106.92441872391102 // Longitude for Ulaanbaatar
};

const GoogleMapComponent = () => {
  const [marker, setMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(initialCenter);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Function to handle the place selection from the Autocomplete input
  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      setCurrentLocation(newLocation);
      setMarker(newLocation); // Update the marker position
      setSelectedPlace(newLocation); // Optionally show info window
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(currentLocation);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (selectedPlace) {
      console.log(`Хаягийн мэдээлэл: ${selectedPlace.lat}, ${selectedPlace.lng}`);
    }
  }, [selectedPlace]);

  const handleMarkerClick = (location) => {
    setSelectedPlace(location);
  };

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarker(newMarker);
    setSelectedPlace(newMarker);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <div style={{ width: '100%', height: '35px', marginBottom: '10px', position: 'relative' }}>
        <Autocomplete
          onLoad={(autocomplete) => autocompleteRef.current = autocomplete}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Хаяг хайх..."
            className="border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-150"
            style={{
              width: '50%',
              padding: '8px',
              fontSize: '13px',
              fontFamily: 'Arial, sans-serif',
              boxSizing: 'border-box',
            }}
          />
        </Autocomplete>
      </div>
      <div style={{ position: 'relative', height: '400px' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={12}
          onLoad={(map) => {
            mapRef.current = map;
            // Disable scroll wheel zoom
            map.setOptions({ scrollwheel: false });
          }}
          onClick={handleMapClick}
        >
          {marker && (
            <Marker
              position={marker}
              onClick={() => handleMarkerClick(marker)}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;

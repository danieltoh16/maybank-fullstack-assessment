import { useEffect, useRef, useState } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';

function MapView({ location, onPlaceSelected }) {
  const autocompleteRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const autocomplete = autocompleteRef.current;

    if (!autocomplete) {
      return;
    }

    const handlePlaceSelect = async (event) => {
        try {
            setError('');

            const place = event.placePrediction.toPlace();

            await place.fetchFields({
            fields: [
                'displayName',
                'formattedAddress',
                'location',
                'viewport',
            ],
            });

            if (!place.location) {
            throw new Error('Selected place does not have a location.');
            }

            onPlaceSelected({
            name: place.displayName,
            address: place.formattedAddress,
            location: {
                lat: place.location.lat(),
                lng: place.location.lng(),
            },
            });
        } catch (error) {
            console.error('Failed to load place details:', error);
            setError('Unable to load the selected place. Please try again.');
        }
    };

    autocomplete.addEventListener('gmp-select', handlePlaceSelect);

    return () => {
      autocomplete.removeEventListener('gmp-select', handlePlaceSelect);
    };
  }, [onPlaceSelected]);

  const defaultCenter = {
    lat: 3.139,
    lng: 101.6869,
  };

  const center = location || defaultCenter;

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <gmp-place-autocomplete
          ref={autocompleteRef}
          placeholder="Search for a place..."
        />
      </div>

        {error && (
            <p style={{ color: '#ff6b6b', marginBottom: '16px' }}>
                {error}
            </p>
        )}
        
      <Map
        center={center}
        zoom={location ? 16 : 12}
        gestureHandling="greedy"
        style={{ width: '100%', height: '500px' }}
      >
        {location && <Marker position={location} />}
      </Map>
    </div>
  );
}

export default MapView;
import { Map, Marker } from '@vis.gl/react-google-maps';
import usePlaceAutocomplete from '../hooks/usePlaceAutocomplete';

function MapView({ location, onPlaceSelected }) {
  const { autocompleteRef, error } = usePlaceAutocomplete(onPlaceSelected);

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

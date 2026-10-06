import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapView from './components/MapView';
import { saveSearch } from './store/searchSlice';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const dispatch = useDispatch();
  const searches = useSelector((state) => state.search.searches);

  const handlePlaceSelected = useCallback((place) => {
    setSelectedLocation(place.location);
    dispatch(saveSearch(place));
  }, [dispatch]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Place Finder</h1>
        <p>Search for a place and view its location on Google Maps.</p>
      </header>

      <main>
        <div className="map-container">
          <MapView
            location={selectedLocation}
            onPlaceSelected={handlePlaceSelected}
          />
        </div>

        <section className="history">
          <h2>Search History</h2>

          {searches.length === 0 ? (
            <p className="history-empty">No searches yet.</p>
          ) : (
            <div>
              {searches.map((place, index) => (
                <div
                  key={`${place.name}-${index}`}
                  className="history-card"
                >
                  <strong>{place.name}</strong>
                  <p>{place.address}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
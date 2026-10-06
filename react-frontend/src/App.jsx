import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapView from './components/MapView';
import { saveSearch } from './store/searchSlice';
import { saveFavourite } from './store/favouritesSlice';

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const dispatch = useDispatch();
  const searches = useSelector((state) => state.search.searches);
  const { items: favourites, status, error } = useSelector((state) => state.favourites);

  const handlePlaceSelected = useCallback((place) => {
    setSelectedPlace(place);
    dispatch(saveSearch(place));
  }, [dispatch]);

  const handleSaveFavourite = () => {
    if (selectedPlace) {
      dispatch(saveFavourite({
        placeId: selectedPlace.placeId,
        name: selectedPlace.name,
        address: selectedPlace.address,
        latitude: selectedPlace.location.lat,
        longitude: selectedPlace.location.lng,
      }));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Place Finder</h1>
        <p>Search for a place and view its location on Google Maps.</p>
      </header>

      <main>
        <div className="map-container">
          <MapView
            location={selectedPlace?.location ?? null}
            onPlaceSelected={handlePlaceSelected}
          />
        </div>

        <section className="favourites" aria-labelledby="favourites-heading">
          <div className="favourites-header">
            <div>
              <h2 id="favourites-heading">Favourites</h2>
              <p>Save places to your account.</p>
            </div>
            <button
              className="favourite-button"
              type="button"
              onClick={handleSaveFavourite}
              disabled={!selectedPlace || status === 'loading'}
            >
              {status === 'loading' ? 'Saving…' : '☆ Add to Favourite'}
            </button>
          </div>

          {status === 'loading' && <p role="status">Saving favourite…</p>}
          {status === 'failed' && <p className="favourite-error" role="alert">{error}</p>}
          {status === 'succeeded' && <p className="favourite-success" role="status">Favourite saved.</p>}
          {favourites.length === 0 ? (
            <p className="history-empty">No favourites saved yet.</p>
          ) : (
            favourites.map((place, index) => (
              <div className="history-card" key={place.id ?? `${place.name}-${index}`}>
                <strong>{place.name}</strong>
                <p>{place.address}</p>
              </div>
            ))
          )}
        </section>

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

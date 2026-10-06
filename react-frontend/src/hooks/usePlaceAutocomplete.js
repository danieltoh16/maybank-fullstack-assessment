import { useEffect, useRef, useState } from 'react';

function usePlaceAutocomplete(onPlaceSelected) {
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

  return { autocompleteRef, error };
}

export default usePlaceAutocomplete;

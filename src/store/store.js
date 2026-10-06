import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import favouritesReducer from './favouritesSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favourites: favouritesReducer,
  },
});

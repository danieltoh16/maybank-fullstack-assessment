import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searches: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.searches.push(action.payload);
    },
  },
});

export const { addSearch } = searchSlice.actions;

export const saveSearch = (place) => (dispatch) => {
  dispatch(addSearch(place));
};

export default searchSlice.reducer;
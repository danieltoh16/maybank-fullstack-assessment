import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

export const saveFavourite = createAsyncThunk(
  'favourites/saveFavourite',
  async (place, { rejectWithValue }) => {
    if (!apiBaseUrl) {
      return rejectWithValue('Favourite service is not configured. Set VITE_API_BASE_URL to the backend base URL.');
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/favourites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(place),
      });

      if (!response.ok) {
        const message = await response.text();
        return rejectWithValue(message || `Could not save favourite (HTTP ${response.status}).`);
      }

      const contentType = response.headers.get('content-type');
      return contentType?.includes('application/json') ? response.json() : place;
    } catch {
      return rejectWithValue('Could not reach the favourite service. Check the backend URL and try again.');
    }
  },
);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveFavourite.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(saveFavourite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(saveFavourite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Could not save favourite.';
      });
  },
});

export default favouritesSlice.reducer;

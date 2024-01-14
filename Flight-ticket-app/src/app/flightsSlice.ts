import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../app/api';
import { Flight } from '../components/flightList';

export const fetchFlights = createAsyncThunk('flights/fetchFlights', async () => {
  const response = await api.get('/flights');
  return response.data as Flight[]; // Уточняем тип данных, который ожидаем получить
});

interface FlightsState {
  flights: Flight[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sortKey: keyof Flight | null;
  sortOrder: 'asc' | 'desc';
  filters: {
    airline: string[];
    stops: number[];
  };
}

const initialState: FlightsState = {
  flights: [],
  status: 'idle',
  error: null,
  sortKey: null,
  sortOrder: 'asc',
  filters: {
    airline: [],
    stops: [],
  },
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setSortKey: (state, action: PayloadAction<keyof Flight>) => {
      state.sortKey = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    addAirlineFilter: (state, action: PayloadAction<string>) => {
      state.filters.airline.push(action.payload);
    },
    removeAirlineFilter: (state, action: PayloadAction<string>) => {
      state.filters.airline = state.filters.airline.filter((airline) => airline !== action.payload);
    },
    addStopFilter: (state, action: PayloadAction<number>) => {
      state.filters.stops.push(action.payload);
    },
    removeStopFilter: (state, action: PayloadAction<number>) => {
      state.filters.stops = state.filters.stops.filter((stop) => stop !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error ? String(action.error) : 'An error occurred';
      })
      .addCase(fetchMoreFlights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flights = [...state.flights, ...action.payload];
      });
  },
});

export const {
  setSortKey,
  setSortOrder,
  addAirlineFilter,
  removeAirlineFilter,
  addStopFilter,
  removeStopFilter,
} = flightsSlice.actions;

export default flightsSlice.reducer;

export const fetchMoreFlights = createAsyncThunk('flights/fetchMoreFlights', async () => {
  const response = await api.get('/more-flights');
  return response.data as Flight[]; 
});

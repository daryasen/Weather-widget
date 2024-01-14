import React, { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights } from './app/flightsSlice';
import Header from './components/header';
import Filters from './components/filters';
import FlightList from './components/flightList';
import LoadMoreButton from './components/loadMoreButton';
import store, { RootState } from './app/store';
import FilterPanel from './components/filterPanel';
import './App.css'

const App: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const flights = useSelector((state: RootState) => state.flights.flights);

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);  

  return (
    <div className='app-body'>
      <Header />
      <div className='container'>
        <FilterPanel />
        <div className='ticket'>
          <Filters />
          <FlightList flights={flights} />
          <LoadMoreButton onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
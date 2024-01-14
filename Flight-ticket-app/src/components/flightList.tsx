// flightList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import '../styles/flightList.scss';

export interface Flight {
  id: number;
  airline: string;
  price: number;
  duration: number;
  stops: number;
}

interface FlightListProps {
  flights: Flight[];
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => {
  const sortKey = useSelector((state: RootState) => state.flights.sortKey);
  const sortOrder = useSelector((state: RootState) => state.flights.sortOrder);
  const airlineFilters = useSelector((state: RootState) => state.flights.filters.airline);
  const stopsFilters = useSelector((state: RootState) => state.flights.filters.stops);

  // Функция для сортировки рейсов
  const sortFlights = (flights: Flight[]) => {
    if (sortKey) {
      return flights.slice().sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    return flights;
  };

  // Функция для фильтрации рейсов
  const filterFlights = (flights: Flight[]) => {
    return flights.filter((flight) => {
      const passesAirlineFilter = airlineFilters.length === 0 || airlineFilters.includes(flight.airline);
      const passesStopsFilter = stopsFilters.length === 0 || stopsFilters.includes(flight.stops);

      return passesAirlineFilter && passesStopsFilter;
    });
  };

  const sortedAndFilteredFlights = filterFlights(sortFlights(flights));

  return (
    <div className='plane-information'>
      <ul>
        {sortedAndFilteredFlights.map((flight) => (
          <li key={flight.id}>
            <div>Авиакомпания: {flight.airline}</div>
            <div>Цена: {flight.price}</div>
            <div>Длительность: {flight.duration} мин</div>
            <div>Количество пересадок: {flight.stops}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;

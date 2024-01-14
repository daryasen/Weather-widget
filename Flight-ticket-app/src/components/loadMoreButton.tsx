import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchMoreFlights } from '../app/flightsSlice';
import '../styles/loadMoreButton.scss'

interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
    const dispatch = useDispatch();
  
    const handleLoadMoreClick = () => {
        dispatch(fetchMoreFlights() as any);
    };
  
    return (
        <div>
            <button onClick={onClick || handleLoadMoreClick}>Загрузить еще билеты</button>
        </div>
    );
};
  

export default LoadMoreButton;

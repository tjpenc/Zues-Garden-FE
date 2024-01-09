import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Loading from '../../../components/Loading';
import PerenualPlantCard from '../../../components/cards/PerenualPlantCard';
import PerenualSearchBar from '../../../components/cards/searchBars/PerenualSearchBar';
import { clientCredentials } from '../../../utils/client';

const perenualApiKey = clientCredentials.perenualKey;

export default function PerenualAPI() {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdible, setIsEdible] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [isOutOfCalls, setIsOutOfCalls] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://perenual.com/api/species-list?key=${perenualApiKey}
        &page=${pageNumber}
        ${isEdible ? '&edible=1' : ''}
        ${searchInput ? `&q=${searchInput}` : ''}`);
        setData(response.data);
        setIsLoading(false);
        setIsOutOfCalls(false);
      } catch (error) {
        const serializedError = JSON.stringify(error, Object.getOwnPropertyNames(error));
        if (serializedError.includes('429')) {
          setIsOutOfCalls(true);
        }
      }
    }
    fetchData();
  }, [pageNumber, isEdible, searchInput]);

  const changePage = (direction) => {
    if (direction === 'next') {
      setPageNumber((prevState) => prevState + 1);
    } else {
      setPageNumber((prevState) => prevState - 1);
    }
  };

  const toggleEdibleFilter = () => {
    if (isEdible) {
      setIsEdible(false);
    } else {
      setIsEdible(true);
    }
  };

  const resetSearch = () => {
    setPageNumber(1);
    setIsEdible(true);
    setSearchInput('');
  };

  return (
    <div className="plants-page">
      {isOutOfCalls ? <h2>You have no API Calls left for today</h2> : ''}
      {isLoading
        ? <Loading />
        : (
          <>
            <div className="sidebar">
              <div className="mt-3">
                <span>Page {pageNumber}</span>
              </div>
              <div className="mt-3">
                {data.data.length < 30 ? <Button disabled>Next Page</Button> : <Button onClick={() => changePage('next')}>Next Page</Button> }
              </div>
              <div className="mt-3">
                {pageNumber === 1 ? <Button disabled>Prev Page</Button> : <Button onClick={() => changePage('back')}>Prev Page</Button> }
              </div>
              <div className="mt-3">
                <Button onClick={toggleEdibleFilter}>{isEdible ? 'View All Plants' : 'View Edible Plants'}</Button>
              </div>
              <div className="mt-3">
                <PerenualSearchBar searchInput={searchInput} setSearchInput={setSearchInput} setPageNumber={setPageNumber} isOnPlant />
              </div>
              <div className="mt-3">
                <Button onClick={resetSearch}>Reset Search</Button>
              </div>
            </div>
            <div className="content-container">
              <h1 className="center mb-5">Browse Plants {isEdible ? '(Edible)' : '(All)'}</h1>
              {data?.data?.length ? (
                <>
                  <div className="space-around wrap">
                    {data?.data?.map((plant) => <PerenualPlantCard key={plant.id} plantObj={plant} />)}
                  </div>
                </>
              ) : <h3>No plants match your search</h3>}
            </div>
          </>
        )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Loading from '../../components/Loading';
import PerenualPlantCard from '../../components/cards/PerenualPlantCard';
import PerenualSearchBar from '../../components/cards/searchBars/PerenualSearchBar';

export default function Perenual() {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdible, setIsEdible] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://perenual.com/api/species-list?key=sk-Oc3T6591f04e9a7ff3617
        &page=${pageNumber}
        ${isEdible ? '&edible=1' : ''}
        ${searchInput ? `&q=${searchInput}` : ''}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      {isLoading
        ? <Loading />
        : (
          <>
            <div className="sidebar">
              <div className="mt-3">
                <Link passHref href="/plants/createPlant">
                  <Button>Create Plant</Button>
                </Link>
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
                <PerenualSearchBar searchInput={searchInput} setSearchInput={setSearchInput} isOnPlant />
              </div>
              <div className="mt-3">
                <Button onClick={resetSearch}>Reset Search</Button>
              </div>
            </div>
            <div className="content-container">
              <h1 className="center mb-5">Perenual Plants {isEdible ? '(Edible)' : '(All)'}</h1>
              <div className="space-around wrap">
                {data?.data?.map((plant) => <PerenualPlantCard key={plant.id} plantObj={plant} />)}
              </div>
            </div>
          </>
        )}
    </div>
  );
}

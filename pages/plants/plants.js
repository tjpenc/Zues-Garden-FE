import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlants } from '../../api/plantData';
import { useAuth } from '../../utils/context/authContext';
import SmallPlantCard from '../../components/cards/PlantCardSmall';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';

export default function ViewPlants() {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSortedAZ, setisSortedAZ] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const { user } = useAuth();

  const sortPlantsAlphabetical = (array) => {
    const sortedArray = array;
    if (!isSortedAZ) {
      setisSortedAZ(true);
      sortedArray.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    } else {
      setisSortedAZ(false);
      sortedArray.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    }
    setPlants(sortedArray);
  };

  const getAllPlants = () => getPlants(user.uid).then((plantsArray) => {
    sortPlantsAlphabetical(plantsArray);
    setPlants(plantsArray);
    setIsLoading(false);
  });

  useEffect(() => {
    setTimeout(() => {
      getAllPlants(true);
    }, 300);
  }, []);

  const searchedPlants = plants.filter((plant) => plant.name.toLowerCase().includes(searchInput));

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
                <Button onClick={getAllPlants}>Sort {isSortedAZ ? 'Z-A' : 'A-Z'}</Button>
              </div>
              <div className="mt-3">
                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
              </div>
            </div>
            <div className="content-container">
              <h1 className="center mb-5">My Plants</h1>
              <div className="space-around wrap">
                {plants?.length === 0
                  ? (
                    <>
                      <div>
                        <h2>You have no Plants! Use the top left button to create a new plant</h2>
                      </div>
                    </>
                  )
                  : searchedPlants?.map((plant) => <SmallPlantCard key={plant.id} plantObj={plant} onUpdate={getAllPlants} />)}
              </div>
            </div>
          </>
        )}

    </div>
  );
}

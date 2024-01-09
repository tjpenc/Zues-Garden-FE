import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlants } from '../../api/plantData';
import { useAuth } from '../../utils/context/authContext';
import SmallPlantCard from '../../components/cards/PlantCardSmall';
import Loading from '../../components/Loading';
import SearchBar from '../../components/cards/searchBars/SearchBar';
import PlantTypeSelect from '../../components/sidebarSelectors/PlantTypeSelect';

export default function ViewPlants() {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSortedAZ, setIsSortedAZ] = useState(true);
  const [isShowingOwned, setIsShowingOwned] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectTypeInput, setSelectTypeInput] = useState('');
  const { user } = useAuth();

  const sortPlantsAlphabetical = (array) => {
    const sortedArray = array;
    if (isSortedAZ) {
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
    if (isShowingOwned) {
      const filteredPlants = plantsArray.filter((plant) => plant.isOwned);
      setPlants(filteredPlants);
    } else {
      setPlants(plantsArray);
    }
    setIsLoading(false);
  });

  const toggleOwnedPlantsView = () => {
    setIsShowingOwned((prevState) => !prevState);
  };

  const toggleAlphabeticalView = () => {
    setIsSortedAZ((prevState) => !prevState);
  };

  useEffect(() => {
    setTimeout(() => {
      getAllPlants();
    }, 300);
  }, [isShowingOwned, isSortedAZ]);

  const searchedPlants = () => {
    const filteredPlants = plants?.filter((plant) => plant.name.toLowerCase().includes(searchInput));
    if (selectTypeInput !== '') {
      return filteredPlants?.filter((plant) => plant.type.toLowerCase().includes(selectTypeInput));
    }
    return filteredPlants;
  };

  const resetFilters = () => {
    setIsSortedAZ(true);
    setIsShowingOwned(false);
    setSearchInput('');
    setSelectTypeInput('');
  };

  return (
    <div className="plants-page">
      {isLoading
        ? <Loading />
        : (
          <>
            <div className="sidebar">
              <div className="mt-3">
                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} isOnPlant />
              </div>
              <div>
                <PlantTypeSelect selectTypeInput={selectTypeInput} setSelectTypeInput={setSelectTypeInput} plants={plants} />
              </div>
              <div className="mt-3">
                <Button onClick={toggleAlphabeticalView}>Sort {isSortedAZ ? 'Z-A' : 'A-Z'}</Button>
              </div>
              <div className="mt-3">
                <Button onClick={toggleOwnedPlantsView}>View {isShowingOwned ? 'All Plants' : 'Owned Plants'}</Button>
              </div>
              <div className="mt-3">
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
              <div className="mt-5">
                <Link passHref href="/plants/createPlant">
                  <Button>Create Plant</Button>
                </Link>
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
                  : searchedPlants()?.map((plant) => <SmallPlantCard key={plant.id} plantObj={plant} onUpdate={getAllPlants} />)}
              </div>
            </div>
          </>
        )}
    </div>
  );
}

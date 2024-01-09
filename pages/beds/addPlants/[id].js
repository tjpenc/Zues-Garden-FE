import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlants } from '../../../api/plantData';
import { getBedPlants } from '../../../api/bedPlantData';
import { useAuth } from '../../../utils/context/authContext';
import BedPlantCard from '../../../components/cards/BedPlantCard';
import SearchBar from '../../../components/cards/searchBars/SearchBar';
import PlantTypeSelect from '../../../components/sidebarSelectors/PlantTypeSelect';

export default function AddBedPlants() {
  const [plants, setPlants] = useState([]);
  const [bedPlants, setBedPlants] = useState([]);
  const [isSortedAZ, setIsSortedAZ] = useState(true);
  const [isShowingOwned, setIsShowingOwned] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectTypeInput, setSelectTypeInput] = useState('');
  const { user } = useAuth();
  const router = useRouter();
  const id = parseInt(router.query.id, 10);

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

  const getAllPlantsAndBedPlants = () => getPlants(user.uid).then((plantsArray) => {
    sortPlantsAlphabetical(plantsArray);
    if (isShowingOwned) {
      const filteredPlants = plantsArray.filter((plant) => plant.isOwned);
      setPlants(filteredPlants);
    } else {
      setPlants(plantsArray);
    }
    getBedPlants(id).then(setBedPlants);
  });

  const toggleOwnedPlantsView = () => {
    setIsShowingOwned((prevState) => !prevState);
  };

  const toggleAlphabeticalView = () => {
    setIsSortedAZ((prevState) => !prevState);
  };

  useEffect(() => {
    getAllPlantsAndBedPlants();
  }, [id, isShowingOwned, isSortedAZ]);

  const searchedPlants = () => {
    const filteredPlants = plants?.filter((plant) => plant.name.toLowerCase().includes(searchInput));
    if (selectTypeInput !== '') {
      return filteredPlants?.filter((plant) => plant.type.toLowerCase().includes(selectTypeInput));
    }
    return filteredPlants;
  };

  return (
    <div className="plants-page">
      <div className="sidebar">
        <div className="mt-3">
          <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} isOnPlant />
        </div>
        {plants?.length > 0
          ? (
            <div>
              <PlantTypeSelect selectTypeInput={selectTypeInput} setSelectTypeInput={setSelectTypeInput} plants={plants} />
            </div>
          ) : ''}

        <div className="mt-3">
          <Button onClick={toggleAlphabeticalView}>Sort {isSortedAZ ? 'Z-A' : 'A-Z'}</Button>
        </div>
        <div className="mt-3">
          <Button onClick={toggleOwnedPlantsView}>View {isShowingOwned ? 'All Plants' : 'Owned Plants'}</Button>
        </div>
        <div className="mt-5">
          {!bedPlants.length
            ? ''
            : (
              <Link passHref href={`/beds/${id}`}>
                <Button>Continue to Bed</Button>
              </Link>
            )}
        </div>
      </div>
      <div className="content-container">
        <h1 className="center mb-5">Select plants for this bed</h1>
        {!plants.length
          ? (
            <>
              <h2 className="center">You dont have any plants!</h2>
              <div className="mt-3 center">
                <Link passHref href="/plants/createPlant">
                  <Button variant="success">Create Plant</Button>
                </Link>
              </div>
            </>
          )
          : (
            <>
              <div className="space-around wrap">
                {searchedPlants()?.map((plant) => {
                  const bedPlant = bedPlants.find((bp) => bp.plantId === plant.id);
                  return <BedPlantCard key={plant.id} plantObj={plant} bedPlantId={bedPlant ? bedPlant.id : 0} bedId={id} onUpdate={getAllPlantsAndBedPlants} />;
                })}
              </div>
            </>
          )}
      </div>
    </div>
  );
}

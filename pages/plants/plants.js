import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlants } from '../../api/plantData';
import { useAuth } from '../../utils/context/authContext';
import SmallPlantCard from '../../components/cards/PlantCardSmall';

export default function ViewPlants() {
  const [plants, setPlants] = useState([]);
  const { user } = useAuth();
  const getAllPlants = () => getPlants(user.uid).then(setPlants);

  useEffect(() => {
    getAllPlants();
  }, []);
  return (
    <>
      <div>
        View All Plants
      </div>
      <div>
        <Link passHref href="/plants/createPlant">
          <Button>Create Plant</Button>
        </Link>
      </div>
      <div>
        {plants?.length === 0
          ? 'You have no plants!'
          : plants?.map((plant) => <SmallPlantCard key={plant.id} plantObj={plant} onUpdate={getAllPlants} />)}
      </div>
    </>
  );
}

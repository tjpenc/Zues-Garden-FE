import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlants } from '../../../api/plantData';
import { getBedPlants } from '../../../api/bedPlantData';
import { useAuth } from '../../../utils/context/authContext';
import BedPlantCard from '../../../components/cards/BedPlantCard';

export default function AddBedPlants() {
  const [plants, setPlants] = useState([]);
  const [bedPlants, setBedPlants] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const id = parseInt(router.query.id, 10);

  const getAllPlantsAndBedPlants = () => getPlants(user.uid).then((plantsArray) => {
    setPlants(plantsArray);
    getBedPlants(id).then(setBedPlants);
  });

  useEffect(() => {
    getAllPlantsAndBedPlants();
  }, []);

  return (
    <>
      <div className="mt-3">
        <Link passHref href="/beds/beds">
          <Button>Back to Beds</Button>
        </Link>
      </div>
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
              {plants?.map((plant) => {
                const bedPlant = bedPlants.find((bp) => bp.plantId === plant.id);
                return <BedPlantCard key={plant.id} plantObj={plant} bedPlantId={bedPlant ? bedPlant.id : 0} bedId={id} onUpdate={getAllPlantsAndBedPlants} />;
              })}
            </div>
            <div className="center mt-3">
              {!bedPlants.length
                ? ''
                : (
                  <Link passHref href={`/beds/${id}`}>
                    <Button>Continue to Bed</Button>
                  </Link>
                )}
            </div>
          </>
        )}
    </>
  );
}

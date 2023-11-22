import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSinglePlant } from '../../api/plantData';
import BigPlantCard from '../../components/cards/PlantCardBig';

export default function ViewPlant() {
  const [plant, setPlant] = useState({});
  const [hasBedPlants, setHasBedPlants] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePlant(id).then((plantObj) => {
      setPlant(plantObj);
      if (plantObj.beds.length) {
        setHasBedPlants(true);
      }
    });
  }, [id]);

  const pushToPlants = () => router.push('/plants/plants');

  return (
    <>
      <div className="mt-3">
        <Link passHref href="/plants/plants">
          <Button>Back to Plants</Button>
        </Link>
      </div>
      <h1 className="center mb-5">{plant.name}</h1>
      <div className="center">
        <BigPlantCard key={plant.id} plantObj={plant} onUpdate={pushToPlants} hasBedPlants={hasBedPlants} />
      </div>
    </>
  );
}

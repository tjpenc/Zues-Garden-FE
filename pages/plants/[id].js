import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSinglePlant } from '../../api/plantData';
import BigPlantCard from '../../components/cards/PlantCardBig';

export default function ViewPlant() {
  const [plant, setPlant] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePlant(id).then(setPlant);
  }, [id]);

  const pushToPlants = () => router.push('/plants/plants');

  return (
    <>
      <div>
        <Link passHref href="/plants/plants">
          <Button>Back to Plants</Button>
        </Link>
        Edit {plant.name}
      </div>
      <div>
        <BigPlantCard key={plant.id} plantObj={plant} onUpdate={pushToPlants} />
      </div>
    </>
  );
}

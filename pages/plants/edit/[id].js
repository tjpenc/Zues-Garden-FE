import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSinglePlant } from '../../../api/plantData';
import PlantForm from '../../../components/forms/PlantForm';

export default function EditPlant() {
  const [plant, setPlant] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePlant(id).then(setPlant);
  }, [id]);

  return (
    <>
      <div className="mt-3">
        <Link passHref href="/plants/plants">
          <Button>Back to Plants</Button>
        </Link>
      </div>
      <h1 className="center mb-5">Edit {plant.name}</h1>
      <div className="center">
        <PlantForm plantObj={plant} />
      </div>
    </>
  );
}

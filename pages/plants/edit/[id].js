import { useRouter } from 'next/router';
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
      <div className="plants-page">
        <div className="sidebar">
          <div className="mt-3">
            <Button onClick={() => { router.back(); }}>Back to {plant.name}</Button>
          </div>
        </div>
        <div className="content-container">
          <h1 className="center mb-5">Edit {plant.name}</h1>
          <PlantForm plantObj={plant} />
        </div>
      </div>
    </>
  );
}

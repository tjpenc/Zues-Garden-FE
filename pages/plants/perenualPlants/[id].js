import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { clientCredentials } from '../../../utils/client';
import { createPlant } from '../../../api/plantData';
import { useAuth } from '../../../utils/context/authContext';

const perenualApiKey = clientCredentials.perenualKey;

export default function Perenual() {
  const [plant, setPlant] = useState(null);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const addThisPlant = () => {
    const newPlant = {
      uid: user.uid,
      name: plant?.common_name,
      description: plant?.description,
      type: plant?.type,
      numberPerSquare: -1,
      isOwned: false,
      image: plant?.default_image?.regular_url,
      symbol: plant?.common_name.slice(0, 2),
    };

    createPlant(newPlant).then(alert(`${plant?.common_name} was added to your plants list`));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://perenual.com/api/species/details/${id}?key=${perenualApiKey}`);
        setPlant(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <div className="plants-page">
        {console.warn(plant)}
        <div className="sidebar">
          <div className="mt-3">
            <Link passHref href="/plants/perenualPlants/perenualApi">
              <Button>Back to Perenual Plants</Button>
            </Link>
          </div>
          <div className="mt-3">
            <Button className="float-left" variant="light" onClick={addThisPlant}>Add Plant to Your List</Button>
          </div>
        </div>
        <div className="single-plant-content-container">
          <div className="information-cards">
            <h1 className="center mb-3">{plant?.common_name}</h1>
            <h2 className="center mb-5">Type: {plant?.type}</h2>
            <div className="center-flex-column">
              <Card className="mb-5" style={{ width: '18rem' }}>
                {plant?.default_image?.regular_url
                  ? <Card.Img variant="top" src={plant?.default_image?.regular_url} style={{ backgroundColor: '#FFF5EA' }} />
                  : <Card.Img className="image" variant="top" src="/plant.png" />}
              </Card>
            </div>
          </div>
          <div className="information-cards">
            <div className="information-cards-container" style={{ paddingRight: '20px' }}>
              <h1 className="center mb-5">Information</h1>
              <div className="center d-flex flex-column">
                <h2 className="mb-4">{plant?.cycle}</h2>
                <h2 className="mb-4">Care Difficulty: {plant?.care_level}</h2>
                <h2 className="mb-4">{`Hardiness Zone(s):
                ${plant?.hardiness?.max === plant?.hardiness?.min
                  ? `${plant?.hardiness?.max}`
                  : `${plant?.hardiness?.max} - ${plant?.hardiness?.min}`}`}
                </h2>
                <h2 className="mb-5">Edible: {plant?.edible_fruit || plant?.edible_leaf ? 'Yes' : 'No'}</h2>
                <h4>{plant?.description}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

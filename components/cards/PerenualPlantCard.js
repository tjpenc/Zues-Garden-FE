import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useAuth } from '../../utils/context/authContext';
import { createPlant } from '../../api/plantData';
import { clientCredentials } from '../../utils/client';

const perenualApiKey = clientCredentials.perenualKey;
export default function PerenualPlantCard({ plantObj }) {
  const { user } = useAuth();

  const createNewPlant = (plant) => {
    const newPlant = {
      uid: user.uid,
      name: plant?.common_name,
      description: plant.description,
      type: plant.type,
      numberPerSquare: -1,
      isOwned: false,
      image: plant.default_image?.regular_url,
      symbol: plant.common_name.slice(0, 2),
    };

    createPlant(newPlant).then(alert(`${plantObj?.common_name} was added to your plants list`));
  };

  const addThisPlant = async () => {
    try {
      const response = await axios.get(`https://perenual.com/api/species/details/${plantObj.id}?key=${perenualApiKey}`);
      createNewPlant(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Card style={{ width: '12rem', position: 'relative' }}>
      {plantObj?.default_image?.regular_url
        ? <Card.Img className="image" variant="top" src={plantObj?.default_image?.regular_url} />
        : <Card.Img className="image" variant="top" src="/plant.png" />}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{plantObj.common_name}</Card.Title>
        <div className="mt-auto border-top">
          <Button className="float-left" variant="light" onClick={addThisPlant}>
            <Card.Img variant="top" src="/plus.png" alt="delete" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
          </Button>
          <Link passHref href={`/plants/perenualPlants/${plantObj.id}`}>
            <Button className="float-right" variant="light">
              <Card.Img variant="top" src="/fast-forward.png" alt="view" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

PerenualPlantCard.propTypes = {
  plantObj: PropTypes.shape({
    id: PropTypes.number,
    common_name: PropTypes.string,
    watering: PropTypes.string,
    default_image: PropTypes.shape({
      regular_url: PropTypes.string,
    }),
    isOwned: PropTypes.bool,
    numberPerSquare: PropTypes.number,
    image: PropTypes.string,
    symbol: PropTypes.string,
    beds: PropTypes.instanceOf(Array),
    hasOpenTasks: PropTypes.bool,
  }).isRequired,
};

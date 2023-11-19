import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deletePlant } from '../../api/plantData';

export default function SmallPlantCard({ plantObj, onUpdate }) {
  const deleteThisPlant = () => deletePlant(plantObj.id).then(onUpdate);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={plantObj.image} />
      <Card.Body>
        <Card.Title>{plantObj.name}</Card.Title>
        <Card.Subtitle>plantObj.type</Card.Subtitle>
        <Card.Text>{plantObj.description}</Card.Text>
        <Card.Text># per Square Foot: {plantObj.numberPerSquare}</Card.Text>
        <Card.Text>{plantObj.isOwned}</Card.Text>
        <Button variant="primary" onClick={deleteThisPlant}>Delete</Button>
        <Link passHref href={`/plants/edit/${plantObj.id}`}>
          <Button variant="primary">Edit Plant</Button>
        </Link>
        <Link passHref href={`/plants/${plantObj.id}`}>
          <Button variant="primary">View Plant</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

SmallPlantCard.propTypes = {
  plantObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    isOwned: PropTypes.bool,
    numberPerSquare: PropTypes.number,
    image: PropTypes.string,
    symbol: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

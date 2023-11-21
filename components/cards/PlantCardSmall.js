import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deletePlant } from '../../api/plantData';

export default function SmallPlantCard({ plantObj, onUpdate }) {
  const deleteThisPlant = () => deletePlant(plantObj.id).then(onUpdate);

  return (
    <Card style={{ width: '12rem' }}>
      <Card.Img className="image" variant="top" src={plantObj.image} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{plantObj.name}</Card.Title>
        <Card.Subtitle className="mb-3">{plantObj.type}</Card.Subtitle>
        <div className="mt-auto border-top">
          <Button className="float-left" variant="light" onClick={deleteThisPlant}>
            <Card.Img variant="top" src="/delete.png" alt="delete" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
          </Button>
          <Link passHref href={`/plants/${plantObj.id}`}>
            <Button className="float-right" variant="light">
              <Card.Img variant="top" src="/fast-forward.png" alt="view" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </Link>
          <Link passHref href={`/plants/edit/${plantObj.id}`}>
            <Button className="float-right" variant="light">
              <Card.Img variant="top" src="/feather-pen.png" alt="edit" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </Link>
        </div>
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

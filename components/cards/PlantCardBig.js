import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { deletePlant } from '../../api/plantData';
import TaskAlert from '../TaskAlert';

export default function BigPlantCard({ plantObj, onUpdate, hasBedPlants }) {
  const [hasTasks, setHasTasks] = useState();

  const deleteThisPlant = () => deletePlant(plantObj.id).then(onUpdate);

  const checkForOpenTasks = () => {
    const hasOpenTasks = plantObj?.tasks?.some((task) => task.isComplete === false);
    setHasTasks(hasOpenTasks);
  };

  useEffect(() => {
    checkForOpenTasks();
  }, [plantObj.id]);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={plantObj.image} />
      {hasTasks ? <TaskAlert isOnPlant /> : ''}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{plantObj.name}</Card.Title>
        <Card.Subtitle>{plantObj.type}</Card.Subtitle>
        <Card.Text>{plantObj.isOwned === true ? '(Owned)' : '(Not owned)' }</Card.Text>
        <Card.Text>Description: {plantObj.description}</Card.Text>
        <Card.Text># per Square Foot: {plantObj.numberPerSquare}</Card.Text>
        {plantObj.isOwned
          ? <Card.Text>Owned</Card.Text>
          : ''}
        <div className="mt-auto border-top">
          {!hasBedPlants
            ? (
              <Button className="float-left" variant="light" onClick={deleteThisPlant}>
                <Card.Img variant="top" src="/delete.png" alt="delete" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
              </Button>
            )
            : ''}
          <Link passHref href={`/plants/edit/${plantObj.id}`}>
            <Button variant="light">
              <Card.Img variant="top" src="/feather-pen.png" alt="edit" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

BigPlantCard.propTypes = {
  plantObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    isOwned: PropTypes.bool,
    numberPerSquare: PropTypes.number,
    image: PropTypes.string,
    symbol: PropTypes.string,
    beds: PropTypes.instanceOf(Array),
    tasks: PropTypes.instanceOf(Array),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  hasBedPlants: PropTypes.bool,
};

BigPlantCard.defaultProps = {
  hasBedPlants: false,
};

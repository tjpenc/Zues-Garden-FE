import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createBedPlant, deleteBedPlant } from '../../api/bedPlantData';

export default function BedPlantCard({
  plantObj,
  bedPlantId,
  bedId,
  onUpdate,
}) {
  const addBedPlant = () => {
    const payload = {
      bedId,
      plantId: plantObj.id,
    };
    createBedPlant(payload).then(onUpdate);
  };

  const deleteThisBedPlant = () => {
    deleteBedPlant(bedPlantId).then(onUpdate);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{plantObj.name}</Card.Title>
        <Card.Subtitle>{plantObj.type}</Card.Subtitle>
        {bedPlantId
          ? (
            <>
              <Button className="mt-3" variant="danger" onClick={deleteThisBedPlant}>Remove from Bed</Button>
            </>
          )
          : <Button className="mt-3" variant="success" onClick={addBedPlant}>Add Plant to Bed</Button>}
      </Card.Body>
    </Card>
  );
}

BedPlantCard.propTypes = {
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
  bedPlantId: PropTypes.number,
  bedId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

BedPlantCard.defaultProps = {
  bedPlantId: 0,
};

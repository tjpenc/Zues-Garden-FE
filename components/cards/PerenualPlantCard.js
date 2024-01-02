import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function PerenualPlantCard({ plantObj }) {
  return (
    <Card style={{ width: '12rem', position: 'relative' }}>
      {plantObj?.default_image?.regular_url
        ? <Card.Img className="image" variant="top" src={plantObj?.default_image?.regular_url} />
        : <Card.Img className="image" variant="top" src="/plant.png" />}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{plantObj.common_name}</Card.Title>
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

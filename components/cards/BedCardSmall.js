import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteBed } from '../../api/bedData';

export default function SmallBedCard({ bedObj, onUpdate }) {
  const deleteThisBed = () => deleteBed(bedObj.id).then(onUpdate);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{bedObj.name}</Card.Title>
        <Card.Subtitle>{bedObj.season} {bedObj.year}</Card.Subtitle>
        <Card.Text>{`${bedObj.width} x ${bedObj.length}`}</Card.Text>
        <Button variant="danger" onClick={deleteThisBed}>Delete</Button>
        <Link passHref href={`/beds/edit/${bedObj.id}`}>
          <Button variant="primary">Edit Bed</Button>
        </Link>
        <Link passHref href={`/beds/${bedObj.id}`}>
          <Button variant="dark">View Bed</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

SmallBedCard.propTypes = {
  bedObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    season: PropTypes.string,
    year: PropTypes.string,
    width: PropTypes.number,
    length: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

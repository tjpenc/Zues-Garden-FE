import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteBed } from '../../api/bedData';

export default function SmallBedCard({ bedObj, onUpdate }) {
  const deleteThisBed = () => deleteBed(bedObj.id).then(onUpdate);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{bedObj.name}</Card.Title>
        <Card.Subtitle>{bedObj.season} {bedObj.year}</Card.Subtitle>
        <Card.Text>{`${bedObj.width} ft. x ${bedObj.length} ft.`}</Card.Text>
        <div className="mt-auto border-top">
          <Button className="float-left" variant="light" onClick={deleteThisBed}>
            <Card.Img variant="top" src="/delete.png" alt="delete" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
          </Button>
          <Link passHref href={`/beds/${bedObj.id}`}>
            <Button className="float-right" variant="light">
              <Card.Img variant="top" src="/fast-forward.png" alt="view" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </Link>
          <Link passHref href={`/beds/edit/${bedObj.id}`}>
            <Button className="float-right" variant="light">
              <Card.Img variant="top" src="/feather-pen.png" alt="edit" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </Link>
        </div>
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

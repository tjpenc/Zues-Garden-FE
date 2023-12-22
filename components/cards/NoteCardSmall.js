import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteNote } from '../../api/notesData';

export default function SmallNoteCard({ noteObj, onUpdate }) {
  const deleteThisNote = () => deleteNote(noteObj.id).then(onUpdate);

  return (
    <Card style={{ width: '12rem' }}>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{noteObj.title}</Card.Title>
        <Card.Text>{noteObj.details}</Card.Text>
        <div className="mt-auto border-top">
          <Button className="float-left" variant="light" onClick={deleteThisNote}>
            <Card.Img variant="top" src="/delete.png" alt="delete" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

SmallNoteCard.propTypes = {
  noteObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    details: PropTypes.string,
    bedId: PropTypes.number,
    plantId: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

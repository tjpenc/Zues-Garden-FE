import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createNote } from '../../api/notesData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  uid: '',
  title: '',
  details: '',
  bedId: null,
  plantId: null,
};

export default function NoteForm({ plantId, bedId, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  console.warn(user.uid);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bedId) {
      formInput.bedId = bedId;
    } else if (plantId) {
      formInput.plantId = plantId;
    }
    formInput.uid = user.uid;
    createNote(formInput).then(onUpdate);
  };

  return (
    <div className="note-form-container">
      <Form className="form-container" onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="title"
            name="title"
            onChange={handleChange}
            value={formInput.title}
            required
          />
        </Form.Group>
        <Form.Group className="mb-5 note-form-details-box" controlId="exampleForm.ControlInput1">
          <Form.Label>Note Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="details"
            value={formInput.details}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="center mt-3">
          <Button type="Submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
}

NoteForm.propTypes = {
  plantId: PropTypes.number,
  bedId: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
};

NoteForm.defaultProps = {
  plantId: 0,
  bedId: 0,
};

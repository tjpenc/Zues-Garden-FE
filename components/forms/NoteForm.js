import { useRouter } from 'next/router';
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

export default function SquareForm({ plantId, bedId }) {
  const [formInput, setFormInput] = useState(initialState);
  const user = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formInput.uid = user.uid;
    if (bedId) {
      formInput.bedId = bedId;
    } else if (plantId) {
      formInput.plantId = plantId;
    }
    createNote(formInput).then(router.back());
  };

  return (
    <>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Form.Group>
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Note Details</Form.Label>
          <Form.Control
            type="text"
            placeholder="details"
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
    </>
  );
}

SquareForm.propTypes = {
  plantId: PropTypes.number,
  bedId: PropTypes.number,
};

SquareForm.defaultProps = {
  plantId: 0,
  bedId: 0,
};

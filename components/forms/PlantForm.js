import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlant, updatePlant } from '../../api/plantData';

const initialState = {
  uid: '',
  name: '',
  description: '',
  type: '',
  numberPerSquare: 1,
  isOwned: false,
  image: '',
  symbol: '',
};

export default function PlantForm({ plantObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  // when a field is filled, need to update state

  useEffect(() => {
    if (plantObj.id) {
      setFormInput(plantObj);
    }
  }, [plantObj.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (plantObj.id) {
      updatePlant(formInput).then(router.push(`/plants/${plantObj.id}`));
    } else {
      formInput.uid = user.uid;
      createPlant(formInput).then(router.push('/plants/plants'));
    }
  };

  return (
    <>
      <Form style={{ width: '50%' }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Plant Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Plant Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type"
            name="type"
            value={formInput.type}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Image"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Number Per Square Foot</Form.Label>
          <Form.Control
            type="number"
            placeholder="# / sq.ft"
            min="1"
            name="numberPerSquare"
            value={formInput.numberPerSquare}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Plant Symbol</Form.Label>
          <Form.Control
            type="text"
            placeholder="Put a symbol for your plant to appear as in your raised beds"
            name="symbol"
            value={formInput.symbol}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="Submit">Submit</Button>
        <Form.Check
          className="mb-3"
          inline
          label="Owned?"
          name="isOwned"
          type="checkbox"
          checked={formInput.isOwned}
          onChange={handleCheckChange}
          id="inline-checkbox-1"
        />
        <div className="center mt-3">
          <Button type="Submit">Submit</Button>
        </div>
      </Form>
    </>
  );
}

PlantForm.propTypes = {
  plantObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    numberPerSquare: PropTypes.number,
    isOwned: PropTypes.bool,
    image: PropTypes.string,
    symbol: PropTypes.string,
  }),
};

PlantForm.defaultProps = {
  plantObj: {
    uid: '',
    name: '',
    description: '',
    type: '',
    numberPerSquare: 1,
    isOwned: false,
    image: '',
    symbol: '',
  },
};

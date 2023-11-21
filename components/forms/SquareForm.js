import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateSquare } from '../../api/squareData';
import { getBedPlants } from '../../api/bedPlantData';

const initialState = {
  plantId: undefined,
  plantQuantity: 1,
  soilType: '',
};

export default function SquareForm({ squareObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [bedPlants, setBedPlants] = useState(null);
  const router = useRouter();
  const soilTypes = ['Loam', 'Sand', 'Clay'];

  useEffect(() => {
    getBedPlants(squareObj?.bedId).then(setBedPlants);
    setFormInput(squareObj);
  }, [squareObj.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSquare(formInput).then(router.push(`/beds/${squareObj.bedId}`));
  };

  return (
    <>
      {console.warn(squareObj)}
      <Form style={{ width: '50%' }} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Plant</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="plantId"
            onChange={handleChange}
            value={formInput.plantId}
            required
          >
            <option value="">Select a Plant</option>
            {bedPlants?.map((bedPlant) => (
              <option key={bedPlant.id} value={bedPlant.plant.id}>{bedPlant.plant.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label># of Plants</Form.Label>
          <Form.Control
            type="number"
            placeholder="# of Plants"
            name="plantQuantity"
            min="1"
            value={formInput.plantQuantity}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Soil Type</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="soilType"
            onChange={handleChange}
            value={formInput.soilType}
            required
          >
            <option value="">Select a Soil Type</option>
            {soilTypes?.map((soilType) => (
              <option key={soilType} value={soilType}>{soilType}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="Submit">Submit</Button>
      </Form>
    </>
  );
}

SquareForm.propTypes = {
  squareObj: PropTypes.shape({
    id: PropTypes.number,
    bedId: PropTypes.number,
    plantId: PropTypes.number,
    plantQuantity: PropTypes.number,
    soilType: PropTypes.string,
    bed: PropTypes.shape({
      plants: PropTypes.instanceOf(Array),
    }),
  }),
};

SquareForm.defaultProps = {
  squareObj: {
    plantId: undefined,
    plantQuantity: 1,
    soilType: '',
  },
};

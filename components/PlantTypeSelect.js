import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function PlantTypeSelect({ selectTypeInput, setSelectTypeInput, plants }) {
  const [plantTypeArray, setPlantTypeArray] = useState([]);

  const handleChange = (e) => {
    setSelectTypeInput(e.target.value.toLowerCase());
  };

  const getPlantTypeArray = () => {
    const removeDuplicates = (array) => array.filter((value, index) => array.indexOf(value) === index);
    const allPlantTypes = [];
    plants.forEach((plant) => allPlantTypes.push(plant.type));
    setPlantTypeArray(removeDuplicates(allPlantTypes));
  };

  useEffect(() => {
    getPlantTypeArray();
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Filter By Type</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="value"
          onChange={handleChange}
          value={selectTypeInput.value}
          required
        >
          <option value="">-</option>
          {plantTypeArray.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  );
}

PlantTypeSelect.propTypes = {
  selectTypeInput: PropTypes.string,
  setSelectTypeInput: PropTypes.func.isRequired,
  plants: PropTypes.instanceOf(Array),
};

PlantTypeSelect.defaultProps = {
  selectTypeInput: '',
  plants: [],
};

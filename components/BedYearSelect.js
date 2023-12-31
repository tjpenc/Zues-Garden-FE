import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function BedYearSelect({ selectBedYear, setSelectBedYear, beds }) {
  const [bedYearArray, setBedYearArray] = useState([]);

  const handleChange = (e) => {
    setSelectBedYear(e.target.value.toLowerCase());
  };

  const getbedYearArray = () => {
    const removeDuplicates = (array) => array.filter((value, index) => array.indexOf(value) === index);
    const allBedYears = [];
    beds.forEach((bed) => allBedYears.push(bed.year));
    setBedYearArray(removeDuplicates(allBedYears));
  };

  useEffect(() => {
    getbedYearArray();
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Filter By Year</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="value"
          onChange={handleChange}
          value={selectBedYear.value}
          required
        >
          <option value="">-</option>
          {bedYearArray.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  );
}

BedYearSelect.propTypes = {
  selectBedYear: PropTypes.string,
  setSelectBedYear: PropTypes.func.isRequired,
  beds: PropTypes.instanceOf(Array),
};

BedYearSelect.defaultProps = {
  selectBedYear: '',
  beds: [],
};

import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default function SearchBar({
  searchInput, setSearchInput, isOnPlant, isOnBed,
}) {
  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  return (
    <Form>
      <Form.Group className="m-3">
        <Form.Label label="Search" className="mb-3">
          <Form.Control
            type="text"
            // eslint-disable-next-line no-nested-ternary
            placeholder={`Search ${isOnPlant ? 'Plants' : (isOnBed ? 'Beds' : 'Tasks')}`}
            name="value"
            value={searchInput.value}
            onChange={handleChange}
            required
          />
        </Form.Label>
      </Form.Group>
    </Form>
  );
}

SearchBar.propTypes = {
  searchInput: PropTypes.string,
  setSearchInput: PropTypes.func.isRequired,
  isOnPlant: PropTypes.bool,
  isOnBed: PropTypes.bool,
};

SearchBar.defaultProps = {
  searchInput: '',
  isOnPlant: false,
  isOnBed: false,
};

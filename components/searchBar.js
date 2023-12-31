import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default function SearchBar({ searchInput, setSearchInput }) {
  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  return (
    <Form>
      <Form.Group className="m-3" controlId="exampleForm.ControlInput1">
        <Form.Label controlId="floatingInput1" label="Search" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search"
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
};

SearchBar.defaultProps = {
  searchInput: '',
};

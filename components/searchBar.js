import PropTypes from 'prop-types';
import { Form, FloatingLabel } from 'react-bootstrap';

export default function SearchBar({ searchInput, setSearchInput }) {
  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  return (
    <Form>
      <FloatingLabel controlId="floatingInput1" label="Search" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search"
          name="value"
          value={searchInput.value}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
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

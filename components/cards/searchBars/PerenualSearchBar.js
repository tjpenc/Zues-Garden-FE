import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default function PerenualSearchBar({ searchInput, setSearchInput, setPageNumber }) {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setSearchInput(e.target.value.toLowerCase());
      setPageNumber(1);
    }
  };

  return (
    <Form onKeyDown={handleKeyDown}>
      <Form.Group className="m-3">
        <Form.Label label="Search" className="mb-3">
          <Form.Control
            type="text"
            // eslint-disable-next-line no-nested-ternary
            placeholder="Search Plants"
            name="value"
            value={searchInput.value}
          />
        </Form.Label>
      </Form.Group>
    </Form>
  );
}

PerenualSearchBar.propTypes = {
  searchInput: PropTypes.string,
  setSearchInput: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
};

PerenualSearchBar.defaultProps = {
  searchInput: '',
};

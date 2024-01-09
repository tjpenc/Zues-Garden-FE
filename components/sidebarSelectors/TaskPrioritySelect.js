import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default function TaskPrioritySelect({ selectPriority, setSelectPriority }) {
  const handleChange = (e) => {
    setSelectPriority(e.target.value.toLowerCase());
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Filter By Priority</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="priority"
          onChange={handleChange}
          value={selectPriority.priority}
          required
        >
          <option value={0}>All</option>
          <option key="high" value={1}>High</option>
          <option key="medium" value={2}>Medium</option>
          <option key="low" value={3}>Low</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
}

TaskPrioritySelect.propTypes = {
  selectPriority: PropTypes.string,
  setSelectPriority: PropTypes.func.isRequired,
};

TaskPrioritySelect.defaultProps = {
  selectPriority: 0,
};

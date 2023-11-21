import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createTask, updateTask } from '../../api/taskData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  uid: '',
  title: '',
  description: '',
  deadline: '',
  priority: 3,
};

export default function TaskForm({ taskObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  // when a field is filled, need to update state

  useEffect(() => {
    if (taskObj.id) {
      const updateState = taskObj;
      updateState.deadline = taskObj.deadline.slice(0, 10);
      setFormInput(updateState);
    }
  }, [taskObj.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskObj.id) {
      updateTask(formInput).then(router.push(`/tasks/${taskObj.id}`));
    } else {
      formInput.uid = user.uid;
      createTask(formInput).then(router.push('/tasks/tasks'));
    }
  };

  return (
    <>
      <Form style={{ width: '50%' }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={formInput.title}
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
        <Form.Group className="mb-3">
          <Form.Label for="start">Deadline: </Form.Label>
          <Form.Control
            type="date"
            id="start"
            name="deadline"
            value={formInput.deadline}
            min={new Date().toJSON().slice(0, 10)}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            type="number"
            placeholder="Priority"
            name="priority"
            min="1"
            max="3"
            // customize this range as a stretch?
            value={formInput.priority}
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

TaskForm.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.instanceOf(Date),
    priority: PropTypes.number,
  }),
};

TaskForm.defaultProps = {
  taskObj: {
    uid: '',
    title: '',
    description: '',
    deadline: '',
    priority: 3,
  },
};

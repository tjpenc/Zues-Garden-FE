import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createTask, updateTask } from '../../api/taskData';
import { useAuth } from '../../utils/context/authContext';
import { getBeds } from '../../api/bedData';
import { getPlants } from '../../api/plantData';

const initialState = {
  uid: '',
  title: '',
  description: '',
  deadline: '',
  priority: 3,
  bedId: null,
  plantId: null,
  squareId: null,
};

export default function TaskForm({ taskObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [beds, setBeds] = useState([]);
  const [plants, setPlants] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  // when a field is filled, need to update state

  useEffect(() => {
    getBeds(user.uid).then((bedsArray) => {
      const currentBeds = bedsArray.filter((bed) => bed.isCurrent === true);
      setBeds(currentBeds);
    });
    getPlants(user.uid).then(setPlants);
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
      <Form className="form-container" onSubmit={handleSubmit}>
        <div className="form-column-container">
          <div className="form-column" style={{ flex: '2', marginRight: '10px' }}>
            <h1 className="center">Required</h1>
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

            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="priority"
                onChange={handleChange}
                value={formInput.priority}
                required
              >
                <option value={undefined}>Select a Priority</option>
                <option key="high" value={1}>High</option>
                <option key="medium" value={2}>Medium</option>
                <option key="low" value={3}>Low</option>
              </Form.Select>
            </Form.Group>

          </div>
          <div className="form-column" style={{ flex: '1' }}>
            <h1 className="center">Optional</h1>
            <Form.Group>
              <Form.Label>Select the Raised Bed this Task is for</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="bedId"
                onChange={handleChange}
                value={formInput.bedId}
                required
              >
                <option value={undefined}>Raised Bed</option>
                {beds?.map((bed) => (
                  <option key={bed.name} value={bed.id}>{bed.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Select the Plant this Task is for</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="plantId"
                onChange={handleChange}
                value={formInput.plantId}
                required
              >
                <option value={undefined}>Plant</option>
                {plants?.map((plant) => (
                  <option key={plant.name} value={plant.id}>{plant.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className="form-submit-button">
          <div className="center mt-3">
            <Button type="Submit">Submit</Button>
          </div>
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

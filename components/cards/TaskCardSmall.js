import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteTask } from '../../api/taskData';

export default function SmallTaskCard({ taskObj, onUpdate }) {
  const deleteThisTask = () => deleteTask(taskObj.id).then(onUpdate);

  const calculateDaysUntilDue = () => {
    const today = new Date().toJSON().slice(0, 10);
    const deadline = taskObj.deadline?.slice(0, 10);
    const daysDifference = (Date.parse(deadline) - Date.parse(today));
    const days = Math.ceil(daysDifference / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysUntilDue = calculateDaysUntilDue();

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{taskObj.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Days Until Due: {daysUntilDue}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Priority: {taskObj.priority}</Card.Subtitle>
        <Card.Text>
          {taskObj.description}
        </Card.Text>
        <Button variant="success">Completed</Button>
        <Button variant="danger" onClick={deleteThisTask}>Delete</Button>
        <Link passHref href={`/tasks/${taskObj.id}`}>
          <Button variant="primary">View</Button>
        </Link>
        <Link passHref href={`/tasks/edit/${taskObj.id}`}>
          <Button variant="dark">Edit</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

SmallTaskCard.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    priority: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

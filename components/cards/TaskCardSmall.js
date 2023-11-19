import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteTask } from '../../api/taskData';

export default function SmallTaskCard({ taskObj, onUpdate }) {
  const deleteThisTask = () => deleteTask(taskObj.id).then(onUpdate);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{taskObj.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{taskObj.deadline.slice(0, 10)}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{taskObj.priority}</Card.Subtitle>
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

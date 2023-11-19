import { Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { completeTask, deleteTask } from '../../api/taskData';

export default function BigTaskCard({ taskObj, onUpdate }) {
  const [isComplete, setIsComplete] = useState(taskObj.isComplete);
  const deleteThisTask = () => deleteTask(taskObj.id).then(onUpdate);
  const completeThisTask = () => completeTask(taskObj.id).then(setIsComplete(true));

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
      {console.warn(taskObj)}
      <Card.Body>
        <Card.Title>{taskObj.title}</Card.Title>
        {isComplete
          ? <Card.Subtitle className="mb-2 text-muted">Completed: {taskObj.dateCompleted?.slice(0, 10)}</Card.Subtitle>
          : (
            <>
              <Card.Subtitle className="mb-2 text-muted">Incomplete</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Priority: {taskObj.priority}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Days Until Due: {daysUntilDue}</Card.Subtitle>
            </>
          )}
        <Card.Subtitle className="mb-2 text-muted">Deadline: {taskObj.deadline?.slice(0, 10)}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Created: {taskObj.dateCreated?.slice(0, 10)}</Card.Subtitle>
        <Card.Text>
          {taskObj.description}
        </Card.Text>
        {isComplete
          ? ''
          : <Button variant="success" onClick={completeThisTask}>Complete Task</Button>}
        <Button variant="danger" onClick={deleteThisTask}>Delete</Button>
        <Link passHref href={`/tasks/edit/${taskObj.id}`}>
          <Button variant="dark">Edit</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

BigTaskCard.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    priority: PropTypes.number,
    dateCreated: PropTypes.string,
    isComplete: PropTypes.bool,
    dateCompleted: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { completeTask, deleteTask } from '../../api/taskData';

export default function SmallTaskCard({ taskObj, onUpdate }) {
  const [isComplete, setIsComplete] = useState(taskObj.isComplete);
  const deleteThisTask = () => deleteTask(taskObj.id).then(onUpdate);
  const completeThisTask = () => completeTask(taskObj.id).then(setIsComplete(true));

  useEffect(() => {
    onUpdate();
  }, [isComplete]);

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
      <Card.Body className="d-flex flex-column">
        <Card.Title>{taskObj.title}</Card.Title>
        {isComplete
          ? <Card.Subtitle className="mb-2 text-muted mt-auto">Completed: {taskObj.dateCompleted?.slice(0, 10)}</Card.Subtitle>
          : (
            <>
              <Card.Subtitle className="mb-2 text-muted">Priority: {taskObj.priority}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Days Until Due: {daysUntilDue}</Card.Subtitle>
            </>
          )}
        <div className="mt-4 mb-3">
          {isComplete
            ? ''
            : <Button variant="success" onClick={completeThisTask}>Complete Task</Button>}
        </div>
        <div className="mt-auto">
          <Button variant="light" onClick={deleteThisTask}>
            <Card.Img variant="top" src="/delete.png" alt="delete" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
          </Button>
          <Link passHref href={`/tasks/edit/${taskObj.id}`}>
            <Button variant="light">
              <Card.Img variant="top" src="/feather-pen.png" alt="edit" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </Link>
          <Link passHref href={`/tasks/${taskObj.id}`}>
            <Button variant="light">
              <Card.Img variant="top" src="/fast-forward.png" alt="view" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </Link>
        </div>
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
    isComplete: PropTypes.bool,
    dateCompleted: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

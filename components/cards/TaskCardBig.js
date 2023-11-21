import { Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { completeTask, deleteTask } from '../../api/taskData';

export default function BigTaskCard({ taskObj, onUpdate }) {
  const [isComplete, setIsComplete] = useState(taskObj.isComplete);
  const [taskCompletionDate, setTaskCompletionDate] = useState(taskObj.dateCompleted);
  const deleteThisTask = () => deleteTask(taskObj.id).then(onUpdate);
  const completeThisTask = () => completeTask(taskObj.id).then((task) => {
    setIsComplete(true);
    setTaskCompletionDate(task.dateCompleted);
  });

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
        <Card.Title>Created {taskObj.dateCreated?.slice(0, 10)}</Card.Title>
        {isComplete
          ? <Card.Subtitle className="mb-2 text-muted">Completed: {taskCompletionDate?.slice(0, 10)}</Card.Subtitle>
          : (
            <>
              <Card.Subtitle className="mb-2 text-muted">Priority: {taskObj.priority}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Deadline: {taskObj.deadline?.slice(0, 10)}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">{daysUntilDue} Days Until Due</Card.Subtitle>
            </>
          )}
        <Card.Text className="border-top mt-3">
          {taskObj.description}
        </Card.Text>
        <div>
          {isComplete
            ? ''
            : <Button variant="success" onClick={completeThisTask}>Complete Task</Button>}
          <Button variant="light" onClick={deleteThisTask}>
            <Card.Img variant="top" src="/delete.png" alt="edit" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
          </Button>
          <Link passHref href={`/tasks/edit/${taskObj.id}`}>
            <Button variant="light">
              <Card.Img variant="top" src="/feather-pen.png" alt="edit" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </Link>
        </div>
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

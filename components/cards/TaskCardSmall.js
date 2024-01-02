import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { completeTask, deleteTask } from '../../api/taskData';

export default function SmallTaskCard({ taskObj, onUpdate }) {
  const [isComplete, setIsComplete] = useState(taskObj.isComplete);
  const [taskColor, setTaskColor] = useState();
  const [priorityString, setPriorityString] = useState();
  const [taskCompletionDate, setTaskCompletionDate] = useState(taskObj.dateCompleted);
  const deleteThisTask = () => deleteTask(taskObj.id).then(onUpdate);
  const completeThisTask = () => completeTask(taskObj.id).then((task) => {
    setIsComplete(true);
    setTaskCompletionDate(task.dateCompleted);
  });

  const setTaskInfo = () => {
    if (taskObj.priority === 1) {
      setTaskColor('red');
      setPriorityString('High');
    } else if (taskObj.priority === 2) {
      setTaskColor('orange');
      setPriorityString('Medium');
    } else if (taskObj.priority === 3) {
      setTaskColor('green');
      setPriorityString('Low');
    }
  };

  useEffect(() => {
    setTaskInfo();
  }, [taskObj.id]);

  useEffect(() => {
    onUpdate();
  }, [isComplete]);

  const calculateDaysUntilDue = () => {
    const today = new Date().toJSON().slice(0, 10);
    const deadline = taskObj.deadline?.slice(0, 10);
    const daysDifference = (Date.parse(deadline) - Date.parse(today));
    const days = Math.ceil(daysDifference / (1000 * 60 * 60 * 24));
    return days + 1;
  };
  const daysUntilDue = calculateDaysUntilDue();

  return (
    <Card style={{ width: '18rem', marginBottom: '5px' }}>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{taskObj.title}</Card.Title>
        {isComplete
          ? <Card.Subtitle className="mb-2 text-muted mt-3">Completed: {taskCompletionDate?.slice(0, 10)}</Card.Subtitle>
          : (
            <>
              <Card.Subtitle className="mb-2 text-muted"><div style={{ color: `${taskColor}` }}>Priority: {priorityString}</div></Card.Subtitle>
              {daysUntilDue >= 0 ? <Card.Subtitle className="mb-2 text-muted">Days Until Due: {daysUntilDue}</Card.Subtitle> : ''}
              {!isComplete && daysUntilDue <= 3 && daysUntilDue >= 0 ? <span style={{ fontWeight: 'bold' }}>Due Soon!</span> : ''}
              {!isComplete && daysUntilDue < 0 ? <p style={{ color: 'red', fontWeight: 'bold' }}>{daysUntilDue * -1} {daysUntilDue === -1 ? 'Day' : 'Days'} Overdue</p> : ''}
            </>
          )}
        <div className="mt-4 mb-3">
          {isComplete
            ? ''
            : <Button variant="success" onClick={completeThisTask}>Complete Task</Button>}
        </div>
        <div className="mt-auto border-top">
          <Button className="float-left" variant="light" onClick={deleteThisTask}>
            <Card.Img variant="top" src="/delete.png" alt="delete" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
          </Button>
          <Link passHref href={`/tasks/${taskObj.id}`}>
            <Button className="float-right" variant="light">
              <Card.Img variant="top" src="/fast-forward.png" alt="view" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </Link>
          <Link passHref href={`/tasks/edit/${taskObj.id}`}>
            <Button className="float-right" variant="light">
              <Card.Img variant="top" src="/feather-pen.png" alt="edit" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
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

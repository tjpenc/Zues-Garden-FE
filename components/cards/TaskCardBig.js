import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { completeTask } from '../../api/taskData';

export default function BigTaskCard({ taskObj }) {
  const [isComplete, setIsComplete] = useState(taskObj.isComplete);
  const [taskCompletionDate, setTaskCompletionDate] = useState(taskObj.dateCompleted);
  const [taskColor, setTaskColor] = useState();
  const [priorityString, setPriorityString] = useState();
  const completeThisTask = () => completeTask(taskObj.id).then((task) => {
    setIsComplete(true);
    setTaskCompletionDate(task.dateCompleted);
  });

  const calculateDaysUntilDue = () => {
    const today = new Date().toJSON().slice(0, 10);
    const deadline = taskObj.deadline?.slice(0, 10);
    const daysDifference = (Date.parse(deadline) - Date.parse(today));
    const days = Math.ceil(daysDifference / (1000 * 60 * 60 * 24));
    return days + 1;
  };
  const daysUntilDue = calculateDaysUntilDue();

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

  return (
    <>
      <h1 className="mb-3">{taskObj.title}</h1>
      {isComplete
        ? (
          <>
            <h2>Completed: {taskCompletionDate?.slice(0, 10)}</h2>
            <h5 className="mt-5">{taskObj.description}</h5>
          </>
        )
        : (
          <>
            <h3>Deadline: {taskObj.deadline?.slice(0, 10)}
              {!isComplete && daysUntilDue < 0
                ? <span style={{ color: 'red', fontWeight: 'bold' }}> {`(${daysUntilDue * -1} ${daysUntilDue === -1 ? 'Day' : 'Days'} Overdue)`}</span>
                : ''}
              {!isComplete && daysUntilDue >= 0
                ? <span> {`(${daysUntilDue} ${daysUntilDue === 1 ? 'Day' : 'Days'})`}</span>
                : ''}
            </h3>
            <h3><div style={{ color: `${taskColor}` }}>Priority: {priorityString}</div></h3>
            <h5 className="mt-5">{taskObj.description}</h5>
            <div className="mt-4 mb-3">
              <Button variant="success" onClick={completeThisTask}>Complete Task</Button>
            </div>
          </>
        )}
    </>
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
};

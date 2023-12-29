import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function TaskAlert({
  isOnPlant, isOnBed, isOnButton, numOfTasks,
}) {
  const [alertClass, setAlertClass] = useState();
  const [hiddenClass, setHiddenClass] = useState();
  const [isHidden, setIsHidden] = useState(true);
  const [hiddenText, setHiddenText] = useState();

  const determineClassName = () => {
    if (isOnPlant) {
      setAlertClass('task-alert-plant');
      setHiddenClass('plant');
    } else if (isOnBed) {
      setAlertClass('task-alert-bed');
      setHiddenClass('bed');
    } else if (isOnButton) {
      setAlertClass('task-alert-button');
      setHiddenClass('button');
    }
  };

  const determineHiddenText = () => {
    if (numOfTasks > 1) {
      setHiddenText(`This item has ${numOfTasks} open tasks`);
    } else {
      setHiddenText('This item has 1 open task');
    }
  };

  useEffect(() => {
    determineClassName();
    determineHiddenText();
  }, []);

  const handleMouseOver = () => {
    setIsHidden(false);
  };

  const handleMouseOut = () => {
    setIsHidden(true);
  };

  return (
    <>
      <div className={isOnButton ? 'task-alert-container' : ''}>
        <Card.Img className={alertClass} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} variant="top" src="/exclamation.png" alt="taskAlert" />
        <div style={{ position: 'relative' }}>
          {isHidden ? '' : <div className={`task-alert-hidden-container-${hiddenClass}`}>{hiddenText}</div>}
        </div>
      </div>
    </>
  );
}

TaskAlert.propTypes = {
  isOnBed: PropTypes.bool,
  isOnPlant: PropTypes.bool,
  isOnButton: PropTypes.bool,
  numOfTasks: PropTypes.number,
};

TaskAlert.defaultProps = {
  isOnBed: false,
  isOnPlant: false,
  isOnButton: false,
  numOfTasks: 1,
};

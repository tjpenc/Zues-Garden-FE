import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function TaskAlert({
  isOnPlant, isOnBed, isOnTitle, numOfTasks,
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
    } else if (isOnTitle) {
      setAlertClass('task-alert-title');
      setHiddenClass('title');
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
      <Card.Img className={alertClass} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} variant="top" src="/exclamation.png" alt="taskAlert" />
      <div style={{ position: 'relative' }}>
        {isHidden ? '' : <div className={`task-alert-hidden-container-${hiddenClass}`}>{hiddenText}</div>}
      </div>
    </>
  );
}

TaskAlert.propTypes = {
  isOnBed: PropTypes.bool,
  isOnPlant: PropTypes.bool,
  isOnTitle: PropTypes.bool,
  numOfTasks: PropTypes.number,
};

TaskAlert.defaultProps = {
  isOnBed: false,
  isOnPlant: false,
  isOnTitle: false,
  numOfTasks: 1,
};

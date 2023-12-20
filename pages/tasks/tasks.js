import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import SmallTaskCard from '../../components/cards/TaskCardSmall';
import { useAuth } from '../../utils/context/authContext';
import { getTasks } from '../../api/taskData';
import Loading from '../../components/Loading';

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [showCompleteTasks, setShowCompleteTasks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const getAllTasks = () => getTasks(user.uid).then((tasksArray) => {
    const completedTasks = tasksArray?.filter((task) => task.isComplete === true);
    const incompletedTasks = tasksArray?.filter((task) => task.isComplete === false);
    if (!showCompleteTasks) {
      setTasks(incompletedTasks);
    } else if (showCompleteTasks) {
      setTasks(completedTasks);
    }
    console.warn('getting all tasks');
  });

  useEffect(() => {
    setTimeout(() => {
      getAllTasks();
      setIsLoading(false);
    }, 300);
  }, [showCompleteTasks]);

  const toggleTasks = () => {
    setShowCompleteTasks((prevState) => !prevState);
  };

  return (
    <>
      {isLoading
        ? <Loading />
        : (
          <>
            <div className="mt-3">
              <Link passHref href="/tasks/createTask">
                <Button>Create Task</Button>
              </Link>
              {!showCompleteTasks ? <Button onClick={toggleTasks}>Completed Tasks</Button> : <Button onClick={toggleTasks}>Upcoming Tasks</Button>}
            </div>
            <h1 className="center mb-5">Upcoming Tasks</h1>
            <div className="space-around mt-3 wrap">
              {tasks?.length === 0
                ? (
                  <>
                    <div>
                      <h2>You have no current tasks! Use the top left button to create a new task</h2>
                    </div>
                  </>
                )
                : tasks?.map((task) => <SmallTaskCard key={task.id} taskObj={task} onUpdate={getAllTasks} />)}
            </div>
          </>
        )}

    </>
  );
}

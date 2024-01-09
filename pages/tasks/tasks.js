import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import SmallTaskCard from '../../components/cards/TaskCardSmall';
import { useAuth } from '../../utils/context/authContext';
import { getTasks } from '../../api/taskData';
import Loading from '../../components/Loading';
import SearchBar from '../../components/cards/searchBars/SearchBar';
import TaskPrioritySelect from '../../components/sidebarSelectors/TaskPrioritySelect';

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [showCompleteTasks, setShowCompleteTasks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [selectPriority, setSelectPriority] = useState('0');
  const { user } = useAuth();

  const sortTasksByDueDate = (array) => {
    const sortedArray = array;
    sortedArray.sort((a, b) => {
      if (a.deadline < b.deadline) {
        return -1;
      }
      if (a.deadline > b.deadline) {
        return 1;
      }
      return 0;
    });
    setTasks(sortedArray);
  };

  const getAllTasks = () => getTasks(user.uid).then((tasksArray) => {
    const completedTasks = tasksArray?.filter((task) => task.isComplete === true);
    const incompletedTasks = tasksArray?.filter((task) => task.isComplete === false);
    if (!showCompleteTasks) {
      sortTasksByDueDate(incompletedTasks);
    } else if (showCompleteTasks) {
      sortTasksByDueDate(completedTasks);
    }
  });

  useEffect(() => {
    getAllTasks();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [showCompleteTasks]);

  const toggleCompleteTaskView = () => {
    setShowCompleteTasks((prevState) => !prevState);
  };

  const searchedTasks = () => {
    const filteredTasks = tasks?.filter((task) => task.title.toLowerCase().includes(searchInput));
    if (selectPriority !== '0') {
      return filteredTasks?.filter((task) => task.priority === Number(selectPriority));
    }
    return filteredTasks;
  };

  return (
    <div className="plants-page">
      {isLoading
        ? <Loading />
        : (
          <>
            <div className="sidebar">
              <div className="mt-3">
                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
              </div>
              <div>
                <TaskPrioritySelect selectPriority={selectPriority} setSelectPriority={setSelectPriority} />
              </div>
              <div className="mt-3">
                {!showCompleteTasks ? <Button onClick={toggleCompleteTaskView}>View Completed Tasks</Button> : <Button onClick={toggleCompleteTaskView}>View Upcoming Tasks</Button>}
              </div>
              <div className="mt-5">
                <Link passHref href="/tasks/createTask">
                  <Button>Create Task</Button>
                </Link>
              </div>
            </div>
            <div className="content-container">
              <h1 className="center mb-5">{showCompleteTasks ? 'Complete' : 'Upcoming'} Tasks</h1>
              <div className="space-around mt-3 wrap">
                {tasks?.length === 0
                  ? (
                    <>
                      <div>
                        <h2>You have no current tasks! Use the Create Task button in the sidebar to add a new task</h2>
                      </div>
                    </>
                  )
                  : searchedTasks()?.map((task) => <SmallTaskCard key={task.id} taskObj={task} onUpdate={getAllTasks} />)}
              </div>
            </div>
          </>
        )}

    </div>
  );
}

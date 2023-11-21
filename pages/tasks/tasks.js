import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import SmallTaskCard from '../../components/cards/TaskCardSmall';
import { useAuth } from '../../utils/context/authContext';
import { getTasks } from '../../api/taskData';

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  const getAllTasks = async () => getTasks(user.uid).then(setTasks);

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <div className="mt-3">
        <Link passHref href="/tasks/createTask">
          <Button>Create Task</Button>
        </Link>
      </div>
      <h1 className="center mb-5">View Tasks</h1>
      <div className="space-around mt-3">
        {tasks?.length === 0
          ? 'No tasks for this user'
          : tasks?.map((task) => <SmallTaskCard key={task.id} taskObj={task} onUpdate={getAllTasks} />)}
      </div>
    </>
  );
}

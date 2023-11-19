import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleTask } from '../../api/taskData';
import BigTaskCard from '../../components/cards/TaskCardBig';

export default function ViewSingleTask() {
  const [task, setTask] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleTask(id).then(setTask);
  }, [id]);

  const pushToTasks = () => router.push('/tasks/tasks');

  return (
    <>
      <div>
        <Link passHref href="/tasks/tasks">
          <Button>Back to Tasks</Button>
        </Link>
        View {task.title}
      </div>
      <div>
        <BigTaskCard key={task.id} taskObj={task} onUpdate={pushToTasks} />
      </div>
    </>
  );
}

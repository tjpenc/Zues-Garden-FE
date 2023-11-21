import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSingleTask } from '../../../api/taskData';
import TaskForm from '../../../components/forms/TaskForm';

export default function EditTask() {
  const [task, setTask] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleTask(id).then(setTask);
  }, [id]);

  return (
    <>
      <div className="mt-3">
        <Link passHref href="/tasks/tasks">
          <Button>Back to Tasks</Button>
        </Link>
      </div>
      <h1 className="center mb-5">Edit Task: {task.title}</h1>
      <div className="center">
        <TaskForm taskObj={task} />
      </div>
    </>
  );
}

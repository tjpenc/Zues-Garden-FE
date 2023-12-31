import { useRouter } from 'next/router';
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
      <div className="plants-page">
        <div className="sidebar">
          <div className="mt-3">
            <Button onClick={() => router.back()}>Back to {task.title}</Button>
          </div>
        </div>
        <div className="content-container">
          <h1 className="center">Edit Task: {task.title}</h1>
          <TaskForm />
        </div>
      </div>
    </>
  );
}

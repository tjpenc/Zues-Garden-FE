import { useRouter } from 'next/router';
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
      <div>
        Edit {task.title}
      </div>
      <div>
        <TaskForm taskObj={task} />
      </div>
    </>
  );
}

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleTask } from '../../api/taskData';
import BigTaskCard from '../../components/cards/TaskCardBig';

export default function ViewSingleTask() {
  const [task, setTask] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleTask(id).then(setTask);
  }, [id]);

  const returnToPrevPage = () => router.back();

  return (
    <>
      <div className="mt-3">
        <Button onClick={returnToPrevPage}>Back</Button>
      </div>
      <h1 className="center mb-5">{task.title}</h1>
      <div className="space-around">
        <BigTaskCard key={task.id} taskObj={task} onUpdate={returnToPrevPage} />
      </div>
    </>
  );
}

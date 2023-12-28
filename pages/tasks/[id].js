import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteTask, getSingleTask } from '../../api/taskData';
import BigTaskCard from '../../components/cards/TaskCardBig';

export default function ViewSingleTask() {
  const [task, setTask] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const deleteThisTask = () => deleteTask(id).then(router.back());

  useEffect(() => {
    getSingleTask(id).then(setTask);
  }, [id]);

  const returnToPrevPage = () => router.back();

  return (
    <>
      <div className="plants-page">
        <div className="sidebar">
          <div className="mt-3">
            <Button onClick={returnToPrevPage}>Back To Tasks</Button>
          </div>
          <div className="mt-3">
            <Link passHref href={`/tasks/edit/${id}`}>
              <Button variant="light">
                <Card.Img variant="top" src="/feather-pen.png" alt="edit" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
              </Button>
            </Link>
          </div>
          <div className="mt-3">
            <Button variant="light" onClick={deleteThisTask}>
              <Card.Img variant="top" src="/delete.png" alt="delete" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </div>
        </div>
        <div className="single-task-content-container">
          <BigTaskCard key={task.id} taskObj={task} onUpdate={returnToPrevPage} />
        </div>
      </div>
    </>
  );
}

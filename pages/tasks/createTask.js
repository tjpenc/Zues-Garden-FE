import Link from 'next/link';
import { Button } from 'react-bootstrap';
import TaskForm from '../../components/forms/TaskForm';

export default function CreateTask() {
  return (
    <>
      <div className="mt-2">
        <Link passHref href="/tasks/tasks">
          <Button>Back to Tasks</Button>
        </Link>
      </div>
      <h1 className="center">Create a Task</h1>
      <div className="center">
        <TaskForm />
      </div>
    </>
  );
}

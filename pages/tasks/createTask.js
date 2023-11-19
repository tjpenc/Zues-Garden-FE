import Link from 'next/link';
import { Button } from 'react-bootstrap';
import TaskForm from '../../components/forms/TaskForm';

export default function CreateTask() {
  return (
    <>
      <div>
        <Link passHref href="/tasks/tasks">
          <Button>Back to Tasks</Button>
        </Link>
        Create a Task
      </div>
      <TaskForm />
    </>
  );
}

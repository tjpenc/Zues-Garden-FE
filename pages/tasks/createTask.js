import Link from 'next/link';
import { Button } from 'react-bootstrap';
import TaskForm from '../../components/forms/TaskForm';

export default function CreateTask() {
  return (
    <div className="plants-page">
      <div className="sidebar">
        <div className="mt-3">
          <Link passHref href="/tasks/tasks">
            <Button>Back to Tasks</Button>
          </Link>
        </div>
      </div>
      <div className="content-container">
        <h1 className="center">Create a Task</h1>
        <TaskForm />
      </div>
    </div>
  );
}

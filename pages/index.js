import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <br />
      <Link passHref href="/plants/plants">
        <Button className="m-3">View Plants</Button>
      </Link>
      <Link passHref href="/beds/beds">
        <Button className="m-3">View Beds</Button>
      </Link>
      <Link passHref href="/tasks/tasks">
        <Button className="m-3">View Tasks</Button>
      </Link>
    </div>
  );
}

export default Home;

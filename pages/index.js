import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { checkUser, postUser } from '../utils/auth';

function Home() {
  const { user } = useAuth();
  checkUser(user.uid).then((userResp) => {
    if (!userResp) {
      const newUser = {
        name: user.displayName,
        uid: user.uid,
      };
      postUser(newUser).then(() => {});
    }
  });

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
      <h6>UID: {user.uid}</h6>
      <br />
      <Link passHref href="/plants/plants">
        <Button variant="primary" className="m-3">View Plants</Button>
      </Link>
      <Link passHref href="/beds/beds">
        <Button variant="primary" className="m-3">View Beds</Button>
      </Link>
      <Link passHref href="/tasks/tasks">
        <Button variant="primary" className="m-3">View Tasks</Button>
      </Link>
    </div>
  );
}

export default Home;

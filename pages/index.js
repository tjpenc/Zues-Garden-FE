import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { checkUser, postUser } from '../utils/auth';
import { getBeds } from '../api/bedData';
import SmallBedCard from '../components/cards/BedCardSmall';
import Loading from '../components/Loading';
import { getTasks } from '../api/taskData';
import SmallTaskCard from '../components/cards/TaskCardSmall';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [beds, setBeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const getAllTasks = () => getTasks(user.uid).then((tasksArray) => {
    const incompletedTasks = tasksArray?.filter((task) => task.isComplete === false);
    setTasks(incompletedTasks);
  });

  const getAllBeds = () => getBeds(user.uid).then((bedsArray) => {
    const currentBeds = bedsArray.filter((bed) => bed.isCurrent === true);
    setBeds(currentBeds);
  });

  useEffect(() => {
    getAllTasks();
    getAllBeds();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <div className="home-page">
      <div className="home-page-intro-container">
        <div className="home-page-welcome-header-container">
          <h1 className="mt-5">Hello {user.displayName}! </h1>
          <h1 className="mt-5">Start Exploring</h1>
        </div>
        <div className="home-page-button-container">
          <div className="d-flex mt-5 justify-content-space-around" style={{ width: '100%' }}>
            <div className="home-page-buttons">
              <h1>Plants</h1>
              <Link passHref href="/plants/createPlant">
                <Button variant="primary" className="m-3">Create a Plant</Button>
              </Link>
              <Link passHref href="/plants/plants">
                <Button variant="primary" className="m-3">View My Plants</Button>
              </Link>
              <Link passHref href="/plants/perenualApi">
                <Button variant="primary" className="m-3">Browse Perenual Plants</Button>
              </Link>
            </div>
            <div className="home-page-buttons">
              <h1>Rasied Beds</h1>
              <Link passHref href="/beds/createBed">
                <Button variant="primary" className="m-3">Create a Raised Bed</Button>
              </Link>
              <Link passHref href="/beds/beds">
                <Button variant="primary" className="m-3">View My Raised Beds</Button>
              </Link>
              <Button
                className="m-3"
                style={{
                  color: '#FFF5EA', backgroundColor: '#FFF5EA', border: 'none', cursor: 'default',
                }}
              >Hidden
              </Button>
            </div>
            <div className="home-page-buttons">
              <h1>Tasks</h1>
              <Link passHref href="/tasks/tasks">
                <Button variant="primary" className="m-3">View My Tasks</Button>
              </Link>
              <Link passHref href="/tasks/createTask">
                <Button variant="primary" className="m-3">Create a Task</Button>
              </Link>
              <Button
                className="m-3"
                style={{
                  color: '#FFF5EA', backgroundColor: '#FFF5EA', border: 'none', cursor: 'default',
                }}
              >Hidden
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page-cards-container">
        {isLoading
          ? <Loading />
          : (
            <>
              <div className="home-page-tasks-container b-border">
                <h1 className="center mb-5 home-page-card-container-headers">Upcoming Tasks</h1>
                <div className="space-around mt-3 wrap">
                  {tasks?.length === 0
                    ? (
                      <>
                        <div>
                          <h2>You have no current tasks! Use the top left button to create a new task</h2>
                        </div>
                      </>
                    )
                    : tasks?.map((task) => <SmallTaskCard key={task.id} taskObj={task} onUpdate={getAllTasks} />)}
                </div>
              </div>
              <div className="home-page-beds-container b-border">
                <h1 className="center mb-5 home-page-card-container-headers">Current Raised Beds</h1>
                <div className="space-around wrap">
                  {beds?.length === 0
                    ? (
                      <>
                        <div>
                          <h2>You have no beds! Use the top left button to create a new bed</h2>
                        </div>
                      </>
                    )
                    : beds?.map((bed) => <SmallBedCard key={bed.id} bedObj={bed} onUpdate={getAllBeds} />)}
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
}

export default Home;

import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { checkUser, postUser } from '../utils/auth';
import { getBeds } from '../api/bedData';
import SmallBedCard from '../components/cards/BedCardSmall';
import { getTasks } from '../api/taskData';
import SmallTaskCard from '../components/cards/TaskCardSmall';
import { getPlants } from '../api/plantData';
import SmallPlantCard from '../components/cards/PlantCardSmall';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [beds, setBeds] = useState([]);
  const [plants, setPlants] = useState([]);
  const [isViewingTasks, setIsViewingTasks] = useState(false);
  const [isViewingBeds, setIsViewingBeds] = useState(false);
  const [isViewingPlants, setIsViewingPlants] = useState(false);
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

  const sortTasksByDueDate = (array) => {
    const sortedArray = array;
    sortedArray.sort((a, b) => {
      if (a.deadline < b.deadline) {
        return -1;
      }
      if (a.deadline > b.deadline) {
        return 1;
      }
      return 0;
    });
    setTasks(sortedArray);
  };

  const getAllTasks = () => getTasks(user.uid).then((tasksArray) => {
    const incompletedTasks = tasksArray?.filter((task) => task.isComplete === false);
    sortTasksByDueDate(incompletedTasks);
  });

  const getAllBeds = () => getBeds(user.uid).then((bedsArray) => {
    const currentBeds = bedsArray.filter((bed) => bed.isCurrent === true);
    setBeds(currentBeds);
  });

  const getAllPlants = () => getPlants(user.uid).then((plantsArray) => {
    const ownedPlants = plantsArray.filter((plant) => plant.isOwned);
    setPlants(ownedPlants);
  });

  const toggleTaskView = () => {
    setIsViewingBeds(false);
    setIsViewingPlants(false);
    setIsViewingTasks((prevState) => !prevState);
  };

  const toggleBedView = () => {
    setIsViewingBeds((prevState) => !prevState);
    setIsViewingPlants(false);
    setIsViewingTasks(false);
  };

  const togglePlantView = () => {
    setIsViewingBeds(false);
    setIsViewingPlants((prevState) => !prevState);
    setIsViewingTasks(false);
  };

  useEffect(() => {
    getAllTasks();
    getAllBeds();
    getAllPlants();
  }, [isViewingTasks, isViewingBeds, isViewingPlants]);

  return (
    <div className="home-page">
      <div className="home-page-intro-container">
        <div className="home-page-welcome-header-container">
          <h1 className="mt-5">Hello {user.displayName}!</h1>
          <div className="d-flex justify-content-center" style={{ width: '100%' }}>
            <div className="d-flex justify-content-around" style={{ width: '100%' }}>
              <Button className="ml-5" onClick={togglePlantView}>Plants Overview</Button>
              <Button onClick={toggleBedView}>Raised Beds Overview</Button>
              <Button onClick={toggleTaskView}>Tasks Overview</Button>
            </div>
          </div>
          <h1 className="mt-5">Start Planning Your Garden</h1>
        </div>
        <div className="home-page-button-container">
          <div className="home-page-buttons">
            <h1>Plants</h1>
            <Link passHref href="/plants/createPlant">
              <Button variant="primary" className="m-3">Create a Plant</Button>
            </Link>
            <Link passHref href="/plants/plants">
              <Button variant="primary" className="m-3">View My Plants</Button>
            </Link>
            <Link passHref href="/plants/perenualPlants/perenualApi">
              <Button variant="primary" className="m-3">Browse More Plants</Button>
            </Link>
          </div>
          <div className="home-page-buttons">
            <h1>Raised Beds</h1>
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
            <Link passHref href="/tasks/createTask">
              <Button variant="primary" className="m-3">Create a Task</Button>
            </Link>
            <Link passHref href="/tasks/tasks">
              <Button variant="primary" className="m-3">View My Tasks</Button>
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
      {isViewingTasks || isViewingBeds || isViewingPlants
        ? (
          <div className="home-page-cards-container">
            <div className="home-page-tasks-container">
              <h1 className="center mb-5 home-page-card-container-headers">
                {isViewingTasks ? 'Upcoming Tasks' : ''}
                {isViewingBeds ? 'Current Raised Beds' : ''}
                {isViewingPlants ? 'My Plants' : ''}
              </h1>
              <div className="space-around mt-3 wrap">
                {isViewingTasks
                  ? (
                    <>
                      {tasks?.length === 0
                        ? (
                          <>
                            <div>
                              <h2>You have no upcoming tasks</h2>
                            </div>
                          </>
                        )
                        : tasks?.map((task) => <SmallTaskCard key={task.id} taskObj={task} onUpdate={getAllTasks} />)}
                    </>
                  )
                  : ''}
                {isViewingPlants
                  ? (
                    <>
                      {plants?.length === 0
                        ? (
                          <>
                            <div>
                              <h2>You have no plants</h2>
                            </div>
                          </>
                        )
                        : plants?.map((plant) => <SmallPlantCard key={plant.id} plantObj={plant} onUpdate={getAllPlants} />)}
                    </>
                  )
                  : ''}
                {isViewingBeds
                  ? (
                    <>
                      {beds?.length === 0
                        ? (
                          <>
                            <div>
                              <h2>You have no raised beds</h2>
                            </div>
                          </>
                        )
                        : beds?.map((bed) => <SmallBedCard key={bed.id} bedObj={bed} onUpdate={getAllBeds} />)}
                    </>
                  )
                  : ''}
              </div>
            </div>
          </div>
        )
        : ''}
    </div>
  );
}

export default Home;

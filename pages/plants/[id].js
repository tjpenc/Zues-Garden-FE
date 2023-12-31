import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { deletePlant, getSinglePlant } from '../../api/plantData';
import BigPlantCard from '../../components/cards/PlantCardBig';
import SmallTaskCard from '../../components/cards/TaskCardSmall';
import NoteForm from '../../components/forms/NoteForm';
import SmallNoteCard from '../../components/cards/NoteCardSmall';
import TaskAlert from '../../components/TaskAlert';

export default function ViewPlant() {
  const [plant, setPlant] = useState({});
  const [hasBedPlants, setHasBedPlants] = useState(false);
  const [isViewingInfo, setIsViewingInfo] = useState(true);
  const [isViewingTasks, setIsViewingTasks] = useState(false);
  const [isViewingNotes, setIsViewingNotes] = useState(false);
  const [isViewingNoteForm, setIsViewingNoteForm] = useState(false);
  const [hasOpenTasks, setHasOpenTasks] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const deleteThisPlant = () => deletePlant(id).then(router.back());

  const toggleInfoView = () => {
    setIsViewingNoteForm(false);
    setIsViewingNotes(false);
    setIsViewingTasks(false);
    setIsViewingInfo((prevState) => !prevState);
  };

  const toggleTaskView = () => {
    setIsViewingNoteForm(false);
    setIsViewingNotes(false);
    setIsViewingInfo(false);
    setIsViewingTasks((prevState) => !prevState);
  };

  const toggleNotesView = () => {
    setIsViewingTasks(false);
    setIsViewingNoteForm(false);
    setIsViewingInfo(false);
    setIsViewingNotes((prevState) => !prevState);
  };

  const toggleNoteFormView = () => {
    setIsViewingNotes(false);
    setIsViewingTasks(false);
    setIsViewingInfo(false);
    setIsViewingNoteForm((prevState) => !prevState);
  };

  const getThisPlant = () => getSinglePlant(id).then((plantObj) => {
    setPlant(plantObj);
    if (plantObj?.beds?.length) {
      setHasBedPlants(true);
    }
    if (isViewingNoteForm === true) {
      toggleNoteFormView();
      toggleNotesView();
    }
    if (plantObj?.tasks?.some((task) => !task.isComplete)) {
      setHasOpenTasks(true);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      getThisPlant();
    }, 300);
  }, [id]);

  const returnToPrevPage = () => router.back();

  return (
    <>
      <div className="plants-page">
        <div className="sidebar">
          <div className="mt-3">
            <Link passHref href="/plants/plants">
              <Button>Back to Plants</Button>
            </Link>
          </div>
          <div className="mt-3">
            <Link passHref href={`/plants/edit/${plant.id}`}>
              <Button variant="light">
                <Card.Img variant="top" src="/feather-pen.png" alt="edit" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
              </Button>
            </Link>
          </div>
          <div className="mt-3">
            <Button className="float-left" variant="light" onClick={deleteThisPlant}>
              <Card.Img variant="top" src="/delete.png" alt="delete" style={{ height: '20px', objectFit: 'cover', borderRadius: '3px' }} />
            </Button>
          </div>
          <div className="mt-3">
            <Button variant="success" onClick={toggleInfoView}>{isViewingInfo ? 'Close' : 'View'} Description</Button>
          </div>
          <div className="mt-3">
            <Button variant="success" onClick={toggleTaskView}>{isViewingTasks ? 'Close' : 'View'} Tasks
              {hasOpenTasks ? <TaskAlert isOnButton /> : ''}
            </Button>
          </div>
          <div className="mt-3">
            <Button variant="success" onClick={toggleNotesView}>{isViewingNotes ? 'Close' : 'View'} Notes</Button>
          </div>
          <div className="mt-3">
            <Button variant="success" onClick={toggleNoteFormView}>{isViewingNoteForm ? 'Close Form' : 'Add Note'}</Button>
          </div>
          <div className="mt-3">
            <Link passHref href="/tasks/createTask">
              <Button>Create A Task</Button>
            </Link>
          </div>
        </div>
        <div className="single-plant-content-container">
          <div className="information-cards">
            <h1 className="center mb-3">{plant.name}</h1>
            <h2 className="center mb-5">{plant.type === 'none' ? '' : plant.type}</h2>
            <div className="center-flex-column">
              <Card className="mb-5" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={plant.image} />
              </Card>
              <h3>{plant.numberPerSquare < 0 ? '' : `Number per Square Foot: ${plant.numberPerSquare}`}</h3>
              <h3 className="mt-3 mb-3">{plant.isOwned === true ? 'Owned' : 'Not owned' }</h3>
            </div>
          </div>
          <div className="information-cards">
            {isViewingInfo
              ? (
                <div className="information-cards-container">
                  <h1 className="center mb-5">Description</h1>
                  <div className="center">
                    <BigPlantCard key={plant.id} plantObj={plant} onUpdate={returnToPrevPage} hasBedPlants={hasBedPlants} />
                  </div>
                </div>
              )
              : ''}
            {isViewingTasks
              ? (
                <div className="information-cards-container">
                  <h1 className="center mb-5">Tasks</h1>
                  {plant?.tasks?.some((task) => task.isComplete === false)
                    ? (
                      <>
                        {plant?.tasks?.map((task) => <SmallTaskCard key={task.id} taskObj={task} onUpdate={() => {}} />)}
                      </>
                    ) : 'There are no open tasks'}
                </div>
              ) : ''}
            {isViewingNotes
              ? (
                <div className="information-cards-container">
                  <h1 className="mb-5">Notes</h1>
                  <div className="space-around wrap" style={{ width: '100%' }}>
                    {plant?.notes?.map((note) => <SmallNoteCard key={note.id} noteObj={note} onUpdate={getThisPlant} />)}
                  </div>
                </div>
              ) : ''}
            {isViewingNoteForm
              ? (
                <div className="information-cards-container">
                  <h1 className="mb-5">Create a New Note</h1>
                  <NoteForm plantId={id} onUpdate={getThisPlant} />
                </div>

              ) : ''}
          </div>
        </div>
      </div>
    </>
  );
}

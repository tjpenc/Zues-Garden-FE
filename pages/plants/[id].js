import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSinglePlant } from '../../api/plantData';
import BigPlantCard from '../../components/cards/PlantCardBig';
import SmallTaskCard from '../../components/cards/TaskCardSmall';
import NoteForm from '../../components/forms/NoteForm';
import SmallNoteCard from '../../components/cards/NoteCardSmall';

export default function ViewPlant() {
  const [plant, setPlant] = useState({});
  const [hasBedPlants, setHasBedPlants] = useState(false);
  const [isViewingTasks, setIsViewingTasks] = useState(false);
  const [isViewingNotes, setIsViewingNotes] = useState(false);
  const [isViewingNoteForm, setIsViewingNoteForm] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const toggleTaskView = () => {
    setIsViewingNoteForm(false);
    setIsViewingNoteForm(false);
    setIsViewingTasks((prevState) => !prevState);
  };

  const toggleNotesView = () => {
    setIsViewingTasks(false);
    setIsViewingNoteForm(false);
    setIsViewingNotes((prevState) => !prevState);
  };

  const toggleNoteFormView = () => {
    setIsViewingNotes(false);
    setIsViewingTasks(false);
    setIsViewingNoteForm((prevState) => !prevState);
  };

  const getThisPlant = () => getSinglePlant(id).then((plantObj) => {
    setPlant(plantObj);
    if (plantObj.beds.length) {
      setHasBedPlants(true);
    }
    if (isViewingNoteForm === true) {
      toggleNoteFormView();
    }
  });

  useEffect(() => {
    getThisPlant();
  }, [id]);

  const returnToPrevPage = () => router.back();

  return (
    <>
      <div className="plants-page">
        <div className="sidebar">
          Options
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
            <Button variant="success" onClick={toggleTaskView}>{isViewingTasks ? 'Close' : 'View'} Tasks</Button>
          </div>
          <div className="mt-3">
            <Button variant="success" onClick={toggleNotesView}>{isViewingNotes ? 'Close' : 'View'} Notes</Button>
          </div>
          <div className="mt-3">
            <Button variant="success" onClick={toggleNoteFormView}>{isViewingNoteForm ? 'Close Form' : 'Add Note'}</Button>
          </div>
        </div>
        <div className="single-plant-content-container">
          <div className="plant-notes">
            <h1 className="center mb-5">{plant.name}</h1>
            <div className="center">
              <BigPlantCard key={plant.id} plantObj={plant} onUpdate={returnToPrevPage} hasBedPlants={hasBedPlants} />
            </div>
          </div>
          <div className="plant-notes">
            {isViewingTasks && plant?.tasks?.some((task) => task.isComplete === false)
              ? (
                <>
                  {plant?.tasks?.map((task) => <SmallTaskCard key={task.id} taskObj={task} onUpdate={() => {}} />)}
                </>
              ) : ''}
            {isViewingNotes
              ? (
                <>
                  {plant?.notes?.map((note) => <SmallNoteCard key={note.id} noteObj={note} onUpdate={getThisPlant} />)}
                </>
              ) : ''}
            {isViewingNoteForm
              ? (
                <NoteForm plantId={id} onUpdate={getThisPlant} />
              ) : ''}
          </div>
        </div>
      </div>
    </>
  );
}

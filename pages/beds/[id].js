import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSingleBed } from '../../api/bedData';
import SquareCard from '../../components/cards/SquareCard';
import BedPlantCard from '../../components/cards/BedPlantCard';
import Loading from '../../components/Loading';
import { removeAllSquareInfo, removeSquareInfo, updateSquare } from '../../api/squareData';
import TaskAlert from '../../components/TaskAlert';
import SmallTaskCard from '../../components/cards/TaskCardSmall';
import NoteForm from '../../components/forms/NoteForm';
import SmallNoteCard from '../../components/cards/NoteCardSmall';

export default function ViewPlant() {
  const [bed, setBed] = useState({});
  const [selectedPlant, setSelectedPlant] = useState({});
  const [isRemovingPlants, setIsRemovingPlants] = useState(false);
  const [isViewingBedPlants, setIsViewingBedPlants] = useState(true);
  const [isViewingTasks, setIsViewingTasks] = useState(false);
  const [isViewingNotes, setIsViewingNotes] = useState(false);
  const [isViewingNoteForm, setIsViewingNoteForm] = useState(false);
  const [hasOpenTasks, setHasOpenTasks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const id = parseInt(router.query.id, 10);

  const toggleBedPlantView = () => {
    setIsViewingNoteForm(false);
    setIsViewingNotes(false);
    setIsViewingTasks(false);
    setIsViewingBedPlants((prevState) => !prevState);
  };

  const toggleTaskView = () => {
    setIsViewingNoteForm(false);
    setIsViewingNotes(false);
    setIsViewingBedPlants(false);
    setIsViewingTasks((prevState) => !prevState);
  };

  const toggleNotesView = () => {
    setIsViewingNoteForm(false);
    setIsViewingBedPlants(false);
    setIsViewingTasks(false);
    setIsViewingNotes((prevState) => !prevState);
  };

  const toggleNoteFormView = () => {
    setIsViewingBedPlants(false);
    setIsViewingTasks(false);
    setIsViewingNotes(false);
    setIsViewingNoteForm((prevState) => !prevState);
  };

  const getThisBed = () => getSingleBed(id).then((bedObj) => {
    setBed(bedObj);
    setIsLoading(false);
    if (isViewingNoteForm === true) {
      toggleNoteFormView();
      toggleNotesView();
    }
    if (bedObj.tasks.some((task) => !task.isComplete)) {
      setHasOpenTasks(true);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      getThisBed();
    }, 300);
  }, []);

  const handleSquareClick = (squareObj) => {
    if (selectedPlant) {
      const plant = {
        id: squareObj.id,
        plantId: selectedPlant.id,
        plantQuantity: selectedPlant.plantQuantity,
        soilType: squareObj.soilType,
      };
      updateSquare(plant).then(getThisBed);
    } else {
      removeSquareInfo(squareObj.id).then(getThisBed);
    }
  };

  const handleRemovePlantClick = () => {
    setSelectedPlant({});
    if (isRemovingPlants === true) {
      setIsRemovingPlants(false);
    } else {
      setIsRemovingPlants(true);
    }
  };

  const handleBedPlantCardClick = (plant) => {
    setIsRemovingPlants(false);
    if (selectedPlant.name === plant.name) {
      setSelectedPlant({});
    } else {
      setSelectedPlant(plant);
    }
  };

  const clearBed = () => {
    setIsRemovingPlants(false);
    setSelectedPlant({});
    removeAllSquareInfo(bed.id).then(getThisBed);
  };

  return (
    <>
      {isLoading
        ? <Loading />
        : (
          <>
            <div className="plants-page">
              <div className="sidebar">
                <div className="mt-3">
                  <Link passHref href="/beds/beds">
                    <Button>Back to Beds</Button>
                  </Link>
                </div>
                <div className="mt-3">
                  <Button onClick={clearBed}>Clear Bed</Button>
                </div>
                <div className="mt-3">
                  <Link passHref href={`/beds/addPlants/${id}`}>
                    <Button variant="success">Add Plants to Bed</Button>
                  </Link>
                </div>
                <div className="mt-3">
                  <Button variant="success" onClick={toggleBedPlantView}>{isViewingBedPlants ? 'Close' : 'View'} Beds Plants</Button>
                </div>
                <div className="mt-3 center">
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
              </div>
              <div className="single-plant-content-container">
                <div className="bed-bedplant-container">
                  {isViewingBedPlants
                    ? (
                      <>
                        {bed?.plants?.length
                          ? (
                            <>
                              <div className="center mb-3"><h3>Available Plants</h3></div>
                              <div className="space-around flex-column">
                                {bed?.plants?.map((plant) => {
                                  const bedPlant = bed.bedPlants.find((bp) => bp.plantId === plant.id);
                                  return (
                                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                                    <div className="mb-3" key={plant.id} onClick={() => handleBedPlantCardClick(plant)} onKeyDown={() => handleBedPlantCardClick(plant)}>
                                      <BedPlantCard plantObj={plant} bedPlantId={bedPlant.id} bedId={id} onUpdate={getThisBed} isOnBedPage isSelected={plant.id === selectedPlant.id} />
                                    </div>
                                  );
                                })}
                                <Card
                                  onClick={handleRemovePlantClick}
                                  className={`${isRemovingPlants ? 'selectedBedPlant' : 'bedPlantContainer'}`}
                                  style={{ width: '18rem' }}
                                >
                                  <Card.Body>
                                    <Card.Title>Empty Square</Card.Title>
                                    <Card.Subtitle>Click on a square to remove a plant</Card.Subtitle>
                                  </Card.Body>
                                </Card>
                              </div>
                            </>
                          )
                          : (
                            <>
                              <div className="center">
                                <h5>You dont have any plants for this bed!</h5>
                              </div>
                              <div className="flex-column">
                                <div className="mb-3">
                                  <Link passHref href={`/beds/addPlants/${id}`}>
                                    <Button variant="success">Add Plants to {bed.name}</Button>
                                  </Link>
                                </div>
                                <div className="mb-3">
                                  <Link passHref href="/plants/createPlant">
                                    <Button variant="success">Create a New Plant</Button>
                                  </Link>
                                </div>
                              </div>
                            </>
                          )}
                      </>
                    )
                    : ''}
                  {isViewingTasks
                    ? (
                      <>
                        {bed?.tasks?.some((task) => task.isComplete === false)
                          ? (
                            <div className="information-cards-container">
                              <h1 className="center mb-5">Tasks</h1>
                              {bed?.tasks?.map((task) => <SmallTaskCard key={task.id} taskObj={task} onUpdate={getThisBed} />)}
                            </div>
                          ) : (
                            <>
                              <h1 className="center mb-5">Tasks</h1>
                              <div className="center">There are no open tasks</div>
                            </>
                          )}
                      </>
                    )
                    : ''}
                  {isViewingNotes
                    ? (
                      <div className="information-cards-container">
                        <h1 className="center mb-5">Notes</h1>
                        {bed?.notes?.map((note) => <SmallNoteCard key={note.id} noteObj={note} onUpdate={getThisBed} />)}
                      </div>
                    ) : ''}
                  {isViewingNoteForm
                    ? (
                      <div className="information-cards-container" style={{ overflowY: 'hidden' }}>
                        <h1 className="center mb-5">Create a Note</h1>
                        <NoteForm bedId={id} onUpdate={getThisBed} />
                      </div>
                    ) : ''}
                </div>
                <div className="bed-squares-container">
                  <h1 className="center" style={{ position: 'relative' }}>{bed.name}</h1>
                  <div className="center">
                    <div className="square-container" style={{ width: `${bed.length * 10 + 1.5}vh` }}>
                      {/* As long as viewport height is not too small, the raised bed should create correctly, replace with % later on */}
                      {bed?.squares?.map((square) => (
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                        <div key={square.id} onClick={() => handleSquareClick(square)} onKeyDown={() => handleSquareClick(square)}>
                          <SquareCard squareObj={square} bedWidth={bed.width} bedLength={bed.length} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
}

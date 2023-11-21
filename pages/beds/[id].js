import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSingleBed } from '../../api/bedData';
import SquareCard from '../../components/cards/SquareCard';
import BedPlantCard from '../../components/cards/BedPlantCard';

export default function ViewPlant() {
  const [bed, setBed] = useState({});
  const router = useRouter();
  const id = parseInt(router.query.id, 10);

  const getThisBed = async () => getSingleBed(id).then(setBed);

  useEffect(() => {
    getSingleBed(id).then(setBed);
  }, [id]);

  // const pushToBeds = () => router.push('/beds/beds');

  return (
    <>
      <div className="space-between mt-3">
        <Link passHref href="/beds/beds">
          <Button>Back to Beds</Button>
        </Link>
        <Link passHref href={`/beds/addPlants/${id}`}>
          <Button variant="success">Add Plants to Bed</Button>
        </Link>
      </div>
      <h1 className="center">{bed.name}</h1>
      <div className="center">
        <div className="square-container" style={{ width: `${bed.length * 10 + 2}vh` }}>
          {/* As long as viewport height is not too small, the raised bed should create correctly, replace with % later on */}
          {bed?.squares?.map((square) => <SquareCard key={square.id} squareObj={square} bedWidth={bed.width} bedLength={bed.length} />)}
        </div>
      </div>
      <div>
        {bed?.plants?.length
          ? (
            <>
              <div className="center m-5"><h3>Available Plants</h3></div>
              <div className="space-around">
                {bed?.plants?.map((plant) => {
                  const bedPlant = bed.bedPlants.find((bp) => bp.plantId === plant.id);
                  return <BedPlantCard key={plant.id} plantObj={plant} bedPlantId={bedPlant.id} bedId={id} onUpdate={getThisBed} isSingleBedView />;
                })}
              </div>
            </>
          )
          : (
            <>
              <div className="center">
                <h1>Looks like you dont have any plants for this bed!</h1>
              </div>
              <div className="center">
                <h2>Why not add some?</h2>
              </div>
              <div className="space-evenly">
                <Link passHref href={`/beds/addPlants/${id}`}>
                  <Button variant="success">Add Plants to {bed.name}</Button>
                </Link>
                <Link passHref href="/plants/createPlant">
                  <Button variant="success">Create a New Plant</Button>
                </Link>
              </div>
            </>
          )}
      </div>
    </>
  );
}

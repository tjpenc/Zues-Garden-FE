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

  const getThisBed = () => getSingleBed(id).then((bedObj) => {
    setBed(bedObj);
  });

  useEffect(() => {
    getThisBed();
  }, [id]);

  // const pushToBeds = () => router.push('/beds/beds');

  return (
    <>
      <div>
        <h1 className="space-around">
          View {bed.name}
          <span>
            <Link passHref href="/beds/beds">
              <Button>Back to Beds</Button>
            </Link>
          </span>
          <span>
            <Link passHref href={`/beds/addPlants/${id}`}>
              <Button>Add Plants to Bed</Button>
            </Link>
          </span>
        </h1>
      </div>
      <div className="center">
        <div className="square-container" style={{ width: `${bed.length * 10 + 1}vh` }}>
          {/* As long as viewport height is not too small, the raised bed should create correctly, replace with % later on */}
          {bed?.squares?.map((square) => <SquareCard key={square.id} squareObj={square} bedWidth={bed.width} bedLength={bed.length} />)}
        </div>
      </div>
      <div>
        {bed?.plants?.length
          ? (
            <>
              <div className="center margin-5"><h3>Plants Available</h3></div>
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
                <h1>Looks like there are no plants for this bed!</h1>
              </div>
              <div className="center">
                <h2>Why not add some?</h2>
              </div>
              <div className="space-around margin-5">
                <Link passHref href={`/beds/addPlants/${id}`}>
                  <Button>Add Plants to Bed</Button>
                </Link>
                <Link passHref href="/plants/createPlant">
                  <Button>Create a New Plant</Button>
                </Link>
              </div>
            </>
          )}
      </div>
    </>
  );
}

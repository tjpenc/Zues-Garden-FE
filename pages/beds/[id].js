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

  const getThisBed = () => getSingleBed(id).then(setBed);

  useEffect(() => {
    getThisBed();
  }, [id]);

  // const pushToBeds = () => router.push('/beds/beds');

  return (
    <>
      <div>
        <Link passHref href="/beds/beds">
          <Button>Back to Beds</Button>
        </Link>
        View {bed.name}
      </div>
      <div className="center">
        <div className="square-container" style={{ width: `${bed.length * 10 + 1}vh` }}>
          {/* As long as viewport height is not too small, the raised bed should create correctly, replace with % later on */}
          {bed?.squares?.map((square) => <SquareCard key={square.id} squareObj={square} bedWidth={bed.width} bedLength={bed.length} />)}
        </div>
      </div>
      <div>
        {bed?.plants?.map((plant) => <BedPlantCard key={plant.id} plantObj={plant} bedId={id} bedPlantId={1} onUpdate={getThisBed} isSingleBedView />)}
      </div>
    </>
  );
}

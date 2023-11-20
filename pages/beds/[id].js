import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSingleBed } from '../../api/bedData';
import SquareCard from '../../components/cards/SquareCard';

export default function ViewPlant() {
  const [bed, setBed] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleBed(id).then(setBed);
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
      <div className="square-container">
        {bed?.squares?.map((square) => <SquareCard key={square.id} squareObj={square} bedWidth={bed.width} bedLength={bed.length} />)}
      </div>
    </>
  );
}

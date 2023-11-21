import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import SquareForm from '../../../components/forms/SquareForm';
import { getSingleSquare } from '../../../api/squareData';

export default function EditSquare() {
  const [square, setSquare] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleSquare(id).then(setSquare);
  }, [id]);

  return (
    <>
      <div className="mt-2">
        <Link passHref href={`/beds/${square.bedId}`}>
          <Button>Back to Bed</Button>
        </Link>
      </div>
      <h1 className="center">Add Plant Info</h1>
      <div className="center">
        <SquareForm key={square.id} squareObj={square} />
      </div>
    </>
  );
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
      <div>
        <SquareForm key={square.id} squareObj={square} />
      </div>
    </>
  );
}

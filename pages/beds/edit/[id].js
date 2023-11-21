import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSingleBed } from '../../../api/bedData';
import BedForm from '../../../components/forms/BedForm';

export default function EditPlant() {
  const [bed, setBed] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleBed(id).then(setBed);
  }, [id]);

  return (
    <>
      <div className="mt-2">
        <Link passHref href="/beds/beds">
          <Button>Back to Beds</Button>
        </Link>
      </div>
      <h1 className="center">Edit {bed.name}</h1>
      <div className="center">
        <BedForm bedObj={bed} />
      </div>
    </>
  );
}

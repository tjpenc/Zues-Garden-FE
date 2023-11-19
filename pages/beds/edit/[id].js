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
      <div>
        <Link passHref href="/beds/beds">
          <Button>Back to Beds</Button>
        </Link>
        Edit {bed.name}
      </div>
      <div>
        <BedForm bedObj={bed} />
      </div>
    </>
  );
}

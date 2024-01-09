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
      <div className="plants-page">
        <div className="sidebar">
          <div className="mt-3">
            <Link passHref href={`/beds/${id}`}>
              <Button>Back to Bed</Button>
            </Link>
          </div>
        </div>
        <div className="content-container">
          <h1 className="center mb-5">Edit {bed.name} Raised Bed</h1>
          <BedForm bedObj={bed} />
        </div>
      </div>
    </>
  );
}

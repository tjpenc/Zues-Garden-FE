import Link from 'next/link';
import { Button } from 'react-bootstrap';
import BedForm from '../../components/forms/BedForm';

export default function CreateBed() {
  return (
    <>
      <div className="mt-3">
        <Link passHref href="/beds/beds">
          <Button>Back to Beds</Button>
        </Link>
      </div>
      <h1 className="center mb-5">Create a Bed</h1>
      <div className="center">
        <BedForm />
      </div>
    </>
  );
}

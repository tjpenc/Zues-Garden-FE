import Link from 'next/link';
import { Button } from 'react-bootstrap';
import BedForm from '../../components/forms/BedForm';

export default function CreateBed() {
  return (
    <>
      <div>
        <Link passHref href="/beds/beds">
          <Button>Back to Beds</Button>
        </Link>
        Create a Bed
      </div>
      <BedForm />
    </>
  );
}

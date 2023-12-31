import Link from 'next/link';
import { Button } from 'react-bootstrap';
import BedForm from '../../components/forms/BedForm';

export default function CreateBed() {
  return (
    <div className="plants-page">
      <div className="sidebar">
        <div className="mt-3">
          <Link passHref href="/beds/beds">
            <Button>Back to Beds</Button>
          </Link>
        </div>
      </div>
      <div className="content-container">
        <h1 className="center mb-5">Create a Raised Bed</h1>
        <BedForm />
      </div>
    </div>
  );
}

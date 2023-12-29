import Link from 'next/link';
import { Button } from 'react-bootstrap';
import PlantForm from '../../components/forms/PlantForm';

export default function CreatePlant() {
  return (
    <div className="plants-page">
      <div className="sidebar">
        <div className="mt-3">
          <Link passHref href="/plants/plants">
            <Button>Back to Plants</Button>
          </Link>
        </div>
      </div>
      <div className="content-container">
        <h1 className="center mb-5">Create a Plant</h1>
        <PlantForm />
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Button } from 'react-bootstrap';
import PlantForm from '../../components/forms/PlantForm';

export default function CreatePlant() {
  return (
    <>
      <div className="mt-3">
        <Link passHref href="/plants/plants">
          <Button>Back to Plants</Button>
        </Link>
      </div>
      <h1 className="center mb-5">Create a Plant</h1>
      <div className="center">
        <PlantForm />
      </div>
    </>
  );
}

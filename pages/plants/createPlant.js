import Link from 'next/link';
import { Button } from 'react-bootstrap';
import PlantForm from '../../components/forms/PlantForm';

export default function CreateTask() {
  return (
    <>
      <div>
        <Link passHref href="/plants/plants">
          <Button>Back to Plants</Button>
        </Link>
        Create a Plant
      </div>
      <PlantForm />
    </>
  );
}

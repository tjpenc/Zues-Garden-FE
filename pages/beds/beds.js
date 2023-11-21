import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getBeds } from '../../api/bedData';
import SmallBedCard from '../../components/cards/BedCardSmall';

export default function ViewBeds() {
  const [beds, setBeds] = useState([]);
  const { user } = useAuth();

  const getAllBeds = async () => getBeds(user.uid).then(setBeds);

  useEffect(() => {
    getAllBeds();
  }, []);

  return (
    <>
      <div className="mt-3">
        <Link passHref href="/beds/createBed">
          <Button>Create Bed</Button>
        </Link>
      </div>
      <h1 className="center mb-5">Beds</h1>
      <div className="space-around">
        {beds?.map((bed) => <SmallBedCard key={bed.id} bedObj={bed} onUpdate={getAllBeds} />)}
      </div>
    </>
  );
}

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getBeds } from '../../api/bedData';
import SmallBedCard from '../../components/cards/BedCardSmall';

export default function ViewBeds() {
  const [beds, setBeds] = useState([]);
  const { user } = useAuth();

  const getAllBeds = () => getBeds(user.uid).then(setBeds);

  useEffect(() => {
    getAllBeds();
  }, []);

  return (
    <>
      <div>
        View All Beds
      </div>
      <div>
        <Link passHref href="/beds/createBed">
          <Button>Create Bed</Button>
        </Link>
      </div>
      <div>
        {beds?.map((bed) => <SmallBedCard key={bed.id} bedObj={bed} onUpdate={getAllBeds} />)}
      </div>
    </>
  );
}

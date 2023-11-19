import { useEffect, useState } from 'react';
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
        {beds?.map((bed) => <SmallBedCard key={bed.id} bedObj={bed} onUpdate={getAllBeds} />)}
      </div>
    </>
  );
}

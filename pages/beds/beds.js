import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getBeds } from '../../api/bedData';
import SmallBedCard from '../../components/cards/BedCardSmall';
import Loading from '../../components/Loading';

export default function ViewBeds() {
  const [beds, setBeds] = useState([]);
  const [showCurrentBeds, setShowCurrentBeds] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const getAllBeds = () => getBeds(user.uid).then((bedsArray) => {
    if (showCurrentBeds) {
      const currentBeds = bedsArray.filter((bed) => bed.isCurrent === true);
      setBeds(currentBeds);
    } else if (!showCurrentBeds) {
      const oldBeds = bedsArray.filter((bed) => bed.isCurrent === false);
      setBeds(oldBeds);
    }
  });

  useEffect(() => {
    getAllBeds();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [showCurrentBeds]);

  const toggleBeds = () => {
    setShowCurrentBeds((prevState) => !prevState);
  };

  return (
    <>
      {isLoading
        ? <Loading />
        : (
          <>
            <div className="mt-3">
              <Link passHref href="/beds/createBed">
                <Button>Create Bed</Button>
              </Link>
              {showCurrentBeds ? <Button onClick={toggleBeds}>Older Beds</Button> : <Button onClick={toggleBeds}>Current Beds</Button>}
            </div>
            <h1 className="center mb-5">My Beds</h1>
            <div className="space-around wrap">
              {beds?.length === 0
                ? (
                  <>
                    <div>
                      <h2>You have no beds! Use the top left button to create a new bed</h2>
                    </div>
                  </>
                )
                : beds?.map((bed) => <SmallBedCard key={bed.id} bedObj={bed} onUpdate={getAllBeds} />)}
            </div>
          </>
        )}

    </>
  );
}

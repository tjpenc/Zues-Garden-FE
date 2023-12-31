import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getBeds } from '../../api/bedData';
import SmallBedCard from '../../components/cards/BedCardSmall';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import BedYearSelect from '../../components/sidebarSelectors/BedYearSelect';

export default function ViewBeds() {
  const [beds, setBeds] = useState([]);
  const [showCurrentBeds, setShowCurrentBeds] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [selectBedYear, setSelectBedYear] = useState(0);
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

  const searchedBeds = () => {
    const filteredBeds = beds?.filter((bed) => bed.name.toLowerCase().includes(searchInput));
    if (selectBedYear) {
      return filteredBeds?.filter((bed) => bed.year.toLowerCase().includes(selectBedYear));
    }
    return filteredBeds;
  };

  return (
    <div className="plants-page">
      {isLoading
        ? <Loading />
        : (
          <>
            <div className="sidebar">
              <div className="mt-3">
                <Link passHref href="/beds/createBed">
                  <Button>Create Bed</Button>
                </Link>
              </div>
              <div className="mt-3">
                {showCurrentBeds ? <Button onClick={toggleBeds}>View Old Beds</Button> : <Button onClick={toggleBeds}>View Current Beds</Button>}
              </div>
              <div className="mt-3">
                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} isOnBed />
              </div>
              <div className="mt-3">
                <BedYearSelect selectBedYear={selectBedYear} setSelectBedYear={setSelectBedYear} beds={beds} />
              </div>
            </div>
            <div className="content-container">
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
                  : searchedBeds()?.map((bed) => <SmallBedCard key={bed.id} bedObj={bed} onUpdate={getAllBeds} />)}
              </div>
            </div>
          </>
        )}

    </div>
  );
}

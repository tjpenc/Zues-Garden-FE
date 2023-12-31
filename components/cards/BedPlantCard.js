/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { createBedPlant, deleteBedPlant } from '../../api/bedPlantData';
import { updatePlantSymbol } from '../../api/plantData';

export default function BedPlantCard({
  plantObj,
  bedPlantId,
  bedId,
  onUpdate,
  isSelected,
  isOnBedPage,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState();
  const newRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (!newRef.current.contains(e.target)) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  const addBedPlant = () => {
    const payload = {
      bedId,
      plantId: plantObj.id,
    };
    createBedPlant(payload).then(onUpdate);
  };

  const deleteThisBedPlant = () => {
    deleteBedPlant(bedPlantId).then(onUpdate);
  };

  const handleSymbolChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSymbolSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    const payload = { id: plantObj.id, symbol: e.target[0].value };
    console.warn(payload);
    updatePlantSymbol(payload).then(onUpdate);
  };

  return (
    <>
      {isOnBedPage
        ? (
          <Card
            className={`${isSelected ? 'selectedBedPlant' : 'bedPlantContainer'}`}
            style={{ width: '18rem', padding: '5%' }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h6 style={{ flex: '9' }}>
                {plantObj.name}
                <span onClick={() => setIsEditing(true)} onKeyDown={() => setIsEditing(true)} ref={newRef}>
                  {isEditing ? <form onSubmit={handleSymbolSubmit}><input type="text" value={editText} onChange={handleSymbolChange} /></form> : ` (${plantObj.symbol})`}
                </span>
              </h6>
              <Button className="float-right" variant="light" onClick={deleteThisBedPlant} style={{ flex: '1' }}>
                <Card.Img src="/delete.png" alt="delete" />
              </Button>
            </div>
          </Card>
        )
        : (
          <Card
            className={`${isSelected ? 'selectedBedPlant' : 'bedPlantContainer'}`}
            style={{ width: '18rem' }}
          >
            <Card.Body>
              <Card.Title>{plantObj.name}
                <span>{plantObj.symbol}</span>
              </Card.Title>
              <Card.Subtitle>{plantObj.type}</Card.Subtitle>
              {bedPlantId
                ? (
                  <>
                    <Button className="mt-3" variant="danger" onClick={deleteThisBedPlant}>Remove from Bed</Button>
                  </>
                )
                : <Button className="mt-3" variant="success" onClick={addBedPlant}>Add Plant to Bed</Button>}
            </Card.Body>
          </Card>
        )}
    </>
  );
}

BedPlantCard.propTypes = {
  plantObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    isOwned: PropTypes.bool,
    numberPerSquare: PropTypes.number,
    image: PropTypes.string,
    symbol: PropTypes.string,
  }).isRequired,
  bedPlantId: PropTypes.number,
  bedId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  isOnBedPage: PropTypes.bool,
};

BedPlantCard.defaultProps = {
  bedPlantId: 0,
  isSelected: false,
  isOnBedPage: false,
};

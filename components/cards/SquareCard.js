import PropTypes from 'prop-types';
import { useState } from 'react';

export default function SquareCard({ squareObj, bedWidth, bedLength }) {
  const [isHovering, setIsHovering] = useState(false);
  const tempFix = () => {
    const mult = bedWidth * bedLength;
    return mult;
  };

  if (bedWidth === 1034) {
    tempFix();
  }

  const changeHover = () => {
    setIsHovering((prevState) => !prevState);
  };

  const handleMouseHover = (e) => {
    if (e.type === 'mouseover') {
      setTimeout(changeHover, 2000);
    } else if (e.type === 'mouseout') {
      changeHover(false);
    }
  };

  return (
    <>
      <div
        className="square"
        style={{
          flex: `0 1 ${(1 / bedLength) * 100}%`,
        }}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOver={handleMouseHover}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOut={handleMouseHover}
      >
        {squareObj.plant && !isHovering ? `${squareObj.plant.symbol}` : ''}
        {squareObj?.plant && isHovering ? squareObj?.plant.name : ''}
      </div>
    </>
  );
}

SquareCard.propTypes = {
  squareObj: PropTypes.shape({
    id: PropTypes.number,
    bedId: PropTypes.number,
    plantId: PropTypes.number,
    plantQuantity: PropTypes.number,
    soilType: PropTypes.string,
    plant: PropTypes.shape({
      name: PropTypes.string,
      symbol: PropTypes.string,
    }),
  }).isRequired,
  bedWidth: PropTypes.number.isRequired,
  bedLength: PropTypes.number.isRequired,
};

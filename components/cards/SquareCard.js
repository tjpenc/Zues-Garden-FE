import Link from 'next/link';
import PropTypes from 'prop-types';

export default function SquareCard({ squareObj, bedWidth, bedLength }) {
  const tempFix = () => {
    const mult = bedWidth * bedLength;
    return mult;
  };

  if (bedWidth === 1034) {
    tempFix();
  }

  return (
    <>
      <Link passHref href={`/squares/edit/${squareObj.id}`}>
        <div
          className="square"
          style={{
            flex: `0 1 ${(1 / bedLength) * 100}%`,
          }}
        >
          {squareObj.plant ? `${squareObj.plant.symbol}` : ''}
        </div>
      </Link>
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

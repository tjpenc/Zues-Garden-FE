import Link from 'next/link';
import PropTypes from 'prop-types';

export default function SquareCard({ squareObj, bedWidth, bedLength }) {
  return (
    <>
      <Link passHref href={`/squares/edit/${squareObj.id}`}>
        <div className="square">
          {squareObj.plant ? `${squareObj.plant.name}` : ''}
        </div>
      </Link>
      {bedWidth} {bedLength}
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
    }),
  }).isRequired,
  bedWidth: PropTypes.number.isRequired,
  bedLength: PropTypes.number.isRequired,
};

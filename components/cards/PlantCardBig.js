import PropTypes from 'prop-types';

export default function BigPlantCard({ plantObj }) {
  return (
    <div>
      <div className="d-flex flex-column mt-5">
        <h3>{plantObj.description === 'N/A' ? 'No description provided' : plantObj.description}</h3>
      </div>
    </div>
  );
}

BigPlantCard.propTypes = {
  plantObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    isOwned: PropTypes.bool,
    numberPerSquare: PropTypes.number,
    image: PropTypes.string,
    symbol: PropTypes.string,
    beds: PropTypes.instanceOf(Array),
    tasks: PropTypes.instanceOf(Array),
  }).isRequired,
};

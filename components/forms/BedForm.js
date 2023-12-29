import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createBed, updateBed } from '../../api/bedData';

const initialState = {
  uid: '',
  bedGroupId: 0,
  name: '',
  season: '',
  year: parseInt(new Date().toJSON().slice(0, 4), 10),
  description: '',
  isCurrent: true,
  soilType: '',
  width: 1,
  length: 1,
};

export default function BedForm({ bedObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  const soilTypes = ['Loam', 'Sand', 'Clay'];
  // when a field is filled, need to update state

  useEffect(() => {
    if (bedObj.id) {
      setFormInput(bedObj);
    }
  }, [bedObj.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bedObj.id) {
      const stringYear = formInput.year.toString();
      formInput.year = stringYear;
      updateBed(formInput).then(router.push('/beds/beds'));
    } else {
      formInput.uid = user.uid;
      const stringYear = formInput.year.toString();
      formInput.year = stringYear;
      createBed(formInput).then((newBed) => {
        router.push(`/beds/addPlants/${newBed.id}`);
      });
    }
  };

  return (
    <>
      <Form className="form-container" onSubmit={handleSubmit}>
        <div className="form-column-container">
          <div className="form-column" style={{ flex: '2', marginRight: '10px' }}>
            <h1 className="center">Required</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Bed Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bed Name"
                name="name"
                value={formInput.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Year"
                min={parseInt(new Date().toJSON().slice(0, 4), 10)}
                name="year"
                value={formInput.year}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Season</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="season"
                onChange={handleChange}
                value={formInput.season}
                required
              >
                <option value="">Season</option>
                {seasons?.map((season) => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                value={formInput.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {bedObj.id
              ? ''
              : (
                <>
                  <Form.Group>
                    <Form.Label>Soil Type</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="soilType"
                      onChange={handleChange}
                      value={formInput.soilType}
                      required
                    >
                      <option value="">Select a Soil Type</option>
                      {soilTypes?.map((soilType) => (
                        <option key={soilType} value={soilType}>{soilType}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Bed Width</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Width"
                      min="1"
                      name="width"
                      value={formInput.width}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Bed Length</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Length"
                      min="1"
                      name="length"
                      value={formInput.length}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </>
              )}

            <Form.Check
              className="mb-3"
              inline
              label="Current Bed?"
              name="isCurrent"
              type="checkbox"
              checked={formInput.isCurrent}
              onChange={handleCheckChange}
              id="inline-checkbox-1"
            />
          </div>
          <div className="form-column" style={{ flex: '1' }}>
            <h1 className="center">Optional</h1>

          </div>
        </div>
        <div className="form-submit-button">
          <div className="center mt-3">
            <Button type="Submit">Submit</Button>
          </div>
        </div>
      </Form>
    </>
  );
}

BedForm.propTypes = {
  bedObj: PropTypes.shape({
    id: PropTypes.number,
    bedGroupId: PropTypes.number,
    name: PropTypes.string,
    season: PropTypes.string,
    year: PropTypes.string,
    description: PropTypes.string,
    isCurrent: PropTypes.bool,
    soilType: PropTypes.string,
    width: PropTypes.number,
    length: PropTypes.number,
  }),
};

BedForm.defaultProps = {
  bedObj: {
    uid: '',
    bedGroupId: 0,
    name: '',
    season: '',
    year: '',
    description: '',
    isCurrent: false,
    soilType: '',
    width: 1,
    length: 1,
  },
};

// Issue is that bedGroupId is being passed as 0 which is registering as null which is passing null into the backend, instead of a value of 0. Need to pass a value, and not null, into the backend

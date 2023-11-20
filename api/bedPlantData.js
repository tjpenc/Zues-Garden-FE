const endpoint = 'http://localhost:7188';

const getBedPlants = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/beds/plants/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 404) {
        resolve([]);
      } else {
        resolve(resp.json());
      }
    })
    .catch(reject);
});

const createBedPlant = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/beds/plants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((resp) => {
      if (resp.status === 204) {
        resolve({});
      } else {
        resolve(resp.json());
      }
    })
    .catch(reject);
});

const deleteBedPlant = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/beds/plants/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 404) {
        resolve('BedPlant not found');
      } else {
        resolve(resp);
      }
    })
    .catch(reject);
});

export {
  getBedPlants,
  createBedPlant,
  deleteBedPlant,
};

const endpoint = 'http://localhost:7188';

const getPlants = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/plants/users/${uid}`, {
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

const getSinglePlant = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/plants/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 404) {
        resolve({});
      } else {
        resolve(resp.json());
      }
    })
    .catch(reject);
});

const createPlant = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/plants`, {
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

const updatePlant = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/plants/${payload.id}`, {
    method: 'PUT',
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

const updatePlantSymbol = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/plants/symbol/${payload.symbol}/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
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

const deletePlant = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/plants/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 404) {
        resolve('Plant not found');
      } else {
        resolve(resp);
      }
    })
    .catch(reject);
});

export {
  getPlants,
  getSinglePlant,
  createPlant,
  updatePlant,
  updatePlantSymbol,
  deletePlant,
};

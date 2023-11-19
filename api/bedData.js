const endpoint = 'http://localhost:7188';

const getBeds = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/beds/user/${uid}`, {
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

const getSingleBed = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/beds/${id}`, {
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

const createBed = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/beds`, {
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

const updateBed = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/beds/${payload.id}`, {
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

const deleteBed = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/beds/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 404) {
        resolve('Bed not found');
      } else {
        resolve(resp.json());
      }
    })
    .catch(reject);
});

export {
  getBeds,
  getSingleBed,
  createBed,
  updateBed,
  deleteBed,
};

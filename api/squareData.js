const endpoint = 'http://localhost:7188';

const getSingleSquare = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/squares/${id}`, {
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

const getAllBedSquares = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/beds/squares/${id}`, {
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

const updateSquare = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/squares/${payload.id}`, {
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

const removeSquareInfo = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/squares/remove_info/${id}`, {
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

const removeAllSquareInfo = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/squares/remove_info_all/${id}`, {
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

export {
  getSingleSquare,
  getAllBedSquares,
  updateSquare,
  removeSquareInfo,
  removeAllSquareInfo,
};

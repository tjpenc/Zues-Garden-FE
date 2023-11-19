const endpoint = 'http://localhost:7188';

const getTasks = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/tasks/user/${uid}`, {
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

const getSingleTask = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/tasks/${id}`, {
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

const createTask = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/tasks`, {
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

const updateTask = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/tasks/${payload.id}`, {
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

const deleteTask = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 404) {
        resolve('Task not found');
      } else {
        resolve(resp);
      }
    })
    .catch(reject);
});

export {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};

const endpoint = 'http://localhost:7188';

const getEntityNotes = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/notes/${payload.entity}/${payload.uid}`, {
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

const getSingleNote = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/notes/${id}`, {
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

const createNote = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/notes`, {
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

const updateNote = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/notes/${payload.id}`, {
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

const deleteNote = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 404) {
        resolve('Note not found');
      } else {
        resolve(resp);
      }
    })
    .catch(reject);
});

export {
  getEntityNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
};

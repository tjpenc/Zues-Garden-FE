import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

// const endpoint = "https://localhost:7188";
const endpoint = clientCredentials.databaseURL;

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 204) {
        resolve(0);
      } else {
        resolve(resp.json());
      }
    })
    .catch(reject);
});

const postUser = (user) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((resp) => {
      if (resp.status === 204) {
        resolve([]);
      } else {
        resolve(resp.json());
      }
    })
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn,
  signOut,
  checkUser,
  postUser,
};

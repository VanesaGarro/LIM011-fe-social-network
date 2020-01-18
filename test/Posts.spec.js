import { addNote, getNotes } from '../src/controller/controller-firebase.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();

mockfirestore.autoFlush();
mockauth.autoFlush();
global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('addNote', () => {
  it('Debería de poder agregar una publicacion', (done) => addNote('hola', 'privado').then(() => getNotes(
    (data) => {
      const result = data.find((note) => note.title === 'hola');
      expect(result.title).toBe('hola');
      done();
    },
  )));
});

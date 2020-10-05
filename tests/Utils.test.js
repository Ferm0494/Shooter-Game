import Utils from '../src/assets/js/config/Utils';
import 'regenerator-runtime/runtime';
import getHighScores from './mocks';

const URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/M4KUcViYTludXZAhuOi0/scores';
const util = Utils();
const result = [{ user: 'Fernando2', score: 50 }, { user: 'Fernando3', score: 10 }, { user: 'Fernando4', score: 5 }, { user: 'Maria', score: 200 }];


test('score should be inserted if the result is less than 3', async () => {
  const userScore = { user: 'Test', score: 500 };
  const newScores = util.verifyHighScore(userScore, result.slice(0, 2));
  let resultAux = result.slice(0, 2);
  resultAux.push(userScore);
  resultAux = resultAux.sort((a, b) => a.score - b.score).reverse();

  expect(resultAux).toEqual(newScores);
});

test('score should not be inserted if it less than other scores', () => {
  const resultAux = result;
  const newScores = util.verifyHighScore({ user: 'Test2', score: 1 }, resultAux);
  expect(newScores).toEqual(false);
});

test('score should be inserted if its bigger than at least the 3rd position. ', () => {
  const newScore = { user: 'Test2', score: 5000 };
  const newScores = util.verifyHighScore(newScore, result);
  expect(newScores).not.toBe(false);
});
test('Mock to get HighScores if url is valid', () => {
  getHighScores(URL).then(response => {
    expect(response).toEqual(result);
  }).catch(e => e);
});

test('Mock is unvalid if url is not valid', () => {
  getHighScores(`${URL}/948d`).then(x => x).catch(e => {
    expect(e).toEqual('Error: No Game Found');
  });
});

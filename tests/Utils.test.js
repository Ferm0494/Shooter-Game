import Utils from '../src/assets/js/config/Utils';
import 'regenerator-runtime/runtime';
import getHighScores from './mocks';

const URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BRrFry7M0nKbOPlfYxsascores';
const result = [{ user: 'Fernando', score: 40 }, { user: 'Fernando2', score: 50 }, { user: 'Fernando3', score: 10 }, { user: 'Fernando4', score: 5 }, { user: 'Maria', score: 200 }];
const util = Utils();

test('score should be inserted if the result is less than 10', async () => {
  const userScore = { user: 'Test', score: 500 };
  const newScores = util.verifyHighScore(userScore, result);
  let resultAux = result;
  resultAux.push(userScore);
  resultAux = resultAux.sort((a, b) => a.score - b.score).reverse();

  expect(resultAux).toEqual(newScores);
});

test('score should not be inserted if it less than other scores', () => {
  const resultAux = result;
  const newScores = util.verifyHighScore({ user: 'Test2', score: 1 }, resultAux);
  expect(newScores).toEqual(resultAux.sort((a, b) => a.score - b.score).reverse());
});

test('score should be inserted if its bigger than at least the 10th position. ', () => {
  const newScore = { user: 'Test2', score: 5000 };
  let resultAux = result;
  const newScores = util.verifyHighScore(newScore, resultAux);
  resultAux = resultAux.sort((a, b) => a.score - b.score);
  resultAux.push(newScore);
  expect(resultAux.reverse()).toEqual(newScores);
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

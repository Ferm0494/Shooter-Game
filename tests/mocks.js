
const result = [{ user: 'Fernando', score: 40 }, { user: 'Fernando2', score: 50 }, { user: 'Fernando3', score: 10 }, { user: 'Fernando4', score: 5 }, { user: 'Maria', score: 200 }];


const getHighScores = async (url) => new Promise((resolve, reject) => {
  if (url === 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WtHG2pepQQDgzDAzOJLi/scores') {
    resolve(result);
  } else {
    reject(new Error('No Game Found'));
  }
});

export default getHighScores;
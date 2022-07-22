import { submitScore, loadScores } from './add-score.js';
import './index.css';
// import loadScores from './refresh-scores.js';

loadScores();

const refresh = document.querySelector('.refresh');
refresh.addEventListener('click', () => {
  loadScores();
});

const submit = document.querySelector('.submit');
submit.addEventListener('click', () => {
  const user = document.querySelector('#user').value;
  const score = document.querySelector('#score').value;
  submitScore(user, score);
});
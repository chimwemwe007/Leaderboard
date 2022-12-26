const addScore = (name, score, id) => {
  const ScoresContainer = document.getElementById('leaders-container');
  const bookHTML = document.createElement('div');
  bookHTML.classList.add('leader-item');
  if (id % 2 === 0) {
    bookHTML.classList.add('gray');
  }
  bookHTML.innerHTML = `
                <p class="name">${name}:</p>
                <p class="score">${score}</p>
            `;
  ScoresContainer.appendChild(bookHTML);
};

const loadScores = () => {
  const ScoresContainer = document.getElementById('leaders-container');
  ScoresContainer.innerHTML = '';
  const getScoresData = async () => {
    const request = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/KJxUTySzzZA6BH0fd9pM/scores/');
    const data = await request.json();
    return data.result;
  };

  getScoresData().then(
    (value) => {
      value.forEach((score, id) => {
        addScore(score.user, score.score, id);
      });
    },
    (error) => {
      throw error;
    },
  );
};

const submitScore = (user, score) => {
  if (user || score !== '') {
    const sentToApi = async () => {
      const request = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/KJxUTySzzZA6BH0fd9pM/scores/', {
        method: 'POST',
        body: JSON.stringify({
          user: `${user}`,
          score,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return request.status;
    };
    sentToApi().then((res) => res).then(() => {
      loadScores();
    });
  }
};
export { addScore, submitScore, loadScores };

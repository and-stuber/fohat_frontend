const API_URL = "https://opentdb.com/api.php?amount=5&token="

const triviaAPI = (token) => (
  fetch(`${API_URL, token}`)
    .then((response) => response.json())
);

export default triviaAPI;

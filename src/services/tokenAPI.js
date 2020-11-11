const API_URL = 'https://opentdb.com/api_token.php?command=request';

const tokenAPI = () => (
  fetch(API_URL)
    .then((response) => response.json())
    .then((json) => json.token)
);

export default tokenAPI;

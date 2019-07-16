import Axios from 'axios';

const baseDomain = 'http://localhost:3000';
const baseURL = `${baseDomain}/api/v1`;

export default Axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

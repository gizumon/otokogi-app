import Axios from 'axios';

const baseDomain = process.env.API_URI;
const baseURL = `${baseDomain}/api/v1`;

export default Axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

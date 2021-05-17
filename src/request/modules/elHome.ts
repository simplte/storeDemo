import BASEURL from '../baseUrl';
import axios from '../axios'

function cityGuess() {
  return axios.get(`${BASEURL.elUrl}/v1/cities?type=guess`);
}
export default {
    cityGuess
}
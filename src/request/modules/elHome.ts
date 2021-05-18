import BASEURL from '../baseUrl';
import axios from '../axios'

function cityGuess() {
  return axios.get(`${BASEURL.elUrl}/v1/cities?type=guess`);
}
function groupcity() {
  return axios.get(`${BASEURL.elUrl}/v1/cities?type=group`);
}
function hotcity() {
  return axios.get(`${BASEURL.elUrl}/v1/cities?type=hot`);
}
export default {
    cityGuess,
    groupcity,
    hotcity
}
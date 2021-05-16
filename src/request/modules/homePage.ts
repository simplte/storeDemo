import BASEURL from '../baseUrl';
import Utils from "../../utils/index";
import axios from '../axios'
interface readBuyListParams {
    page :number
}
console.log(BASEURL.baseUrl)
function readBuyList(params: readBuyListParams) {
    const headers = Utils.requestHeader.getRequestHeader()
    return axios.post(`${BASEURL.baseUrl}/api/watch/videoList`, params, {headers});
  }
  export default {
    readBuyList
  }
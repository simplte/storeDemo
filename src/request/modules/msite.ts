import BASEURL from '../baseUrl';
import axios from '../axios'
interface msiteAddressParams{
    geohash:string
}
interface msiteFoodTypesParams{
    geohash: string
}
export const  msiteAddress = (params:msiteAddressParams) => {
    return axios.get(`${BASEURL.elUrl}/v2/pois/${params.geohash}`);
}
export const  msiteFoodTypes = (params:msiteFoodTypesParams) => {
    return axios.get(`${BASEURL.elUrl}/v2/index_entry?geohash=${params.geohash}&group_type=1&flags[]=F`);
}
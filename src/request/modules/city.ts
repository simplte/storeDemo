import BASEURL from '../baseUrl';
import axios from '../axios'
interface citiesParams {
    number: number
}
interface searchplaceParams {
    type?: string 
    cityid:number
    value: string
}
export const  currentcity = (params:citiesParams) => {
    console.log(params)
    return axios.get(`${BASEURL.elUrl}/v1/cities/${params.number}`);
}
export const  searchplace = (params:searchplaceParams) => {
    return axios.get(`${BASEURL.elUrl}/v1/pois?type=${params.type}&city_id=${params.cityid}&keyword=${params.value}`);
}
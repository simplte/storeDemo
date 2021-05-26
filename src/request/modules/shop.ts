import BASEURL from '../baseUrl';
import axios from '../axios'
interface addressParams {
    geohash: String
}
interface searSearchplace {
    shopid?: string 
    position: {
        latitude:number
        longitude: string
    }
}
interface foodMenu {
    restaurant_id?: string|string 
}
interface getRatingList {
    shopid?: string|string 
    offset: string
    tag_name?: string
}
export const  msiteAddress = (params:addressParams) => {
    return axios.get(`${BASEURL.elUrl}/v2/pois/${params.geohash}`);
}
export const  shopDetails = (params:searSearchplace) => {
    let _parmasUrl = ''
    for(let key in params.position) {
        if(key == 'longitude') {
            _parmasUrl +=`${key}=${params.position[key]}&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics`
        }else{
        _parmasUrl+=`?${key}=${params.position[key]}&`

        }
    }
    return axios.get(`${BASEURL.elUrl}/shopping/restaurant/${params.shopid}${_parmasUrl}`);
}
export const  foodMenu = (params:foodMenu) => {
    return axios.get(`${BASEURL.elUrl}/shopping/v2/menu?restaurant_id=${params.restaurant_id}`);
}
export const  getRatingList = (params:getRatingList) => {
    return axios.get(`${BASEURL.elUrl}/ugc/v2/restaurants/${params.shopid}/ratings?has_content=true&offset=${params.offset}&limit=10&tag_name=${params.tag_name}`);
}
export const  ratingScores = (shopid: string|number) => {
    return axios.get(`${BASEURL.elUrl}/ugc/v2/restaurants/${shopid}/ratings/scores`);
}
export const  ratingTags = (shopid: string|number) => {
    return axios.get(`${BASEURL.elUrl}/ugc/v2/restaurants/${shopid}/ratings/tags`);
}

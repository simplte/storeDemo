import BASEURL from '../baseUrl';
import axios from '../axios'
interface msiteAddressParams{
    geohash:string
}
interface msiteFoodTypesParams{
    geohash: string
}
interface support_ids {
    status: boolean,
    id: number|string
}
interface ShopList {
    latitude?: string|Number, 
    longitude? :string|Number, 
    offset?: string| Number, 
    restaurant_category_id? : string, 
    restaurant_category_ids? : string,
     order_by?: string,
      delivery_mode? : string, 
      support_ids?: Array<any>
}
export const  msiteAddress = (params:msiteAddressParams) => {
    return axios.get(`${BASEURL.elUrl}/v2/pois/${params.geohash}`);
}
export const  msiteFoodTypes = (params:msiteFoodTypesParams) => {
    return axios.get(`${BASEURL.elUrl}/v2/index_entry?geohash=${params.geohash}&group_type=1&flags[]=F`);
}
export const shopList = (params : ShopList) => {
    let {latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []} = params;
	let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
	let data = {
		latitude,
		longitude,
		offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
	};
    const _str = Object.keys(data).reduce((x, y) => {
        return x +`${y}=${data[y]}&`
    },"")
    return axios.get(`${BASEURL.elUrl}/shopping/restaurants?${_str}`);
};
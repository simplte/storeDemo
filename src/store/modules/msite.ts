import {createStore} from 'vuex';
import { setStore, getStore } from "../../config/mUtils"
interface UserInfoInterface{
    username?: String
}
interface RemoveAddressInterface{
    name?:String,
    address?: String,
    address_detail?: String,
    geohash?: String,
    phone?: String,
    phone_bk?: String,
    poi?: String,
    poi_type?: Number,
}
interface MsiteDataInterface {
    latitude: String, // 当前位置纬度
    longitude: String, // 当前位置经度
    cartList: Object, // 加入购物车的商品列表
    shopDetail: String, //商家详情信息
    userInfo: UserInfoInterface, //用户信息
    shopid: String,//商铺id
    remarkText: String,//可选备注内容
    inputText: String,//输入备注内容
    invoice: boolean,//开发票
    newAddress: Array<string>, //确认订单页新的地址
    searchAddress: String,//搜索并选择的地址
    geohash: String,//地址geohash值
    choosedAddress: String,//选择地址
    addressIndex: Number,//选择地址的索引值
    needValidation: Boolean,//确认订单时是否需要验证
    cartId: Number, //购物车id
    sig: Number,//购物车sig
    orderParam: Object,//订单的参数
    orderMessage: String, //订单返回的信息
    orderDetail: Object, //订单详情
    login: Boolean,//是否登录
    imgPath: String,//头像地址
    removeAddress: Array<RemoveAddressInterface>,//移除地址
    addAddress: String,		//新增地址
    question: {
        title ?: string,
        detail?: String
    },//问题详情
    cartPrice: Number, //会
    cart_id:String
}
const MsiteData:MsiteDataInterface = {
    latitude: '', // 当前位置纬度
    longitude: '', // 当前位置经度
    cartList: {}, // 加入购物车的商品列表
    shopDetail: '', //商家详情信息
    userInfo: {
        username: '',
    }, //用户信息
    shopid: '',//商铺id
    remarkText: '',//可选备注内容
    inputText: '',//输入备注内容
    invoice: false,//开发票
    newAddress: [], //确认订单页新的地址
    searchAddress: '',//搜索并选择的地址
    geohash: '31.22299,121.36025',//地址geohash值
    choosedAddress: '',//选择地址
    addressIndex: 0,//选择地址的索引值
    needValidation: false,//确认订单时是否需要验证
    cartId: 0, //购物车id
    sig: 0,//购物车sig
    orderParam: {},//订单的参数
    orderMessage: '', //订单返回的信息
    orderDetail: "", //订单详情
    login: true,//是否登录
    imgPath:"",//头像地址
    removeAddress:[],//移除地址
    addAddress:'',		//新增地址
    question: {},//问题详情
    cartPrice: 0, //会员卡价格
    cart_id: ""
}
const msite = createStore({
    state(){
        return MsiteData
    },
    mutations: {
        // 记录当前经度纬度
	RECORD_ADDRESS(state:  typeof MsiteData , {
		latitude,
		longitude
	}) {
		state.latitude = latitude;
		state.longitude = longitude;
	},

	RECORD_SHOPDETAIL(state :  typeof MsiteData, detail) {
		state.shopDetail = detail;
	},
	// 加入购物车
	ADD_CART(state, {
		shopid,
		category_id,
		item_id,
		food_id,
		name,
		price,
		specs,
		packing_fee,
		sku_id,
		stock
	}) {
		let cart = state.cartList;
		let shop = cart[shopid] = (cart[shopid] || {});
		let category = shop[category_id] = (shop[category_id] || {});
		let item = category[item_id] = (category[item_id] || {});
		if (item[food_id]) {
			item[food_id]['num']++;
		} else {
			item[food_id] = {
					"num" : 1,
					"id" : food_id,
					"name" : name,
					"price" : price,
					"specs" : specs,
					"packing_fee" : packing_fee,
					"sku_id" : sku_id,
					"stock" : stock
			};
		}
		state.cartList = {...cart};
		//存入localStorage
		setStore('buyCart', state.cartList);
	},
	// 移出购物车
	REDUCE_CART(state :  typeof MsiteData, {
		shopid,
		category_id,
		item_id,
		food_id,
		name,
		price,
		specs,
	}) {
		let cart = state.cartList;
		let shop = (cart[shopid] || {});
		let category = (shop[category_id] || {});
		let item = (category[item_id] || {});
		if (item && item[food_id]) {
			if (item[food_id]['num'] > 0) {
				item[food_id]['num']--;
				state.cartList = {...cart};
				//存入localStorage
				setStore('buyCart', state.cartList);
			} else {
				//商品数量为0，则清空当前商品的信息
				item[food_id] = null;
			}
		}
	},
	//网页初始化时从本地缓存获取购物车数据
	INIT_BUYCART(state :  typeof MsiteData) {
		let initCart = getStore('buyCart');
		if (initCart) {
			state.cartList = JSON.parse(initCart);
		}
	},
	//清空当前商品的购物车信息
	CLEAR_CART(state:  typeof MsiteData, shopid) {
		state.cartList[shopid] = null;
		state.cartList = {...state.cartList};
		setStore('buyCart', state.cartList);
	},
	// 记录用户信息
	RECORD_USERINFO(state:  typeof MsiteData, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
	},
	//获取用户信息存入vuex
	GET_USERINFO(state:  typeof MsiteData, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo =  {
                username: ''
            };
		}
	},
	//修改用户名
	RETSET_NAME(state:  typeof MsiteData,username) {
		state.userInfo = Object.assign({}, state.userInfo,{username})
	},
	//保存商铺id
	SAVE_SHOPID(state:  typeof MsiteData, shopid) {
		state.shopid = shopid;
	},
	//记录订单页面用户选择的备注, 传递给订单确认页面
	CONFIRM_REMARK(state:  typeof MsiteData, {
		remarkText,
		inputText
	}) {
		state.remarkText = remarkText;
		state.inputText = inputText;
	},
	//是否开发票
	CONFIRM_INVOICE(state:  typeof MsiteData, invoice) {
		state.invoice = invoice;
	},
	//选择搜索的地址
	CHOOSE_SEARCH_ADDRESS(state:  typeof MsiteData, place) {
		state.searchAddress = place;
	},
	//保存geohash
	SAVE_GEOHASH(state:  typeof MsiteData, geohash) {
		console.log(geohash)
		state.geohash = geohash;
		
	},
	//确认订单页添加新的的地址
	CONFIRM_ADDRESS(state:  typeof MsiteData, newAddress: string) {
		state.newAddress.push(newAddress);
	},
	//选择的地址
	CHOOSE_ADDRESS(state:  typeof MsiteData, {
		address,
		index
	}) {
		state.choosedAddress = address;
		state.addressIndex = index;
	},
	//保存下单需要验证的返回值
	NEED_VALIDATION(state:  typeof MsiteData, needValidation) {
		state.needValidation = needValidation;
	},
	//保存下单后购物id 和 sig
	SAVE_CART_ID_SIG(state:  typeof MsiteData, {
		cart_id,
		sig
	}) {
		state.cart_id = cart_id;
		state.sig = sig;
	},
	//保存下单参数，用户验证页面调用
	SAVE_ORDER_PARAM(state:  typeof MsiteData, orderParam) {
		state.orderParam = orderParam;
	},
	//修改下单参数
	CHANGE_ORDER_PARAM(state:  typeof MsiteData, newParam) {
		state.orderParam = Object.assign({}, state.orderParam, newParam);
	},
	//下单成功，保存订单返回信息
	ORDER_SUCCESS(state:  typeof MsiteData, order:String) {
		state.cartPrice = 0;
		state.orderMessage = order;
	},
	//进入订单详情页前保存该订单信息
	SAVE_ORDER(state:  typeof MsiteData, orderDetail) {
		state.orderDetail = orderDetail;
	},
	//退出登录
	OUT_LOGIN(state:  typeof MsiteData) {
		state.userInfo = {};
		state.login = false;
	},
	//保存图片
	SAVE_AVANDER(state:  typeof MsiteData, imgPath) {
		state.imgPath = imgPath;
	},
	//删除地址列表
	SAVE_ADDRESS(state:  typeof MsiteData, newAdress) {
		state.removeAddress = newAdress
	},
	//添加地址name
	SAVE_ADDDETAIL(state:  typeof MsiteData, addAddress){
		state.addAddress=addAddress;
	},
	//保存所选问题标题和详情
	SAVE_QUESTION(state:  typeof MsiteData, question) {
		state.question = {...question};
	},
	//增加地址
	ADD_ADDRESS(state:  typeof MsiteData, obj) {
		state.removeAddress = [obj, ...state.removeAddress];
	},
	//会员卡价格纪录
	BUY_CART(state:  typeof MsiteData, price) {
		state.cartPrice = price;
	},
    },
    actions: {

    },
    getters: {

    }
})
export default msite;
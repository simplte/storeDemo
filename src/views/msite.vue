<template>
  <div>
    <head-top signin-up="msite">
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="rgb(255,255,255)"
            stroke-width="1"
            fill="none"
          />
          <line
            x1="14"
            y1="14"
            x2="20"
            y2="20"
            style="stroke: rgb(255, 255, 255); stroke-width: 2"
          />
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{ msiteTitle }}</span>
      </router-link>
    </head-top>
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide food_types_container"
            v-for="(item, index) in foodTypes"
            :key="index"
          >
            <router-link
              :to="{
                path: '/food',
                query: {
                  geohash,
                  title: foodItem.title,
                  restaurant_category_id: getCategoryId(foodItem.link),
                },
              }"
              v-for="foodItem in item"
              :key="foodItem.id"
              class="link_to_food"
            >
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url" />
                <figcaption>{{ foodItem.title }}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="../assets/images/fl.svg" class="fl_back animation_opactiy" v-else />
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#shop"
          ></use>
        </svg>
        <span class="shop_header_title">附近商家</span>
      </header>
      <shop-listd v-if="hasGetData" :geohash="geohash"></shop-listd>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script lang="ts">
import headTop from "../components/header/head.vue";
import footGuide from "../components/footer/footGuide.vue";
import shopListd   from "../components/common/shoplistd.vue"
import { useStore } from "vuex";
import {
  defineComponent,
  onMounted,
  ref,
  toRef,
  computed,
  toRaw,
  onBeforeMount,
} from "vue";
import elApi from "../request/modules/elHome";
import { msiteAddress, msiteFoodTypes } from "../request/modules/msite";
import { getStore, setStore, removeStore } from "../config/mUtils";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "msite",
  components: {
    headTop,
	footGuide,
	shopListd
  },

  setup() {
    let geohash = ref<string>("");
    let msiteTitle = ref<string>("");
    let foodTypes = ref<Array<any>>([]);
    let hasGetData = ref<boolean>(false);
    const imgBaseUrl: string = "https://fuss10.elemecdn.com";
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    onBeforeMount(() => {
		console.log(route.query)
      if (!route.query.geohash) {
        cityGuessData();
      } else {
        geohash.value = String(route.query.geohash);
      }
      //保存geohash 到vuex
      saveGeohash(geohash.value);
      getAddress();
    });
    onMounted(() => {
		getMsiteFoodTypes();
	});
    async function cityGuessData() {
      const address: any = await elApi.cityGuess();
      geohash.value = address.latitude + "," + address.longitude;
    }
	async function getMsiteFoodTypes() {
		 //获取导航食品类型列表
       	let res:any = await msiteFoodTypes({geohash: geohash.value});
       	let resLength = res.length;
       	let resArr = [...res]; // 返回一个新的数组
       	let foodArr = [];
    	for (let i = 0, j = 0; i < resLength; i += 8, j++) {
    		foodArr[j] = resArr.splice(0, 8);
    	}
    	foodTypes.value = foodArr;
        // //初始化swiper
        // new Swiper('.swiper-container', {
		//     pagination: '.swiper-pagination',
		//     loop: true
		// });
	}
    function recordAddress(res) {
      store.commit("RECORD_ADDRESS", res);
    }
    function saveGeohash(geohash) {
      store.commit("SAVE_GEOHASH", geohash);
    }
    async function getAddress() {
      //获取位置信息
      let res: any = await msiteAddress({ geohash: geohash.value });
      msiteTitle.value = res.name;
      // 记录当前经度纬度
      recordAddress(res);
      hasGetData.value = true;
    }
	function getCategoryId(url){
    	let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
    	if (/restaurant_category_id/gi.test(urlData)) {
    		return JSON.parse(urlData).restaurant_category_id.id
    	}else{
    		return ''
    	}
    }
    return {
      geohash,
      msiteTitle,
      foodTypes,
      hasGetData,
      imgBaseUrl,
	  getCategoryId
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/mixin";
.link_search {
  left: 0.8rem;
  @include wh(0.9rem, 0.9rem);
  @include ct;
}
.msite_title {
  @include center;
  width: 50%;
  color: #fff;
  text-align: center;
  margin-left: -0.5rem;
  .title_text {
    @include sc(0.8rem, #fff);
    text-align: center;
    display: block;
  }
}
.msite_nav {
  padding-top: 2.1rem;
  background-color: #fff;
  border-bottom: 0.025rem solid $bc;
  height: 10.6rem;
  .swiper-container {
    @include wh(100%, auto);
    padding-bottom: 0.6rem;
    .swiper-pagination {
      bottom: 0.2rem;
    }
  }
  .fl_back {
    @include wh(100%, 100%);
  }
}
.food_types_container {
  display: flex;
  flex-wrap: wrap;
  .link_to_food {
    width: 25%;
    padding: 0.3rem 0rem;
    @include fj(center);
    figure {
      img {
        margin-bottom: 0.3rem;
        @include wh(1.8rem, 1.8rem);
      }
      figcaption {
        text-align: center;
        @include sc(0.55rem, #666);
      }
    }
  }
}
.shop_list_container {
  margin-top: 0.4rem;
  border-top: 0.025rem solid $bc;
  background-color: #fff;
  .shop_header {
    .shop_icon {
      fill: #999;
      margin-left: 0.6rem;
      vertical-align: middle;
      @include wh(0.6rem, 0.6rem);
    }
    .shop_header_title {
      color: #999;
      @include font(0.55rem, 1.6rem);
    }
  }
}
</style>

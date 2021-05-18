<template>
  <div class="city_container">
        <head-top :head-title="cityname" go-back='true'>
            <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
        </head-top>
        <form class="city_form" v-on:submit.prevent>
            <div>
                <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model='inputVaule'>
            </div>
            <div>
                <input type="submit" name="submit" class="city_submit input_style" @click='postpois' value="提交">
            </div>
        </form>
        <header v-if="historytitle" class="pois_search_history">搜索历史</header>
        <ul class="getpois_ul">
            <li v-for="(item, index) in placelist" @click='nextpage(index, item.geohash)' :key="index">
                <h4 class="pois_name ellipsis">{{item.name}}</h4>
                <p class="pois_address ellipsis">{{item.address}}</p>
            </li>
        </ul>
        <footer v-if="historytitle&&placelist.length" class="clear_all_history" @click="clearAll">清空所有</footer>
        <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
    </div>
</template>

<script lang="ts">
import headTop from "../components/header/head.vue";
import { defineComponent, onMounted, ref, computed } from "vue";
import ApiElHome from "../request/modules/elHome";
import {getStore, setStore, removeStore} from 'src/config/mUtils'
export default defineComponent({
  name: "elIndex",
  components: {
    headTop,
  },

  setup() {
    let guessCity = ref(""), //当前城市
      guessCityid = ref(""), //当前城市id
      hotcity = ref(null), //热门城市列表
      groupcity = ref(null); //所有城市列表

    console.log(0);
    onMounted(() => {
      reqestCityGuess();
      requestHotcity();
      reqestGroupcity();
    });

    async function reqestCityGuess() {
      let res: any = await ApiElHome.cityGuess();
      guessCity.value = res.name;
      guessCityid.value = res.id;
    }

    async function reqestGroupcity() {
      let res: any = await ApiElHome.groupcity();
      groupcity.value = res;
    }

    async function requestHotcity() {
      let res: any = await ApiElHome.hotcity();
      hotcity.value = res;
    }
    let sortgroupcity = computed({
      get: () => {
        let sortobj = {};
        if (!groupcity.value) return {};
        console.log(groupcity.value);
        for (let i = 65; i <= 90; i++) {
          if (groupcity.value[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] =
              groupcity.value[String.fromCharCode(i)];
          }
        }
        console.log(sortobj);
        return sortobj;
      },
      set: (val) => {},
    });
    return {
      guessCity,
      guessCityid,
      hotcity,
      groupcity,
      sortgroupcity,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/mixin";
.head_logo {
  left: 0.4rem;
  font-weight: 400;
  @include sc(0.7rem, #fff);
  @include wh(2.3rem, 0.7rem);
  @include ct;
}
.city_nav {
  padding-top: 2.35rem;
  border-top: 1px solid $bc;
  background-color: #fff;
  margin-bottom: 0.4rem;
  .city_tip {
    @include fj;
    line-height: 1.45rem;
    padding: 0 0.45rem;
    span:nth-of-type(1) {
      @include sc(0.55rem, #666);
    }
    span:nth-of-type(2) {
      font-weight: 900;
      @include sc(0.475rem, #9f9f9f);
    }
  }
  .guess_city {
    @include fj;
    align-items: center;
    height: 1.8rem;
    padding: 0 0.45rem;
    border-top: 1px solid $bc;
    border-bottom: 2px solid $bc;
    @include font(0.75rem, 1.8rem);
    span:nth-of-type(1) {
      color: $blue;
    }
    .arrow_right {
      @include wh(0.6rem, 0.6rem);
      fill: #999;
    }
  }
}
#hot_city_container {
  background-color: #fff;
  margin-bottom: 0.4rem;
}
.citylistul {
  li {
    float: left;
    text-align: center;
    color: $blue;
    border-bottom: 0.025rem solid $bc;
    border-right: 0.025rem solid $bc;
    @include wh(25%, 1.75rem);
    @include font(0.6rem, 1.75rem);
  }
  li:nth-of-type(4n) {
    border-right: none;
  }
}
.city_title {
  color: #666;
  font-weight: 400;
  text-indent: 0.45rem;
  border-top: 2px solid $bc;
  border-bottom: 1px solid $bc;
  @include font(0.55rem, 1.45rem, "Helvetica Neue");
  span {
    @include sc(0.475rem, #999);
  }
}

.letter_classify_li {
  margin-bottom: 0.4rem;
  background-color: #fff;
  border-bottom: 1px solid $bc;
  .groupcity_name_container {
    span {
      color: #666;
    }
  }
}
</style>

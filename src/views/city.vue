<template>
  <div class="city_container">
    <head-top :head-title="cityname" go-back="true">
      <router-link to="/home" slot="changecity" class="change_city"
        >切换城市</router-link
      >
    </head-top>
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input
          type="search"
          name="city"
          placeholder="输入学校、商务楼、地址"
          class="city_input input_style"
          required
          v-model="inputVaule"
        />
      </div>
      <div>
        <input
          type="submit"
          name="submit"
          class="city_submit input_style"
          @click="postpois"
          value="提交"
        />
      </div>
    </form>
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li
        v-for="(item, index) in placelist"
        @click="nextpage(index, item.geohash)"
        :key="index"
      >
        <h4 class="pois_name ellipsis">{{ item.name }}</h4>
        <p class="pois_address ellipsis">{{ item.address }}</p>
      </li>
    </ul>
    <footer
      v-if="historytitle && placelist.length"
      class="clear_all_history"
      @click="clearAll"
    >
      清空所有
    </footer>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
  </div>
</template>

<script lang="ts">
import headTop from "../components/header/head.vue";
import { defineComponent, onMounted, ref, toRef, computed,toRaw  } from "vue";
import { currentcity, searchplace } from "../request/modules/city";
import { getStore, setStore, removeStore } from "../config/mUtils";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "city",
  components: {
    headTop,
  },

  setup() {
    console.log;
    let cityid = ref<number>(0);
    let cityname = ref<string>("");
    let placelist = ref<string[]>([]);
    let inputVaule = ref<string>("");
    let placeHistory = ref([]);
    let historytitle = ref<boolean>(false);
    let placeNone = ref<boolean>(false);
    const route = useRoute();
    const router = useRouter();
    onMounted(() => {
      cityid.value = Number(route.query.cityid);
      getCurrentCity();
      initData();
    });
    async function getCurrentCity() {
      let res: any = await currentcity({ number: cityid.value });
      cityname.value = res.name;
    }
    function initData() {
      //获取搜索历史记录
      if (getStore("placeHistory")) {
        placelist.value = JSON.parse(getStore("placeHistory"));
      } else {
        placelist.value = [];
      }
    }

    //发送搜索信息inputVaule
    function postpois() {
      //输入值不为空时才发送信息
      if (inputVaule.value) {
        searchplace({
          type: "search",
          cityid: cityid.value,
          value: inputVaule.value,
        }).then((res: any) => {
          historytitle.value = false;
          placelist.value = res;
          placeNone.value = res.length ? false : true;
        });
      }
    }
    /**
     * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
     * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
     */
    function nextpage(index: number, geohash: string) {
      let history = getStore("placeHistory");
      let choosePlace: string = toRaw(placelist.value[index]);
      if (history) {
        let checkrepeat: boolean = false;
        placeHistory.value = JSON.parse(history);
        placeHistory.value.forEach((item) => {
          if (item[geohash] == geohash) {
            checkrepeat = true;
          }
        });
        if (!checkrepeat) {
          placeHistory.value.push(choosePlace);
        }
      } else {
        placeHistory.value.push(choosePlace);
      }
      setStore("placeHistory", placelist.value);
      router.push({ path: "/msite", query: { geohash } });
    }
    function clearAll() {
      removeStore("placeHistory");
      initData();
    }
    return {
      cityid,
      cityname,
      placelist,
      inputVaule,
      placeHistory,
      historytitle,
      placeNone,
      clearAll,
      nextpage,
      postpois,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/mixin";
.city_container {
}
.change_city {
  right: 0.4rem;
  @include sc(0.6rem, #fff);
  @include ct;
}
.city_form {
  background-color: #fff;
  border-top: 1px solid $bc;
  border-bottom: 1px solid $bc;
  padding-top: 0.4rem;
  div {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    .input_style {
      border-radius: 0.1rem;
      margin-bottom: 0.4rem;
      @include wh(100%, 1.4rem);
    }
    .city_input {
      border: 1px solid $bc;
      padding: 0 0.3rem;
      @include sc(0.65rem, #333);
    }
    .city_submit {
      background-color: $blue;
      @include sc(0.65rem, #fff);
    }
  }
}
.pois_search_history {
  border-top: 1px solid $bc;
  border-bottom: 1px solid $bc;
  padding-left: 0.5rem;
  @include font(0.475rem, 0.8rem);
}
.getpois_ul {
  background-color: #fff;
  border-top: 1px solid $bc;
  li {
    margin: 0 auto;
    padding-top: 0.65rem;
    border-bottom: 1px solid $bc;
    .pois_name {
      margin: 0 auto 0.35rem;
      width: 90%;
      @include sc(0.65rem, #333);
    }
    .pois_address {
      width: 90%;
      margin: 0 auto 0.55rem;
      @include sc(0.45rem, #999);
    }
  }
}
.search_none_place {
  margin: 0 auto;
  @include font(0.65rem, 1.75rem);
  color: #333;
  background-color: #fff;
  text-indent: 0.5rem;
}
.clear_all_history {
  @include sc(0.7rem, #666);
  text-align: center;
  line-height: 2rem;
  background-color: #fff;
}
</style>

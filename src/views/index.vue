<template>
 	<div>
        <head-top signin-up='home'>
            <span slot='logo' class="head_logo"  @click="reload">ele.me</span>
        </head-top>
        <nav class="city_nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <router-link :to="'/city/' + guessCityid" class="guess_city">
                <span>{{guessCity}}</span>
                <svg class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </router-link>
        </nav>
        <section id="hot_city_container">
            <h4 class="city_title">热门城市</h4>
            <ul class="citylistul clear">
                <router-link  tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
                    {{item.name}}
                </router-link>
            </ul>
        </section>
        <section class="group_city_container">
            <ul class="letter_classify">
                <li v-for="(value, key, index) in sortgroupcity" :key="key"  class="letter_classify_li">
                    <h4 class="city_title">{{key}}
                        <span v-if="index == 0">（按字母排序）</span>
                    </h4>
                    <ul class="groupcity_name_container citylistul clear">
                        <router-link  tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
                            {{item.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>
        </section>
    </div>
</template>

<script lang="ts">
import headTop from '../components/header/head.vue'
import { defineComponent, onMounted , ref} from "vue";
import ApiElHome from "../request/modules/elHome";
export default defineComponent({
  name: "elIndex",
  components: {
    headTop
  },

   setup() {
    let guessCity= ref(''),   //当前城市
        guessCityid=  ref(''), //当前城市id
        hotcity=  ref(null),     //热门城市列表
        groupcity= ref(null)   //所有城市列表
  
    console.log(0)
    onMounted(async () =>{
      console.log(1)
       let res: any = await ApiElHome.cityGuess();
        guessCity.value = res.name;
        guessCityid.value = res.id;
    });
  
   
    return {
        guessCity,
        guessCityid
    }
  },
//   methods: {
//       // 获取当前城市
//       cityGuess() {

//       }
//         cityGuess().then(res => {
//            guessCity.value = res.name;
//         guessCityid.value = res.id;
//         })

//         //获取热门城市
//         hotcity().then(res => {
//             this.hotcity = res;
//         })

//         //获取所有城市
//         groupcity().then(res => {
//             this.groupcity = res;
//         })
//   }
});
</script>

<style lang="less">
</style>

<template>
  <div>
    <button @click="change">动感光波</button>
    <p>{{ newObj }}</p>
    <p></p>
    <button @click="changeToRef">动感光波2changeToRef</button>
    <p>{{ toNewObj }}</p>
    <p>{{ age }}</p>
    <p>{{ objReactive.name }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  ref,
  toRef,
  computed,
  reactive,
} from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "elIndex",
  components: {},

  setup() {
    // 1： reactive使用
    // reactive 用于定义复杂数据类型 如 objReactive 对象中的每个属性都是响应式数据
    let numObj = reactive({ val: 0 });
    numObj.val = 1;
    console.log(numObj);
    // 2： 使用ref修改对象中的某一个属性为响应式时, ref本质是拷贝 与原始数据没有引用关系
    let obj = { name: "alice", age: 1111 };
    // newObj   需要注意ref(obj.name)相当于ref('alice') 把name的值拷贝赋值
    let newObj = ref(obj.name);
    let objReactive = reactive({ name: "alice", age: 12 });
    function change() {
      newObj.value = "Tom";
      obj.age += 1;
      console.log(obj, newObj);
    }
    // 3： 使用toRef修改对象中的某一个属性为响应式， 
    // 3.1:toRef的本质是引用，修改定义的属性值 会影响原数据
    // 3.2:只会影响原数据，并不会对ui界面造成影响因为原数据是非响应式的数据，个人理解只用用来处理业务逻辑中的响应式数据变化
    // 3.3：如果需要对象中的数据是响应式，并且ui也随之变化 就用reactive进行数据定义
    let toNewObj = toRef(obj, "name");
    function changeToRef() {
      toNewObj.value = "Tom";
      console.log(obj, toNewObj);
      objReactive.name += "123";
    }
    // toRefs  toRefs接收一个对象作为参数，它会遍历对象身上的所有属性，然后挨个调用toRef执行
    return {
      newObj,
      change,
      ...toRefs(obj),
      changeToRef,
      toNewObj,
      objReactive,
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

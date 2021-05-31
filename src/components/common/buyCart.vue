 <template>
  <section class="cart_module">
    <section v-if="!foods.specifications.length" class="cart_button">
      <transition name="showReduce">
        <span
          @click="
            removeOutCart(
              foods.category_id,
              foods.item_id,
              foods.specfoods[0].food_id,
              foods.specfoods[0].name,
              foods.specfoods[0].price,
              '',
              foods.specfoods[0].packing_fee,
              foods.specfoods[0].sku_id,
              foods.specfoods[0].stock
            )
          "
          v-if="foodNum"
        >
          <svg>
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#cart-minus"
            ></use>
          </svg>
        </span>
      </transition>
      <transition name="fade">
        <span class="cart_num" v-if="foodNum">{{ foodNum }}</span>
      </transition>
      <svg
        class="add_icon"
        @click="
          addToCart(
            foods.category_id,
            foods.item_id,
            foods.specfoods[0].food_id,
            foods.specfoods[0].name,
            foods.specfoods[0].price,
            '',
            foods.specfoods[0].packing_fee,
            foods.specfoods[0].sku_id,
            foods.specfoods[0].stock,
            $event
          )
        "
      >
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#cart-add"
        ></use>
      </svg>
    </section>
    <section v-else class="choose_specification">
      <section class="choose_icon_container">
        <transition name="showReduce">
          <svg class="specs_reduce_icon" v-if="foodNum" @click="showReduceTip">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#cart-minus"
            ></use>
          </svg>
        </transition>
        <transition name="fade">
          <span class="cart_num" v-if="foodNum">{{ foodNum }}</span>
        </transition>
        <span class="show_chooselist" @click="showChooseList(foods)"
          >选规格</span
        >
      </section>
    </section>
  </section>
</template>

<script lang="ts">
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

import { imgBaseUrl } from "../../config/env";
export default defineComponent({
  name: "buyCart",
  props: {
    foods: {
      type: Object,
      default: {},
    },
    shopId: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const store = useStore();
    let showMoveDot = ref<Array<any>>([]);
    let cartList = computed(() => store.state.cartList);
    let shopCart = computed(() => {
      return Object.assign({}, cartList[props.shopId]);
    });
    let foodNum= computed(() => {
      let category_id = props.foods.category_id;
      let item_id = props.foods.item_id;
      if (shopCart && shopCart[category_id] && shopCart[category_id][item_id]) {
        let num = 0;
        Object.values(shopCart[category_id][item_id]).forEach(
          (item: any, index) => {
            num += item.num;
          }
        );
        return num;
      } else {
        return 0;
      }
    });
    function removeOutCart(
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
      packing_fee,
      sku_id,
      stock
    ) {
      if (foodNum.value > 0) {
        store.commit("REDUCE_CART",{
          shopid: props.shopId,
          category_id,
          item_id,
          food_id,
          name,
          price,
          specs,
          packing_fee,
          sku_id,
          stock,
        });
      }
    }
    //加入购物车，计算按钮位置。
    function addToCart(
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
      packing_fee,
      sku_id,
      stock,
      event
    ) {
       store.commit("ADD_CART",{
        shopid: props.shopId,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock,
      });
      let elLeft = event.target.getBoundingClientRect().left;
      let elBottom = event.target.getBoundingClientRect().bottom;
      showMoveDot.value.push(true);
      context.emit("showMoveDot", showMoveDot.value, elLeft, elBottom);
    }
    //显示规格列表
    function showChooseList(foodScroll) {
      context.emit("showChooseList", foodScroll);
    }
    //点击多规格商品的减按钮，弹出提示
    function showReduceTip() {
      context.emit("showReduceTip");
    }
    return {
        showMoveDot,
        showReduceTip,
        showChooseList,
        addToCart,
        removeOutCart,
        foodNum
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";
.cart_module {
  .add_icon {
    position: relative;
    z-index: 9;
  }
  .cart_button {
    display: flex;
    align-items: center;
  }
  svg {
    @include wh(0.9rem, 0.9rem);
    fill: #3190e8;
  }
  .specs_reduce_icon {
    fill: #999;
  }
  .cart_num {
    @include sc(0.65rem, #666);
    min-width: 1rem;
    text-align: center;
    font-family: Helvetica Neue, Tahoma;
  }
  .choose_specification {
    .choose_icon_container {
      display: flex;
      align-items: center;
      .show_chooselist {
        display: block;
        @include sc(0.55rem, #fff);
        padding: 0.1rem 0.2rem;
        background-color: $blue;
        border-radius: 0.2rem;
        border: 1px solid $blue;
      }
    }
  }
}
.showReduce-enter-active,
.showReduce-leave-active {
  transition: all 0.3s ease-out;
}
.showReduce-enter,
.showReduce-leave-active {
  opacity: 0;
  transform: translateX(1rem);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fadeBounce-enter-active,
.fadeBounce-leave-active {
  transition: all 0.3s;
}
.fadeBounce-enter,
.fadeBounce-leave-active {
  opacity: 0;
  transform: scale(0.7);
}
</style>


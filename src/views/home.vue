<template>
  <div class="mianContent">
    <div class="tuijianTitle" >
      <div class="tjTitle">推荐</div>
      <div class="allReadCount">
        <img src="@@/images/allcount2.png" class="countImg" />
        <span class="countIntro"
          >{{ allReadCount }}人正在</span
        >
      </div>
    </div>
    <div class="moiveList">
      <div
        class="moiveTab"
        v-for="(item, index) in readBuyList"
        :key="index"
        :class="index == 0 ? 'firstTba' : ''"
        @click="jumpDetail(item.vid, item.video)"
      >
        <img :src="item.cover" alt class="coverImg" />
        <div class="introsBox">
          <p class="moiveDate">{{ item.create_time | handleTime }}</p>
          <p class="moiveIntros">{{ item.title }}</p>
          <p class="bannelBox">
            <span class="bannel" :class="{ isJqr: isJqr }">
              <span class="contrlbox">
                <img class="look" src="@@/images/look2.png" />
                <span class="count">{{
                  item.video_wnum | handleReadCount
                }}</span>
              </span>
              <span class="contrlbox" v-if="!isJqr">
                <img class="zan" src="@@/images/like.png" />
                <span class="count">{{ Number(item.video_lnum) }}</span>
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApiHomePage from "../request/modules/homePage";
export default defineComponent({
  name: "home",
  async setup() {
    let allReadCount: number = 0;
    let readBuyList: Array<any> = [];
    const params = {
      page: 1,
    };
    let res: any = await ApiHomePage.readBuyList(params);
    if (res && res.result == 0 && res.list.length > 0) {
      // 总阅读量
      allReadCount = Number(res.video_total || 0);
      readBuyList = readBuyList.concat(res.list);
    }
    console.log(readBuyList);
    return {
      allReadCount,
      readBuyList
    }
  },
});
</script>

<style lang="less">
@mgLook: "../assets/images/look.png";
@mgheart: "../assets/images/blackheart.png";
.wrapper {
  overflow: hidden;
  width: 100%;
  // height: 220px;
  .swiper-img {
    // height: 220px;
    width: 100%;
  }
}
.moiveList {
  margin-top: 15px;
  padding: 0 20px;

  .moiveTab {
    width: 335px;
    height: 105px;
    border: 1px solid #f3f3f3;
    display: flex;
    margin-top: 5px;
    &.firstTba {
      margin-top: 0;
    }
    .coverImg {
      width: 160px;
      overflow: hidden;
      // max-width: 160px;
      // height: 105px;
    }
    .introsBox {
      padding: 13px 15px 14px 14px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .contrlbox {
        display: flex;
        align-items: center;
      }
      .moiveDate {
        color: #999999;
        font-size: 10px;
        margin-bottom: 6px;
      }
      .moiveIntros {
        color: #000000;
        font-size: 13px;
        height: 36px;
        min-width: 141px;
        margin-bottom: 6px;
        font-weight: bold;
        overflow-y: hidden;
      }
      .bannelBox {
        display: flex;
        justify-content: flex-end;
        .bannel {
          width: 120px;
          display: flex;
          .contrlbox {
            width: 60px;
            text-align: left;
            justify-content: flex-start;
            .zan {
              width: 16px;
              height: 16px;
              margin-left: 7px;
            }
            .look {
              width: 16px;
              height: 16px;
            }
            .count {
              font-size: 10px;
              color: #999;
              line-height: 12px;
              margin-left: 4px;
              margin-top: 2px;
            }
          }
          &.isJqr {
            width: 50px;
          }
        }
      }
    }
  }
}
.tuijianTitle {
  margin-top: 13px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  .tjTitle {
    font-size: 18px;
    font-weight: bold;
  }
  .allReadCount {
    font-family: "微软雅黑";
    background-color: #e9e9e9;
    display: flex;
    align-items: center;
    padding-right: 10px;
    border-radius: 15px;
    .countIntro {
      font-size: 12px;
      margin-left: 6px;
    }
    .countImg {
      width: 54px;
      height: 24px;
    }
  }
}
</style>

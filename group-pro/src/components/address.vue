<template>
  <div id="address">
    <div class="head">
      <div class="back iconfont iconIcon-fanhui"
           @click="handleBack"></div>
      <p>我的收货地址</p>
    </div>
    <div class="wrapper addressWrapper">
      <div class="addressContent content">
        <div class="box"
             v-for="(item,index) in addressList"
             :key="index">
          <div class="left">
            <p>{{item.consignee}}</p>
            <p>{{item.tel}}</p>
            <p>{{item.city}}{{item.adressdetails}}</p>
          </div>
          <div class="right"
               @click="handleEdit(index)">
            编辑
          </div>
        </div>
      </div>
    </div>
    <div class="addAddress">
      <button @click="handleAdd">新增收货地址</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  created () {
    this.getAddress()
  },
  computed: {
    ...mapState({
      addressList: state => state.my.addressList
    })
  },
  methods: {
    ...mapMutations({
      saveAddress: 'my/saveAddress'
    }),
    handleBack () {
      this.$router.back()
    },
    getAddress () {
      this.$axios({
        method: 'post',
        url: 'https://www.easy-mock.com/mock/5d1587c3c365eb72765bef9d/api	/users/getAddress'
      }).then((data) => {
        this.saveAddress(data.data)
      })
    },
    initBs () {
      var scroll = new Bscroll('.addressWrapper', {
        click: true
      })
    },
    handleEdit (val) {
      var data = this.addressList[val];
      this.$router.push({ name: 'edit', params: { data, id: val } })
    },
    handleAdd () {
      this.$router.push('/address/add')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initBs()
    })
  }

}
</script>

<style lang='less' scoped>
@import '~style/index';
#address {
  width: 100%;
  height: 100%;
  background: rgb(248, 242, 243);
  .head {
    width: 100%;
    margin-bottom: 10px;
    .h(48);
    background: #fff;
    p {
      width: 100%;
      .h(48);
      .l_h(48);
      text-align: center;
      font-size: 18px;
      font-weight: bolder;
    }
    div {
      position: absolute;
      left: 0;
      top: 0;
      .w(50);
      .h(50);
      .l_h(50);
      text-align: center;
      font-size: 32px;
    }
  }
  .addressWrapper {
    width: 100%;
    position: fixed;
    .top(56);
    .bottom(100);
    overflow: hidden;
    .addressContent {
      width: 100%;
      .box {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(223, 211, 211);
        background: #fff;
        .left {
          .w(300);
          p {
            font-size: 14px;
            line-height: 26px;
          }
        }
        .right {
          .w(50);
          .h(50);
          .l_h(50);
          text-align: center;
          color: #409eff;
        }
      }
    }
  }
  .addAddress {
    position: fixed;
    .bottom(53);
    width: 100%;
    .h(45);
    background: orange;
    button {
      width: 100%;
      height: 100%;
      text-align: center;
      .l_h(45);
      background: linear-gradient(-90deg, #fa4dbe, #fbaa58);
      border: 0;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>

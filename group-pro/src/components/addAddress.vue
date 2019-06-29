<template>
  <transition name="move">
    <div id="edit"
         v-show="show">
      <div class="content">
        <div class="head">
          <div class="back iconfont iconIcon-fanhui"
               @click="handleBack"></div>
          <p>添加收货地址</p>
        </div>
        <div class="box">
          <mt-field label="收货人"
                    v-model="consignee"></mt-field>
          <mt-field label="电话"
                    type="email"
                    v-model="tel"></mt-field>
          <mt-field label="所在城市"
                    type="text"
                    v-model="city"></mt-field>
          <mt-field label="收货地址"
                    type="text"
                    v-model="adressdetails"></mt-field>
          <div class="btn">
            <button @click="handleModify">保存修改</button>
            <button @click="handleDel">删除收货地址</button>

          </div>
        </div>
      </div>

    </div>
  </transition>

</template>

<script>
export default {
  data () {
    return {
      show: true,
      consignee: '',
      tel: '',
      city: '',
      adressdetails: '',
      id: ''

    }
  },
  methods: {
    handleBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang='less'>
@import '~style/index';

.move-enter,
.move-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.move-enter-active,
.move-leave-active {
  transition: 3s;
}
.move-enter-to,
.move-leave {
  transform: translate(0);
  opacity: 1;
}
#edit {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: #fff;
  .content {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
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
  }
  .box {
    background: #fff;
    p {
      text-align: center;
    }
  }
}
</style>
<style>
.mint-field {
  /* margin-bottom: 10px; */
}
.mint-cell-title {
  text-align: center;
}
.mint-cell-value {
  border: 1px solid #dcdfe6;
}
.mint-field-core {
  height: 40px;
  padding-left: 10px;
}
</style>


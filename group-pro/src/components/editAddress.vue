<template>
  <transition name="move">
    <div id="edit"
         v-show="show">
      <div class="content">
        <div class="head">
          <div class="back iconfont iconIcon-fanhui"
               @click="handleBack"></div>
          <p>修改收货地址</p>
        </div>
        <div class="box">
          <p class="warn">{{nameWarn}}</p>
          <mt-field label="收货人"
                    v-model="consignee"></mt-field>
          <p class="warn">{{telWarn}}</p>
          <mt-field label="电话"
                    type="email"
                    v-model="tel"></mt-field>
          <p class="warn">{{cityWarn}}</p>

          <mt-field label="所在城市"
                    type="text"
                    v-model="city"></mt-field>
          <p class="warn">{{addressWarn}}</p>

          <mt-field label="收货地址"
                    type="text"
                    v-model="adressdetails"></mt-field>

        </div>
        <div class="btn">
          <button @click="handleModify">保存修改</button>
          <button @click="handleDel">删除收货地址</button>

        </div>
      </div>

    </div>
  </transition>

</template>

<script>
import { mapMutations } from 'vuex'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      show: true,
      consignee: '',
      tel: '',
      city: '',
      adressdetails: '',
      id: '',
      nameWarn: '',
      telWarn: '',
      cityWarn: '',
      addressWarn: ''

    }
  },
  created () {
    let { consignee, tel, city, adressdetails } = this.$route.params.data
    this.consignee = consignee
    this.tel = tel
    this.city = city
    this.adressdetails = adressdetails
    this.id = this.$route.params.id

  },
  methods: {
    ...mapMutations({
      modifyAddress: 'my/modifyAddress',
      delAddress: 'my/delAddress'
    }),
    handleBack () {
      this.$router.back()
    },
    handleModify () {
      this.nameWarn = ''
      this.telWarn = ''
      this.cityWarn = ''
      this.addressWarn = ''

      var telReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (!telReg.test(this.tel)) {
        this.telWarn = '电话号码格式不正确'
      }
      if (this.consignee === '') {
        this.nameWarn = '收货人不能为空'
      }
      if (this.city === '') {
        this.cityWarn = '城市不能为空'
      }
      if (this.adressdetails === '') {
        this.addressWarn = '收货地址不能为空'
      }
      if (telReg.test(this.tel) && this.consignee !== '' && this.city !== '' && this.adressdetails !== '') {
        let obj = {}
        obj.consignee = this.consignee
        obj.city = this.city
        obj.tel = this.tel
        obj.adressdetails = this.adressdetails
        obj.id = this.id
        this.modifyAddress(obj)
        MessageBox.alert('修改成功!').then(() => {
          this.$router.push('/address')

        })
      }

    },
    handleDel () {
      MessageBox.confirm('确定要删除吗?').then(() => {
        this.delAddress(this.id)
        this.$router.push('/address')
      }).catch(() => {

      })



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
      color: red;
      width: 100%;
      .h(22);
    }
  }
  .btn {
    margin-top: 100px;
    text-align: center;
    button {
      border: 0;
      color: #fff;
      font-size: 14px;
      font-weight: 900;
      border-radius: 5px;
      .padding(12,20,12,20);
    }
    button:nth-of-type(1) {
      background: #409eff;
      margin-right: 20px;
    }
    button:nth-of-type(2) {
      background: #f56c6c;
      margin-right: 20px;
    }
  }
}
</style>
<style>
.mint-field {
  margin-bottom: 10px;
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


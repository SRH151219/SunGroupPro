<template>
  <div id="login">
    <div class="back iconfont iconIcon-fanhui
"
         @click="handleBack"> </div>
    <div class="con">
      <p>登录</p>
      <p class="tips">{{tip}}</p>

      <p class="warn">{{nameWarn}}</p>
      <p class="user u">
        <label for="txt">用户名：</label>
        <input type="text"
               id="txt"
               v-model="userName">
      </p>
      <p class="warn">{{pwdWarn}}</p>
      <p class="user pwd">
        <label for="pwd">密码:</label>
        <input type="password"
               v-model="userPwd">
      </p>

      <p class="btn">
        <button @click="handleLogin">登录</button>
        <button @click="handleRegister">去注册</button>
      </p>
    </div>

  </div>
</template>

<script>
import myLocalStorage from 'utils/myStorage'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      tip: '',
      userName: "",
      userPwd: "",
      nameWarn: "",
      pwdWarn: ""
    }
  },
  methods: {
    ...mapMutations({
      saveAddress: 'my/saveAddress',
      getUserInfo: 'my/getUserInfo'
    }),
    handleBack () {
      // this.$router.push("/back")
      this.$router.back()
      // this.$store.commit("changeShowFooter",true)
    },
    handleLogin () {
      //用户名： 6-20个 中文、英文、数字但不包括下划线等符号
      var reg1 = /^[\u4E00-\u9FA5A-Za-z0-9]{6,20}$/
      //  密码：密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
      var reg2 = /\w{6,17}$/

      if (this.userName == "") {

        this.nameWarn = "用户名不能为空"
      } else if (!reg1.test(this.userName)) {
        this.nameWarn = "请输入6~10个中文/英文/数字"
      }

      if (this.userPwd == "") {
        this.pwdWarn = "密码不能为空"
      } else if (this.userPwd.length < 6 || this.userPwd.length > 20) {
        this.pwdWarn = "密码长度为 6 ~ 20 个字符"
      } else if (!reg2.test(this.userPwd)) {
        this.pwdWarn = "只包含字母/数字/下划线"
      }

      if (reg1.test(this.userName) && reg2.test(this.userPwd)) {
        this.nameWarn = ''
        this.pwdWarn = ''
        this.$axios({
          method: 'post',
          url: ' https://www.easy-mock.com/mock/5d1587c3c365eb72765bef9d/api/users/login'
        }).then((res) => {
          var data = res.data;
          if (this.userName === data.username && this.userPwd === data.userpwd) {
            this.tip = '登录成功'
            setTimeout(() => {
              this.tip = ''
              this.$store.commit("changeShowFooter", true)
              this.$router.push('/home')
              // 将数据本地化存储，3天
              myLocalStorage.set('userToken', res.usertoken, 3)
              myLocalStorage.set('userInfo', data, 3)
              this.getUserInfo(data)
              // 登录成功，获取address
              this.getAddress()
            }, 500)

          } else {
            this.tip = '用户名或密码有误'
            setTimeout(() => {
              this.tip = ''
            }, 2000)
          }
        })

      }

    },
    handleRegister () {
      this.$router.push('/register')
    },
    getAddress () {
      this.$axios({
        method: 'post',
        url: 'https://www.easy-mock.com/mock/5d1587c3c365eb72765bef9d/api/users/getAddress'
      }).then((data) => {
        // 保存到vuex
        this.saveAddress(data.data)
        // 保存到 localstorage
        myLocalStorage.set('address', data.data, 7)
      })
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang='less'>
@import '~style/index';

#login {
  position: fixed;
  top: 0;
  bottom: 0;
  .w(375);
  background: url('/static/imgs/goods/login.jpg') no-repeat;
  background-size: cover;
  .back {
    .w(50);
    .h(50);
    background: rgba(95, 85, 87, 0.3);
    color: #fff;
    font-weight: 900;
    text-align: center;
    .l_h(50);
    font-size: 32px;
  }
  .con {
    width: 90%;
    .h(338);
    .padding(15,15,15,15);
    background: rgba(95, 85, 87, 0.3);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    font-size: @font-size-m;
    .tips {
      width: 100%;
      text-align: center;
      .h(40);
      .l_h(40);
      font-size: 22px;
      font-weight: 800;
      color: red;
    }
    p:nth-of-type(1) {
      font-family: PingFangSC-Medium;
      font-size: 30px;
      color: #fff;
      letter-spacing: 0;
      text-align: left;
      .l_h(30);
      // margin-bottom: 30px;
    }

    .warn {
      text-align: center;
      .h(30);
      .l_h(30);
      color: red;
    }
    .user {
      label {
        font-size: 16px;
        color: #fff;
        text-align: left;
        .h(40);
        .l_h(40);
      }
      input {
        width: 75%;
        .h(40);
        .l_h(40);
        border: 0;
        border-bottom: 1px solid #ccc;
        background: 0;
        text-align: center;
        outline: none;
        font-size: 20px;
      }
    }
    .pwd {
      input {
        margin-left: 25px;
      }
    }
    .btn {
      margin-top: 50px;
      width: 100%;
      .h(40);
      button:nth-of-type(1) {
        width: 70%;
        .h(40);
        .l_h(40);
        text-align: center;
        color: #fff;
        background: #ffc700;
        font-size: @font-size-m;
        border-radius: 4px;
        border: 0;
        outline: none;
      }
      button:nth-of-type(2) {
        .w(77);
        .h(40);
        .l_h(40);
        text-align: center;
        color: #fff;
        background: rgba(0, 0, 0, 0.6);
        margin-left: 10px;
        border-radius: 4px;
        font-size: 14px;
        border: 0;
        outline: none;
      }
    }
  }
}
</style>

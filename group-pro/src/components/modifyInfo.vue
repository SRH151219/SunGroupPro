<template>
  <div id="modify">
    <div class="head">
      <div class="back iconfont iconIcon-fanhui"
           @click="handleBack"></div>
      <p>修改资料</p>
    </div>
    <div class="con">
      <div class="conBox">
        <p class="headCon">
          <span>头像 :</span>
          <input type="file"
                 class="imgFile"
                 ref="imgFile"
                 accept="image/*"
                 id="file"
                 value=""
                 @change="handleImgChange()" />
        </p>
        <img :src="headFile"
             id="headimg"
             alt="">

      </div>
      <!-- 用户名 -->
      <div class="conBox">
        <p class="warn"> {{nameWarn}}</p>
        <p>
          <span>昵称 :</span>
          <input class="txt inputCss"
                 type="text"
                 placeholder="请输入昵称"
                 v-model="userName">

        </p>

      </div>
      <div class="conBox">
        <p class="warn"> {{sexWarn}}</p>
        <p>
          <span>性别 :</span>
          <input class="sex inputCss"
                 type="text"
                 placeholder="请输入性别"
                 v-model="userSex">
        </p>

      </div>
      <div class="conBox">
        <p class="warn"> {{newPwdWarn}}</p>
        <p>
          <span>新密码 :</span>
          <input class="pwd inputCss"
                 type="password"
                 placeholder="请输入新密码"
                 v-model="userNewPwd">
        </p>

      </div>

      <!-- 确认密码 -->
      <div class="conBox">
        <p class="warn"> {{newPwdWarn2}}</p>
        <p>
          <span>确认新密码 :</span>
          <input class="pwd inputCss"
                 type="password"
                 placeholder="请确认新密码"
                 v-model="userNewPwd2">
        </p>

      </div>

      <p class="conBox btn">
        <button @click="modifyUserInfo">确认修改</button>
      </p>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import myLocalStorage from 'utils/myStorage'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      headFile: '',
      userName: '',
      userSex: '',
      userNewPwd: '',
      userNewPwd2: '',
      sexWarn: '',
      nameWarn: '',
      newPwdWarn: '',
      newPwdWarn2: ''
    }
  },
  created () {
    this.getInfo()
  },
  computed: {
    ...mapState({
      userInfo: state => state.my.userInfo
    })
  },
  methods: {
    ...mapMutations({
      getUserInfo: 'my/getUserInfo'
    }),
    handleBack () {
      this.$router.back()
    },
    getInfo () {
      var obj = myLocalStorage.get('userInfo')
      this.headFile = obj.userImg
      this.userName = obj.username
      this.userSex = obj.userSex
    },
    modifyUserInfo () {
      this.sexWarn = ''
      this.nameWarn = ''
      this.newPwdWarn = ''
      this.newPwdWarn2 = ''
      //-----------------------------------------前端校验---------------------------
      //用户名： 6-20个 中文、英文、数字但不包括下划线等符号
      var reg1 = /^[\u4E00-\u9FA5A-Za-z0-9]{6,20}$/;
      //  密码：密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
      var reg2 = /\w{5,17}$/;

      //昵称校验
      if (this.userName === "") {
        this.nameWarn = "用户名不能为空";
      } else if (!reg1.test(this.userName)) {
        this.nameWarn = "请输入6~10个中文/英文/数字";
      }

      //新密码校验
      if (this.userNewPwd === "") {
        this.newPwdWarn = "密码不能为空";
      } else if (this.userNewPwd.length < 6 || this.userNewPwd.length > 20) {
        this.newPwdWarn = "密码长度为 6 ~ 20 个字符";
      } else if (!reg2.test(this.userNewPwd)) {
        this.newPwdWarn = "包含字母/数字/下划线";
      }
      //确认密码校验
      if (this.userNewPwd !== this.userNewPwd2) {
        this.newPwdWarn2 = "密码不一致";
      }

      if (reg1.test(this.userName) && reg2.test(this.userNewPwd) && this.userNewPwd == this.userNewPwd2) {
        // localstorage
        var data = {}
        data.userSex = this.userSex
        data.userImg = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=27&gp=0.jpg'
        data.userpwd = this.userNewPwd
        data.username = this.userName
        myLocalStorage.set('userInfo', data, 7)
        MessageBox.alert('修改成功!').then(() => {
          this.$router.push('/userset')

        })

      }


    },
    handleImgChange () {
      var img = this.$refs.imgFile;
      //图片路径
      var imgFile = img.files[0];
      //html5提供的FileReader读取到文件中的数据,
      //首先创建一个FileReader实例
      var reader = new FileReader();
      //图片文件转换为base64
      reader.readAsDataURL(imgFile);
      //记录vue的this
      var vueThis = this;

      reader.onload = function () {
        //读取完成后，数据保存在对象的result属性中
        //此时的this指向reader，所以要在该函数外部记录vue的this
        vueThis.headFile = this.result;
      }

    }

  }
}

</script>

<style scoped lang='less'>
@import '~style/index';
#modify {
  .head {
    width: 100%;
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
  .con {
    width: 100%;
    padding: 4px 10px;
    margin-top: 0.6rem;
    .conBox {
      width: 100%;
      .h(50);
      font-size: 16px;
      /* margin-bottom: 10px; */
      border-bottom: 1px solid #ccc;
      span {
        display: inline-block;
        .w(90);
        text-align: center;
      }
      .inputCss {
        .w(200);
        border: 0;
        outline: none;
        background: 0;
        font-size: 16px;
        text-align: center;
      }
      .headCon {
        display: flex;
        .imgFile {
          width: 100%;
          .h(50);
          margin: 0;
          padding: 0;
        }
      }

      #headimg {
        .w(50);
        .h(50);
        border-radius: 50%;
        position: absolute;
        .top(60);
        .left(200);
      }
      .warn {
        display: block;
        font-size: 14px;
        width: 100%;
        text-align: center;
        color: red;
        .h(25);
        .l_h(25);
      }
    }
    .btn {
      .margin(50,0,0,0);
    }
    button {
      width: 100%;
      .h(50);
      border-radius: 4px;
      border: 0;
      font-size: 16px;
      background: linear-gradient(-90deg, #fa4dbe, #fbaa58);
    }
  }
}
</style>


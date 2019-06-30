<template>
  <div id="set">
    <div class="head">
      <div class="back iconfont iconIcon-fanhui"
           @click="handleBack"></div>
      <p>账户设置</p>
    </div>
    <div class="con">
      <p>
        <span class="sp">头像</span>
        <b class="cen">
          <img :src="userImg"
               alt="">
          <img src=""
               alt="">
        </b>

      </p>
      <p>
        <span class="sp">昵称</span>
        <b class="cen">{{userName}}</b>

      </p>
      <p>
        <span class="sp">性别</span>
        <b class="cen">{{userSex}}</b>

      </p>
    </div>

    <div class="con2">
      <p @click="handleAddress">
        <span></span>
        <b class="sp ">我的收货地址

        </b>
        <span class="iconfont go">&#xe652;</span>

      </p>
    </div>
    <div class="con3 modify">
      <button @click="handleModify">修改基本资料</button>
    </div>
    <div class="con3 modify">
      <button @click="handleOut"
              class="out">退出登录</button>
    </div>
  </div>

</template>

<script>
import myLocalStorage from 'utils/myStorage'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      userImg: '',
      userSex: '',
      userName: '',

    }
  },
  created () {
    this.getInfo()
  },
  methods: {

    handleBack () {
      this.$router.back()
			this.$store.commit("changeShowFooter",true)
    },
    handleModify () {
      this.$router.push('/modifyInfo')

    },
    getToken () {
      return myLocalStorage.get('userToken')
    },
    getInfo () {
      let token = this.getToken()
      if (token) {
        let { userImg, userSex, username } = myLocalStorage.get('userInfo')
        this.userImg = userImg
        this.userSex = userSex
        this.userName = username
      } else {
        this.$router.push('/login')
      }
      // console.log(token)
    },
    handleOut () {
			
      MessageBox.confirm('确定要退出').then(action => {
        // 删除token
        myLocalStorage.remove('userToken')
        myLocalStorage.remove('userInfo')
        this.$router.push('/home')

      }).catch((data) => {
      })
    },
    handleAddress () {
      this.$router.push('/address')
    }
  },
	mounted() {
		this.$store.commit("changeShowFooter",false)
	}
}
</script>

<style scoped lang='less'>
@import '~style/index';
#set {
  width: 100%;
  height: 100%;
  // height: 3rem;
  background: #fff;
  font-size: 16px;
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
  .con,
  .con2,
  .con3 {
    padding: 4px 10px;
    /* background: blue; */
  }
  .con {
    margin-top: 10px;
    margin-bottom: 15px;
  }
  .con2 {
    margin-bottom: 50px;
    .goaddress {
      font-size: 20px;
      font-weight: 900;
    }
  }
  .con3 {
    width: 100%;
    .h(50);
  }
  .con p,
  .con2 p,
  .con3 p {
    width: 100%;
    .h(50);
    border: 1px solid #f2f2f2;
  }
  .sp {
    display: inline-block;
    .w(150);
    .h(50);
    .l_h(50);
    text-align: left;
    font-size: 16px;
    padding-left: 15px;
  }
  .go {
    .w(50);
    .h(50);
    .l_h(50);
    text-align: center;
    font-size: 20px;
    float: right;
    font-weight: 900;
  }
  .cen {
    .w(200);
    .h(50);
    .l_h(50);
    text-align: center;
    font-size: 16px;
    float: right;
    img {
      .w(40);
      .h(40);
      border-radius: 50%;
      margin: 0 auto;
    }
  }
  .modify {
    margin-bottom: 10px;
    button {
      width: 100%;
      .h(50);
      font-size: 16px;
      border: 0;
      border-radius: 4px;
      color: #fff;
      background: #333;
    }
    .out {
      background: #c33;
    }
  }
}
</style>



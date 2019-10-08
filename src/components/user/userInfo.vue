<template>
<div>
  <ul class="login-top" style="border-bottom:0.1px solid #eeeeee;">
    <li class="icon-back">
        <span @click="$router.back(-1)" class="iconfont icon-xiangzuojiantou" style="font-size:20px;"></span>
    </li>
    <li class="login-title">账户管理</li>
  </ul>
  <div id="user-info">
      <p style="text-align:left; padding-left:10px; line-height:50px; border-bottom:0.1px solid #eeeeee;">
          当前登录账号
      </p>
      
      <p style="line-height:35px; height:80px;text-align:left; border-bottom:0.1px solid #eeeeee;">
          <img src="http://localhost/personalCase/shopApp/src/assets/images/user.png" alt="" style="width:60px; height:60px;float:left; display:block; padding-left:10px;">
          <span>
              {{userInfo.username}}
          </span><br>
          <span>
             电话： {{userInfo.tel}}
          </span>
      </p>
      <p class="user-info-p" @click="$router.push('/updatePassword')">
          修改登录密码 >
      </p>
      <p class="user-info-p" @click="$router.push('/updateUserInfo')">
          修改个人信息 >
      </p>
      <p class="user-info-p"  @click="$router.push('/addressList')">
          收货地址管理 >
      </p>
      <p style="text-align:right; margin-top:30px; padding-right:20px; color:#f10000;" @click="logout()">
        退出登录
      </p>
  </div>
</div>

</template>
<script>
import {getUserInfo} from '../../assets/js/config'
  export default {
    data() {
      return {
          userInfo:{},
      }
    },
    created(){
        this.getData();
    },
    methods:{
        getData(){
            this.userInfo = getUserInfo();
        },
        logout(){
          localStorage.removeItem("loginUserInfo");
          localStorage.removeItem("isLogin");
          this.$router.push("/login");
        }
    }
  }
</script>
<style>
.user-info-p{
    border-bottom: 0.1px solid #eeeeee;
    line-height: 60px;
    font-size: 16px;
    text-align: left;
    padding-left:20px;
}
.login-top{
  height:40px;
  line-height: 40px;
  text-align: left;
}
.icon-back{
  font-size: 20px;
  display: inline-block;
  width: 10%;
  font-weight: bold;
  margin-left: 10px;
}
.login-title{
  margin: 0 auto;
  display: inline-block;
  width: 70%;
  text-align: center;
  font-size: 18px;
}
/* #user-info{
  display: table-cell;
  vertical-align: middle;
} */
.user-input{
  width: 90%;
  border-bottom:solid #dddddd 0.5px;
  line-height: 60px;
  height: 60px;
  text-align: left;
  margin-left:20px; 
  margin-right: 20px;
}
.user-text{
    width:90%;
    border-bottom:solid #dddddd 0.5px;
    line-height: 30px;
    font-size: 16px;
    margin-left:20px; 
    text-align: left;
    background-color: transparent;
}
.user-addr{
    line-height: 30px;
    font-size: 16px; 
    padding-top:15px; 
    width: 90%;
}
.user-input input{
  font-size: 16px;
  text-align: left;
  line-height: 55px;
  padding-top:15px; 
  background-color: transparent;
}
.user-btn{
  text-align: center;
  margin: 50px 10px 10px 10px;
  background-color:rgba(246,53,21,0.5);
  border-radius: 15px;
  line-height: 50px;

}
.user-btn input{
  font-size: 18px;
  line-height: 50px;
  background-color: transparent;
  color: #ffffff;
  width: 100%;
}
.p-regist-btn{
  text-align:right; 
  font-size:14px; 
  color:#755656; 
  padding-right:20px; 
  padding-top:20px;
}
.code-btn,.code-btn-send{
    display: block;
    float:right;
    border-radius: 15px;
    width: 90px;
    height: 40px;
    line-height: 40px !important;
    padding-top:0px !important;
    /* border:none; */
    margin-top:15px; 
    text-align: center;
}
.code-btn{
  background-color:rgba(246,53,21,0.5) !important;
    border: #ffccdd solid 1px;
    box-shadow: 0px 0px 5px #ffccdd;
}
.code-btn-send{
  background-color:rgba(200, 200, 200, 0.397) !important;
    border: #bbbbbb solid 1px;
    box-shadow: 0px 0px 5px #bbbbbb;
}
.icon-del{
    float:right; 
    padding-top:20px; 
    padding-right:10px; 
    line-height:30px;
}
</style>
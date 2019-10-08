<template>
<div>
  <ul class="login-top">
    <li class="iconfont icon-xiangzuojiantou icon-back" @click="$router.back(-1)"></li>
    <li class="login-title">更新用户信息</li>
  </ul>
  <div id="user-info">
    <div class="user-input">
      <input autocomplete="off" type="text" name="username" @focus="focus='username',errorText=''" v-model="username" placeholder="请输入用户名">
      <div @click="username=''" v-show="focus=='username'" class="iconfont icon-shanchu icon-del"></div>
    </div>
    <div class="user-input">
      <input autocomplete="off" type="password" name="password" @focus="focus='password',errorText=''" v-model="password" placeholder="请输入密码">
      <div @click="password=''" v-show="focus=='password'" class="iconfont icon-shanchu icon-del"></div>
    </div>
    <div class="user-input">
      <input autocomplete="off" type="number" name="tel" @focus="focus='tel',errorText=''" v-model="tel" maxlength="11" placeholder="请输入手机号">
      <div @click="tel=''" v-show="focus=='tel'" class="iconfont icon-shanchu icon-del"></div>
    </div>
    <div class="user-btn">
      <input type="button" value="确认修改" @click="updateInfo()" @focus="focus='btn'">
    </div>    
    <p v-show="errorText!=''" style="text-align:center;font-size:16px; color:#ff0000;">
      {{errorText}}
    </p>
  </div>
</div>

</template>
<script>
import {getUserInfo,saveUserInfo} from '../../assets/js/config'
  export default {
    data() {
      return {
        errorText:"",//错误提示信息
        focus:'',//当前焦点在哪
        username:"",
        password:"",
        tel:"",
      }
    },
    created(){
        this.getDate();
    },
    methods:{
        getDate(){
            let userInfo = getUserInfo();
            this.username = userInfo.username;
            this.tel = userInfo.tel;
            this.password = userInfo.password;
        },
      //修改
      updateInfo(){
        if(this.username==""){
            this.errorText = "请输入用户名";
        }else if(this.password==""){
            this.errorText = "请输入密码";
        }else if(this.tel==""){
            this.errorText = "请输入绑定手机号";
        }else if (!(/^1[34578]\d{9}$/.test(this.tel))) {
            this.errorText = "电话号码格式错误";
        }else{
            this.errorText = "修改成功";
              saveUserInfo({username:this.username,password:this.password,tel:this.tel});
            const that = this;
            setTimeout(function (){
                that.$router.back(-1);
            },1000);
        }        
      },
    }
  }
</script>
<style>
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
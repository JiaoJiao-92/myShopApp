<template>
<div>
  <ul class="login-top">
    <span @click="$router.back(-1)" class="iconfont icon-xiangzuojiantou icon-back" style="font-size:20px;"></span>
    <li class="login-title">登录</li>
  </ul>
  <div id="user-info">
    <div class="user-input">
      <input autocomplete="off" type="text" name="username" @focus="focus='username',errorText=''" v-model="username" placeholder="用户名/邮箱/手机号">
      <div @click="username=''" v-show="focus=='username'" class="iconfont icon-shanchu" style="float:right; padding:15px 10px 0px 15px;"></div>
    </div>
    <div class="user-input">
      <input autocomplete="off" type="text" name="password" @focus="focus='password',errorText=''" v-model="password" placeholder="请输入密码">
      <div @click="password=''" v-show="focus=='password'" class="iconfont icon-shanchu" style="float:right; padding:15px 10px 0px 15px;"></div>
    </div>
    <p style="text-align:right; padding-right:20px; padding-top:20px;" @click="forgetPass()">忘记密码</p>
    <div class="user-btn">
      <input type="button" value="登录" @click="toLogin()" @focus="focus='btn'">
    </div>    
    <p class="p-regist-btn" @click="regist()">快速注册</p>
    <p v-show="errorText!=''" style="text-align:center;font-size:16px; color:#ff0000;">
      {{errorText}}
    </p>
  </div>
</div>

</template>
<script>
import {login,saveUserInfo} from '../../assets/js/config'
  export default {
    data() {
      return {
        focus:'',//当前焦点在哪
        errorText:"",//错误提示信息
        username:"",
        password:"",
        toPath:"/myHome",
      }
    },
    created(){
      this.toPath = this.$route.query.toPath;
    },
    methods:{
      //注册
      regist(){
        this.$router.push('/register');//登录成功进入 我的主页
      },
      forgetPass(){
        this.$router.push('/forgetPass');//登录成功进入 我的主页
      },
      //登录
      toLogin(){
        if(this.username==""){
          this.errorText = "用户名不能为空";
        }else if(this.password==""){
          this.errorText = "密码不能为空";
        }else{
          login(this.username,this.password).then(response=>{
            var data = eval('('+response+')');
            if (data.username==this.username&&data.password==this.password){
              //保存一些全局信息
              saveUserInfo({username:this.username,password:this.password,tel:data.tel});
              this.$router.push(this.toPath);//登录成功进入 我的主页
            }else{
              this.errorText = '用户名或密码错误';
            }
          }).catch(error=>{
            this.errorText = error;
          })
        }
      }
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
</style>
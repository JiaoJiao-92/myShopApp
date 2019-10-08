<template>
<div>
    <ul class="login-top">
        <li class="iconfont icon-xiangzuojiantou icon-back" @click="$router.back(-1)"></li>
        <li class="login-title">修改用户密码</li>
    </ul>
    <div style="margin-top:60px; padding-left:20px;">
        <p class="up-ptext">
            输入旧密码
        </p>
        <p class="up-p">
            <input type="text" name="" v-model="oldPass" placeholder="请输入旧密码" class="up-input">
        </p>
        <p class="up-ptext">
            设置新的登录密码
        </p>
        <p class="up-p">
            <input type="text" name="" v-model="newPass" placeholder="请输入新密码" class="up-input">
        </p>
    </div>
    <div class="user-btn">
      <input type="button" value="确认修改" @click="updatePass()">
    </div>    
    <p v-show="errorText!=''" style="text-align:center;font-size:16px; color:#ff0000;">
      {{errorText}}
    </p>
</div> 
</template>

<script>
import {getUserInfo,saveUserInfo} from '../../assets/js/config'
export default {
    data(){
        return {
            oldPass:"",
            newPass:"",
            errorText:"",
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
      //修改
        updatePass(){
            if(this.oldPass==""){
                this.errorText = "请输入旧密码";
            }else if(this.newPass==""){
                this.errorText = "请输入新密码";
            }else if(this.oldPass==this.newPass){
                this.errorText = "新密码不能和旧密码一致";
            }else if(this.oldPass!=this.userInfo.password){
                this.errorText = "旧密码不对,请重新输入";
            }else{
                this.errorText = "修改成功";
                saveUserInfo({username:this.userInfo.username,password:this.newPass});
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

.login-top{
  height:40px;
  line-height: 40px;
  text-align: left;
  border-bottom: 0.1px solid #eeeeee;
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
.up-p{
    border:0.1px solid #eeeeee;
    margin-right:10px;
    text-align: left;
}
.up-input{
    background-color:transparent;
    height:60px;
    line-height:60px;
    padding-left:10px; 
    font-size: 16px;   
}
.up-ptext{
    text-align:left;
    line-height:40px;
    font-size: 14px;
}
</style>
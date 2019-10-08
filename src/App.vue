<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
  text-align: center;
  color: #2c3e50;
  margin:0 auto;
}
*{
  margin: 0;
  padding: 0;
  /* color: #333333; */
}
/* 移动端点击高亮 */
html,body{
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
input{
  border: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
textarea{
  border: none;
  outline: none;
}
button{
  border: none;
  outline: none;
}
a{
  text-decoration: none;
  color: #333;
}
li{
  list-style-type: none;
}
</style>

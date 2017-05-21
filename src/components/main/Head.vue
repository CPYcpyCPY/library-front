<template lang="jade">
  div#head
    img(src='/static/logo.jpg', @click="admin")
    span#title {{title}}
    span#login(@click="login" v-if="!user") 登录
    div#info
      span#name(v-if="user", @click="userCenter") {{user.name}}
      el-button#logout(type="danger", v-if="user", @click="logout") 退出

</template>
<script>
  import api from '../../common/api'
  export default {
    name: 'header',
    props: ['user', 'logout'],
    data () {
      return {
        title: '中大图书馆系统',
      }
    },
    methods: {
      admin () {
        this.$router.push('/admin')
      },
      userCenter () {
        this.$router.push('/user')
      },
      login () {
        this.$router.push('/login')
      }
    }
  }
</script>
<style lang="sass" scoped>
#head
  width: 100%
  position: relative
  height: 5rem
  background-color: #0bdbdc
  #title
    position: absolute
    line-height: 5rem
    left: 50%
    font-size: 3rem
    color: #0647ff
    transform: translateX(-50%)
  #login
    position: absolute
    line-height: 5rem
    right: 2rem
    font-size: 2rem
    color: #0647ff
  #info
    display: inline-block
    position: absolute
    right: 2rem
    line-height: 5rem
    #name
      margin-right: 1rem
      font-size: 2rem
      color: rgb(58, 59, 185)
    #logout
      transform: translateY(-10%)
  img
    width: 5rem
    height: 5rem
</style>

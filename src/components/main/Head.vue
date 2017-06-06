<template lang="jade">
  div#head
    img(src='/resource/logo.jpg', @click="admin")
    span#title {{title}}
    span#login(@click="login" v-if="!user") 登录
    div#info
      span#name(v-if="user", @click="userCenter") {{user.name + '(个人中心)'}}
      i.icon.el-icon-arrow-right(v-if="user")
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
        this.$router.push('/adminLogin')
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
    color: #6970e7
    #name
      margin-right: 1rem
      font-size: 2rem
    .icon
      font-size: 2rem
  img
    width: 5rem
    height: 5rem
</style>

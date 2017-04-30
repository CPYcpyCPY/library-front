<template lang="jade">
  div#head
    img(src='../../assets/logo.jpg', @click="admin")
    span#title {{title}}
    span#login(@click="login") 登录

</template>
<script>
  export default {
    name: 'header',
    data () {
      return {
        title: '中大图书馆系统'
      }
    },
    methods: {
      admin () {
        this.$router.push({
          name: 'admin'
        })
      },
      login () {
        this.$router.push({
          name: 'Login'
        })
      }
    }
  }
</script>
<style lang="sass" scoped>
#head
  width: 100%
  position: relative
  height: 4rem
  background-color: #0bdbdc
  #title
    position: absolute
    line-height: 4rem
    left: 50%
    font-size: 2rem
    color: #0647ff
    transform: translateX(-50%)
  #login
    position: absolute
    line-height: 4rem
    right: 2rem
    color: #0647ff
  img
    width: 4rem
    height: 4rem
</style>

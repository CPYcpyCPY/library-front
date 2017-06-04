<template lang="jade">
  div#user
    div.left
      div.header
        i.el-icon-arrow-left(@click="$router.push('/main')")
        span 读者:{{user.name}}
      el-menu.el-menu-vertical-demo(theme='dark' router)
        el-menu-item(index='/user/info')
          i.el-icon-menu
            span 信息编辑
        el-menu-item(index='/user/history')
          i.el-icon-setting
            span 借阅历史
        el-menu-item(index='/user/problem')
          i.el-icon-warning
            span 问题回答
    transition(name="fade" mode="out-in")
      router-view
</template>
<script>
import api from '../../../common/api.js'
export default {
  name: 'user',
  data () {
    return {
      user: '',
      text: '个人中心',
    }
  },
  beforeCreate() {
    api.isLogin().done((res) => {
      if(res.msg) this.user = res.user;
      else this.$router.push('/login')
    })
  }
}
</script>
<<style lang="sass">
#app
  background-color: #EFF2F7
#user
  display: flex
  height: auto
  width: 100%
  .left
    width: 12rem
    position: fixed
    height: 100%
    background-color: #324057
    .header
      text-align: center
      color: white
      line-height: 60px
      font-size: 1.2rem
      height: 60px
      background-color: #273244
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)
    span
      margin-left: 1rem
    #bottom
      position: absolute
      bottom: 60px
      width: 50px
      height: 50px
      border: 2px solid white
      border-radius: 50px
      text-align: center
      left: 50%
      margin-left: -25px
      img
        border-radius: 30px
        margin-top: 2px
        width: 40px
        height: 40px
    .name
      position: absolute
      width: 100%
      text-align: center
      color: white
      bottom: 10px
</style>

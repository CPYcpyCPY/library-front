<template lang="jade">
  div#admin
    div.left
      div.header 图书馆管理
      el-menu.el-menu-vertical-demo(theme='dark' router)
        el-menu-item(index='/admin/manage')
          i.el-icon-menu
            span 图书管理
        el-menu-item(index='/admin/auth')
          i.el-icon-setting
            span 账号管理
        el-menu-item(index='/admin/blacklist')
          i.el-icon-warning
            span 黑名单
      div#bottom
        img(src='../../assets/fish.png')
      p.name(@click="signOut") 您好{{admin}} | 退出
    transition(name="fade" mode="out-in")
      router-view
</template>

<script>
  require('../../common/DataTable/jquery-3.2.1.min.js')
  require('../../common/DataTable/jquery.dataTables.min.js')
  export default {
    name: 'admin',
    data () {
      return {  
        admin: '管理员'
      }
    },
    methods: {
      signOut () {
        this.$confirm('确定退出管理员页面', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    }
  }
</script>

<style scoped lang="sass">
@import '../../common/DataTable/jquery.dataTables.min.css'
#admin
  display: flex
  height: 100%
  width: 100%
  .left
    width: 12rem
    position: relative
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

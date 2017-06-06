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
            span 正常用户
        el-menu-item(index='/admin/blacklist')
          i.el-icon-warning
            span 黑名单用户
      div#bottom
        img(src='../../assets/fish.png')
      p.name(@click="signOut") 您好{{admin.name}} | 退出
    transition(name="fade" mode="out-in")
      router-view
</template>

<script>
  import api from '../../common/api-admin'
  export default {
    name: 'admin',
    data () {
      return {
        admin: '管理员'
      }
    },
    beforeCreate() {
      api.isLogin().done((res) => {
        if(res.msg) this.admin = res.admin;
        else this.$router.push('/adminLogin')
      })
    },
    methods: {
      signOut () {
        this.$confirm('确定退出管理员页面', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.logout().done(() => {
            this.$message({
              type: 'success',
              message: '退出成功!'
            })
            this.$router.push({
              path: '/'
            })
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
#admin
  display: flex
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
      border-radius: 50px
      text-align: center
      left: 50%
      margin-left: -25px
      img
        border-radius: 25px
        margin-top: 2px
        width: 50px
        height: 50px
    .name
      position: absolute
      width: 100%
      text-align: center
      color: white
      bottom: 10px
</style>

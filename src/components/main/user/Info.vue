<template lang="jade">
  div#info
    h2#title 个人信息编辑
    el-form#form(label-position='right', label-width='80px', :model='form')
      el-form-item(label='名字')
        el-input(v-model='user.name')
      el-form-item(label='校区')
        el-input(v-model='user.college')
      el-form-item(label='性别')
        el-input(v-model='user.sex')
      el-form-item(label='邮箱')
        el-input(v-model='user.mail')  
      el-button#submit(type='primary' @click="updateUser") 提交 
</template>
<script>
  import api from '../../../common/api'
  export default {
    name: 'info',
    data () {
      return {
        user: '',
        form: {}
      }
    },
    beforeCreate() {
      api.isLogin().done((res) => {
        if(res.msg) this.user = res.user;
        else this.$router.push('/login')
      })
    },
    methods: {
      updateUser() {
        this.form.number = this.user.number
        this.form.name = this.user.name
        this.form.college = this.user.college
        this.form.sex = this.user.sex
        this.form.mail = this.user.mail
        console.log(this.form)
      },
    }
  }
</script>
<style scoped lang="sass">
#info
  flex: 1
  padding-left: 1rem
  margin-left: 12rem
  background-color: #EFF2F7
  #title
    margin: 20px
    font-size: 2rem
  #form
    margin-top: 5rem
    width: 60%  
    #submit
      display: block
      width: 95%
      margin: 0 auto  
</style>

<template lang="jade">
  div#info
    h2#title 个人信息编辑
    el-form#form(label-position='right', label-width='80px', :model='form')
      el-form-item.text(label='名字')
        el-input(v-model='form.name')
      el-form-item.text(label='校区')
        el-select.select(v-model='form.school', placeholder='请选择校区')
          el-option(v-for="(school, index) in schools", :label="school", :value="school", :key="index")
      el-form-item.text(label='性别')
        el-input(v-model='form.sex')
      el-form-item.text(label='邮箱')
        el-input(v-model='form.mail')
      el-button#submit(type='primary', @click="updateUser") 提交
</template>
<script>
  import api from '../../../common/api'
  export default {
    name: 'info',
    data () {
      return {
        user: '',
        schools: ['东校区', '南校区', '北校区', '珠海校区'],
      }
    },
    computed: {
      form() {
        return {
          name: this.user.name,
          school: this.user.school,
          sex: this.user.sex,
          mail: this.user.mail,
          number: this.user.number,
        }
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
        api.updateUser(this.form).done(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
      },
    }
  }
</script>
<style scoped lang="sass">
#info
  flex: 1
  padding-left: 1rem
  margin-left: 12rem
  position: relative
  background-color: #EFF2F7
  #title
    margin: 20px
    font-size: 2.5rem
  #form
    margin: 4rem auto 0
    width: 50%
    .text
      width: 93% !important
      .select
        width: 100%
    #submit
      display: block
      margin: 0 auto
      width: 90%
</style>

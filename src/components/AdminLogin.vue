<template lang="jade">
  div#canvas-wrapper
    div.loginBox
      h1 管理员登录
      div.img
        img.image(src="../assets/logo.jpg")
      el-form(:label-position='labelPosition', label-width='80px', :model='formData')
        el-form-item(label='编号')
          el-input.input(v-model='formData.number')
        el-form-item(label='密码')
          el-input.input(v-model='formData.password' type='password')
      div.err {{err}}
      el-button.submit(type='primary', @click="submit") 登录
</template>
<script>
  import Particle from 'zhihu-particle'
  import api from '../common/api-admin'
  export default {
    name: 'adminLogin',
    data () {
      return {
        msg: '登录/注册',
        type: 'signIn',
        labelPosition: 'right',
        formData: {
          number: '',
          password: '',
          repeat: ''
        },
        err: ''
      }
    },
    mounted () {
      new Particle(document.getElementById('canvas-wrapper'));
      document.getElementsByClassName('left')[0].style.display = 'none';
    },
    methods: {
      handleClick (tab, event) {
        this.clear();
      },
      clear() {
        this.err = ''
        this.formData.number = ''
        this.formData.password = ''
      },
      submit () {
        let number = this.formData.number
        let password = this.formData.password
        if (!number) {
          this.err = '编号不能为空'
        } else if (!password) {
          this.err = '密码不能为空'
        } else if (this.type == 'signIn') {
          api.signIn(number, password).then((res) => {
            if(res.err) this.err = res.err;
            else this.$router.push({
              path: '/admin/manage'
            });
          })
        } else {
          api.signUp(number, password).then((res) => {
            this.clear();
            this.$message({
              type: 'info',
              message: '注册成功'
            })
          })
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  .el-tab-pane
    display: none
  #canvas-wrapper
    height: 100%
    width: 100%
    position: absolute
    .loginBox
      position: absolute
      z-index: 99
      top: 50%
      left: 50%
      transform: translateY(-50%) translateX(-50%)
      .img
        text-align: center
        margin-bottom: 10px
      h1
        text-align: center
        font-size: 3rem
        color: red
      width: 30%
      .submit
        width: 100%
        margin-top: 1rem
      .input
        width: 90%
      .err
        color: red
        text-align: center
        margin-bottom: 0.5rem

</style>

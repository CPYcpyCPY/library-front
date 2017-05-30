<template lang="jade">
  div#canvas-wrapper
    div.loginBox
      div.img
        img.image(src="/static/logo.jpg")
      el-tabs(v-model='type', @tab-click='handleClick')
        el-tab-pane(label='登录', name='signIn') 登录
        el-tab-pane(label='注册', name='signUp') 注册
      el-form(:label-position='labelPosition', label-width='80px', :model='formData')
        el-form-item(label='编号')
          el-input.input(v-model='formData.number')
        el-form-item(label='密码')
          el-input.input(v-model='formData.password' type='password')
        el-form-item(v-if="type == 'signUp'" label='确认密码')
          el-input.input(v-model='formData.repeat'  type='password')
      div.err {{err}}
      el-button.submit(type='primary', @click="submit")
        | {{type == 'signIn' ? '登录' : '注册'}}
</template>
<script>
  import Particle from 'zhihu-particle'
  import api from '../common/api'
  export default {
    name: 'login',
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
    },
    methods: {
      handleClick (tab, event) {
        this.clear();
      },
      clear() {
        this.err = ''
        this.formData.number = ''
        this.formData.password = ''
        this.formData.repeat = ''
      },
      submit () {
        let number = this.formData.number
        let password = this.formData.password
        if (!number) {
          this.err = '编号不能为空'
        } else if (!password) {
          this.err = '密码不能为空'
        } else if (this.type == 'signIn') {
          api.signIn(number, password).done((res) => {
            if(res.err) this.err = res.err;
            else this.$router.push({
              path: '/'
            });
          })
        } else if (password !== this.formData.repeat) {
          this.err = '两次密码不一致'
        } else {
          api.signUp(number, password).done(() => {
            this.clear();
            this.$message({
              type: 'success',
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

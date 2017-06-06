<template lang="jade">
  div#problem
    h2#title {{!inBlackList ? '暂无题目': '答题列表(管理员提示:' + message + ')'}}
    div#form(v-if="inBlackList && problems")
      form.pro-item(v-for="(p,i) in problems")
        label.title 题目{{p.number}}: {{p.title}}
        div.choose
          div.item(v-for="(val, key) in p.selects")
            input(type="radio", name="pro", :value="key")
            span.val {{val}}
      el-button#submit(type='primary', @click="submitProblems", v-loading.fullscreen.lock="loading") 提交
</template>
<script>
  import api from '../../../common/api'
  export default {
    name: 'problem',
    data () {
      return {
        inBlackList: false,
        loading: false,
        problems: '',
        message: ''
      }
    },
    computed: {
      user () {
        return this.$store.state.user.user
      }
    },
    mounted() {
      api.getProblem().then((res) => {
        if(res.msg) {
          this.inBlackList = false;
        } else {
          this.inBlackList = true;
          this.problems = res.problems;
          this.message = res.message;
        }
      })
    },
    methods: {
      submitProblems() {
        let result = [], items = $("[name='pro']:checked");
        for (let i = 0; i < items.length; i++) result.push(items[i].value)
        this.loading = true;
        let d1 = new Date().getTime();
        api.submitProblems(this.user.number, result.join('-')).then((res) => {
          let d2 = new Date().getTime();
          setTimeout(() => {
            this.loading = false;
            this.$notify({
              type: res.msg ? 'success' : 'error',
              title: res.msg ? '正确' : '错误',
              message: res.msg ? '答案正确，已解除黑名单' : '答案错误，请重新作答'
            })
          }, d2 - d1 < 1200 ? 1200 : 0)
        })
      }
    }
  }
</script>
<style scoped lang="sass">
  #problem
    flex: 1
    margin-left: 12rem
    padding-left: 1rem
    background-color: #EFF2F7
    padding-bottom: 2rem
    #title
      margin: 20px
      font-size: 2.5rem
    #form
      width: 80%
      margin: 2rem auto 0
      padding: 10px
      .pro-item
        margin-bottom: 2rem
        .title
          font-size: 1.5rem
        .choose
          margin-top: 1rem
          font-size: 1.2rem
          display: flex
          .item
            height: 2rem
            line-height: 2rem
            flex: 1
            .val
              margin-left: 0.5rem
      #submit
        width: 100%
        display: block
        margin: 0 auto
</style>

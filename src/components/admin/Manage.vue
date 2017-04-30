<template lang="jade">
  div#manage
    el-tabs(type='border-card')
      el-tab-pane(label='空闲图书') 空闲图书列表
      el-tab-pane(label='已借阅图书') 已借阅图书列表
      el-tab-pane(label='添加图书') +

</template>
<script>
  export default {
    name: 'manage',
    data () {
      return {
        msg: '图书管理'
      }
    },
    created () {
    }
  }
</script>
<style scoped lang="sass">
  #manage
    margin-top: 1rem
    width: 100%
    flex: 1
    background-color: #EFF2F7
</style>

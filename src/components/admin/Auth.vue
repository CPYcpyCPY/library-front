<template lang="jade">
  div#auth
    h2 用户列表
    ul.people
      li user1
      li user2
      li user3
</template>
<script>
  export default {
    name: 'reserve',
    data () {
      return {
        msg: '图书预定'
      }
    },
    created () {
    }
  }
</script>
<style scoped lang="sass">
  #auth
    flex: 1
    padding-left: 1rem
    background-color: #EFF2F7
</style>

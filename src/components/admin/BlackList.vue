<template lang="jade">
  div#manage {{msg}}
</template>
<script>
  export default {
    name: 'blacklist',
    data () {
      return {
        msg: '黑名单'
      }
    },
    created () {
    }
  }
</script>
<style scoped lang="sass">
  #manage
    flex: 1
    background-color: #EFF2F7
</style>

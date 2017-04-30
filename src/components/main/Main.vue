<template lang="jade">
  div#home
    Library_Head
    transition(name="fade" mode="out-in")
      router-view
</template>

<script>
import Library_Head from './Head.vue'
export default {
  name: 'home',
  components: {
    Library_Head,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
h1, h2
  font-weight: normal

</style>

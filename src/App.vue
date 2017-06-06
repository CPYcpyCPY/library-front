<template lang="jade">
  div#app
    transition(name="fade" mode="out-in")
      router-view
</template>

<script>
export default {
  name: 'app',
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="sass">
body, html
  height: 100%
  margin: 0
  font-family: cursive
.fade-enter-active, .fade-leave-active
  transition: opacity .5s ease

.fade-enter, .fade-leave-active
  opacity: 0

</style>

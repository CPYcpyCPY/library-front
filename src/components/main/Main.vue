<template lang="jade">
  div#home
    Library_Head(:user="user", :logout="logout")
    transition(name="fade" mode="out-in")
      router-view
</template>

<script>
  import Library_Head from './Head.vue'
  import api from '../../common/api'
  export default {
    name: 'home',
    components: {
      Library_Head: Library_Head
    },
    data() {
      return {
        user: null
      }
    },
    methods: {
      logout () {
        api.logout(this.user.number).done(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          this.user = null
        })
      }
    },
    mounted() {
      this.$store.dispatch('GET_USER').then(() => {
        let user = this.$store.state.user.user
        if (user) this.user = user;
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  h1, h2
    font-weight: normal

</style>

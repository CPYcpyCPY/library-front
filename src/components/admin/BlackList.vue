<template lang="jade">
  div#auth
    h2#title 用户列表
    template
      el-table(v-if="users", :data='users', border='', style='width: 86%')
        el-table-column(v-for="(val, key, index) in base", :prop="key", :label="val", width="180", :key="key")
        el-table-column(label='操作', width="180")
          template(scope='scope')
            el-button(size='small', type='success', @click='handleDelete(scope.$index)') 解除黑名单
</template>
<script>
  import api from '../../common/api-admin'
  export default {
    name: 'reserve',
    data () {
      return {
        base: {
          name: '姓名',
          number: '读者编号',
          school: '学院',
          sex: '性别',
          mail: '邮箱'
        },
        msg: '图书预定',
        users: ''
      }
    },
    beforeCreate() {
      api.users(1).then((res) => {
        this.users = res
      })
    },
    methods: {
      handleDelete(index) {
        let user = this.users[index];
        this.$confirm('确定从黑名单中解除读者:"' + user.name + '"', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.removeFromBlackList(user.number).then((res) => {
            this.users.splice(index, 1);
            this.$message({type: 'success', message: res.msg})
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style scoped lang="sass">
  #auth
    flex: 1
    margin-left: 12rem
    padding-left: 1rem
    background-color: #EFF2F7
    #title
      margin: 20px
      font-size: 2rem
</style>

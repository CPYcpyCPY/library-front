<template lang="jade">
  div#auth
    h2#title 用户列表
    template
      el-table(v-if="users", :data='users', border='', style='width: 86%')
        el-table-column(v-for="(val, key, index) in base", :prop="key", :label="val", width="180", :key="key", sortable)
        el-table-column(label='操作', width="180")
          template(scope='scope')
            el-button(size='small', type='danger', @click='deleteUser(scope.$index)') 删除
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
          college: '学院',
          sex: '性别',
          mail: '邮箱'
        },
        msg: '图书预定',
        users: ''
      }
    },
    beforeCreate() {
      api.users().then((res) => {
        this.users = res
      })
    },
    methods: {
      deleteUser(index) {
        let user = this.users[index]
        this.$confirm('确定删除用户:' + user.name, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteUser(user.number).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.users.splice(index, 1);
          })
        }).catch(() => {});
      }
    }
  }
</script>
<style scoped lang="sass">
  #auth
    flex: 1
    padding-left: 1rem
    background-color: #EFF2F7
    #title
      margin: 20px
      font-size: 2rem
</style>

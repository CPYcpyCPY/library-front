<template lang="jade">
  div#auth
    h2#title 用户列表
    template
      el-table(v-if="users", :data='users', border='', style='width: 86%')
        el-table-column(v-for="(val, key, index) in base", :prop="key", :label="val", width="180", :key="key", sortable)
        el-table-column(label='操作', width="180")
          template(scope='scope')
            el-button.btn-black(size='small', type='warning', @click='addToBlackList(scope.$index)') 拉入黑名单
            el-button(size='small', type='danger', @click='deleteUser(scope.$index)') 删除
</template>
<script>
  import api from '../../common/api-admin'
  export default {
    name: 'auth',
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
      api.users(0).then((res) => {
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
      },
      addToBlackList(index) {
        let user = this.users[index]
        this.$prompt('请输入备注:', '确定将用户:"' + user.name + '"拉入黑名单', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          api.addToBlackList({
            number: user.number,
            message: value
          }).then((res) => {
            this.users.splice(index, 1);
            this.$message({
              type: 'success',
              message: res.msg
            });
          })
        }).catch(() => {});
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
    .btn-black
      background-color: #3e5059
      border-color: #607D8B
</style>

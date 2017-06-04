<template lang="jade">
  div#history
    h2#title 图书借阅记录
    el-table#table(v-if="reserves", :data='reserves', border='', style='width: 80%')
      el-table-column(v-if="key != 'isReturn'", v-for="(val, key, index) in base", :prop="key", :label="val", width="180", :key="key")
      el-table-column(v-else, label="是否归还")
        template(scope="scope")
          span.return(:class="{'no-return': !scope.row.isReturn}") {{scope.row.isReturn ? '是': '否'}}
          el-button(v-if="!scope.row.isReturn", size='small', type='info', @click="giveBack(scope.$index)") 归还
</template>
<script>
  import api from '../../../common/api'
  export default {
    name: 'history',
    data () {
      return {
        base: {
          reserve_time: '借阅日期',
          name: '图书名称',
          book_number: '图书编号',
          isReturn: '是否归还'
        },
        reserves: [],
        msg: '图书预定',
        users: ''
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user
      }
    },
    mounted() {
      api.getReserveHistory(this.user.number).then((res) => {
        this.reserves = res;
      })
    },
    methods: {
      giveBack: function (index) {
        let item = this.reserves[index];
        this.$confirm('确定归还图书:"' + item.name + '"', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.giveBack(item.book_number).then((res) => {
            this.reserves[index].isReturn = 1;
            let newArr = this.reserves
            this.reserves = newArr
            this.$message({type: 'success', message: res.msg})
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style scoped lang="sass">
#history
  flex: 1
  margin-left: 12rem
  padding-left: 1rem
  background-color: #EFF2F7
  #title
    margin: 20px
    font-size: 2.5rem
  #table
    margin-top: 4rem
    margin-left: 5rem
    .no-return
      color: red
    .return
      margin-right: 1rem
</style>

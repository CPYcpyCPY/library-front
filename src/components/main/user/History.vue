<template lang="jade">
  div#history
    h2#title 图书借阅记录
    el-table#table(v-if="reserves", :data='reserves', border='', style='width: 540px', :row-class-name="tableRowClassName")
      el-table-column(v-for="(val, key, index) in base", :prop="key", :label="val", width="180", :key="key")
</template>
<script>
  import api from '../../../common/api'
  export default {
    name: 'history',
    data () {
      return {
        base: {
          date: '日期',
          name: '书名',
          isReturn: '是否归还'
        },
        reserves: [
          {name: '三国演义', 'date': '2017-05-10', isReturn: '否'},
          {name: '水浒传', 'date': '2017-03-10', isReturn: '否'},
          {name: '红楼梦', 'date': '2017-04-12', isReturn: '是'},
          {name: '西游记', 'date': '2017-05-15', isReturn: '否'}
        ],
        msg: '图书预定',
        users: ''
      }
    },
    beforeCreate() {
      // api.getReserve() 
    },
    mounted() {
      $('.no-return').css('background', '#f16871')
    },
    methods: {
      tableRowClassName(row, index) {

        if(row.isReturn.trim() == '否') return 'no-return'
        return ''
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
    font-size: 2rem
  #table
    margin-left: 5rem
</style>

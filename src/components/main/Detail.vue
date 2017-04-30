<template lang="jade">
  div#detail
    div.ui.two.column.grid
      div.column
        div.ui.fluid.image
          div.ui.red.ribbon.label(v-if="book.reserved") 已预约
          img(v-if="book", :src="require('../../assets/' + book.picture)")
      div#info
        table#info-table(border="1")
          caption 图书信息
          tr
            td 书名
            td {{book.name}}
          tr
            td 图书编号
            td {{book.num}}
          tr
            td 作者
            td {{book.author}}
          tr
            td 类型
            td {{book.type}}
          tr
            td 出版社
            td {{book.publisher}}
          tr
            td 校区
            td {{book.school}}
          tr
            td 购入时间
            td {{book.buy_time}}
</template>

<script>
import api from '../../common/api'
export default {
  name: 'detail',
  data () {
    return {
      book: ''
    }
  },
  mounted() {
    let id = this.$route.query.id;
    api.book(id).then((res) => {
      this.book = res.data;
    })
  }
}
</script>

<style scoped lang="sass">
@import '../../common/Semantic-UI/semantic.min.css'
#detail
  border: 1px solid red
  width: 50%
  margin: 5rem auto
  #info
    margin: 0 auto
    padding-top: 1rem
    #info-table
      caption
        font-size: 2rem
        margin-bottom: 1rem
        margin-top: 1rem
      td
        padding: 10px
</style>

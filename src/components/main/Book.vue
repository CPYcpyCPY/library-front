<template lang="jade">
  div#books
    div.book-row(v-for='book in books')
      div.book(v-for="b in book", @click='bookDetail(b.id)')
        img(:src="require('../../assets/' + b.picture)")
        div#info1
          div.book-name
            i.el-icon-document
            span {{b.name}}
          div.book-author
            i.el-icon-edit
            span {{b.author}}
        div#info2
          div.book-type
            i.el-icon-plus
            span {{b.type}}
</template>

<script>
  import api from '../../common/api'
  import tool from '../../common/tools'
  export default {
    name: 'book',
    data () {
      return {
        books: ''
      }
    },
    methods: {
      bookDetail(id) {
        this.$router.push({
          path: '/main/detail',
          query: {
            id: id
          }
        });
      }
    },
    created () {
      api.books().then((res) => {
        this.books = tool.toNArray(res.data.concat(res.data), 3)
      })
    }
  }
</script>

<style scoped lang="sass">
  #books
    .book-row
      display: flex
      width: 80%
      margin: 5% auto
      .book
        width: 30%
        margin: 10px
        border: 2px solid #c3c3c3
        border-radius: 10px
        img
          width: 100%
          height: 350px
          border-radius: 10px
      [id*='info']
        display: flex
        [class*='book']
          justify-content: center
          display: flex
          flex: 1
</style>

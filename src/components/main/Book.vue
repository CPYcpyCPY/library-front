<template lang="jade">
  div#books
    div.book-row(v-for='book in books')
      div.book(v-for="b in book", @click='bookDetail(b.number)')
        el-card(:body-style="{ padding: '0px' }")
          img.image(:src="'/static/cover/' + b.picture")
          div.info-box
            span.name {{b.name}}
            .bottom
              span.author {{b.author}}
              span.type {{b.type}}
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
      bookDetail(number) {
        this.$router.push({
          path: '/main/detail',
          query: {
            number: number
          }
        });
      }
    },
    created () {
      api.books(2).then((res) => {
        this.books = tool.toNArray(res, 3)
      })
    }
  }
</script>

<style lang="sass">
  #app
    height: auto !important
  #books
    height: auto
    padding-bottom: 2rem
    .book-row
      display: flex
      width: 80%
      margin: 5% auto
      .book
        width: 30%
        margin: 10px
        img
          width: 100%
          height: 350px
        .info-box
          padding: 0 1rem 0.5rem 1rem
          .name
            font-size: 1.3rem
          .bottom
            display: flex
            .author
              flex: 2
              font-size: 1.2rem
              color: #0d71bb
            .type
              display: flex
              font-size: 1.1rem
              justify-content: flex-end
              flex: 1
              color: #00B5AD
</style>

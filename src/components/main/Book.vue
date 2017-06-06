<template lang="jade">
  div#books
    el-input#search(placeholder='输入图名', icon='search', v-model='searchName')
    div.book-row(v-for='book in books')
      div.book(v-for="b in book", @click='bookDetail(b.number)')
        el-card(:body-style="{ padding: '0px' }")
          img.image(:src="'/resource/cover/' + b.picture")
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
        books: '',
        originBooks: '',
        searchName: ''
      }
    },
    watch: {
      'searchName': function (key) {
        if(!key || /\w+/.test(key)) {
          this.books = this.originBooks;
          return;
        }
        let newBooks = [];
        for(let i = 0; i < this.books.length; i++) {
          this.books[i].forEach( book => {
            if(book.name.indexOf(key) != -1) newBooks.push(book)
          })
        }
        this.books = this.generate(newBooks);
      }
    },
    filters: {
      filterFun (value) {
        console.log(value)
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
      },
      generate (books) {
        return tool.toNArray(books, 3)
      },
    },
    created () {
      api.books(2).then(res => {
        this.books = this.generate(res);
        this.originBooks = this.generate(res);
      })
    }
  }
</script>

<style lang="sass">
  #books
    background-color: #EFF2F7
    height: auto
    padding-bottom: 2rem
    #search
      width: 15rem
      float: right
      margin: 1rem 2rem 1rem 0
    .book-row
      display: flex
      width: 90%
      margin: 5% auto
      .book
        width: 30%
        margin: 10px
        img
          width: 100%
          height: 25rem
        .info-box
          padding: 0 1rem 0.5rem 1rem
          .name
            font-size: 1.3rem
          .bottom
            display: flex
            .author
              flex: 3
              font-size: 1.2rem
            .type
              display: flex
              font-size: 1.1rem
              justify-content: flex-end
              flex: 1
</style>

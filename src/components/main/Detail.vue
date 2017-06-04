<template lang="jade">
  div#detail
    div#info-box
      div#preview
        el-carousel(:interval='4000', type='card', height='500px')
          el-carousel-item(v-for='(img,index) in imgs', :key='index')
            img(v-if="index == 0", :src="'/static/cover/' + img")
            img(v-else :src="'/static/'+ book.number + '/' + img")
      div#info
        el-card.box-card#info-card
          .text.item(v-for='(val, key) in base', :key='key')
            span.book-key {{val}}:
            span.book-val(v-if="key == 'reserved'", class="reserved") {{book[key] == 0 ? '否': '是'}}
            span.book-val(v-else)  {{book[key]}}
    div#btn
      el-button#reserve(type="success", @click="reserve", :disabled="book.reserved == 1") {{book.reserved == 1?'已': ''}}借阅
      el-button(type='primary', @click="download") 下载PDF

</template>

<script>
import api from '../../common/api'
import tools from '../../common/tools'
export default {
  name: 'detail',
  data () {
    return {
      book: '',
      imgs: [],
      base: {
        number: '图书编号',
        author: '作者/译者',
        name: '书名',
        publisher: '出版者',
        type: '类型',
        reserved: '是否借阅',
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    }
  },
  methods: {
    download() {
      tools.download(api.download, {
        number: this.book.number
      })
    },
    reserve () {
      if(!this.user) {
        this.$notify({
          title: '警告',
          message: '请先登录！',
          type: 'warning'
        });
      } else {
        this.$confirm('确定预定图书:"' + this.book.name + '"', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.reserve(this.book.number).then((res) => {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.book.reserved = 1
          })
        }).catch(()=>{})
      }
    }
  },
  mounted() {
    let number = this.$route.query.number;
    api.book(number).then((res) => {
      this.book = res;
      res.urls = res.urls.substr(0, res.urls.length - 1)
      this.imgs.push(this.book.picture)
      this.imgs = this.imgs.concat(res.urls.split('|'));
    })
  }
}
</script>

<style scoped lang="sass">
.el-carousel__item:nth-child(2n)
  background-color: #99a9bf

.el-carousel__item:nth-child(2n+1)
  background-color: #d3dce6
.el-carousel--card
  width: 100%
#detail
  .reserved
    color: red !important
    font-size: 1.3rem
    font-weight: bolder
  #info-box
    display: flex
    #preview
      margin: 4rem 0 4rem 0
      flex: 1
    #info
      flex: 1
      position: relative
      #info-card
        position: absolute
        top: 50%
        transform: translateY(-50%) translateX(-50%)
        width: 80%
        left: 50%
        .text
          font-size: 1.2rem
          padding: 18px 0
          border-bottom: 1px solid #caced7
          display: flex
          .book-key
            flex: 1
            font-size: 1.3rem
            font-weight: bold
            color: #0c922a
          .book-val
            flex: 3
            color: #324148

  #btn
    text-align: center
    margin: 0 auto
    width: 100%
    button
      width: 49%
</style>

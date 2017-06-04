<template lang="jade">
  div#detail
    div.ui.two.column.grid#book
      div.column
        div.ui.fluid.image
          div.ui.red.ribbon.label(v-if="book.reserved == 1") 已预约
          img(v-if="book", :src="'/static/cover/' + book.picture")
      img(v-for="img in imgs", :src="'/static/'+ book.number + '/' + img")
      div#info
        table#info-table(border="1")
          caption 图书信息
          tr
            td 书名
            td {{book.name}}
          tr
            td 图书编号
            td {{book.number}}
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
    div#btn
      el-button#reserve(type="success", @click="reserve", :disabled="book.reserved == 1") 预定
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
      imgs: []
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
        id: 'id',
        value: this.book.number
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
      this.imgs = res.urls.split('|');
    })
  }
}
</script>

<style scoped lang="sass">
@import '../../common/Semantic-UI/semantic.min.css'
#detail
  #book
    border: 1px solid red
    width: 50%
    margin: 5rem auto 1rem
    img
      width: 300px
      height: 400px
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
  #btn
    text-align: center
    margin: 0 auto
    width: 50%
    button
      width: 49%
</style>

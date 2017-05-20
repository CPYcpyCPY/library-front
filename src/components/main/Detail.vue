<template lang="jade">
  div#detail
    div.ui.two.column.grid#book
      div.column
        div.ui.fluid.image
          div.ui.red.ribbon.label(v-if="book.reserved == 1") 已预约
          img(v-if="book", :src="'/static/' + book.picture")
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
      el-popover(ref='popover5', placement='top', width='160', v-model='visible')
        p 预定图书:{{book.name}}
        div(style='text-align: right; margin: 0')
          el-button(size='mini', type='text', @click='visible = false') 取消
          el-button(type='primary', size='mini', @click='makesure') 确定    
      el-button#reserve(type="success", v-popover:popover5='', :disabled="this.book.reserved == 1") 预定
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
      visible: false,
      userNumber: 100
    }
  },
  methods: {
    download() {
      tools.download(api.download, {
        id: 'id',
        value: this.book.number
      })
    },
    makesure() {
      api.reserve(this.userNumber, this.book.number).then(() => {
        this.$message({
          type: 'success',
          message: '预定成功'
        }),
        this.visible = false
      })
    }
  },
  mounted() {
    let number = this.$route.query.number;
    api.book(number).then((res) => {
      this.book = res;
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

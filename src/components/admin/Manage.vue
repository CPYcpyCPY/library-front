<template lang="jade">
  div#manage
    el-tabs(type='border-card')
      el-tab-pane(label='空闲图书')
        el-table#table(v-if="freeBooks", :data='freeBooks', stripe='', style='margin: 0 auto; width: 90%')
          el-table-column(v-for="(val, key) in base", :prop="key", :label="val", width='160', :key="key")
      el-tab-pane(label='已借阅图书')
        el-table(v-if="orderBooks", :data='orderBooks', stripe='', style='margin: 0 auto; width: 90%')
          el-table-column(v-for="(val, key) in base", :prop="key", :label="val", width='160', :key="key")
      el-tab-pane(label='添加图书')
        el-form(ref='form', :model='form', label-width='80px' style="padding-left: 100px")
          el-form-item(label='图书名')
            el-input(v-model='form.name' style="width: 400px")
          el-form-item(label='图书编号')
            el-input(v-model='form.number' style="width: 400px")
          el-form-item(label='作者/译者')
            el-input(v-model='form.author' style="width: 400px")
          el-form-item(label='类型')
            el-input(v-model='form.type' style="width: 400px")  
          el-form-item(label='出版社')
            el-input(v-model='form.publisher' style="width: 400px")      
          el-form-item(label='校区')
            el-select(v-model='form.region', placeholder='请选择校区')
              el-option(v-for="(school, index) in schools", :label="school", :value="school", :key="index")
          el-form-item(label='购入时间')
            el-col(:span='11')
              el-date-picker(type='date', placeholder='选择日期', v-model='form.date', style='width: 100%;')
          el-upload(action='https://jsonplaceholder.typicode.com/posts/', list-type='picture-card', :on-remove='handleRemove')
            i.el-icon-plus
          el-dialog(v-model='form.dialogVisible', size='tiny')
            img(width='100%', :src='form.dialogImageUrl', alt='')
          el-form-item
            el-button(type='primary', @click='submit') 立即创建
            el-button 取消
</template>
<script>
  import api from '../../common/api.js'
  export default {
    name: 'manage',
    data () {
      return {
        base: {
          number: '图书编号',
          name: '书名',
          author: '作者/译者',
          publisher:'出版社',
          type: '类型',
          school: '校区',
          buy_time: '购入时间'
        },
        schools: ['东校区', '南校区', '北校区', '珠海校区'],
        msg: '图书管理',
        freeBooks: "",
        orderBooks: "",
        form: {
          name: '',
          region: '',
          date: '',
          dialogImageUrl: '',
          dialogVisible: false
        }
      }
    },
    methods: {
      submit() {

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      }
    },
    created() {
      Promise.all([
        api.books(0), api.books(1)
      ]).then((res) => {
        this.freeBooks = res[0].data;
        this.orderBooks = res[1].data;
      })
    },
    mounted () {
      document.getElementsByClassName('left')[0].style.display = 'block';    
    }
  }
</script>
<style scoped lang="sass">
  #manage
    margin-top: 1rem
    width: 100%
    flex: 1
    background-color: #EFF2F7
    #table
      width: 500px
</style>

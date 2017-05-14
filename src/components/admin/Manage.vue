<template lang="jade">
  div#manage
    el-tabs(type='border-card')
      el-tab-pane(label='空闲图书')
        el-table#table(v-if="freeBooks", :data='freeBooks', stripe='', style='margin: 0 auto; width: 95%')
          el-table-column(v-for="(val, key) in base", :prop="key", :label="val", width='150', :key="key")
          el-table-column(label='操作', width="180")
            template(scope='scope')
              el-button(size='small', @click="update('freeBooks', scope.$index)") 编辑
              el-button(size='small', type='danger', @click='deleteBook(scope.$index)') 删除
      el-tab-pane(label='已借阅图书')
        el-table(v-if="orderBooks", :data='orderBooks', stripe='', style='margin: 0 auto; width: 95%')
          el-table-column(v-for="(val, key) in base", :prop="key", :label="val", width='150', :key="key")
          el-table-column(label='操作', width="180")
            template(scope='scope')
              el-button(size='small', @click="update('orderBooks', scope.$index)") 编辑
              el-button(size='small', type='danger', @click='deleteBook(scope.$index)') 删除          
      el-tab-pane(label='添加图书')
        el-form(ref='form', :model='form', label-width='80px' style="padding-left: 100px")
          el-form-item(v-for="(val, key, index) in base",v-if="key != 'buy_time' && key != 'school'", :label="val", :key="index")
            el-input(v-model="form[key]", style="width: 400px")
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
    el-dialog(title='更改图书信息', v-model="dialogVisible")
      el-form(:model='updateForm', label-width='80px')
        el-form-item(v-for="(val, key, index) in base",v-if="key != 'buy_time' && key != 'school'", :label="val", :key="index")
          el-input(v-model="updateForm[key]", style="width: 400px")
        el-form-item(label='校区')
          el-select(v-model='updateForm.school', placeholder='请选择校区')
            el-option(v-for="(school, index) in schools", :label="school", :value="school", :key="index")
        el-form-item(label='购入时间')
          el-col(:span='11')
            el-date-picker(type='date', placeholder='选择日期', v-model='updateForm.buy_time', style='width: 100%;')   
      div.dialog-footer(slot='footer')
        el-button() 取 消
        el-button(type='primary') 确 定
         
</template>
<script>
  // import Vue from 'vue'
  // import Dialog from 'element-ui'
  // Vue.component(Dialog.name, Dialog)
  import api from '../../common/api.js'
  export default {
    name: 'manage',
    data () {
      return {
        dialogVisible: false,
        base: {
          number: '图书编号',
          name: '书名',
          author: '作者/译者',
          publisher:'出版社',
          type: '类型',
          school: '校区',
          buy_time: '购入时间'
        },
        updateForm: { number: '', name: '', author: '', publisher: '', region: '', school: '', buy_time:""},
        form: { number: '', name: '', author: '', publisher: '', region: '', school: '', buy_time:""},
        schools: ['东校区', '南校区', '北校区', '珠海校区'],
        msg: '图书管理',
        freeBooks: "",
        orderBooks: "",
        formLabelWidth: '120px',
      }
    },
    methods: {
      submit() {

      },
      update(type, index) {
        this.dialogVisible = true
        this.updateForm = this[type][index]
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },

    },
    created() {
      Promise.all([
        api.books(0), api.books(1)
      ]).then((res) => {
        this.freeBooks = res[0];
        this.orderBooks = res[1];
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

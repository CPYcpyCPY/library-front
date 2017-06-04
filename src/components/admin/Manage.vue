<template lang="jade">
  div#manage
    el-tabs(type='border-card')
      el-tab-pane(label='空闲图书')
        el-table#table(v-if="freeBooks", :data='freeBooks', stripe='', style='margin: 0 auto; width: 95%')
          el-table-column(v-for="(val, key) in base", :prop="key", :label="val", width='150', :key="key")
          el-table-column(label='操作', width="180")
            template(scope='scope')
              el-button(size='small', type='info', @click="update(scope.$index)") 编辑
              el-button(size='small', type='danger', @click='deleteBook(scope.$index)') 删除
      el-tab-pane(label='已借阅图书')
        el-table(v-if="orderBooks", :data='orderBooks', stripe='', style='margin: 0 auto; width: 85%')
          el-table-column(v-for="(val, key) in base", :prop="key", :label="val", width='150', :key="key")
      el-tab-pane(label='添加图书')
        el-form(ref='form', :model='form', label-width='80px' style="padding-left: 100px")
          el-form-item(v-for="(val, key, index) in base",v-if="key != 'buy_time' && key != 'school'", :label="val", :key="index")
            el-input(v-model="form[key]", style="width: 400px")
          el-form-item(label='校区')
            el-select(v-model='form.school', placeholder='请选择校区')
              el-option(v-for="(school, index) in schools", :label="school", :value="school", :key="index")
          el-form-item(label='购入时间')
            el-col(:span='11')
              el-date-picker(type='date', placeholder='选择购入日期', v-model='form.buy_time', style='width: 100%;')
          uploader(:form="form")
          el-form-item
            el-button#create(type='primary', @click='submit' v-loading.fullscreen.lock="loading") 立即创建
    el-dialog(title='更改图书信息', v-model="dialogVisible")
      el-form(:model='updateForm', label-width='80px')
        el-form-item(v-for="(val, key, index) in base",v-if="key != 'buy_time' && key != 'school'", :label="val", :key="index")
          el-input(:disabled="key == 'number'", v-model="updateForm[key]", style="width: 400px")
        el-form-item(label='校区')
          el-select(v-model='updateForm.school', placeholder='请选择校区')
            el-option(v-for="(school, index) in schools", :label="school", :value="school", :key="index")
        el-form-item(label='购入时间')
          el-col(:span='11')
            el-date-picker(type='date', placeholder='选择日期', v-model='updateForm.buy_time', style='width: 100%;')
      div.dialog-footer(slot='footer')
        el-button(@click="dialogVisible = false") 取 消
        el-button(type='primary', @click="updateBook") 确 定

</template>
<script>
  import uploader from './Uploader.vue'
  import api from '../../common/api.js'
  import admin from '../../common/api-admin.js'
  import tools from '../../common/tools.js'
  import Uploader from './Uploader'
  export default {
    components: {Uploader}, name: 'manage',
    data () {
      return {
        dialogVisible: false,
        loading: false,
        img: '',
        base: {
          number: '图书编号',
          name: '书名',
          author: '作者/译者',
          publisher: '出版社',
          type: '类型',
          school: '校区',
          buy_time: '购入时间'
        },
        updateForm: {number: '', name: '', author: '', publisher: '', type: '', school: '', buy_time: ""},
        form: {number: '', author: '', name: '', publisher: '', type: '', school: '', buy_time: ""},
        schools: ['东校区', '南校区', '北校区', '珠海校区'],
        msg: '图书管理',
        freeBooks: "",
        orderBooks: "",
        formLabelWidth: '120px',
      }
    },
    methods: {
      submit() {
        this.loading = true;
        let d1 = new Date().getTime();
        admin.createBook(this.form).then((res) => {
          let d2 = new Date().getTime();
          setTimeout(() => {
            this.$message({
              type: res.data.err ? 'error' : 'success',
              message: res.data.err ? res.data.err : res.data.msg
            })
            this.form.buy_time = tools.getStandardDate(this.form.buy_time)
            this.freeBooks.push(this.form);
            this.loading = false;
          }, d2 - d1 < 1200 ? 1200: 0)
        })
      },
      update(index) {
        this.dialogVisible = true
        this.updateForm = this.freeBooks[index]
      },
      updateBook() {
        this.dialogVisible = false
        console.log(this.updateForm);
        if (!(this.updateForm.buy_time instanceof Date))
          this.updateForm.buy_time = new Date(this.updateForm.buy_time);
        this.updateForm.buy_time = tools.getStandardDate(this.updateForm.buy_time)
        admin.updateBook(this.updateForm).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      deleteBook(index) {
        let book = this.freeBooks[index];
        this.$confirm('确定删除图书:' + book.name, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          admin.deleteBook(book.number).then(() => {
            this.$message({type: 'success', message: '删除图书成功!'})
            this.freeBooks.splice(index, 1);
          })
        }).catch(() => {})
      }
    },
    created() {
      Promise.all([
        api.books(0), api.books(1)
      ]).then((res) => {
        this.freeBooks = res[0];
        this.orderBooks = res[1];
      })
    }
  }
</script>
<style scoped lang="sass">
  #manage
    margin-top: 1rem
    width: 100%
    margin-left: 12rem
    flex: 1
    background-color: #EFF2F7
    #table
      width: 500px
    #create
      margin: 4rem 0 2rem
      width: 80%
</style>

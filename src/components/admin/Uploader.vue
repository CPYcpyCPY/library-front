<template lang="jade">
  div#upload
    img(:src="img")
    div.btn
      el-button(type="primary", @click="uploadImg") 上传封面
      el-button(type="info", @click="uploadImgGroup") 上传图片组
      el-button(type="warning", @click="uploadPdf") 上传PDF
</template>
<script>
  import tools from '../../common/tools.js'
  export default {
    name: 'uploader',
    props: ['form'],
    data () {
      return {
        img: '',
      }
    },
    methods: {
      uploadImg() {
        tools.upload('img', false, (result) => {
          if (result.err) {
            this.$message({type: 'error', message: '文件格式不正确!'})
          } else {
            this.$message({type: 'success', message: '上传图片成功!'})
            this.img = result.url;
            this.form.picture = result.picture;
            this.form.file = result.file;
          }
        })
      },
      uploadPdf() {
        tools.upload('pdf', false, (result) => {
          if (result.err) {
            this.$message({type: 'warning', message: '文件格式不正确!'})
          } else {
            this.$message({type: 'success', message: '上传pdf成功!'})
            this.form.pdf = result.file;
          }
        })
      },
      uploadImgGroup () {
        tools.upload('img', true, (result) => {
          if (result.err) {
            this.$message({type: 'warning', message: '文件格式不正确!'})
          } else {
            this.$message({type: 'success', message: '上传图片组成功!'})
            this.form.imgsGroup = result.files;
          }
        })
      }
    }
  }
</script>
<style scoped lang="sass">
  #upload
    z-index: 999
    top: 5rem
    right: 10rem
    width: 25%
    height: auto
    position: absolute
    img
      display: block
      margin: 0 auto 1rem
      width: 80%
      height: 20rem
    .btn
      text-align: center
      display: flex
      button
        flex: 1
    #file
      width: 50%
      display: block
      margin: 0 auto
</style>

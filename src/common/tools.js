import fileMap from './fileMap'
export default {

  /* 将数组分为每行n个的二位数组
   *  @param1:arr, 原数组
   *  @param2:n, 指定被划分为n列
   */
  toNArray(arr, n) {
    let nArr = [], arr_ = []
    arr.forEach((item, index) => {
      arr_.push(item)
      if ((index + 1) % n === 0 || index === arr.length - 1) {
        nArr.push(arr_)
        arr_ = []
      }
    })
    return nArr
  },

  /* 动态创建下载表单
   *  @param1:url, 下载的路径
   *  @param2:data, {key:val},下载的参数
   */
  download(url, data) {
    let form = document.createElement('form')
    form.setAttribute('style', 'display: none')
    form.setAttribute('target', '')
    form.setAttribute('method', 'post')
    form.setAttribute('action', url)

    for (let key in data) {
      let input = document.createElement('input')
      input.setAttribute('name', key)
      input.setAttribute('value', data[key])
      document.body.appendChild(form)
      form.appendChild(input)
    }
    form.submit()
  },

  /* 文件上传:动态创建input(type='file'), 只支持单个文件
   *  @param1:fileType, 文件上传的格式
   *  @param2:cb 回调函数，回传 {
   *    name: 文件名,
   *    url: 文件路径(用于预览)
   *    file: 文件内容,
   *  }
   */
  upload(fileType, cb) {
    let input = document.createElement('input')
    input.type = 'file'
    document.body.appendChild(input)
    input.click();
    input.onchange = (evt) => {
      let file = evt.target.files[0] //只上传一张，所以取第一个
      let type = file.type && file.type.split('/')[1].trim()
      if(fileMap[fileType].indexOf(type) != -1) {
        if(fileType == 'img') {  //如果是图片，则需要预览
          let reader = new FileReader();
          reader.onloadend = (e) => {
            cb({
              picture: file.name,  // xxx.jpg
              url: e.target.result,
              file: file
            })
          }
          reader.readAsDataURL(file);
        } else {
          cb({file: file})
        }
      } else {
        cb({err: true})
      }
    }
    input.style.display = 'none'
  },

  // 传入Object，返回表单
  generateForm (data) {
    console.log(data);
    let formData = new FormData()
    for (var key in data) {
      formData.append(key, data[key])
    }
    return formData
  },

  // 传入url,object，返回请求对象
  postData (url, data) {
    return {
      url: url,
      data: this.generateForm(data),
      method: 'POST'
    }
  },

  // 返回标准时间格式: yyyy-mm-dd
  getStandardDate (date) {
    var y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate()
    if (m < 10) m = '0' + m
    if (d < 10) d = '0' + d
    return y + '-' + m + '-' + d
  }
}

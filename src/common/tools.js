export default {

  /* 将数组分为每行n个的二位数组
  *  @param1:arr, 原数组
  *  @param2:n, 指定被划分为n列
   */
  toNArray(arr, n) {
    let nArr = [], arr_ = [];
    arr.forEach((item, index) => {
      arr_.push(item);
      if((index+1) % n === 0 || index === arr.length - 1) {
        nArr.push(arr_);
        arr_ = [];
      }
    });
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

    for(let key in data) {
      let input = document.createElement('input')
      input.setAttribute('name', key)
      input.setAttribute('value', data[key])
      document.body.appendChild(form)
      form.appendChild(input)
    }
    form.submit()
  },

  // 传入Object，返回表单
  generateForm (data) {
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
      d = date.getDate() ;
    if(m < 10) m = '0' + m;
    if(d < 10) d = '0' + d;
    return y + '-' + m + '-' + d;
  }
}

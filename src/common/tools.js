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
  generateForm (data) {
    let formData = new FormData()
    for (var key in data) {
      formData.append(key, data[key])
    }
    return formData
  },
  postData (url, data) {
    return {
      url: url,
      data: this.generateForm(data),
      method: 'POST'
    }
  }
}

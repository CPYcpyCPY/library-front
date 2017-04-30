export default {
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
  }
}

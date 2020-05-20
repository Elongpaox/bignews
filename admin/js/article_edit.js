$(function(){
  // console.log(window.location.search); // location.search获取URL地址栏中的?后面的参数数据
  // "?id=20"
  var str = location.search.slice(1)
  var id = utils.convertToObj(str).id
  console.log(id);
})
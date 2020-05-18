$(function(){
  // 1. 发送ajax请求获取文章所有的分类 
  $.ajax({
    type:'get',
    url:BigNew.category_list,
    success:function(res){
      // console.log(res);
      var htmlStr = template('categoryList',res)
      $('#selCategory').html(htmlStr)
    }
  })
})
$(function(){
  // 1. 发送请求获取数据，渲染页面
  // 1.1 发送ajax请求
  $.ajax({
    type:'get',
    url:BigNew.category_list,
    success:function(res){
      console.log(res);
      console.log(typeof res);
      // 1.2 获取数据并渲染页面
      if(res.code==200){
        var htmlStr = template('categoryList',res)
        $('tbody').html(htmlStr)
      }
    }
  })
  
})
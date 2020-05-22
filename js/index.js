$(function(){
  // 1. 实现主页面的分类数据显示
  // 1.1 发送ajax请求
  $.ajax({
    type:'get',
    url:BigNew.category_list,
    success:function(res){
      console.log(res);
      // 1.2 使用模板引擎渲染页面
      if(res.code==200){
        // 原始的做法是使用两个模板
        // var htmlStr1 = template('categoryList1',res)
        // $('.menu .level_two').html(htmlStr1)

        // var htmlStr2 = template('categoryList2',res)
        // $('.menu .left_menu').html(htmlStr2)

        // 这是用一个模板的做法
        var htmlStr = template('categoryList',res)
        $('.menu .level_two').html('<li class="up"></li>'+htmlStr)
        $('.menu .left_menu').html(htmlStr)
      }
    }
  })
})
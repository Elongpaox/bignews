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


  // 2. 显示当前页面中的所有的文章数据
  $.ajax({
    type:'get',
    url:BigNew.article_query,
    data:{
      key:$('#key').val(),
      type:$('#selCategory').val(),
      state:$('#selStatus').val(),
      page:1,
      perpage:7
    },
    success:function(res){
      console.log(res);
      if(res.code==200){
        var htmlStr = template('articleList',res.data)
        $('tbody').html(htmlStr)
      }
    }
  })
})
$(function(){
  // 1. 一跳转到这个页面，就要向服务器发送请求，获取评论的数据 
  // 1.1 发送ajax请求
  $.ajax({
    type:'get',
    url:BigNew.comment_list,
    data:{
      page:1,
      perpage: 7
    },
    success:function(res){
      console.log(res);
      // 1.2 将数据渲染到页面当中
      if(res.code==200){
        var htmlStr = template('commentList',res.data)
        $('tbody').html(htmlStr)
      }
    }
  })
})
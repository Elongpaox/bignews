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

  // 2. 模态框的展示
  $('#xinzengfenlei').on('click',function(){
    $('.modal').modal('show')
  })
  // CRUD
  // C create  增加 添加
  // R read    查询 读取 获取 
  // U update  更新 
  // D delete  删除
})
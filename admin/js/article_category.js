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
  // 2.1 给新增按钮注册事件 弹出模态框 
  $('#xinzengfenlei').on('click',function(){
    // 2.2 显示模态框
    $('.addModal').modal('show')

    // 2.3 修改提示标题
    $('.addModal h4').text('新增文章分类')
  })



  // 3. 编辑按钮
  // 3.1 给编辑按钮注册事件 弹出模态框 要使用委托的方式业注册事件
  // 因为当前的编辑按钮是通过模板创建出来的，相当于是动态创建出来的元素，直接注册事件，是不起作用的，所以需要使用委托的方式来注册事件
  $('tbody').on('click','.btn-edit',function(){
    // 3.2 显示模态框
    $('.addModal').modal('show')
     // 2.3 修改提示标题
     $('.addModal h4').text('更新文章分类')
  })

  // CRUD
  // C create  增加 添加
  // R read    查询 读取 获取 
  // U update  更新 
  // D delete  删除
})
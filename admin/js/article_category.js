$(function () {
  // 1. 发送请求获取数据，渲染页面
  // 1.1 发送ajax请求
  $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function (res) {
      console.log(res)
      console.log(typeof res)
      // 1.2 获取数据并渲染页面
      if (res.code == 200) {
        var htmlStr = template('categoryList', res)
        $('tbody').html(htmlStr)
      }
    }
  })


  // 2. 确定是哪个按钮弹出来的模态框
  // 1. 由于当前我们是用的data-的方式来控制的模态框，而不是使用的.modal方法
  // 2. 因为data-target data-toggle这两个属性我们都新增和编辑按钮都添加上了
  // 3. 此时我们需要确定，到底是单击的哪个按钮来弹出来的模态框
  // 4. e.relatedTarget 使用此属性来确定事件源头
  $('#myModal').on('show.bs.modal', function (e) {
    // console.log(e.relatedTarget );
    // 2.1 判断当前按钮是新增还是编辑
    if ($(e.relatedTarget).attr('id') == "xinzengfenlei") {
      // alert('新增分类的操作')
      //2.2 弹出模态框的时候，要将里面的数据进行重置
      $('#myForm')[0].reset()

      // 修改提示标签
      $('#myModal h4').text('新增文章分类')
    } else {
      $('#myModal h4').text('更新文章分类')
      // alert('编辑分类操作')
      // 2.3 获取当前按钮所在的id
      // 2.4 向服务器发送请求获取对应的数据
      $.ajax({
        type: 'get',
        url: BigNew.category_search,
        data: {
          id: $(e.relatedTarget).data('id')
        },
        success: function (res) {
          // console.log(res)
          if (res.code == 200) {
            // 将查询到的要编辑的数据先显示在模态框上
            $('#myForm input[name=id]').val(res.data[0].id)
            $('#myForm input[name=name]').val(res.data[0].name)
            $('#myForm input[name=slug]').val(res.data[0].slug)
          }
        }
      }) // ajax
    } // else
  })// on
}) //入口函数
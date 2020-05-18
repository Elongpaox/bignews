$(function () {
  // 1. 发送请求获取数据，渲染页面
  // 1.1 发送ajax请求
  render()
  function render() {
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
  }

  // 2. 模态框的展示
  // 2.1 给新增按钮注册事件 弹出模态框 
  $('#xinzengfenlei').on('click', function () {
    // 清空模态框
    $('#myForm')[0].reset()  //重置表单
    // 2.2 显示模态框
    $('.addModal').modal('show')

    // 2.3 修改提示标题
    $('.addModal h4').text('新增文章分类')
  })



  // 3. 编辑按钮
  // 3.1 给编辑按钮注册事件 弹出模态框 要使用委托的方式业注册事件
  // 因为当前的编辑按钮是通过模板创建出来的，相当于是动态创建出来的元素，直接注册事件，是不起作用的，所以需要使用委托的方式来注册事件
  $('tbody').on('click', '.btn-edit', function () {
    // 3.2 显示模态框
    $('.addModal').modal('show')
    // 2.3 修改提示标题
    $('.addModal h4').text('更新文章分类')

    // 2.4 发送ajax请求 
    $.ajax({
      type: 'get',
      url: BigNew.category_search,
      data: {
        id: $(this).data('id')
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
    })
  })


  // 4. 新增或更新数据
  // 4.1 给模态框的确定按钮注册事件
  $('.addModal .btn-sure').on('click', function () {
    console.log(123)
    // 4.2 获取隐藏域中的id
    var id = $('#myForm input[name=id]').val()

    // 4.3 发送ajax请求
    $.ajax({
      type: 'post',
      url: id ? BigNew.category_edit : BigNew.category_add,
      data: $('#myForm').serialize(),
      success: function (res) {
        // console.log(res)
        if (res.code == 200 || res.code == 201) {
          // 4.4 隐藏模态框
          $('.addModal').modal('hide')

          // 4.5 刷新当前页面
          render()
        }
      }
    })
  })

  // 5. 删除数据
  // 5.1 给删除按钮注册事件 
  $('tbody').on('click', '.btn-del', function () {
    // 5.2 弹出提示框 
    $('.delModal').modal('show')

    // 5.3 获取当前按钮所在的那条数据的id
    window.categoryId = $(this).data('id')
  })

  // 5.4 给删除的模态框中的确定按钮注册事件
  $('.delModal .btn-sure').on('click', function () {
    // 5.5 向服务器端发送请求
    $.ajax({
      type: 'post',
      url: BigNew.category_delete,
      data: {
        id: window.categoryId
      },
      success: function (res) {
        // console.log(res);
        if (res.code == 204) {
          // 5.5 隐藏模态框
          $('.delModal').modal('hide')

          // 5.6 刷新页面
          render()
        }

      }
    })
  })




  // CRUD
  // C create  增加 添加
  // R read    查询 读取 获取 
  // U update  更新 
  // D delete  删除
})
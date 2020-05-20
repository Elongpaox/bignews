$(function () {
  // 1. 发送ajax请求获取文章所有的分类 
  $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function (res) {
      // console.log(res);
      var htmlStr = template('categoryList', res)
      $('#selCategory').html(htmlStr)
    }
  })


  // 2. 显示当前页面中的所有的文章数据
  getDataByParams({
    key: $('#key').val(),
    type: $('#selCategory').val(),
    state: $('#selStatus').val(),
    page: 1,
    perpage: 7
  })

  // 封装了一个根据不同参数获取数据的函数
  function getDataByParams(obj) {
    $.ajax({
      type: 'get',
      url: BigNew.article_query,
      data: obj,
      success: function (res) {
        console.log(res)
        if (res.code == 200) {
          var htmlStr = template('articleList', res.data)
          $('tbody').html(htmlStr)

          // 服务器端的数据响应回来了之后, 启用分页功能
          pagination(res.data.totalPage)
        }
      }
    })
  }

  // 3. 给筛选按钮注册事件， 根据条件来查询文章数据渲染出来
  // 3.1 给筛选按钮注册事件
  $('#btnSearch').on('click', function (e) {
    // 3.2 阻止默认行为
    e.preventDefault()
    // alert(123)
    // 3.3 调用函数来获取数据
    $.ajax({
      type: 'get',
      url: BigNew.article_query,
      data: {
        key: $('#key').val(),
        type: $('#selCategory').val(),
        state: $('#selStatus').val(),
        page: 1,
        perpage: 7
      },
      success: function (res) {
        console.log(res)
        if (res.code == 200) {
          var htmlStr = template('articleList', res.data)
          $('tbody').html(htmlStr)

          // 服务器端的数据响应回来了之后, 更新分页控件 也就是更新总页码
          // 要使用一个事件changeTotalPages，动态的改变总页码  内部底层就会重绘分页控件
          // 第1个参数 是事件名称
          // 第2个参数 是总页码
          // 第3个参数 是默认的当前页
          $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
        }
      }
    })


  })

  // 4. 实现分页功能
  function pagination(totalPages, visiblePages) {
    $('#pagination-demo').twbsPagination({
      totalPages: totalPages, // 总页数
      visiblePages: visiblePages || 7, // 可见最大上限页码值
      first: '首页',
      last: '最后一页',
      next: '下一页',
      prev: '上一页',
      initiateStartPageClick: false, // 不要默认点击 
      onPageClick: function (event, page) {
        //  console.log(event,page);
        // page是当前页码
        getDataByParams({
          key: $('#key').val(),
          type: $('#selCategory').val(),
          state: $('#selStatus').val(),
          page: page,
          perpage: 7
        })
      }
    })
  }
})

/**
 * 1. 当前项目不要纠结于某一行代码
 * 2. 要听完整的思路
 */
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

  // 2. 显示文章数据
  // 2.1 一跳转到当前这个页面就要发送ajax请求
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
        // 2.2 渲染数据
        var htmlStr = template('articleList', res.data)
        $('tbody').html(htmlStr)

        // 2.4  根据服务器响应回来的数据来判断是否显示控件
        if (res.data.totalPage == 0) {
          $('#pagination-demo').hide().next().show()
        } else {
          // 就说明是有数据响应回来的，应该要显示分页控件
          $('#pagination-demo').show().next().hide()
          // 2.3 实现分页控件
          pagination(res)
        }

      }
    }
  })

  // 3. 分页功能的函数
  function pagination(res, visiblePages) {
    $('#pagination-demo').twbsPagination({
      totalPages: res.data.totalPage, // 总页数
      visiblePages: visiblePages || 7, // 可见最大上限页码值
      first: '首页',
      last: '最后一页',
      next: '下一页',
      prev: '上一页',
      initiateStartPageClick: false, // 不要默认点击 
      onPageClick: function (event, page) {
        //  console.log(event,page);
        // page是当前页码
        $.ajax({
          type: 'get',
          url: BigNew.article_query,
          data: {
            key: $('#key').val(),
            type: $('#selCategory').val(),
            state: $('#selStatus').val(),
            page: page,
            perpage: 7
          },
          success: function (res) {
            console.log(res)
            if (res.code == 200) {
              // 2.2 渲染数据
              var htmlStr = template('articleList', res.data)
              $('tbody').html(htmlStr)
              
              // 什么都没有做
            }
          }
        })
      }
    })
  }

  // 4. 给筛选按钮注册事件 根据新条件渲染页面
  // 4.1 给筛选按钮注册事件
  $('#btnSearch').on('click', function (e) {
    // 4.2 阻止默认的请求行为
    e.preventDefault()

    // 4.3 发送请求获取数据
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
          // 4.4  渲染数据
          var htmlStr = template('articleList', res.data)
          $('tbody').html(htmlStr)

          // 4.6 根据服务器响应回来的数据来判断是否显示控件
          if (res.data.totalPage == 0) {
            $('#pagination-demo').hide().next().show()
          } else {
            // 就说明是有数据响应回来的，应该要显示分页控件
            $('#pagination-demo').show().next().hide()

            // 4.5 更新分页控件的总页码
            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
          }

        }
      }
    })
  })
})

/**
 * 1. 当前项目不要纠结于某一行代码
 * 2. 要听完整的思路
 */
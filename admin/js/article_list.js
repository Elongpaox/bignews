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
  getDataByParams({
    key:$('#key').val(),
    type:$('#selCategory').val(),
    state:$('#selStatus').val(),
    page:1,
    perpage:7
  })

  function getDataByParams(obj){
    $.ajax({
      type:'get',
      url:BigNew.article_query,
      data:obj,
      success:function(res){
        console.log(res);
        if(res.code==200){
          var htmlStr = template('articleList',res.data)
          $('tbody').html(htmlStr)
        }
      }
    })
  }

  // 3. 给筛选按钮注册事件， 根据条件来查询文章数据渲染出来
  // 3.1 给筛选按钮注册事件
  $('#btnSearch').on('click',function(e){
    // 3.2 阻止默认行为
    e.preventDefault()
    // alert(123)
    // 3.3 调用函数来获取数据
    getDataByParams({
      key:$('#key').val(),
      type:$('#selCategory').val(),
      state:$('#selStatus').val(),
      page:1,
      perpage:10
    })
  })
})
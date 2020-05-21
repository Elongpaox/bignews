$(function () {
  // 3. 启用日期插件
  jeDate("#testico", {
    format: "YYYY-MM-DD",
    isTime: false,
    zIndex:20999,  //修改日期插件的弹出层级
    minDate: "2014-09-19 00:00:00"
  })

  // 4. 启用富文本编辑器
  var E = window.wangEditor
  var editor = new E('#editor')
  // 或者 var editor = new E( document.getElementById('editor') )
  editor.create()

  // console.log(window.location.search); 
  // location.search获取URL地址栏中的?后面的参数数据
  // "?id=20"
  // 2. 根据id获取文章数据，渲染到页面上
  var str = location.search.slice(1) // 从索引为1的位置开始截取到最后
  var id = utils.convertToObj(str).id
  console.log(id)
  $.ajax({
    type: 'get',
    url: BigNew.article_search,
    data: {
      id: id
    },
    success: function (res) {
      console.log(res)
      // 将数据渲染到页面上
      if (res.code == 200) {
        $('#form input[name=title]').val(res.data.title)
        $('#form .article_cover').attr('src', res.data.cover)
        // $('#form select[name="categoryId"]').val(res.data.categoryId)
        $('#form input[name=date]').val(res.data.date)
        // $('#form textarea[name=content]').val(res.data.content)
        editor.txt.html(res.data.content)
        var categoryId = res.data.categoryId
        // 文章渲染完毕之后，再来渲染默认的分类 
        // 1. 页面跳转过来之后，立即发送ajax请求 获取分类数据，来渲染页面
        $.ajax({
          type: 'get',
          url: BigNew.category_list,
          success: function (res) {
            console.log(res)
            console.log(typeof res)
            // 1.2 获取数据并渲染页面
            if (res.code == 200) {
              res.categoryId = categoryId // 将文章的默认分类存到响应回来的对象中
              var htmlStr = template('categoryList', res)
              $('.category').html(htmlStr)
            }
          }
        })
      }
    }
  })

  // 5. 实现图片预览功能
  // 5.1 给文件按钮注册change
  $('#inputCover').on('change',function(){
    // 5.2 获取到要上传的图片文件
    var file = this.files[0]; // files是一个文件列表 
    // 5.3 根据图片生成一个url
    var url = URL.createObjectURL(file)
     // 5.4 给对应的img标签添加此属性值 
     $('.article_cover').attr('src',url)
  })
  
  
 
})

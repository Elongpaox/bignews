$(function () {
  // 1. 发服务器发送语法 ，获取文章分类 ，渲染到页面
  $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function (res) {
      // console.log(res);
      if (res.code == 200) {
        var htmlStr = template('categoryList', res)
        $('#selCategory').html(htmlStr)
      }
    }
  })

  // 2. 实现图片预览功能
  // 2.1 给文件按钮注册change
  $('#inputCover').on('change', function () {
    // 2.2 获取到要上传的图片文件
    var file = this.files[0] // files是一个文件列表 
    // 2.3 根据图片生成一个url
    var url = URL.createObjectURL(file)
    // 2.4 给对应的img标签添加此属性值 
    $('.article_cover').attr('src', url)
  })


  // 3. 调用方法实现日期插件的显示
  jeDate("#testico", {
    format: "YYYY-MM-DD",
    isTime: false,
    isToday: true, // 是否显示本月或今天
    zIndex: 29999,
    minDate: "2014-09-19 00:00:00"
  })

  // 4. 启用富文本编辑器
  var E = window.wangEditor
  var editor = new E('#editor')
  // 或者 var editor = new E( document.getElementById('editor') )
  editor.create()
})
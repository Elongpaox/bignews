$(function () {
  // 1. 根据id渲染当前的文章数据到页面当中
  // 1.1 获取传入过来的id
  // var str = location.search; // '?id=2'
  // str = str.slice(1) // 'id=2'
  // var obj = utils.convertToObj(str); // {id:2}
  // var id = obj.id
  var id = utils.convertToObj(location.search.slice(1)).id
  // 1.2 发送ajax请求
  $.ajax({
    type: 'get',
    url: BigNew.article_detail,
    data: {
      id: id
    },
    success: function (res) {
      console.log(res);
      // 1.3 将数据渲染到页面
      if (res.code == 200) {
        var htmlStr = template('articleTmp', res.data)
        $('.setfr .box').html(htmlStr)

        // 要将当前文章的id存到form表单中的隐藏域中
        $('#myForm input[name="articleId"]').val(res.data.id)
      }
    }
  })


  // 2. 给文章发表评论
  // 2.1 给form注册submit事件
  $('#myForm').on('submit', function (e) {
    // 2.2 阻止默认行为
    e.preventDefault()

    // 2.3 发送ajax请求
    $.ajax({
      type:'post',
      url:BigNew.post_comment,
      data:$(this).serialize(),
      success:function(res){
        console.log(res);
        if(res.code==201){
          alert('评论发表成功')
          // 清空form表单
          $('#myForm')[0].reset()
        }
      }
    })
  })

  
  // 2.4 发送成功之后，要提示用户
})
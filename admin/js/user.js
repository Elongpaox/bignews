$(function(){
  // 1. 发请求获取数据，渲染到页面上
  // 1.1  向服务器端发送请求
  $.ajax({
    type:'get',
    url:BigNew.user_detail,
    headers:{
      'Authorization':localStorage.getItem('token')
    },
    success:function(res){
      console.log(res);
      // console.log(typeof res);
      // 1.2 获取到数据之后，将数据渲染到页面上
      if(res.code==200){
        // $('#form .username').val(res.data.username)
        // $('#form .nickname').val(res.data.nickname)
        // $('#form .email').val(res.data.email)
        // $('#form .password').val(res.data.password)

        for(var key in res.data){
          $('#form .'+key).val(res.data[key])
        }
        $('#form .user_pic').attr('src',res.data.userPic)
        
      }
    }
  })


  // 2. 个人中心页面实现图片预览
  $('#exampleInputFile').on('change',function(){
    // console.dir(this.files[0])
    var file = this.files[0] // 获取待上传的文件
    // URL.createObjectURL会将待上传的文件生成一个可浏览的地址
    var url = URL.createObjectURL(file)

    // 在图片上渲染出来 预览待上传的图片
    $('#form .user_pic').attr('src',url)
  })

  // 3. 更新个人中心数据
})
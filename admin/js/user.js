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

})
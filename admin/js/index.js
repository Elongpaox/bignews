$(function(){
  // 1. 立即向服务器发送请求
  $.ajax({
    type:'get',
    // url:'http://localhost:8080/api/v1/admin/user/info',
    url:BigNew.user_info,
    headers:{
      'Authorization':localStorage.getItem('token')
    },
    success:function(res){
      // console.log(res);
      // 2. 请求回来数据后要渲染到页面
      if(res.code==200){
        // 显示登陆的用户名 
        $('.user_info span i').text(res.data.nickname)

        // 显示登陆的头像
        $('.user_info img').attr('src',res.data.userPic)

        // 个人中心的图片也设置一样
        $('.user_center_link img').attr('src',res.data.userPic)
      }
    }
  })
 

  // 退出功能
  // 1. 给退出按钮注册事件
  $('.logout').on('click',function(){
     // 2. 退出意味着，要删除本地存储中的token
     localStorage.removeItem('token')
     // 3. 跳转到登陆页面 
     window.location.href = './login.html'
  })
 
  

  // var xhr = new XMLHttpRequest()
  // xhr.open('get','http://localhost:8080/api/v1/admin/user/info');
  // // 要使用请求头，将服务器端响应回来的token字符串，再次发送回服务器
  // xhr.setRequestHeader('Authorization','eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHAiOjIxOTQ0MTE5MzcsImlhdCI6MTU4OTYxMTkzN30.DYpazpwbg1tiYvcT-TVN61bqWAg3gNTyeKUsGwZ8tGwofUuSXDXWk4CI1uYz-5UAzKDWDKGwMOTk7QFl11ZIaDuenxMMkcPhnIP3Q4DsnkmwaTvyQ80L_S9D8xu7-KCVDV5J-4EF43CzXQ7pBFk-Um6twelvE4x3zJM-rCZnFBI')
  // xhr.send(null)
  // xhr.onreadystatechange = function(){
  //   if(xhr.status==200&&xhr.readyState==4){
  //     console.log(xhr.responseText);
  //   }
  // }
})


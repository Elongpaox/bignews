// 1. 写入口函数
$(function () {
  // 2. 给登陆按钮注册事件
  $('.input_sub').on('click', function (e) {
    // 阻止默认提交 行为
    e.preventDefault()
    // 3. 获取登陆的数据  username password
    var username = $('.input_txt').val()
    var password = $('.input_pass').val()
    // 4. 判断用户名和密码是否为空
    if($.trim(username)==''||$.trim(password)==''){
      // 5. 如果数据没有问题则发送请求，反之不能发送请求
      alert('用户名或密码不能为空,请重新输入...')
      return; // 阻止代码的向下执行
    }

    // 6. 发送ajax请求
    $.ajax({
      type:'post',
      url:'http://localhost:8080/api/v1/admin/user/login',
      data:{
        username:username,
        password:password
      },
      success:function(res){
        // console.log(res);
        // console.log(typeof res);
        if(res.code==200){
          alert('登陆成功...')
          // 7. 跳转到主页面
          window.location.href = './index.html'
        }else {
          alert(res.msg) // 提示错误信息
        }
      }
    })
  })

})
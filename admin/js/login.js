// 1. 写入口函数
$(function () {
  // 2. 给form表单注册submit事件
  $('.login_form').on('submit',function(e){
    // 3. 阻止默认提交行为
    e.preventDefault()

    // 4. 发送ajax请求
    $.ajax({
      type:'post',
      url:'http://localhost:8080/api/v1/admin/user/login',
      data:$(this).serialize(),
      beforeSend:function(){
        // 5. 发送请求之前验证用户名或密码是否为空
        var flag = false 
        $('.login_form input[name]').each(function(index,ele){
          if($.trim($(ele).val())==''){
            flag = true
          }
        })
        if(flag){
          alert('输入的用户名或密码不能为空')
          return false;// 阻止请求的发送
        }
      },
      success:function(res){
        if(res.code==200){
          alert('登陆成功')
          window.location.href = './index.html'
        }else {
          alert(res.msg)
        }
      }
    })
  })
})
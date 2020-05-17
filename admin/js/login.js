$(() => {
    // 登入判断
    $(".input_sub").on("click", (e) => {
        // 阻止默认事件
        e.preventDefault();
        // 获取密码框与文本框的内容
        let username = $(".input_txt").val().trim();
        let password = $(".input_pass").val().trim();
        // 判断是否为空
        if (username == "" || password == "") {
            $("#myModal .modal-body").text("账号或密码输入错误！");
            $("#myModal").modal();
            return;
        }
        // 点击登入发送ajax请求
        $.ajax({
            type: "post",
            // 用户登入的地址
            url: window.BigNew.user_login,
            // 给服务器传入数据
            data: {
                username: username,
                password: password
            },
            success: (res) => {
                console.log(res);
                // 使用bootstrop实现弹出模态框
                $("#myModal .modal-body").text(res.msg);
                $("#myModal").modal();
                if (res.code == 200) {
                    //账号密码正确,会返回一个token,把他存在本地.
                    window.localStorage.setItem("token", res.token);
                    //此事件在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发。
                    $("#myModal").on("hidden.bs.modal", function (e) {
                        window.location.href = "./index.html";
                    });
                }

            }

        })
    })
});
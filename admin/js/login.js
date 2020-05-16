$(function () {
    // 登入判断
    $(".input_sub").on("click", function (e) {
        // 阻止默认事件
        e.preventDefault();
        let username = $(".input_txt").val().trim();
        let password = $(".input_pass").val().trim();
        if (username == "" || password == "") {
            $("#myModal .modal-body").text("账号或密码输入错误！");
            $("#myModal").modal();
            return;
        }
        $.ajax({
            type: "post",
            url: window.BigNew.user_login,
            data: {
                username: username,
                password: password
            },
            success: (res) => {
                console.log(res);
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
$(function () {
    // 一打开网站就返送ajax请求，获取网站管理员用户的个人信息
    $.ajax({
        // 用户信息
        url: window.BigNew.user_info,
        // 设置请求头，把刚刚开始储存到浏览器内存中的token令牌带过去
        // headers: {
        //     Authorization: window.localStorage.getItem('token')
        // },
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                console.log(res.data.nickname);
                // 实时获取名字赋值在用户名上
                $(".user_info>span>i").text(res.data.nickname);
                // 实时获取头像的地址
                $(".user_info>img").attr("src", res.data.userPic);
                // 实时获取
                $(".user_center_link>img").attr("src", res.data.userPic);
            }
        }
    })
    // 登出
    $(".logout").on("click", function () {
        // 删除token，跳转到登入页面
        window.localStorage.removeItem("token");
        window.location.href = "./login.html"
    })
    // 点击高亮
    $("div.level01 ").on("click", function () {
        console.log("123");
        $(this).addClass("active").siblings("div").removeClass("active");
        if ($(this).index() == 1) {
            // 显示或者隐藏这个下拉框
            $(".level02").slideToggle();
            // 设置小箭头的旋转
            $(this).find("b").toggleClass("rotate0");
            // 打开时下拉框的时候默认选中第一个
            $(".level02 li:eq(0) a").get(0).click();
            // $("ul.level02>li:eq(0)>a")[0].click();
        }
    })
    // 点击下拉的时候高亮
    $(".level02 li").on("click", function () {
        $(this).addClass("active").siblings("li").removeClass("active");
    })
})
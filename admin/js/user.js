$(function () {
    //一: 一进到个人中心页面,就显示登录的这个管理员的所有信息
    $.ajax({
        type: "get",
        url: BigNew.user_detail,
        // headers: {
        //     Authorization: window.localStorage.getItem('token')
        // },
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                // 同步获取
                for (var key in res.data) {
                    $("input." + key).val(res.data[key]);
                }
                $("img.user_pic").attr("src", res.data.userPic);
            }
        }
    })
    //二: 图片预览
    //给选择图片的input:file按钮设置一个值改变事件
    $("#exampleInputFile").on("change", function () {
        // 获取当前未上传的文件
        let fileIcon = this.files[0];
        // 把这个文件转成一个链接
        let url = URL.createObjectURL(fileIcon);
        $("img.user_pic").attr("src", url);
    })
    // 点击修改上传数据
    $("button.btn-edit").on("click", function (e) {
        // 阻止默认提交
        e.preventDefault();
        //创建formData对象
        var fd = new FormData($("#form")[0]);
        $.ajax({
            type: "post",
            url: BigNew.user_edit,
            data: fd,
            // headers: {
            //     Authorization: window.localStorage.getItem('token')
            // },
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    alert("修改成功");
                    // parent.window.location.reload();
                    //发送ajax请求,获取网站管理员用户的个人信息
                    $.ajax({
                        url: window.BigNew.user_info,
                        success: function (res) {
                            if (res.code == 200) {
                                //给父页面的显示个人信息的标签设置新的值.
                                parent.$(".user_info>span>i").text(res.data.nickname);
                                parent.$(".user_info>img").attr("src", res.data.userPic);
                                parent
                                    .$(".user_center_link>img")
                                    .attr("src", res.data.userPic);
                            }
                        }
                    })
                }
            }
        })
    })
})
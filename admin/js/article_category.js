$(function () {
    // 打开页面刷新
    refresh();
    // 封装成函数
    function refresh() {
        // 打开页面发送请求
        $.ajax({
            type: "get",
            url: BigNew.category_list,
            success: function (res) {
                console.log(res);
                if (res.code === 200) {
                    // 把获取到的数据渲染到页面中
                    let htmlText = template("art_cate_temp", res);
                    console.log(htmlText);
                    $("#table_tbody").html(htmlText);
                }
            }
        })
    }
    // // 点击增加按钮弹出模态框
    // $("#exampleModalLabel").on("click", function () {
    //     console.log(123);
    // })
    // 确点击的是哪一个按钮
    // 由于当前我们使用data-的方式来控制的模态框，而不是使用.modal方法
    // 因此data-target data-toggle 这两属性我们都是新增和编辑按钮都添加上了
    // 此时我们需要确定到底是单机的哪个按钮
    // e.relatedTarget 来确定事件的源头
    $("#myModal").on("show.bs.modal", function (e) {
        // 获取的是当前这个标签
        console.log(e.relatedTarget);
        // 判断单击的按钮是哪一个
        if ($(e.relatedTarget).attr("id") == "xinzengfenlei") {
            $(".modal-title").text("新增分类");
            $("#myModal .btn-queren")
                .text("新增")
                .addClass("btn-primary")
                .removeClass("btn-success");
            // 点击新增的时候清楚原有的内容
            $("#myModal form").get(0).reset();
        } else {
            $(".modal-title").text("编辑分类");
            $("#myModal .btn-queren")
                .text("编辑")
                .addClass("btn-success")
                .removeClass("btn-primary");
            //把编辑的当前这一行的 文章类别名 和 文章类别别名 显示在模态框中.
            $("#recipient-name").val(
                $(e.relatedTarget)
                    .parent()
                    .prev()
                    .prev()
                    .text()
            );
            $("#message-text").val(
                //当前元素的父元素的上一级元素里面的文本
                $(e.relatedTarget).parent().prev().text()
            );
            //当单击按钮的时候，把服务器传过来的id放在隐藏的域中
            $("#category_id").val($(e.relatedTarget).data("id"));
        }
    });
    // 点击确定添加分类
    $("#myModal .btn-queren").on("click", function () {
        //1.获两个文本框的内容 
        // 2.把获取到文本看里面的内容传给服务器 （需要判断这个按钮是新增还是添加）
        let name = $("#recipient-name").val().trim();
        let text = $("#message-text").val().trim();

        //判断单击的这个元素里面有没有有这个类，有的话就是新增，没有就是编辑
        if ($(this).hasClass("btn-primary")) {
            if (name == "" || text == "") {
                alert("你的输入有误！");
                return;
            } else {
                $.ajax({
                    type: "post",
                    url: BigNew.category_add,
                    data: {
                        name: name,
                        slug: text
                    },
                    success: function (res) {
                        if (res.code == 201) {
                            $("#myModal").modal("hide");
                            refresh();
                        }
                    }
                })
            }

        } else {
            // 获取form上面说有带name属性的value的值
            let data = $(".modal-body form").serialize();
            console.log(data);
            // 发送请求
            if (name == "" || text == "") {
                alert("你的输入有误！");
                return;
            } else {
                $.ajax({
                    type: "post",
                    url: BigNew.category_edit,
                    data: data,
                    success: function (res) {
                        console.log(res);
                        if (res.code == 200) {
                            alert(res.msg);
                            $("#myModal").modal("hide");
                            refresh();
                        } else if (res.code == 400) {
                            alert(res.msg);
                        }
                    }
                })
            }
        }
    })


    // 单击删除按钮清除内容
    // 因为是动态生成的元素，所以需要用到事件委托的方式来注册事件
    $("#table_tbody").on("click", ".btn-delete", function () {
        alert("删除成功！！！");
        // 获取当前删除的id
        let id = $(this).data("id");
        console.log(id);
        // 发送ajax请求
        $.ajax({
            type: "post",
            // 需要传一个id的参数给服务器
            data: {
                id: id
            },
            //发送删除的请求
            url: BigNew.category_delete,
            success: function (res) {
                if (res.code == 204) {
                    // 重新像服务器获取页面数据并刷新页面
                    refresh();
                }
            }
        })
    })

})
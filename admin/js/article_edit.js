$(function () {
    // 发送ajax请求 获取分类列表里面的值
    $.ajax({
        type: "get",
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                let textHtml = template("art_cate_temp", res);
                $(".form-control").html(textHtml);

            }
        }
    })
    // 实现图片的预览
    $('#inputCover').on('change', function () {
        // 带上传的文件
        let flieIcon = this.files[0];
        // 把待上传的文件切换成需要转换为一个临时的链接
        var url = URL.createObjectURL(flieIcon);
        $(".article_cover").attr("src", url);
    });

    //动态获取当前的时间 讲获取到的事件渲染到页面上去
    // 使用到时是一个日期的插件
    // 第一个参数是元素节点 ，第二个参数是一个对象
    jeDate("#testico", {
        zIndex: 2099,
        forma: "YYYY-MM-DD",
        isTime: false,
        miDate: "2014-09-18 00:00:00"
    })
    // 使用富文本编辑器
    let E = window.wangEditor;
    let editor = new E("#editor");
    editor.create();
    // 获取id将数据同步到页面上
    // console.log(window.location.search); 
    // location.search获取URL地址栏中的?后面的参数数据
    // "?id=20"
    var str = location.search.slice(1) // 从索引为1的位置开始截取到最后
    var id = utils.convertToObj(str).id
    console.log(id);
    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            // 将数据渲染到页面上
            if (res.code == 200) {
                $('#form input[name=title]').val(res.data.title)
                $('#form .article_cover').attr('src', res.data.cover)
                $('#form select[name="categoryId"]').val(res.data.categoryId)
                $('#form input[name=date]').val(res.data.date)
                $('#form textarea[name=content]').val(res.data.content)
            }
        }
    })

})



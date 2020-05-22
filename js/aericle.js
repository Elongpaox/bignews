$(function () {
    // 1. 文章分类的展示
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                // 生成带数据的html标签
                var htmlStr = template('categoryList', res)

                // 先渲染竖着的分类 
                $('.menu .level_two').html('<li class="up"></li>' + htmlStr)

                // 渲染横着的导航荐
                $('.menu .left_menu').html(htmlStr)
            }
        }
    })
    // 4. 一周热门排行 
    $.ajax({
        type: 'get',
        url: BigNew.hotrank_list,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('hotrank_list', res)
                $('.content_list').html(htmlStr)
            }
        }
    })
    // 5. 最新评论
    $.ajax({
        type: 'get',
        url: BigNew.latest_comment,
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                var htmlStr = template('latextCommentList', res)
                $('.comment_list').html(htmlStr)
            }
        }
    })
    // 6. 焦点关注
    $.ajax({
        type: 'get',
        url: BigNew.attention_news,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('attentionList', res)
                $('.guanzhu_list').html(htmlStr)
            }
        }
    })




    // 1. 根据id渲染当前的文章数据到页面当中
    // 1.1 获取传入过来的id
    // var str = location.search; // '?id=2'
    // str = str.slice(1) // 'id=2'
    // var obj = utils.convertToObj(str); // {id:2}
    // var id = obj.id
    var id = utils.convertToObj(location.search.slice(1)).id
    // 1.2 发送ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.article_detail,
        data: {
            id: id
        },
        success: function (res) {
            // console.log(res);
            // 1.3 将数据渲染到页面
            if (res.code == 200) {
                var htmlStr = template('articleTmp', res.data)
                $('.setfr .box').html(htmlStr)
            }
        }
    })
    // 2. 给文章发表评论
    // 2.1 给form注册submit事件
    $('#myForm').on('submit', function (e) {
        // 2.2 阻止默认行为
        e.preventDefault()

        // 2.3 发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.post_comment,
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.code == 201) {
                    alert('评论发表成功')
                    // 清空form表单
                    $('#myForm')[0].reset()
                }
            }
        })
    })
    function getCommentData(id) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                articleId: id
            },
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('commentListTmp', res)
                    $('.comment_list_con').html(htmlStr)

                    // 多少条评论
                    $('.comment_count').html(`${res.data.length}条评论`)
                }
            }
        })
    }
    // 1.2 发送ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.article_detail,
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            // 1.3 将数据渲染到页面
            if (res.code == 200) {
                var htmlStr = template('articleTmp', res.data)
                $('.setfr .box').html(htmlStr)

                // 要将当前文章的id存到form表单中的隐藏域中
                $('#myForm input[name="articleId"]').val(res.data.id)

                // 文章数据渲染完毕之后，要显示评论列表的数据
                getCommentData(res.data.id)
            }
        }
    })

})
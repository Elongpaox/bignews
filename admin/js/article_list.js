$(function () {
    $.ajax({
        type: "get",
        url: BigNew.category_list,
        success: function (backData) {
            //console.log(backData);
            if (backData.code == 200) {
                console.log(backData);
                //2.获取到所有的文章类别信息后,通过模板引擎渲染到页面上
                var resHtml = template("art_cate_temp", backData);
                $("#selCategory").html(resHtml);
            }
        }
    });
    // 进页面发送ajax请求把内容渲染到页面上去 
    // 因为下面筛选按钮的时候回用到 所以封装成一个函数
    //声明一个变量mypage,表示当前点击的分页页签数字.
    var mypage = 1;
    function getData(mypage, callback) {
        $.ajax({
            url: BigNew.article_query,
            data: {
                //获取文章类别
                type: $('#selCategory').val().trim(),
                //获取文章状态(草稿/已发布)
                state: $('#selStatus').val().trim(),
                //当前的页数
                page: mypage,
                //一页显示多少条
                perpage: 6
            },
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    var resHtml = template('arti_list', res);
                    $('#tbody1').html(resHtml);
                    //这里会有一些操作,
                    //比如页面一进来这里有分页插件的设置; 点击筛选按钮这里有重新渲染分页插件结构的代码
                    if (res.data.data.length != 0 && callback != null) {
                        //有数据了就应该把分页插件结构给显示
                        $('#pagination-demo').show();
                        $('#pagination-demo').next().hide();

                        callback(res); //调用回调函数,把返回来的数据backData作为实参传递.

                    } else if (res.data.data.length == 0 && mypage == 1) {
                        //分页插件结构给隐藏
                        $('#pagination-demo').hide();
                        $('#pagination-demo').next().show(); //提示没有数据
                    }
                    else if (res.data.totalPage == mypage - 1 && res.data.data.length == 0) {
                        mypage -= 1;
                        //调用changeTotalPages 这个方法 根据新的总页数 重新生成分页结构. 
                        $('#pagination-demo').twbsPagination('changeTotalPages',
                            res.data.totalPage, mypage);
                    }
                }
            }
        })
    }
    // 一进到页面就显示 执行函数
    getData(1, function (res) {
        //分页插件
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage, //总页数
            visiblePages: 7,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                //console.log(page); //当前点击的页数.
                mypage = page; //把当前点击的这一个页码给mypage赋值. 
                getData(page, null);
            }
        })
    });
    //三:给筛选按钮设置点击事件,获取满足条件的文章们
    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        //发送ajax请求.
        getData(1, function (backData) {
            //改变了筛选条件,那总页数就有可能发生了改变
            //调用changeTotalPages 这个方法 根据新的总页数 重新生成分页结构. 
            $('#pagination-demo').twbsPagination('changeTotalPages',
                backData.data.totalPage, 1);
        });
    });
    $('tbody').on('click', '.delete', function () {
        if (confirm('你确定要删除吗?')) {
            //获取当前要删除的这一行的文章id
            var id = $(this).attr('data-id');
            //发送ajax请求,完成删除
            $.ajax({
                type: 'post',
                url: BigNew.article_delete,
                data: {
                    id: id
                },
                success: function (backData) {
                    //console.log(backData);
                    if (backData.code == 204) {
                        //重新刷新页面
                        //window.location.reload();

                        //重新发送ajax请求,就获取当前页数据. 
                        getData(mypage, function (backData) {
                            //删除了部分数据,那总页数就有可能发生了改变
                            //调用changeTotalPages 这个方法 根据新的总页数 重新生成分页结构. 
                            $('#pagination-demo').twbsPagination('changeTotalPages',
                                backData.data.totalPage, mypage);
                        });
                    }
                }
            });
        }
    })

})
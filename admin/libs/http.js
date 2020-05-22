; (function (w) {
    var URL = 'http://localhost:8080/api/v1'
    var BigNew = {
        baseURL: URL,//基地址
        user_login: URL + '/admin/user/login',//用户登录
        user_info: URL + '/admin/user/info',//用户信息
        user_detail: URL + '/admin/user/detail',//用户详情
        user_edit: URL + '/admin/user/edit',//用户编辑
        category_list: URL + '/admin/category/list',//文章类别查询
        category_add: URL + '/admin/category/add',//文章类别新增
        category_search: URL + '/admin/category/search',//文章类别搜索
        category_edit: URL + '/admin/category/edit',//文章类别编辑
        category_delete: URL + '/admin/category/delete',//文章类别删除
        article_query: URL + '/admin/article/query',//文章搜索
        article_publish: URL + '/admin/article/publish',//文章发布
        article_search: URL + '/admin/article/search',//文章信息查询
        article_edit: URL + '/admin/article/edit',//文章编辑
        article_delete: URL + '/admin/article/delete',//文章删除
        comment_list: URL + '/admin/comment/search',//文章评论列表
        comment_pass: URL + '/admin/comment/pass',//文章评论通过
        comment_reject: URL + '/admin/comment/reject',//文章评论不通过
        comment_delete: URL + '/admin/comment/delete',//文章评论删除
        comment_shuju: URL + '/admin/data/info',//获取统计数据
        comment_zxt: URL + '/admin/data/article',//日新增文章数量统计
        comment_sl: URL + '/admin/data/category',//各类型文章数量统计
        comment_fwl: URL + '/admin/data/visit',//日文章访问量


    }
    //暴露接口
    w.BigNew = BigNew;
})(window)
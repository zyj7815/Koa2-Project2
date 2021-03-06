const router = require('koa-router')()
const userModel = require('../controller/taskDB')


/**
 * 进入创建页面
 */
router.get('/create', async (ctx, next) => {

    var res = {}

    // 获取tag标签，用于选择文章标签类型
    await userModel.findTag().then(result => {
        res = JSON.parse(JSON.stringify(result)) 
    })  
    
    await ctx.render('create',{
        session:ctx.session,
        allTag: res,
        postsData: {}
    })
})

/**
 * 创建文章
 */
router.post('/create', async (ctx, next) => {

    ctx.body = true;

    let posts = {
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        content_html: ctx.request.body.content_html,
        u_id: ctx.session.id,
        t_id: ctx.request.body.tag
    }

    await userModel.insertPost([
        posts.title, posts.content, posts.content_html, posts.u_id, posts.t_id
    ]).then(result => {
        ctx.body = true;
    }).catch(error => {
        ctx.body = false;
    })
})

module.exports = router;
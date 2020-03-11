//引入express框架
const express = require('express');
//引用path模块
const path = require('path');
//bodyParser 处理post请求参数
const bodyParser = require('body-parser');
//导入express-session模块
const session = require('express-session');
//导入art-template模板
const template = require('art-template');
// 导入dateformat模块
const dateFormat = require('dateformat');
//导入morgan模块
const morgan = require('morgan');
//导入config模块
const config = require('config');
//创建web服务器
const app = express();
//数据库连接
require('./model/connect');
//处理post请求参数
app.use(bodyParser.urlencoded({extended:false}));
//模板所在的位置
app.use(session({secret: 'secret: key'}));
app.set('views',path.join(__dirname,'views'));
//模板的默认后缀
app.set('view engine','art');
//当渲染art后缀的模板时，所使用的模板引擎
app.engine('art',require('express-art-template'));
//向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;
//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')));

console.log(config.get('title'));
//获取系统环境变量，返回值是对像
if(process.env.NODE_ENV == 'development') {
     app.use(morgan('dev'));
}
//引入路由
const home = require('./route/home');
const admin = require('./route/admin');
//登录拦截
app.use('/admin',require('./middleware/loginGuard')); 
//匹配请求路径
app.use('/home',home);
app.use('/admin',admin);
//错误处理中间件
app.use((err,req,res,next) => {
    const result = JSON.parse(err);
    let params = [];
    for(let attr in result){
        if(attr != 'path'){
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});
// 监听端口
app.listen(80);
console.log('网站服务器已启动成功 请访问localhost');

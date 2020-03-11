//展示路由
const express = require('express');
//创建展示路由
const home = express.Router();

home.get('/',require('./home/index'));

home.get('/article',require('./home/article'));

home.post('/comment',require('./home/comment'))
//将路由成员导出
module.exports = home;
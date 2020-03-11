//管理路由
const express = require('express');

//创建管理路由
const admin = express.Router();

admin.get('/login', require('./admin/loginPage'));

admin.post('/login',require('./admin/login'));

admin.get('/user',require('./admin/userPage'));

admin.get('/logout',require('./admin/logout'));

admin.get('/user-edit',require('./admin/user-edit'));

admin.post('/user-edit',require('./admin/user-edit-fn'));

admin.post('/user-modify',require('./admin/user-modify'));

admin.get('/delete',require('./admin/user-delete'));

admin.get('/article',require('./admin/article'));

admin.get('/article-edit',require('./admin/article-edit'));

admin.post('/article-add',require('./admin/article-add'));
//将路由成员导出
module.exports = admin;
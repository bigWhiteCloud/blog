//引入数据库模块
const mongoose = require('mongoose');
//链接数据库
mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true })
        .then(()=>console.log('数据库链接成功'))
        .catch(()=>console.log('数据库链接失败'))
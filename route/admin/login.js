const bcrypt = require('bcrypt');
//导入用户集合函数
const { User } = require('../../model/user');
module.exports = async (req,res) => {
    // res.send(req.body)
    const {email,password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).send('<h4>邮箱地址或者密码错误</h4>');
    }
    let user = await User.findOne({email});
    //查找到用户
    if(user){
        let isValid = await bcrypt.compare(password,user.password) 
        if(isValid) {
            req.session.username = user.username;
            req.session.role = user.role;
            req.app.locals.userInfo = user;
            // console.log(req.app.locals.userInfo);
            //登录成功
            // res.send('登陆成功');
            if(user.role == 'admin') {
                res.redirect('/admin/user');
            }else {
                res.redirect('/home/');
            }
        } else {
            res.status(400).send('<h4>邮箱地址或者密码错误</h4>');
        } 
    } else {
        res.status(400).send('<h4>邮箱地址或者密码错误</h4>');
    }
}
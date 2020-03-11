const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
// 创建用户集合规则
const newSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        //唯一性
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    //0 启用 1 禁用
    state: {
        type: Number,
        default: 0
    }
});
//创建集合
const User = mongoose.model('User',newSchema);

async function createUser () {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456',salt);
    const user = await User.create({
        username: 'admin',
        email: '787885123@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    })
}
// createUser();
// 用户验证
 const validateUser = user => {
    const schema = {
		username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
		email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
		role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
		state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    return Joi.validate(user,schema);
 }
//导出成员
module.exports = {
    User,
    validateUser
}
//引入joi模块
const Joi = require('joi');
//定义规则
const schema = {
    username: Joi.string().min(2).max(5).required().error(new Error('username验证没通过')),
    birht:Joi.number().min(1900).max(2020)
};
//验证
async function run () {
    try{
        await Joi.validate({username: 'ab',birht: 1800},schema);  
    }catch(ex){
        console.log(ex.message);
        return;
    }
    console.log('验证通过');
}
run();
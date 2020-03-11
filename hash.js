const bcrypt = require('bcrypt');
//生成随机字符串
async function run () {
    // console.log(await bcrypt.genSalt(10));
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash('123456',salt)
}
run()
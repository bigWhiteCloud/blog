const { User } = require('../../model/user');
module.exports = async (req,res) => {
    // res.send(req.query.id);
    const { id } = req.query;
    await User.findOneAndDelete({_id: id})
    res.redirect('/admin/user');
}
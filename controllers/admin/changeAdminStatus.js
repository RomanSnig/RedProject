const Admin = require('../../models/adminSchema');

module.exports.changeStatus = async(req,res) => {
    try {
        let {_id, status} = req.body;
        res.json(await Admin.findByIdAndUpdate({_id},{status}));
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
        console.log(error)
    }
}
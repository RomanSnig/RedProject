const Admin = require('../../models/adminSchema');

module.exports.delete = async(req,res) => {
    try {
        console.log(req.params);
        // let id = req.params;
        res.json(await Admin.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
        console.log(error)
    }
}
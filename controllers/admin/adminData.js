const Admin = require('../../dataBase/models/adminSchema');

module.exports.createAdmin = async(req,res) => {
    let{name, surname, email, phone, rights, status } = req.body;
    try {
        if(!name || !surname || !email || !phone || !rights || !status) throw new Error('Some field is empty');
        // Перевіряю чи не зареєстрований уже, якщо ні - продовжую
        const isCreated = await Admin.find({email: email});
        if (isCreated.length) res.json('Admin is already created')
        else res.json(await Admin.create(req.body))
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
        console.log(error)
    }
};

module.exports.deleteAdmin = async(req,res) => {
    try {
        res.json(await Admin.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
        console.log(error)
    }
};

module.exports.changeStatus = async(req,res) => {
    let {id, status} = req.body;
    try {
        if(!id || !status) throw new Error('Some field is empty');
        res.json(await Admin.findByIdAndUpdate({_id: id},{status}));
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
        console.log(error)
    }
};
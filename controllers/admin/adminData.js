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

module.exports.changeAdminData = async(req, res) => {
    // console.log(req.body);
    const isCreatedByEmail = await Admin.find({email: req.body.email});
    const isCreated = await Admin.find({_id: req.body._id});
    try {
        // console.log(isCreated[0].email);
        // console.log(req.body.email);
        // if(isCreated[0].email!==req.body.email) console.log("fffff")

        // Перевіряю чи не зареєстрований уже якись інший користувач на цей "новий" email, якщо ні - продовжую
        if (isCreatedByEmail.length && isCreated[0].email!==req.body.email)
            res.json('Admin is already created with email: ' + isCreatedByEmail[0].email)
        else res.json(await Admin.findByIdAndUpdate(req.body._id, req.body));
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
        console.log(error);
    }
};

module.exports.findAdmins = async(req, res) => {
    console.log(req.params)
    try {
        res.json(await Admin.find(req.params));
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

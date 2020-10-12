const Admin = require('../../models/adminSchema');

module.exports.create = async(req,res) => {
    try {
        console.log(req.body);
        let{name, surname, email, phone, rights, status } = req.body;
        if(!name || !surname || !email || !phone || !rights || !status) throw new Error('Some field is empty');
        // Перевіряю чи не зареєстрований уже
        const isCreated = await Admin.find({email: email});
        if (isCreated.length>0) throw new Error('Admin is already created');
        res.json( await Admin.create({
            name, surname, email, phone, rights, status
        }));

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
        console.log(error)
    }
};
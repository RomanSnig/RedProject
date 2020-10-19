const Admin = require('../../dataBase/models/adminSchema');
const Person = require('../../dataBase/models/personSchema');
const {hashPassword} = require('../../helpers/passwordHasher');

module.exports.createAdmin = async(req,res) => {
    let{name, surname, email, phone, rights, status, password} = req.body;
    try {
        if(!name || !surname || !email || !phone || !rights || !status || !password) throw new Error('Some field is empty');
        // Перевіряю чи не зареєстрований уже, якщо ні - продовжую
        const isCreated = await Admin.find({email: email});
        if (isCreated.length) res.json('Admin is already created')
        else {res.json(await Admin.create(req.body));
        const hashedPassword = await hashPassword(password);
        await Person.create({email, password: hashedPassword})}
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
        await Person.findOneAndDelete({email: req.params.email})
        res.json(await Admin.findOneAndDelete({email: req.params.email}))

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
        console.log(error)
    }
};

module.exports.changeStatus = async(req,res) => {
    try {
        let {id, status} = req.body;
        if(!id || !status) throw new Error('Some field is empty');
        const isPresent = await Admin.findById({_id:id});
        if(!isPresent) throw new Error('No Admin!!');
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
        else {res.json(await Admin.findByIdAndUpdate(req.body._id, req.body));
              await Person.findOneAndUpdate(isCreated[0].email, req.body.email);
        }
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

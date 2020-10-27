const Admin = require('../../dataBase/models/adminSchema');
const Person = require('../../dataBase/models/personSchema');
const {hashPassword} = require('../../helpers/passwordHasher');
const {client} = require('../../dataBase/Elasticsearch/connect');
const Lookup = require('../../dataBase/models/lookup');
const moment = require('moment');

module.exports.createAdmin = async(req,res) => {
    let{name, surname, email, phone, rights, status, password} = req.body;
    try {
        if(!name || !surname || !email || !phone || !rights || !status || !password) throw new Error('Some field is empty');
        let adminStatus = await Lookup.find({type: 'adminStatus', key: status});
        let adminRights = await Lookup.find({type: 'adminRights', key: rights});
        if(phone.length < 12 || !adminStatus.length || !adminRights.length) throw new Error('NOT VALID');
        // Перевіряю чи не зареєстрований уже, якщо ні - продовжую
        let isCreated = await Person.find({email: email});
        if (isCreated.length) res.status(400).json({ message: 'Admin is already created' });
        else {const adminDate = moment().format('MMMM Do YYYY, h:mm:ss a');
            let createdAdmin = await Admin.create({
                name, email, surname, rights, phone, status, timeOfCreate: adminDate, timeOfLastChange: adminDate});
            const hashedPassword = await hashPassword(password);
            await Person.create({email, password: hashedPassword, adminId: createdAdmin._id});
            let elastic = await client.index({
            index: 'admins',
            body: {
                email: email, name: name, surname: surname, rights: rights, phone: phone, status: status, timeOfCreate: adminDate, timeOfLastChange: adminDate
            },
            id: createdAdmin._id
        })
        res.json({
            success: true,
            admin: createdAdmin,
            elastic: elastic.body
        })}
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
        console.log(error)
    }
};

module.exports.deleteAdmin = async(req,res) => {
    try {
        let admin = await Admin.findByIdAndDelete({_id: req.params.id})
        await Person.findOneAndDelete({adminId: req.params.id})
        let elastic = await client.delete({
            index: 'admins',
            id: req.params.id
        })
        res.json({
            success: true,
            elastic: elastic,
            admin: admin
        })
    } catch (error) {
        res.status(400).json({
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
        let adminStatus = await Lookup.find({type: 'adminStatus', key: status});
        if(!adminStatus.length) throw new Error('NOT VALID Status');
        let isPresent = await Admin.findById({_id:id});
        if(!isPresent) throw new Error('No Admin!!');
        const adminDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        let admin = await Admin.findByIdAndUpdate({_id: id},{status: status, timeOfLastChange: adminDate});
        let elastic = await client.update({index: 'admins', id: id, body: {doc:{status: status, timeOfLastChange: adminDate}}});
        res.json({
            success: true,
            admin: admin,
            elastic: elastic
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
        console.log(error)
    }
};

module.exports.changeData = async(req, res) => {
    // console.log(req.body._id);
    try {
        let {name, surname, status, rights, phone} = req.body;
        if (!name || !surname || !status || !rights || !phone) throw new Error('Some field is Empty!!');
        let adminStatus = await Lookup.find({type: 'adminStatus', key: status});
        let adminRights = await Lookup.find({type: 'adminRights', key: rights});
        if(phone.length < 12 || !adminStatus.length || !adminRights.length) throw new Error('NOT VALID');
        let isPresent = await Admin.findById({_id:req.params.id});
        if (!isPresent) throw new Error('NO ADMIN!!!');
        if(status !== isPresent.status) {
            const adminDate = moment().format('MMMM Do YYYY, h:mm:ss a');
            let admin = await Admin.findByIdAndUpdate({_id: req.params.id}, {
                name, surname, status, rights, phone, timeOfLastChange: adminDate});
            let elastic = await client.update({index: 'admins', id: req.params.id, body: {doc: {
                        name, surname, status, rights, phone, timeOfLastChange: adminDate
                    }}});
            res.json({
                success: true,
                admin: admin,
                elastic: elastic.body
            })
        } else {
            let admin = await Admin.findByIdAndUpdate({_id: req.params.id}, {name, surname, status, rights, phone});
            let elastic = await client.update({index: 'admins', id: req.params.id, body: {doc: req.body}});
            res.json({
                success: true,
                admin: admin,
                elastic: elastic.body
            })}
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
        console.log(error);
    }
};

module.exports.findAdminsByStatus = async(req, res) => {
    console.log(req.params)
    try {
        let elastic = await client.search({index: 'admins', body: {query: {match:{status: req.params.status}}}});
        let admins = elastic.body.hits.hits;
        let lookup = await Lookup.find({type: 'adminStatus' || 'adminRights'});
        // const lookup = await Lookup.findOne({key: req.params.status});
        // const adminsToResponse = admins.map(function (admin) {
        //     admin._source.status = lookup.subject;
        //     return admin._source
        // });
        let adminsToResponse = admins.map(function (admin) {
            lookup.map(function (lookupData) {
                if(admin._source.status === lookupData.key)
                    return admin._source.status = lookupData.subject
            });
            lookup.map(function (lookupData) {
                if(admin._source.rights === lookupData.key)
                    return admin._source.rights = lookupData.subject
            });
            return admin = admin._source
        })
        res.json({
            success: true,
            admins: adminsToResponse
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

module.exports.getAdminById = async (req, res) => {
    try {
        let admin = await Admin.findById({_id: req.params.id});
        let lookupStatus = await Lookup.findOne({key: admin.status});
        let lookupRights = await Lookup.findOne({key: admin.rights});
        admin.status = lookupStatus.subject;
        admin.rights = lookupRights.subject;
        res.json({
            success: true,
            admin: admin
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};


// module.exports.changeAdminData = async(req, res) => {
//     // console.log(req.body);
//     const isCreatedByEmail = await Admin.find({email: req.body.email});
//     const isCreated = await Admin.find({_id: req.body._id});
//     try {
//         // console.log(isCreated[0].email);
//         // console.log(req.body.email);
//         // if(isCreated[0].email!==req.body.email) console.log("fffff")
//
//         // Перевіряю чи не зареєстрований уже якись інший користувач на цей "новий" email, якщо ні - продовжую
//         if (isCreatedByEmail.length && isCreated[0].email!==req.body.email)
//             res.json('Admin is already created with email: ' + isCreatedByEmail[0].email)
//         else {res.json(await Admin.findByIdAndUpdate(req.body._id, req.body));
//             await Person.findOneAndUpdate(isCreated[0].email, req.body.email);
//         }
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message
//         })
//         console.log(error);
//     }
// };

// module.exports.findAll = async (req, res) => {
//     try{
//         const elastic = await client.search({index: 'admins', body: {query: {match_all:{}}}});
//         const admins = elastic.body.hits.hits;
//         if(!admins) throw new Error('No Admins');
//         const lookup = await Lookup.find({});
//         const adminsToResponse = admins.map(function (admin) {
//             lookup.map(function (lookupData) {
//                 if(admin._source.status === lookupData.key)
//                     return admin._source.status = lookupData.subject
//             });
//             lookup.map(function (lookupData) {
//                 if(admin._source.rights === lookupData.key)
//                     return admin._source.rights = lookupData.subject
//             });
//             return admin = admin._source
//         })
//         // console.log(adminsToResponse)
//         res.json(adminsToResponse.sort(data => data.timeOfLastChange))
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

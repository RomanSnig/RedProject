const Lookup = require('../../dataBase/models/lookup');
const moment = require('moment');

module.exports.create = async (req, res) => {
    try{
        let {key, subject, type} = req.body;
        if(!key || !subject || !type) throw new Error('Some field is Empty!!!');
        const lookupDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        res.json(await Lookup.create({
            key, subject, type, timeOfCreate: lookupDate, timeOfLastChange: lookupDate}));
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

module.exports.keyToSubject = async (req, res) => {
    try{
        let lookup = await Lookup.findOne({key: req.params.key});
        res.json({
            success: true,
            message: lookup.subject
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports.findAll = async (req, res) => {
    try{
        const lookup = await Lookup.find({});
        if(!lookup) throw new Error('No lookup DATA!!');
        // lookup.sort(data => data.timeOfLastChange);
        res.json({
            success: true,
            message: lookup
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

module.exports.findByType = async (req, res) => {
    try {
        const lookup = await Lookup.find({type: req.params.type});
        res.json({
            success: true,
            message: lookup
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

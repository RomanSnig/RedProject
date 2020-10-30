const Lookup = require('../../dataBase/models/lookup');
const moment = require('moment');

module.exports.create = async (req, res) => {
    try{
        let {key, subject, type} = req.body;
        if(!key || !subject || !type) throw new Error('Some field is Empty!!!');
        let isPresent = await Lookup.findOne({key});
        if(isPresent.length) res.status(400).json({ message: 'Key is already created' });
        let isPresentType = await Lookup.find({type});
        if (!isPresentType) throw new Error('NOT VALID DATA!!');
        const lookupDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        let lookup = await Lookup.create({
            key, subject, type, timeOfCreate: lookupDate, timeOfLastChange: lookupDate});
        res.json({
            success: true,
            lookup: lookup
        });
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
        if(!lookup) throw new Error('No lookup!');
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
        if(!lookup) throw new Error('No lookup DATA!!');
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

const lookup = require('../../dataBase/models/lookup');

module.exports.create = async (req, res) => {
    try{
        let {key, subject, type, timeOfCreate, timeOfChange} = req.body;
        if(!key || !subject || !type || !timeOfChange || !timeOfCreate) throw new Error('Some field is Empty!!!');
        res.json(await lookup.create(req.body));
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
        await lookup.findOne({key: req.params.key})
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

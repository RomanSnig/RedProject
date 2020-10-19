const worksSchema = require('../../dataBase/models/worksSchema');
const PersonSchema = require('../../dataBase/models/personSchema');
module.exports.create = async (req, res) => {
    try{
        let {name, text, userId} = req.body;
        if(!name || !text || userId) throw new Error('Some field is Empty!!');
        const isPresent = await PersonSchema.findById({_id: userId});
        if(!isPresent) throw new Error('No admin!!!');
        res.json(await worksSchema.create(req.body))
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

module.exports.deleteWork = async (req, res) => {
  try {
      res.json(await worksSchema.findByIdAndDelete({_id: req.params.id}));
  } catch (error) {
      console.log(error);
      res.status(400).json({
          success: false,
          message: error.message
      })
  }
};

module.exports.findWork = async (req, res) => {
  try {
      res.json(await worksSchema.findById({_id: req.params.id}))
  }  catch (error) {
      console.log(error);
      res.status(400).json({
          success: false,
          message: error.message
      })
  }
};

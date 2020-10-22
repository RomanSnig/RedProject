const worksSchema = require('../../dataBase/models/worksSchema');
const AdminSchema = require('../../dataBase/models/adminSchema');
const moment = require('moment');
const {client} = require('../../dataBase/Elasticsearch/connect');
const Lookup = require('../../dataBase/models/lookup');

module.exports.create = async (req, res) => {
    try{
        let {name, style, adminId} = req.body;
        if(!name || !style || !adminId) throw new Error('Some field is Empty!!');
        const isPresent = await AdminSchema.findById({_id: adminId});
        if(!isPresent) throw new Error('No admin!!!');
        const workDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        const mongoWork = await worksSchema.create(
            {name, style, adminId, dateOfCreation: workDate});
        const elasticWork = await client.index({
            index: 'works', id: mongoWork._id, body: {name, style, adminId, dateOfCreation: workDate}});
        res.json({
            success: true,
            mongo: mongoWork,
            elastic: elasticWork.body
        })
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
      const elasticWorks = await client.delete({index: 'works', id: req.params.id});
      const mongoWorks = await worksSchema.findByIdAndDelete({_id: req.params.id});
      res.json({
          success: true,
          elastic: elasticWorks.body,
          mongo: mongoWorks
      })
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
      const work = await worksSchema.findById({_id: req.params.id});
      const lookupData = await Lookup.findOne({key: work.style});
      work.style = lookupData.subject;
      res.json({
          success: true,
          work: work
      })
  }  catch (error) {
      console.log(error);
      res.status(400).json({
          success: false,
          message: error.message
      })
  }
};

module.exports.findWorksByAdminId = async (req, res) => {
    try{
        const {body} = await client.search({index: 'works',
        body:{query:{match: {adminId: req.params.id}}}});
        const works = body.hits.hits;
        const lookup = await Lookup.find({});
        const worksToResponse = works.map(function (work) {
            lookup.map(function (lookupData) {
                if(work._source.style ===lookupData.key)
                    return work._source.style = lookupData.subject
            });
            return work = work._source
        })
        console.log(worksToResponse)
        res.json(worksToResponse)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports.findElasticWork = async (req, res) => {
    try{
        console.log(req.params)
        // const {body} = await client.search({index: 'works',
        //     body: {query:{match: {_id: req.params.id}}}});
        const {body} = await client.get({index: 'works',
            id: req.params.id});
        const work = body._source;
        const lookupData = await Lookup.findOne({key: work.style});
        work.style = lookupData.subject;
        res.json({
            success: true,
            work: work
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

module.exports.allWorksFromElastic = async (req, res) => {
    try {
        const elastic = await client.search({index: 'works', body: {query:{match_all: {}}}});
        const works = elastic.body.hits.hits;
        if(!works) throw new Error('No Works!!!');
        const lookup = await Lookup.find({});
        const worksToResponse = works.map(function (work) {
            lookup.map(function (lookupData) {
               if(work._source.style ===lookupData.key)
               return work._source.style = lookupData.subject
            });
            return work = work._source
        })
        console.log(worksToResponse)
        res.json(worksToResponse)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

module.exports.findWorkByStyle = async (req, res) => {
    try{
        const elastic = await client.search({index: 'works', body: {query:{match: {style: req.params.style}}}});
        const works = elastic.body.hits.hits;
        const lookup = await Lookup.find({});
        const worksToResponse = works.map(function (work) {
            lookup.map(function (lookupData) {
                if(work._source.style ===lookupData.key)
                    return work._source.style = lookupData.subject
            });
            return work = work._source
        })
        console.log(worksToResponse)
        res.json(worksToResponse)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

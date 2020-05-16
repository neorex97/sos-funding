var express = require('express');
var router = express.Router();
const db = require('../models/index');
const sosfund = db['sosfund'];
const otherfunds = db['otherfunds'];

/* GET users listing. */
router.get('/',GetSos);
router.get('/others',GetOtherContributions)
router.post('/',newContribution);
router.delete('/delete:id',dataDelete);
router.put('/update:id',dataUpdate);
router.put('/sos:id',sosupdate)

// Send all sosfunds to ClientSide
function GetSos(req, res) {
  sosfund.findAll()
  .then(sosfunds => { 
    if(sosfunds.length===0){
      sosfund.create({
        sosamount: '0'
      }).then(sosfund => {    
        // Send created sosfund to ClientSide
        res.redirect('/sourcefunding')
      }).catch(err => {
        res.status(500).send("Error -> " + err);
      })
    }
    else{res.send(sosfunds);}
    }).catch(err => {
    res.status(500).send("Error -> " + err);
    })
}

// Send all other contributions to ClientSide
function GetOtherContributions(req,res,next){
  otherfunds.findAll()
  .then(otherfunds =>{
    res.send(otherfunds);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
}


// sos update
function sosupdate(req,res){
    sosfund.update({sosamount: req.body.sosamount}, 
    {where:{sosid: req.params.id}})
    .then(sosfund => {
            res.status(200).send(sosfund);
           }).catch(err => {
            res.status(500).send("Error -> " + err);
           })
}

// add new other contribution
  function newContribution(req,res){
    const Data = JSON.parse(JSON.stringify(req.body))
    otherfunds.create({
      name : Data.name,
      description : Data.description,
      amount: Data.amount,
    }).then(otherfund => {    
      //Send back created data as response
      res.send(otherfund.dataValues);
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    })
  }

  // delete a contribution
  function dataDelete(req,res){
    otherfunds.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.status(200).send('Contribution deleted!');
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  });
  }

  // update selected contribution
  function dataUpdate(req,res){
  otherfunds.update( 
    { 
      name: req.body.name,
      description: req.body.description,
      amount: req.body.amount 
    },{where:{id: req.params.id}}
           ).then(other => {
            res.status(200).send(other);
           }).catch(err => {
            res.status(500).send("Error -> " + err);
           })
    }



module.exports = router;

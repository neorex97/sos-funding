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
    res.send(sosfunds);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
}
// Send all other contributions to ClientSide
function GetOtherContributions(req,res){
  otherfunds.findAll()
  .then(otherfunds =>{
    res.send(otherfunds);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
}

// sos update

function sosupdate(req,res){
  var Data = req.body;
  const id = req.params.id;
  const sos = sosfund.findOne({ where: { sosid: id } });
  if (sos === null) {
    sosfund.create({
            sosamount: sos.sosamount
          }).then(sosfund => {    
            // Send created sosfund to ClientSide
            res.send(sosfund);
          }).catch(err => {
            res.status(500).send("Error -> " + err);
          })
  } else {
    sosfund.update( 
    { 
      sosamount: req.body.sosamount 
    }, 
      { where: {sosid: req.params.id} }
           ).then(() => {
            res.status(200).send(otherfunds);
           }).catch(err => {
            res.status(500).send("Error -> " + err);
           })
    }
}

// add new other contribution
  function newContribution(req,res){
    const Data = JSON.parse(JSON.stringify(req.body))
    otherfunds.create({
      name : Data.name,
      description : Data.description,
      amount: Data.amount,

    }).then(otherfund => {    
      // Send created sosfund to ClientSide
      res.send(otherfund);
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    })
  }

  // delete a contribution
  function dataDelete(req,res){
    const id = req.params.id;
    otherfunds.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).send('Contribution deleted!');
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  });
  }

  // update selected contribution
  function dataUpdate(req,res){
    var Data = req.body;
  const id = req.params.id;
  otherfunds.update( 
    { 
      name: req.body.name,
      description: req.body.description,
      amount: req.body.amount 
    }, 
      { where: {id: req.params.id} }
           ).then(() => {
            res.status(200).send(otherfunds);
           }).catch(err => {
            res.status(500).send("Error -> " + err);
           })
  }



module.exports = router;

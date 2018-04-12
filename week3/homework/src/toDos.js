const EventEmitter = require ('events').EventEmitter;
const express = require ('express');
const router = express.Router ();
const bodyParser = require ('body-parser');
const app = express ();
module.exports = toDos;

function toDos (db) {
  const EventEmitter = new EventEmitter ();
  EventEmitter.setMaxListeners(0);

  router.post(bodyParser.urlencoded({extended:false}));
  router.put(bodyParser.urlencoded({extended:false}));
  router.use(bodyParser.json());

  router.route('/')

  //get all toDos
  .get((req,res)=>{
    db.find({deleted:{$ne:true}},(err,docs)=>{
      res.json(docs);
    });
  })

  //Create a toDo
  .post((req,res)=>{
    if(req.body.text && req.body._id){
    db.findOne({_id:req.param('_id')},(err,doc)=>{
        if (doc) {
            res.status(doc.deleted ? 410 : 409).send();
          } else {
            db.insert({ _id: req.body._id, text: req.body.text }, (err, newDoc)=> {
              EventEmitter.emit('update');
              res.status(201).send();
            });
    })
  });
  router.route ('/:_id').get ( (req, res)=> {
  db.findOne ({_id: req.param ('_id')},  (err, doc)=> {
    if (doc && !doc.deleted) res.json (doc);
    else res.status (doc && doc.deleted ? 410 : 404).end ();
  });
});
 // Delete a toDo
    .delete((req, res)=> {
      db.findOne({ _id: req.param('_id') }, function(err, doc) {
        if (doc) {
          doc.deleted = true;
          db.update({ _id: req.param('_id') }, doc, function(err, removed) {
            EventEmitter.emit('update');
            res.status(204).end();
          });
        } else {
          res.status(204).end();
        }
      });
    });
     app.get('/stream', function(req, res) {
    var messageCount = 0;
    req.socket.setTimeout(Infinity);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('\n');

    function onUpdate() {
      messageCount++;
      res.write('id: ' + messageCount + '\n');
      res.write('data: update\n\n');
    }

    EventEmitter.addListener('update', onUpdate);
    req.on('close', function() {
      EventEmitter.removeListener('update', onUpdate);
    });
  });

  app.use(router);
  return app;
}

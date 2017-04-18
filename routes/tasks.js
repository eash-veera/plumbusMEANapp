var express = require('express');
var router = express.Router();

// require mongojs this will help connect the mongodb instance to our API
var mongojs = require('mongojs');

//define the DB driver with the collection that your want to work with !
var db = mongojs('mongodb://eash:1234@ds163010.mlab.com:63010/mytasklist',['tasks']);

//GET all tasks
router.get('/tasks', function(req, res, next){
  db.tasks.find(function(err, tasks){
      if(err){
        res.send(err);
      }
      res.json(tasks);
  });
});

//GET single task
router.get('/task/:id', function(req, res, next){
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
  });
});

//SAVE a task
router.post('/task', function(req, res, next){
  var task = req.body;
  if(!task.title || (task.complete + '')){
    res.status(400);
    res.json({
        "error":"Unsupported date"
    });
  }else{
    db.tasks.save(task, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    });
  }
});

//DELETE task
router.delete('/task/:id', function(req, res, next){
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
  });
});

//UPDATE task
router.put('/task/:id', function(req, res, next){
  var task = req.body;
  var updTask = {};

  //check for updates on the completed status
  if(task.complete){
    updTask.complete = task.complete;
  }

  //check for updates on the title
  if(task.title){
    updTask.title = task.title;
  }

  //check for updates on the description
  if(task.description){
    updTask.description = task.description;
  }

  //check for updates on the priority level
  if(task.priority){
    updTask.priority = task.priority;
  }

  //check for updates on the active status
  if(task.active){
    updTask.active = task.active;
  }

  //check for empty updTask object
  if(!updTask){
    res.status(400);
    res.json({
        "error":"Task details were not updated !"
    });
  }else{
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
        if(err){
          res.send(err);
        }
        res.json(task);
    });
  }
});

module.exports = router;

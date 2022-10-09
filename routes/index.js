var express = require('express');
let projectsServices = require('../services/projects.Services.js');
var router = express.Router();

// router.get('/', function(req, res, next) {
//   res.send('holaaaa');
// });


/* GET home page. */
projectsServices.traerProyectos().then(function (projects) {
  console.log(projects);
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'projects', projects: projects });
  });
});


module.exports = router;



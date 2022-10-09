import express from 'express';
let router = express.Router();
import projectsServices from '../services/projects.Services.js';

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


export default router;



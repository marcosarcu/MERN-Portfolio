import express from 'express';
let router = express.Router();
import projectsController from '../controllers/projects.controller.js';



/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Panel de Admin'});
});

router.get('/projects', projectsController.adminProjects);

/* Nuevo Proyecto*/
router.get ('/projects/nuevo', projectsController.nuevoProyecto);
router.post('/projects/nuevo', projectsController.guardarProyecto);

/* Eliminar Proyecto*/
router.get('/projects/:idProject/eliminar', projectsController.eliminarProyectoCheck);
router.post('/projects/:idProject/eliminar', projectsController.eliminarProyecto);

/* Editar Proyecto*/
router.get('/projects/:idProject/editar', projectsController.editarProyecto);
router.post('/projects/:idProject/editar', projectsController.guardarEdicion);

/* Publicar Proyecto*/
router.post('/projects/:idProject/publicar', projectsController.publicarProyecto);

export default router;

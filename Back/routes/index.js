import express from 'express';
let router = express.Router();
import projectsController from '../controllers/projects.controller.js';

/* GET home page. */
router.get('/', projectsController.index);



export default router;
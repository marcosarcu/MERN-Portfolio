import express from "express";
import * as projectsController from '../controllers/projects.api.controllers.js';
import testimonialsController from '../controllers/testimonials.api.controller.js';

const router = express.Router();

router.route('/api/projects')
    .post(projectsController.create)
    .get(projectsController.findAll)

router.route('/api/projects/:id')
    .get(projectsController.findById)
    .patch(projectsController.editById)
    // .put(projectsController.replaceById)
    .delete(projectsController.deleteById)

router.route('/api/projects/technology/:id')
    .get(projectsController.findByTechnologyId)

router.route('/api/projects/:id/testimonials')
    .get(testimonialsController.findByProjectId)
    .post(testimonialsController.create)

router.route('/api/projects/:id/testimonials/:testimonialId')
    .delete(testimonialsController.deleteTestimonial)



export default router;

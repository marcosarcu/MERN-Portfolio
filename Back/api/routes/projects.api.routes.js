import express from "express";
import * as projectsController from '../controllers/projects.api.controllers.js';
import * as galleryController from '../controllers/gallery.api.controller.js';
import testimonialsController from '../controllers/testimonials.api.controller.js';
import isLogin from "../../middleware/auth.middleware.js";

const router = express.Router();

router.route('/api/projects')
    .post([isLogin], projectsController.create)
    .get(projectsController.findAll)

router.route('/api/projects/:id')
    .get(projectsController.findById)
    .patch([isLogin], projectsController.editById)
    // .put(projectsController.replaceById)
    .delete([isLogin], projectsController.deleteById)

router.route('/api/projects/technology/:id')
    .get(projectsController.findByTechnologyId)

router.route('/api/projects/:id/testimonials')
    .get(testimonialsController.findByProjectId)
    .post([isLogin], testimonialsController.create)

router.route('/api/projects/:id/testimonials/:testimonialId')
    .delete([isLogin], testimonialsController.deleteTestimonial)

router.route('/api/projects/:id/gallery/')
    .get(galleryController.findGalleryById)
    .post([isLogin], galleryController.createGallery)
    .patch([isLogin], galleryController.addImageToGallery)

router.route('/api/projects/:id/gallery/')
    .delete([isLogin], galleryController.deleteGalleryImage)



export default router;

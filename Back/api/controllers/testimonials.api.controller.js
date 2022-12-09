import testimonialServices from '../../services/testimonials.services.js';
import { ObjectId } from 'mongodb'

function findByProjectId(req, res) {
    const id = req.params.id;
    testimonialServices.findByProjectId(id)
        .then(function (testimonials) {
            if (testimonials) {
                res.status(200).json(testimonials);
            } else {
                res.status(404).json({ message: "Testimonios no encontrados" });
            }
        })
        .catch(function () {
            res.status(500).json({ message: "ID del proyecto inválida" });
        });
};

function create(req, res) {
    const testimonial = {
        name: req.body.name,
        company: req.body.company,
        testimony: req.body.testimony,
        _id: ObjectId()
    }
    testimonialServices.create(testimonial, req.params.id)
        .then(function (testimonial) {
            res.status(201).json(testimonial);
        })
        .catch(function () {
            res.status(500).json({ message: "Error al crear testimonio" });
        });
};

function deleteTestimonial(req, res) {
    testimonialServices.deleteTestimonial(req.params.id, req.params.testimonialId)
        .then(function (testimonial) {
            if (testimonial) {
                res.status(200).json(testimonial);
            } else {
                res.status(404).json({ message: "Testimonio no encontrado" });
            }
        })
        .catch(function () {
            res.status(500).json({ message: "ID del testimonio inválida" });
        });
};


export default {
    findByProjectId,
    deleteTestimonial,
    create
};
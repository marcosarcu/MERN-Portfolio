import {getAll} from '../../services/technologies.services.js';

export function findAll(req, res) {
    getAll()
        .then(function (technologies) {
            res.status(200).json(technologies);
        })
        .catch(function () {
            res.status(500).json({ message: "Error al traer las tecnologías" });
        })
}
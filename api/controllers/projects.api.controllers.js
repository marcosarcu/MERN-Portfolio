import projectsServices from '../../services/projects.services.js';

function findById(req, res) {
    const id = req.params.id;
    projectsServices.traerProyectoPorId(id)
        .then(function (project) {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: "Proyecto no encontrado" });
            }
        })
        .catch(function () {
            res.status(500).json({ message: "ID del proyecto inválida" });
        })
}

function editById(req, res) {
    if(!(req.body.name && req.body.description && req.body.link && req.body.img && req.body.technologies)){
        res.status(400).json({ message: "Faltan datos" })
    }
    const id = req.params.id;
    const project = {};

    project.name = req.body.name;
    project.description = req.body.description;
    project.link = req.body.link;
    project.img = req.body.img;
    if (req.body.public) {
        project.public = req.body.public;
    }
    project.technologies = req.body.technologies;

    projectsServices.editarProyecto(id, project)
        .then(function (project) {
            if (project) {
                res.status(200).json({ message: "Proyecto editado con exito" });
            } else {
                res.status(404).json({ message: "Proyecto no encontrado" });
            }
        })
        .catch(function () {
            res.status(500).json({ message: "ID del proyecto inválida" });
        })
}

function deleteById(req, res) {
    const id = req.params.id;
    projectsServices.eliminarProyecto(id)
        .then(function (project) {
            if (project) {
                res.status(200).json({ message: "Proyecto eliminado con exito" });
            } else {
                res.status(404).json({ message: "Proyecto no encontrado" });
            }
        })
        .catch(function () {
            res.status(500).json({ message: "ID del proyecto inválida" });
        })
}

function create(req, res) {
    if(!(req.body.name && req.body.description && req.body.link && req.body.img && req.body.technologies)){
        res.status(400).json({ message: "Faltan datos" })
    }
    const project = {
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        img: req.body.img,
        public: req.body.public,
        technologies: req.body.technologies
    };

    projectsServices.guardarProyecto(project)
        .then(function (project) {
            if (project) {
                res.status(200).json({ message: "Proyecto creado con exito" });
            } else {
                res.status(404).json({ message: "Proyecto no creado" });
            }
        })
        .catch(function () {
            res.status(500).json({ message: "ID del proyecto inválida" });
        })
}

function findAll(req, res) {

    if (req.body.onlyPublic == true) {
        // traer solo los proyectos publicos
        projectsServices.traerProyectosPublicos()
            .then(function (projects) {
            res.status(200).json(projects);
            })
    } else{
        // traer todos los proyectos
        projectsServices.traerProyectos()
            .then(function (projects) {
            res.status(200).json(projects);
            })
    }
}

function findByTechnologyId(req, res) {
    const id = req.params.id;
    projectsServices.traerProyectosPorTecnologia(id)
        .then(function (projects) {
            if (projects) {
                res.status(200).json(projects);
            } else {
                res.status(404).json({ message: "Proyectos no encontrados" });
            }
        })
        .catch(function () {
            res.status(500).json({ message: "ID de la tecnologia inválida" });
        })
}






export {
    findById,
    findAll,
    editById,
    // replaceById,
    deleteById,
    create,
    findByTechnologyId
}
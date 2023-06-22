import { ObjectID } from 'bson';
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
    if(!(req.body.name && req.body.description && req.body.short_description && req.body.link && req.body.img && req.body.technologies)){
        res.status(400).json({ message: "Faltan datos" })
        return;
    }
    const id = req.params.id;
    const project = {
        name: "",
        short_description: "",
        description: "",
        link: "",
        img: "",
        public: false,
        gallery: null,
        technologies: []
    };

    project.name = req.body.name;
    project.short_description = req.body.short_description;
    project.description = req.body.description;
    project.link = req.body.link;
    project.img = req.body.img;
    project.public = req.body.public;
    req.body.technologies.forEach(technology => {
        project.technologies.push(ObjectID(technology));
    });
    
    if(req.body.gallery){
        project.gallery = ObjectID(req.body.gallery);
    }

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
    if(!(req.body.name && req.body.description && req.body.short_description && req.body.link && req.body.img && req.body.technologies)){
        res.status(400).json({ message: "Faltan datos" })
        return;
    }
    const technologies = [];
    req.body.technologies.forEach(technology => {
        technologies.push(ObjectID(technology));
    });
    const project = {
        name: req.body.name,
        description: req.body.description,
        short_description: req.body.short_description,
        link: req.body.link,
        img: req.body.img,
        technologies: technologies
    };
    if (req.body.public) {
        project.public = req.body.public;
    } else {
        project.public = false;
    }

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

    if (req.query.onlyPublic) {
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
import projectsServices from "../services/projects.Services.js";

function index(req, res) {
  projectsServices.traerProyectosPublicos().then(function (projects) {
    res.render("index", { projects: projects, title: "Marcos Arcusin" });
  });
}

function adminProjects(req, res){
    projectsServices.traerProyectos().then(function (projects) {
        res.render('admin/lista', { title: 'Adminstrar Proyectos', projects: projects });
      });
}

function nuevoProyecto(req, res){
    res.render('admin/nuevo', { title: 'Nuevo Proyecto' });
}

function guardarProyecto(req, res){
    // console.log(req.body);
    // TODO: Upload de la imagen
    const project = {
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        link: req.body.link,
        public: req.body.public === 'on' ? true : false
    }
    // console.log('project', project);
    projectsServices.guardarProyecto(project)
    .then(function () {
        res.redirect('/admin/projects');
    })
    .catch(function (err) {
        res.render("Error", { message: err.message })
    })
}

function eliminarProyectoCheck(req, res){
    projectsServices.traerProyectoPorId(req.params.idProject).then(function (project) {
        res.render('admin/eliminar', { title: 'Eliminar Proyecto', project: project });
      })
};

function eliminarProyecto(req, res){
    projectsServices.eliminarProyecto(req.params.idProject)
    .then(function () {
        res.redirect('/admin/projects');
    })
}

function editarProyecto(req, res){
    projectsServices.traerProyectoPorId(req.params.idProject).then(function (project) {
        res.render('admin/editar', { title: 'Editar Proyecto', project: project });
      })
}

function guardarEdicion(req, res){
    projectsServices.traerProyectoPorId(req.params.idProject).then(function (project) {
        project.name = req.body.name;
        project.description = req.body.description;
        project.img = req.body.img;
        project.link = req.body.link;
        project.public = req.body.public === 'on' ? true : false;
        projectsServices.editarProyecto(req.params.idProject, project)
        .then(function () {
            res.redirect('/admin/projects');
        })
    })
}

function publicarProyecto(req, res){
    projectsServices.traerProyectoPorId(req.params.idProject).then(function (project) {
        if (req.body.public === 'true') {
            project.public = true;
        } else {
            project.public = false;
        }
        projectsServices.editarProyecto(req.params.idProject, project)
        .then(function () {
            res.redirect('/admin/projects');
        })
    })
}


export default {
    index,
    adminProjects,
    nuevoProyecto,
    guardarProyecto,
    eliminarProyectoCheck,
    eliminarProyecto,
    publicarProyecto,
    editarProyecto,
    guardarEdicion
};


import { useState, useEffect } from 'react';
import { getProjects, remove } from '../services/projectsServices';
import { Link } from 'react-router-dom';
import StatusBar from '../components/StatusBar';


export default function Admin (){
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState({});

    useEffect(() => {
        getProjects().then((response) => {
            console.log(response)
            setProjects(response);
        })
    }, [])

    function handleDelete(id){
        let confirmation = window.confirm("¿Estás seguro de que quieres eliminar este proyecto?");
        if(!confirmation){
            return;
        }
        remove(id).then((response) => {
            console.log(response)
            if(response.status === 200){
                let newProjects = projects.filter((project) => project._id !== id);
                setProjects(newProjects);
                setStatus({
                    type: 'success',
                    message: 'Proyecto eliminado con éxito'
                })
            }else{
                console.log(response)
                setStatus({
                    type: 'danger',
                    message: 'Error al eliminar el proyecto'
                })
            }
        })
    }

    return (
        <div className="container-md">
            <h1 className="text-center">Administrar proyectos</h1>
            <div className="wrapper mb-3">
                <Link className="btn btn-primary" to="/admin/project/new">Nuevo Proyecto</Link>
            </div>
            <StatusBar type={status.type} message={status.message} />
            
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project._id}>
                            <td>{project.name}</td>
                            <td>{project.short_description}</td>
                            <td className='d-flex gap-2'>
                                <Link to={`/admin/project/edit/${project._id}`} className="btn btn-primary">Editar</Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(project._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
import { getPublicProjects } from '../services/projectsServices'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Projects() {
    const [projects, setprojects] = useState([])
    useEffect(() => {
        getPublicProjects().then(json => {
            setprojects(json);
            console.log(json);
        })
    }, [])
    return (
        <div className="container-md">
            <div className="row pt-5 pb-5">
                <div className="col-md-12">
                    <h2>Proyectos</h2>
                    {projects.map((project, index) => {
                        return (
                            <article className='col-md-6' key={index}>
                                <div className="card">
                                    <img src={project.img} alt={project.name} className="card-img-top" />
                                    <div className="card-body">
                                        <h3 className="card-title">{project.name}</h3>
                                        <p className="card-text">{project.short_description}</p>
                                        <Link to={`/project/${project._id}`} className="btn btn-primary">Ir al Proyecto</Link>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
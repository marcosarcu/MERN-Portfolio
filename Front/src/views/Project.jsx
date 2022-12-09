import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectById } from '../services/projectsServices'

export default function Project(){
    const { id } = useParams();
    const [project, setProject] = useState({})
    useEffect(() => {
        getProjectById(id).then(json => {
            setProject(json[0]);
            console.log(json);
        })
    }, [id])
    return (
        <div className="container-md">
            <div className="row pt-5 pb-5">
                <div className="col-md-12">
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                    <img src={project.img} alt={project.name} className="img-fluid"></img>
                </div>
            </div>
        </div>
    )
}
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectById } from '../services/projectsServices'
import TwoColumnsSection from '../components/TwoColumnsSection';


export default function Project(){
    const { id } = useParams();
    const [project, setProject] = useState({
        name: '',
        description: '',
        technologies: []
    })
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
                <TwoColumnsSection img={project.img} alt={project.name}>
                    <h1>{project.name}</h1>
                    <div className='mb-3 mt-3 d-flex gap-2'>
                        {
                            project.technologies.map((technology, index) => {
                                return <span className='badge bg-dark' key={index}>{technology.name}</span>
                            })
                        }
                    </div>
                    <p>{project.description}</p>
                </TwoColumnsSection>
                </div>
            </div>
        </div>
    )
}
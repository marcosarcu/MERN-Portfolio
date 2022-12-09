import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {getProjectById, edit} from '../services/projectsServices';
import {getAll} from '../services/technologiesServices';
import StatusBar from '../components/StatusBar';

export default function EditProject(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [link, setLink] = useState("");
    const [img, setImg] = useState("");
    const [publicProject, setPublicProject] = useState(false);
    const [technologies, setTechnologies] = useState([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [status, setStatus] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getAll().then((response) => {
            setTechnologies(response);
        })
    }, [])

    useEffect(() => {
        getProjectById(id).then(json => {
            setName(json[0].name);
            setDescription(json[0].description);
            setShortDescription(json[0].short_description);
            setLink(json[0].link);
            setImg(json[0].img);
            setPublicProject(json[0].public);
            json[0].technologies.forEach((technology) => {
                setSelectedTechnologies(prevSelectedTechnologies => [...prevSelectedTechnologies, technology._id]);
            })
            console.log(selectedTechnologies)
            console.log(json[0].technologies)
        })
    }, [id])




    function handleName(e){
        setName(e.target.value);
    }
    function handleDescription(e){
        setDescription(e.target.value);
    }
    function handleShortDescription(e){
        setShortDescription(e.target.value);
    }
    function handleLink(e){
        setLink(e.target.value);
    }
    function handleImg(e){
        setImg(e.target.value);
    }
    function handlePublicProject(e){
        setPublicProject(e.target.checked);
    }
    function handleTechnology(e){
        if(e.target.checked){
            setSelectedTechnologies([...selectedTechnologies, e.target.value]);
        }else{
            setSelectedTechnologies(selectedTechnologies.filter((technology) => technology !== e.target.value));
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!name || !description || !shortDescription || !link || !img || !selectedTechnologies.length){
            setStatus ({
                type: 'danger',
                message: 'Todos los campos son obligatorios'
            })
            return;
        }
        let project = {
            name,
            description,
            short_description: shortDescription,
            link,
            img,
            public: publicProject,
            technologies: selectedTechnologies
        }
        console.log(project);
        edit(id, project).then((response) => {
            setStatus ({
                type: 'success',
                message: 'Proyecto actualizado correctamente'
            })
        })
    }




    return (
        <div className="container-md">
            <div className="row pt-5 pb-5">
                <div className="col-md-12">
                    <h2>Editar Proyecto</h2>
                    <StatusBar message={status.message} type={status.type}></StatusBar>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Nombre</label>
                            <input className="form-control" type="text" name="name" id="name" onChange={handleName} value={name}></input>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Descripción</label>
                            <input className="form-control" type="text" name="description" id="description" onChange={handleDescription} value={description}></input>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="short_description">Descripción Corta</label>
                            <input className="form-control" type="text" name="short_description" id="short_description" onChange={handleShortDescription} value={shortDescription}></input>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="link">Link</label>
                            <input className="form-control" type="text" name="link" id="link" onChange={handleLink} value={link}></input>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="img">Imagen</label>
                            <input className="form-control" type="text" name="img" id="img" onChange={handleImg} value={img}></input>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="technologies">Tecnologías</label>
                            {
                                technologies.map((technology) => {
                                    return (
                                        <div className="form-check" key={technology._id}>
                                            <label htmlFor={technology.name} className="form-check-label">{technology.name}</label>
                                            <input checked={selectedTechnologies.includes(technology._id) ? true : false} className="form-check-input" type="checkbox" name={technology.name} id={technology.name} value={technology._id} onChange={handleTechnology}></input>
                                        </div>
                                    )
                                })
                            }                        
                        </div>
                        <hr></hr>  
                        <div className="form-group mt-3 mb-3">
                            <div className="form-check">
                                <label htmlFor="public" className="form-check-label">Publicar</label>
                                <input checked={publicProject} className="form-check-input" type="checkbox" name="public" id="public" onChange={handlePublicProject} value={publicProject}></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Crear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
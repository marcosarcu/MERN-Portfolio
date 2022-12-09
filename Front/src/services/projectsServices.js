export async function getProjects() {
  return fetch('http://localhost:3000/api/projects').then((response) => {
    if(response.ok){
      return response.json();
    }
    else{
      throw new Error('Error al traer los proyectos');
    }
  });
}

export async function getPublicProjects(){
  return fetch('http://localhost:3000/api/projects?onlyPublic=true').then((response) => {   
    return response.json();
  });
}

export async function getProjectById(id) {
  return fetch(`http://localhost:3000/api/projects/${id}`).then((response) => {   
    return response.json();
  });
}

export async function create(project) {
  return fetch('http://localhost:3000/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  }).then((response) => {
    return response.json();
  });
}

export async function edit(id, project) {
  return fetch(`http://localhost:3000/api/projects/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  }).then((response) => {
    return response.json();
  });
}

export async function remove(id) {
  return fetch(`http://localhost:3000/api/projects/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    return response;
  });
}

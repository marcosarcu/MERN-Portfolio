export async function logIn(email, password){
    return fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then((response) => {
        if(response.ok){
            return response.json();
        } else{
            throw new Error('Error al iniciar sesión');
        }
    })
}

export async function logOutService(){
    return fetch('http://localhost:3000/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
        },
    }).then((response) => {
        if(response.ok){
            return response
        } else{
            throw new Error('Error al cerrar sesión');
        }
    })
}
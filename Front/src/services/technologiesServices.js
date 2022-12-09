export async function getAll(){
    return fetch('http://localhost:3000/api/technologies').then((response) => {
        return response.json();
    });
}
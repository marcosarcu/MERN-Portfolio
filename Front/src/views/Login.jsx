import { useState } from "react";
import { logIn } from '../services/auth.services.js';
import StatusBar from '../components/StatusBar.jsx';

export default function Login({onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        logIn(email, password).then((response) => {
            onLogin(response);
            setStatus({
                type: 'success',
                message: 'Sesión iniciada'
            })
            setTimeout(() => {
                window.history.back();
            }
            , 2000);
        }).catch((error) => {
            setStatus({
                type: 'danger',
                message: 'Error al iniciar sesión'
            })
        })
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className="container-md pt-5 pb-5">
            <h1 className="text-center">Iniciar sesión</h1>
            <StatusBar message={status.message} type={status.type}/>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={onChangeEmail} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={onChangePassword} />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </form>

        </div>
    )
}

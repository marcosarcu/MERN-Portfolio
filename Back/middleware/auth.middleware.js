import jwt from 'jsonwebtoken';
import tokenServices from '../services/token.services.js';
import {getById} from '../services/users.services.js';

function isLogin(req, res, next) {
    const token = req.headers['auth-token'];
    if (!token) {
        res.status(401).json({ message: "No se envio un token" });
        res.end()
        return
    }

    try {
        let payload = jwt.verify(token, process.env.JWT_SECRET);
        tokenServices.findByToken(token)
            .then(function (tokenFound) {
                if (!tokenFound) {
                    res.status(401).json({ message: "Token invalido" });
                    res.end()
                    return
                } else{

                getById(payload.id)
                    .then(function (userFound) {
                        req.user = userFound;
                        next();
                    })
                }
            })

    }
    catch (err) {
        res.status(401).json({ message: "Token invalido" });
        res.end()
        return
    }
}

export default isLogin;
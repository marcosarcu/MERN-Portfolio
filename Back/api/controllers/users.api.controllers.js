import * as usersService from '../../services/users.services.js';
import jwt from 'jsonwebtoken';
import tokenServices from '../../services/token.services.js';

function find(req, res) {
    const filter = {};
    

    usersService.getAll(filter)
        .then(function (users) {
            res.status(200).json(users);
        })
        .catch(function (err) {
            res.status(500).json({ message: err.message });
        })
}

function create(req, res) {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    usersService.create(user)
        .then(function (user) {
            res.status(201).json(user);
        })
        .catch(function (err) {
            res.status(500).json({ message: err.message });
        })
}

function deleteOne(req, res) {
    const id = req.params.id;
    usersService.deleteOne(id)
        .then(function () {
            res.status(204).json();
        })
        .catch(function (err) {
            res.status(500).json({ message: err.message });
        })
}

function login(req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    usersService.login(user)
        .then(function (user) {
            const token = jwt.sign({
                id: user._id,
            }, process.env.JWT_SECRET);
            tokenServices.create(token, user._id)
            res.status(200).json({ token: token });
        }
        )
        .catch(function (err) {
            res.status(500).json({ message: err.message });
        }
        )
}

function logout(req, res) {
    const token = req.headers['auth-token'];
    tokenServices.deleteOne(token)
        .then(function () {
            res.status(204).json({ message: "Logout exitoso"});
        })
        .catch(function (err) {
            res.status(500).json({ message: err.message });
        })
}




export { find, create, deleteOne, login, logout };
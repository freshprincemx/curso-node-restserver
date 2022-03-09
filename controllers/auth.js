const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { json } = require("express/lib/response");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");
const Usuario = require('../models/usuario');

const login = async (req, res = response) => {
    const {correo, password} = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - correo'
            });
        }
        // Verificar si el usuario esta activo en la BD
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado: false'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password'
            });
        }
        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body;
    try {
        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});
        
        if(!usuario){
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol: 'USER_ROLE',
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en BD tiene estado en false negar autenticación
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador - Usuario bloqueado '
            });
        }
        // generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token de Google no se pudo verificar',
            error
        });
    }
}

module.exports = {
    login,
    googleSignIn
}
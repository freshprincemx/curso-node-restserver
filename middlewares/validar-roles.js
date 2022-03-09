const { response } = require("express")
const { request } = require("express");
const { off } = require("../models/usuario");


const esAdminRole = (req = request, res = response, next) => {
    if(!req.usuario){
        return res.sendStatus(500).json({
            msg: 'Se quiere verificar el rol sin validar el toke primero'
        });
    }
    const { rol, nombre} = req.usuario;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }
    next();
}

const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        if(!req.usuario){
            return res.sendStatus(500).json({
                msg: 'Se quiere verificar el rol sin validar el toke primero'
            });
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere alguno de estos roles: ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    esAdminRole, 
    tieneRol
}
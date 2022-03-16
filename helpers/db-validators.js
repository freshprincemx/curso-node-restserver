const { Categoria, Role, Usuario, Producto } = require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya está registrado en la BD`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe`);
    }
}

const existeCategoria = async(nombre = '') => {
    const nombreMayus = nombre.toUpperCase();
    const categoria = await Categoria.findOne({ nombre: nombreMayus });
    if(categoria){
        throw new Error(`La categoria ${categoria.nombre} ya está registrada en la BD`);
    }
}

const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id)
    if(!existeCategoria){
        throw new Error(`El id ${id} no existe`);
    }
}

const existeProducto = async(nombre = '') => {
    const nombreMayus = nombre.toUpperCase();
    const producto = await Producto.findOne({ nombre: nombreMayus });
    if(producto){
        throw new Error(`El producto ${producto.nombre} ya está registrado en la BD`);
    }
}

const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id)
    if(!existeProducto){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria, 
    existeCategoriaPorId,
    existeProducto,
    existeProductoPorId
}
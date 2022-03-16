const {Router} = require('express');
const { check } = require('express-validator');
const { 
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoria, 
    actualizarCategoria, 
    borrarCategoria
} = require('../controllers/categorias');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoria, existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoria),
    validarCampos
], crearCategoria);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);




module.exports = router;
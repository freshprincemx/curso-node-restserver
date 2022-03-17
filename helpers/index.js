const dbvalidators  = require('./db-validators');
const generarJWT    = require('./generarJWT');
const googleverify  = require('./google-verify');
const subirArchivo  = require('./subir-archivo');

module.exports = {
    ...dbvalidators,
    ...generarJWT,
    ...googleverify,
    ...subirArchivo
}
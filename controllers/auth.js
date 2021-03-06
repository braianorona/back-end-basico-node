const { response } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");



const login = async(req, res = response) => {

    const { correo, password} = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'El usuario o contraseña son incorrectos - correo'
            })
        }

        //Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El Usuario o Contraseña son incorrectos - estado: false'
            })
        }

        //Verificar la pass
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'El Usuario o Contraseña son incorrectos - password'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal'
        })
        
    }
}


module.exports = {
    login
}
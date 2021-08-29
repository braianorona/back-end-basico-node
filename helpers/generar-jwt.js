const jwt = require('jsonwebtoken');



const generarJWT = (uid = '') =>{
    
    return new Promise((resolved, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolved(token);
            }
        })
    })
}


module.exports = {
    generarJWT
}
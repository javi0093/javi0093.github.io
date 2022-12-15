const Usuario = require('../../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports= {
    authenticate: function(req, res, next){
        Usuario.findOne({email: req.body.email}, function(err, usuarioInfo){
            if(err) {
                next(err);
            }else{
                if(usuarioInfo === null){return res.status(401).json({status: "error", message: "inválido email ó password", data: null});}
                if (usuarioInfo != null && bcrypt.compareSync(req.body.password, usuarioInfo.password)) {
                    const token = jwt.sign({id: usuarioInfo._id}, req.app.get('secretKey'), {expiresIn: '7d'});
                    res.status(200).json({message: "usuario encontrado!", data: {usuario: usuarioInfo, token:token}});
                }else{
                    res.status(401).json({status: "error", message: "inválido email ó password", data: null});
                }
            }
        });
    },
    forgotPassword: function(req, res, mext){
        Usuario.findOne({ email: req.body.email}, function(err, usuario){
            if(!usuario) return res.status(401).json({ message: "no existe el usuario", data: null});
            usuario.resetPassword(function(err){
                if(err) {return next(err);}
                res.status(200).json({ message: "se envio un email para reestablecer el password", data: null});
            });
        });
    },
}
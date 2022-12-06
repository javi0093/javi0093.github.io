var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var Schema = mongoose.Schema;

const validateEmail = function(email){
    const re = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;;
    return re.test(email);
};

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'por favor ingrese un email válido'],
        match:[/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;]
    },
    pasword: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordRestToken: String,
    passwordRestTokenExpires: Date,
    verificado:{
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, { message: 'el {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save', function(next){
    if (this.isModified('password')) {
        this.pasword = bcrypt.hashSync(this.pasword, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva = new Reserva({
        usuario: this._id, 
        bicicleta: biciId, 
        desde:desde, 
        hasta:hasta});
    console.log(reserva);
    reserva.save(cb);
}

module.exports = mongoose.model('Usuario', usuarioSchema);
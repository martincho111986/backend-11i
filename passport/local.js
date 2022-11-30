const User = require('../models/userSchema');
const { comparePassword } = require('../utils/passwordHandler');
const LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    try {
        if(!user){
            return done(null, false, {mensaje: "Usuario no encontrado"})
        }
        const match = await comparePassword( password, user.password );
        if(!match) {
            return done(null, false, {mensaje: "contraseña incorrecta"})
        }
        return done(null, user)
    } catch (error) {
        return done(error, false, {mensaje: "Error al Autenticar el usuario"})
    }
});

module.exports = localStrategy;
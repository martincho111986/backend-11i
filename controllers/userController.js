const User = require("../models/userSchema");
const mongoose = require("mongoose");
const { encryptPassword, comparePassword } = require('../utils/passwordHandler');
const jwt = require("jsonwebtoken");
const passport = require('passport');

//traer todos los usuarios de la base de datos
const getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    if (!users) {
      return res.status(404).json({
        mensaje: "Usuarios no encontrados",
        status: 404,
      });
    }
    return res.status(200).json({
      status: 200,
      mensaje: "usuarios encontrados",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};
//traer un usuario por id
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({
      mensaje: "id invalido",
    });
  }
  if (!user) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
    });
  }
  res.status(200).json({
    mensaje: "usuario encontrado",
    user,
  });
};

//crear un usuario

const register = async (req, res) => {
  const { name, username, password } = req.body;
  const user = await User.findOne({ username });
  try {
    if (user) {
      return res.status(400).json({
        mensaje: "El usuario ya existe",
      });
    }

    const newUser = new User({
      name,
      username,
      password: encryptPassword(password),
    });
    await newUser.save();

    res.status(201).json({
      mensaje: "usuario creado",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

//borrar usuario por id
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({
        mensaje: "id invalido",
      });
    }

    if (!user) {
      return res.status(404).json({
        mensaje: "usuario no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "usuario elmininado exitosamente",
    });
  } catch (error) {
    console.log(error);
  }
};

//editar usario por id
const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, username, password } = req.body; 

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({
              mensaje: "id invalido",
            });
          }
        const user = await User.findByIdAndUpdate(id, {
            name,
            username,
            password

        }, {new: true})
        if(!user) {
            return res.status(404).json({
                mensaje: "usuario no encontrado"
            })
        }
        res.status(200).json({
            mensaje: "usuario modificado exitosamente",
            user
        })

    } catch (error) {
        console.log(error)
    }
}

//inciar sesion usuario

const login = async (req, res) => {
  //tomaos los daros del body, inputs
  const { username, password } = req.body;
  //buscamos el usuario en nuestra base de datos
  const user = await User.findOne({username});
  //guardamos el secret para nuestro JWT en una variable
  const secret = process.env.JWT_SECRET;
  try {
    //validar si el usuario existe, si el usuario no exite, se retorna usuario no encontrado
    if(!user) {
      return res.status(404).json({
        mensaje: "usuario no encontrado"
      })
    }

    //vamos a comprar las contrasenas ingresada desde el login con la contrasena guardada en la base datos que ya esta encriptada
    //si esto es false, mostrara mensaje contrasena incorrecta, si es true, pasa a la variable payload
    if(!comparePassword(password, user.password)){
      return res.status(400).json({
        mensaje: "la contraseña es incorrecta"
      })
    }
    //payload es la data que nosotros vamos a divulgar o enviar a nustro FE, para realizar validaciones
    const payload = {
      sub: user._id,
      email: user.username,
      nombre: user.name
    }

    //aqui generamos nuestro token, el cual recibe 3 parametros, el primero, es el payload o data, el segundo es el secret,
    //y el tercer parametro es el algoritmo de codificacion del token
    const token = jwt.sign(payload, secret, {
      algorithm: process.env.JWT_ALGORTIHM
    });

    console.log("token", token)
    //en el caso de ser un logueo exitoso, devolvemos un mensaje de exito, el token y el user
return res.status(200).json({
  mensaje: "Usuario logueado con exito",
  token,
  user
})
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  register,
  deleteUser,
  updateUserById,
  login
};

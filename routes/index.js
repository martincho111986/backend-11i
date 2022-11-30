const router = require('express').Router();
const upload = require("../utils/multer");
const { getAllProducts, createProduct } = require('../controllers/productController');
const { getAllUsers, getUserById, register, deleteUser, updateUserById, login } = require('../controllers/userController');
const authenticateAdmin = require('../middlewares/authAdmin');
const authenticateUser = require('../middlewares/authUser');

//rutas para usuarios
router.get("/all-users", getAllUsers)
router.get("/user/:id", getUserById)
router.post("/register", register)
router.delete("/user/:id", deleteUser)
router.put("/user/:id", updateUserById)
router.post("/login", login)

//rutas para productos
router.get("/productos/all",authenticateAdmin, getAllProducts)
router.post('/productos', authenticateUser,  upload.single("image"), createProduct)

module.exports = router;
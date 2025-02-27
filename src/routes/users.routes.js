const { Router } = require('express')
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require('../controllers/UsersController')
const UserAvatarController = require('../controllers/UserAvatarController')

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router()

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()


const upload = multer(uploadConfig.MULTER)

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)
usersRoutes.delete('/:id', usersController.delete)



module.exports = usersRoutes
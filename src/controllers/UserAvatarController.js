const knex = require("../database/knex")
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class UserAvatarController {
    async update(request, response){
        const avatarFilename = request.file.filename
        const user_id = request.user.id

        const user = await knex('users').where({id: user_id}).first()

        const diskStorage = new DiskStorage()

        if(!user){
            throw new AppError("somente usuarios cadastrados podem mudar o avatar", 401)
        }
 
        if(user.avatar){
            await diskStorage.deleteFile(user.avatar)
        }

        user.avatar = await diskStorage.saveFile(avatarFilename)

        await knex('users').where({id:user_id}).update(user)

        return response.json(user)
    }
}

module.exports = UserAvatarController

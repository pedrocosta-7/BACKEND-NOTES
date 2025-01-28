const authConfig = require("../configs/auth")
const AppError = require("../utils/AppError")
const {verify} = require("jsonwebtoken")

function ensureAuthenticated(request, response, next) {
   
   const authHeader = request.headers.authorization

   if(!authHeader) {
    throw new AppError("JWT token não informado")
   }

   const [, token] = authHeader.split(" ")

   try {
   const {sub: User_id} = verify(token, authConfig.jwt.secret)

   request.user = {
    id:Number(User_id)
   }

   return next()
} catch {
    throw new AppError("JWT token inválido", 401)
}
}

module.exports = ensureAuthenticated
require('dotenv').config()

module.exports = {
    bcrypt: {
        salt: "$2a$10$WjE5Prw4RiysLhUbbpfBXO"
    },
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
};

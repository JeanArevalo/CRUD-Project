const { config } = require('dotenv').config();

const envs = {
    PORT: Number(process.env.PORT),
    PUBLIC_PATH: process.env.PUBLIC_PATH || 'public',
}

module.exports = {
    envs,
}

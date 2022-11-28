
const { config } = require ('dotenv')

config()

const host = process.env.HOST;
const database = process.env.DATABASE;
const user = process.env.USER;
const password = process.env.PASSWORD;

module.exports={
    host,
    database,
    user,
    password
}

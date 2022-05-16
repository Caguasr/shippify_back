import {Sequelize} from "sequelize";


export const database = () => {
    return new Sequelize({
        host: process.env.HOST_DB,
        username: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.SCHEMA_DB,
        dialect: "mysql"
    })
}



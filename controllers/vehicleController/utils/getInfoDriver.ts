import {QueryTypes} from "sequelize";
import {database} from "../../../config/database";
import {User} from "../../../interfaces/user";

export const getInfoDriver =async(id:number) =>{
    try {
        const connection =  database();
        const query = `select * from driver where id = ${id}`
        const user :User[] = await connection.query(query, {type: QueryTypes.SELECT})
        return user[0]
    }catch (e) {
        console.log('------------ERROR TO GET INFO USER----------')
        console.log(e)
    }
}
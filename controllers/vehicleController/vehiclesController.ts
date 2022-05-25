import {Request, Response} from "express";
import {database} from "../../config/database";
import {QueryTypes} from "sequelize";
import {Vehicle} from "../../interfaces/vehicle";
import {groupVehiclesByDriver} from "./utils/groupVehiclesByDriver";
import {verifyErrorsPost} from "../../utils/verifyErrorsPost";


export const getVehiclesByDriver = async (req: Request, res: Response) => {
    const connection = database();
    const page: number = parseInt(req.params.page);
    const registers = page * 10;
    try {
        const query = `SELECT * from vehicle`
        const vehicles: Vehicle[] = await connection.query(query, {type: QueryTypes.SELECT})
        const vehiclesByDriver = await groupVehiclesByDriver(vehicles)
        return res.status(200).json(vehiclesByDriver)
    } catch (e) {
        console.log('----------ERROR TO GET VEHICLES------------')
        console.log(e)
        return res.status(500).json({message: "Internal server error", error: e})
    }
}

export const saveVehicle = async (req: Request, res: Response) => {
    const connection = database();
    const errors = verifyErrorsPost(req);
    if (errors) {
        return res.status(400).json(errors)
    }
    try {
        const data = req.body;
        const query = `insert into vehicle (driver_id, plate, model, type, capacity, creation_date) values (${data.driver_id}, '${data.plate}', '${data.model}','${data.type}' ,'${data.capacity}', '${new  Date().toISOString()}')`
        await connection.query(query, {type: QueryTypes.INSERT})
        return res.status(201).json({message: "Car save successfully"})
    } catch (e) {
        console.log('----------ERROR TO SAVE VEHICLE------------')
        console.log(e)
        return res.status(500).json({message: "Internal server error", error: e})
    }

}

export  const deleteVehicle = async (req: Request, res: Response) =>{
    const connection = database()
    const id = req.params.id;
    try {
        const query =  `select * from vehicle  where id = ${id}`
        const  getVehicle: Vehicle[] = await connection.query(query, {type:QueryTypes.SELECT})
        if (getVehicle.length === 0){
            return res.status(404).json({message: "Vehicle not found"})
        }
        await connection.query(`delete from vehicle where id = ${id}`, {type:QueryTypes.DELETE});
        return res.status(201).json({message: "Car delete successfully"})
    }catch (e) {
        console.log('----------ERROR TO DELETE VEHICLE------------')
        console.log(e)
        return res.status(500).json({message: "Internal server error", error: e})
    }
}

export const updateVehicle = async (req: Request, res: Response) => {
    const connection = database();
    const errors =  verifyErrorsPost(req);
    console.log(errors)
    if (errors){
        return res.status(400).json(errors)
    }
    try {
        const id = req.params.id;
        let query =  `select * from vehicle  where id = ${id}`
        const  getVehicle: Vehicle[] = await connection.query(query, {type:QueryTypes.SELECT})
        if (getVehicle.length === 0){
            return res.status(404).json({message: "Vehicle not found"})
        }
        const data = req.body
        query = `update vehicle set driver_id =${data.driver_id}, plate = '${data.plate}', model= '${data.model}', type= '${data.type}', capacity= '${data.capacity}' where id = ${id}`
        await connection.query(query, {type:QueryTypes.UPDATE})
        return res.status(200).json({message: "Vehicle updated successfully"})
    } catch (e) {
        console.log('----------ERROR TO UPDATE VEHICLE------------')
        console.log(e)
        return res.status(500).json({message: "Internal server error", error: e})
    }
}
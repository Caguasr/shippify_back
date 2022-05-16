import {Router} from "express";
import {
    deleteVehicle,
    getVehiclesByDriver,
    saveVehicle,
    updateVehicle
} from "../controllers/vehicleController/vehiclesController";
import {check} from "express-validator";

export const routeVehicles: Router = Router()


routeVehicles.get("/:page", getVehiclesByDriver)
routeVehicles.post("/", [
    check("driver_id").notEmpty(),
    check("plate").notEmpty(),
    check("model").notEmpty(),
    check("type").notEmpty(),
    check("capacity").notEmpty(),
], saveVehicle)
routeVehicles.delete("/:id", deleteVehicle)
routeVehicles.put("/:id", [
    check("driver_id").notEmpty(),
    check("plate").notEmpty(),
    check("model").notEmpty(),
    check("type").notEmpty(),
    check("capacity").notEmpty(),
],updateVehicle)
routeVehicles.all("/*", (req, res) => {
    return res.status(404).json({message: "Router not found"})
})
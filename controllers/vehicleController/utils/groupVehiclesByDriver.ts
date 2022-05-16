import {Vehicle} from "../../../interfaces/vehicle";
import {getInfoDriver} from "./getInfoDriver";
import {User} from "../../../interfaces/user";

interface VehicleByDriver {
    driver_id: number | null,
    vehicles: Vehicle[],
    user: User | undefined
}

export const groupVehiclesByDriver = async (vehicles: Vehicle[]) => {
    let groupById: VehicleByDriver[] = []

    for (const vehicle of vehicles) {
        const alreadyExistDriver = groupById.find((driver: VehicleByDriver) => driver.driver_id === vehicle.driver_id)
        if (!alreadyExistDriver) {
            let user : User | undefined;
            if (vehicle.driver_id) {
                user = await getInfoDriver(vehicle.driver_id)
            }
            groupById.push({driver_id: vehicle.driver_id, vehicles: [vehicle], user: user})
        } else {
            const addVehicle: VehicleByDriver = {
                ...alreadyExistDriver,
                vehicles: [...alreadyExistDriver.vehicles, vehicle]
            }
            groupById = groupById.filter(deleteOldData => deleteOldData.driver_id !== vehicle.driver_id)
            groupById.push(addVehicle)
        }

    }
    return groupById
}
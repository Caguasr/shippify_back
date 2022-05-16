export interface Vehicle {
    id:            number;
    driver_id:     number | null;
    plate:         string;
    model:         string;
    type:          string;
    capacity:      string;
    creation_date: Date;
}

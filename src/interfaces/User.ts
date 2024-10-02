import {Status} from "./Status";
import {Department} from "./Department";
import {Country} from "./Country";

export type User = {
    name: string
    status: Status
    department: Department
    country: Country
}

export type UserWithId = User & {
    id: string
}
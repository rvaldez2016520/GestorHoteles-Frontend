import { Service } from "./service";

export class Reservation {
    constructor (
        public _id: string,
        public user: string,
        public hotel: string,
        public room: string,
        public start_date: Date,
        public end_date: Date,
        public total_price: number,
        public status: boolean,
        public services: Array<Service>,
        public events: []
    ){}
}
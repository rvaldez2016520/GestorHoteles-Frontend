import { Room } from './room';
export class Invoice{
    constructor(
        public _id: string,
        public start_date: Date,
        public end_date: Date,
        public total_price: number,
        public user: string,
        public hotel: string,
        public room: Room,
        public services: [],
        public events: string
    ){}
}
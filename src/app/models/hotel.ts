import { Event } from "./event";
import { Room } from "./room";
import { User } from "./user";

export class Hotel {
    constructor(
        public _id: string,
        public user_admin_hotel: User,
        public name: string,
        public address: string,
        public count_reservations: number,
        public country: string,
        public image: string,
        public rooms: Array<Room>,
        public events: Array<Event>,
    ){}
}
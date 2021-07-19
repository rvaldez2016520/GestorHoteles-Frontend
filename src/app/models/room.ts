export class Room {
    constructor (
        public _id: string,
        public name: string,
        public available:  Boolean,
        public price_for_day: number,
        public available_day: number,
        public typeRoom: string
    ){}
}
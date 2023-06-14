import { HelpAplication } from "../interfaces/helpAplication";

export class helpRequestMock {
    
    HelpRequestArr : HelpAplication[] = [
        {   title: "Ayuda 1",
            description: "Descripcion 1",
            street: "8 octubre",
            corner: "Avenida siempreviva",
            userDO: "111111111",
            lng: -56.157485609445175,
            lat: -34.88791314870603
        },
        {   
            title: "Ayuda 2",
            description: "Descripcion 1",
            street: "8 octubre",
            corner: "Avenida siempreviva",
            userDO: "111111111",
            lng: -56.257485,
            lat: -34.387913
        },
        {   
            title: "Ayuda 3",
            description: "Descripcion 1",
            street: "8 octubre",
            corner: "Avenida siempreviva",
            userDO: "111111111",
            lng: -56.2575856,
            lat: -34.487973148
        }
    ]

    constructor() {

    }

    getAllHelpRequest() {
        return this.HelpRequestArr;
    }
}
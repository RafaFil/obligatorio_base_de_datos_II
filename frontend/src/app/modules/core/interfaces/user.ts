import { UserAuth} from "./userAuth";

export interface User extends UserAuth {

    name : string,
    last_name: string,
}
import { Skill } from "../skill"
import { UserDataResponse } from "./userDataResponse"

export interface HelpRequestData {
    id : number,
    title: string,
    description: string,
    skills: Skill[],
    level?: string,
    street?: string,
    corner?: string,
    user : {
        userDO : string,
        name : string,
        lastname: string,
        verified: boolean
    },
    lng: number,
    lat: number,
    dateofpublishing: string,
    isActive?: boolean,
    wasResolved?: boolean
}
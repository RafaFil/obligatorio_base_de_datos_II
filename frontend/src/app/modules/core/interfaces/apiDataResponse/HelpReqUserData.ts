import { Skill } from "../skill"
import { UserDataResponse } from "./userDataResponse"

export interface HelpRequestUserData {
    id : number,
    title: string,
    description: string,
    skills: Skill[],
    level?: string,
    street?: string,
    corner?: string,
    userDO : string,
    lng: number,
    lat: number,
    dateofpublishing: string,
    isActive?: boolean,
    wasResolved?: boolean
}
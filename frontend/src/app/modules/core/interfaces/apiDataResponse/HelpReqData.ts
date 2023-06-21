import { Skill } from "../skill"
import { UserDataResponse } from "./userDataResponse"

export interface HelpRequestData {
    id : number,
    title: string,
    description: string,
    skill?: Skill[],
    level?: string,
    street?: string,
    corner?: string,
    user : UserDataResponse,
    name : string,
    last_name: string,
    verified: boolean,
    lng?: number,
    lat?: number,
    dateOfPublishing?: Date,
    isActive?: boolean,
    wasResolved?: boolean
}
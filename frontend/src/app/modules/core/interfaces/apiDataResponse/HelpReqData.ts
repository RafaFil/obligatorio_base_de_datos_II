import { Skill } from "../skill"

export interface HelpRequestData {
    id : number,
    title: string,
    description: string,
    skill?: Skill[],
    level?: string,
    street?: string,
    corner?: string,
    userDO : string,
    name : string,
    last_name: string,
    verified: boolean
    lng?: number,
    lat?: number,
    dateOfPublishing?: Date
}
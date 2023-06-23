import { Skill } from "./skill"

export interface HelpRequest {
    title: string,
    description: string,
    skills?: Skill[],
    street?: string,
    corner?: string,
    userDO: string
    lng?: number,
    lat?: number
    dateOfPublishing?: Date
}
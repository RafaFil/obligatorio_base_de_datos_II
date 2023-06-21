import { Skill } from "./skill"

export interface HelpRequest {
    title: string,
    description: string,
    skill?: Skill[],
    street?: string,
    corner?: string,
    userDO: string
    lng?: number,
    lat?: number
}
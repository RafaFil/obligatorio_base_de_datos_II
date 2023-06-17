export interface HelpRequest {
    title: string,
    description: string,
    skill?: string,
    level?: string,
    street?: string,
    corner?: string,
    userDO: string
    lng?: number,
    lat?: number
}
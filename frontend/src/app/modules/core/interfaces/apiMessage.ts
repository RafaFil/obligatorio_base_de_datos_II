//Generic api Message send from the backend

export interface apiMessage <T> {
    success : boolean,
    status : number,
    data?: T,
    message?: string
}
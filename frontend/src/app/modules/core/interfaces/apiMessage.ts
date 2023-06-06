//Generic api Message send from the backend

export interface apiMessage <T> {
    success : boolean,
    data?: T,
    message?: string
}
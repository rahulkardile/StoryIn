export interface IHomeAPI {
    poster: string,
    _id: string,
    title: string,
    user: {
        name: string
    }
}

export interface ILogin {
    email: string,
    password: string
}
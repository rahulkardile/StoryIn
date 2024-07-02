export type s3types = {
    url: string,
    Key?: string,
    success: boolean
}

export type NewBookRes = {
    message: string,
    success: boolean
}

type User = {
    _id: string;
    name: string;
};

export type postRes = {

    _id: string;
    title: string;
    description: string;
    user: User;
    poster: string;
    tags: string;
    episodes: string[];
    createdAt: string;
    updatedAt: string;
}
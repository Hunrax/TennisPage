export interface Player {
    id: string,
    name: string;
    country: string;
    age: string;
    slams: string;
    active: string;
    photo: string;
}

export interface NewPlayer {
    name: string;
    country: string;
    age: string;
    slams: string;
    active: string;
    photo: string;
}

export interface EditPlayer {
    name: string;
    country: string;
    age: string;
    slams: string;
    active: string;
}
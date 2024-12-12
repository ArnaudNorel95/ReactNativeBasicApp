export interface User{
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    // password: string;
    age: number | null;
}

export interface Note{
    id:number;
    title:string;
    content:string;
    updatedAt:Date;
    ownerId:number;
}
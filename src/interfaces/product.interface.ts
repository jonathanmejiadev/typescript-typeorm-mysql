export interface IProduct {
    id?: number;
    name?: string;
    stock?: number;
    ownerId?: number;
};

export interface IProductInput {
    name: string;
    stock: number;
    ownerId: number;
};
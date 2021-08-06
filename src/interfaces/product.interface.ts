export interface IProduct {
    id?: number;
    name?: string;
    stock?: number;
    description?: string;
    price?: number;
    images?: [];
    reviews?: [];
    categories?: [];
};

export interface IProductInput {
    name: string;
    description: string;
    stock: number;
    price: number;
    images: [];
};